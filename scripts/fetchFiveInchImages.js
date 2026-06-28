import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { auditAllPartImages } from "./auditAllPartImages.js";
import { fiveInchPartImageSources } from "../src/data/fiveInchPartImageSources.js";
import {
  cleanupDisallowedLocalImages,
  createCandidateRecord,
  loadDownloadManifest,
  saveDownloadManifest,
  upsertCandidate,
  writeDownloadReport,
} from "./fiveInchImageDownloadReport.js";
import {
  MAX_CANDIDATES_PER_PART,
  createReportBucket,
  extractPageImageCandidates,
  fetchHtml,
  fetchImageBuffer,
  isBlockedRetailerUrl,
  prepareJpegBuffer,
  printBucket,
} from "./imageFetchCore.js";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const publicRoot = join(scriptDir, "..", "public");

const PROACTIVE_SKIP_PART_IDS = new Map([
  [
    "aos-5-v5",
    "Official AOS design page has no isolated frame packshot; lifestyle hero assets.",
  ],
  [
    "iflight-nazgul-eco5-frame",
    "Manufacturer listing is complete BNF aircraft; no isolated frame packshot.",
  ],
  [
    "impulserc-apexdc",
    "ImpulseRC closed; remaining page is a build guide, not a product photo source.",
  ],
  [
    "impulserc-reverb5-frame",
    "ImpulseRC closed; no reliable product photo source expected.",
  ],
  [
    "hglrc-zeus5-frame",
    "Official URL points at Sector X5 substitute listing; not Zeus5 frame SKU.",
  ],
  [
    "tbs-source-one-v6-frame",
    "Open-source GitHub project page; no isolated frame product photo expected.",
  ],
  [
    "speedybee-bl32-55a-4in1",
    "Manufacturer page is FC+ESC stack; catalog line is ESC-only.",
  ],
  [
    "diatone-mamba-f722-s-fc",
    "Manufacturer page is FC+ESC stack; catalog line is FC-only.",
  ],
  [
    "speedybee-f7-v3-fc",
    "Manufacturer page is FC+ESC stack; catalog line is FC-only.",
  ],
  [
    "matek-f405-se-fc",
    "Official Matek portfolio page only exposes spec-sheet composite (board + text), not an isolated packshot.",
  ],
  [
    "matek-f722-mini",
    "Official Matek portfolio page only exposes spec-sheet composite (board + text), not an isolated packshot.",
  ],
  [
    "matek-f722-std-fc",
    "Official Matek portfolio page only exposes spec-sheet composite (board + text), not an isolated packshot.",
  ],
]);

const sourceByPartId = new Map(
  fiveInchPartImageSources.map((entry) => [entry.partId, entry]),
);

function parseFlags(argv) {
  return {
    includeLowConfidence: argv.includes("--include-low-confidence"),
    force: argv.includes("--force"),
    all: argv.includes("--all"),
  };
}

function toPublicAbsolutePath(expectedPath) {
  return join(publicRoot, expectedPath.replace(/^\//, ""));
}

function buildTodoEntry(auditEntry) {
  const source = sourceByPartId.get(auditEntry.partId);

  return {
    partId: auditEntry.partId,
    expectedPath: source?.expectedImagePath ?? auditEntry.imagePath,
    categoryKey: auditEntry.categoryKey,
  };
}

async function processPart(todoEntry, flags, report, manifest) {
  const source = sourceByPartId.get(todoEntry.partId);
  const absolutePath = toPublicAbsolutePath(todoEntry.expectedPath);

  if (existsSync(absolutePath) && !flags.force) {
    report.skippedExisting.push({
      partId: todoEntry.partId,
      detail: todoEntry.expectedPath,
    });

    const existingDownload = manifest.candidates.find(
      (entry) =>
        entry.partId === todoEntry.partId && entry.status === "downloaded",
    );

    if (existingDownload) {
      upsertCandidate(manifest, existingDownload);
    } else {
      upsertCandidate(
        manifest,
        createCandidateRecord({
          partId: todoEntry.partId,
          sourcePageUrl: source?.officialUrl ?? null,
          imageUrl: null,
          localPath: absolutePath,
          status: "downloaded",
          detail:
            "Local JPG already present; exact image URL not captured on this run.",
        }),
      );
    }

    return;
  }

  const proactiveSkipReason = PROACTIVE_SKIP_PART_IDS.get(todoEntry.partId);

  if (proactiveSkipReason) {
    report.skippedProactive.push({
      partId: todoEntry.partId,
      detail: proactiveSkipReason,
    });

    upsertCandidate(
      manifest,
      createCandidateRecord({
        partId: todoEntry.partId,
        sourcePageUrl: source?.officialUrl ?? null,
        imageUrl: null,
        status: "skipped",
        detail: proactiveSkipReason,
      }),
    );
    return;
  }

  if (!source?.officialUrl) {
    report.noOfficialUrl.push({
      partId: todoEntry.partId,
      detail: "No officialUrl in fiveInchPartImageSources.js",
    });
    return;
  }

  if (source.urlConfidence === "low" && !flags.includeLowConfidence) {
    report.skippedLowConfidence.push({
      partId: todoEntry.partId,
      detail: source.officialUrl,
    });

    upsertCandidate(
      manifest,
      createCandidateRecord({
        partId: todoEntry.partId,
        sourcePageUrl: source.officialUrl,
        imageUrl: null,
        status: "skipped",
        detail: "Skipped low-confidence source URL (use --include-low-confidence).",
      }),
    );
    return;
  }

  if (isBlockedRetailerUrl(source.officialUrl)) {
    report.blockedRetailer.push({
      partId: todoEntry.partId,
      detail: source.officialUrl,
    });

    upsertCandidate(
      manifest,
      createCandidateRecord({
        partId: todoEntry.partId,
        sourcePageUrl: source.officialUrl,
        imageUrl: null,
        status: "rejected",
        detail: "Blocked third-party retailer source page.",
      }),
    );
    return;
  }

  let html;

  try {
    html = await fetchHtml(source.officialUrl);
  } catch (error) {
    report.failedDownload.push({
      partId: todoEntry.partId,
      detail: `Page fetch failed (${source.officialUrl}): ${error.message}`,
    });

    upsertCandidate(
      manifest,
      createCandidateRecord({
        partId: todoEntry.partId,
        sourcePageUrl: source.officialUrl,
        imageUrl: null,
        status: "failed",
        detail: error.message,
      }),
    );
    return;
  }

  const candidates = extractPageImageCandidates(html, source.officialUrl).slice(
    0,
    MAX_CANDIDATES_PER_PART,
  );

  if (candidates.length === 0) {
    report.noImageFound.push({
      partId: todoEntry.partId,
      detail: source.officialUrl,
    });

    upsertCandidate(
      manifest,
      createCandidateRecord({
        partId: todoEntry.partId,
        sourcePageUrl: source.officialUrl,
        imageUrl: null,
        status: "failed",
        detail: "No manufacturer-owned image candidates found on page.",
      }),
    );
    return;
  }

  let recordedUnsupported = false;
  let sawCandidateAttempt = false;

  for (const imageUrl of candidates) {
    if (isBlockedRetailerUrl(imageUrl)) {
      continue;
    }

    sawCandidateAttempt = true;

    try {
      const { buffer, format } = await fetchImageBuffer(imageUrl);
      const { jpegBuffer, convertedFrom } = await prepareJpegBuffer(buffer, format);

      mkdirSync(dirname(absolutePath), { recursive: true });
      writeFileSync(absolutePath, jpegBuffer);

      const conversionNote = convertedFrom
        ? ` (converted ${convertedFrom.toUpperCase()} → JPG via sharp)`
        : "";
      const detail = `${todoEntry.expectedPath} <= ${imageUrl}${conversionNote}`;

      if (convertedFrom) {
        report.converted.push({
          partId: todoEntry.partId,
          detail,
        });
      }

      report.downloaded.push({
        partId: todoEntry.partId,
        detail,
      });

      upsertCandidate(
        manifest,
        createCandidateRecord({
          partId: todoEntry.partId,
          sourcePageUrl: source.officialUrl,
          imageUrl,
          localPath: absolutePath,
          status: "downloaded",
          detail: convertedFrom
            ? `Converted official ${convertedFrom.toUpperCase()} source to local JPG (dev script only).`
            : "",
        }),
      );
      return;
    } catch (error) {
      if (
        error.message.includes("Unsupported") &&
        !error.message.includes("sharp")
      ) {
        report.unsupportedFormat.push({
          partId: todoEntry.partId,
          detail: `${error.message} (${imageUrl})`,
        });

        if (!recordedUnsupported) {
          upsertCandidate(
            manifest,
            createCandidateRecord({
              partId: todoEntry.partId,
              sourcePageUrl: source.officialUrl,
              imageUrl,
              status: "rejected",
              detail: error.message,
            }),
          );
          recordedUnsupported = true;
        }

        continue;
      }

      report.failedDownload.push({
        partId: todoEntry.partId,
        detail: `Image fetch failed (${imageUrl}): ${error.message}`,
      });

      upsertCandidate(
        manifest,
        createCandidateRecord({
          partId: todoEntry.partId,
          sourcePageUrl: source.officialUrl,
          imageUrl,
          status: "failed",
          detail: error.message,
        }),
      );
    }
  }

  const partDownloaded = report.downloaded.some(
    (entry) => entry.partId === todoEntry.partId,
  );
  const partUnsupported = report.unsupportedFormat.some(
    (entry) => entry.partId === todoEntry.partId,
  );
  const partFailed = report.failedDownload.some(
    (entry) => entry.partId === todoEntry.partId,
  );

  if (!partDownloaded && !partUnsupported && !partFailed && !sawCandidateAttempt) {
    report.noImageFound.push({
      partId: todoEntry.partId,
      detail: `${source.officialUrl} (image URLs blocked or missing)`,
    });
  } else if (!partDownloaded && !partUnsupported && !partFailed && sawCandidateAttempt) {
    report.noImageFound.push({
      partId: todoEntry.partId,
      detail: source.officialUrl,
    });

    upsertCandidate(
      manifest,
      createCandidateRecord({
        partId: todoEntry.partId,
        sourcePageUrl: source.officialUrl,
        imageUrl: null,
        status: "failed",
        detail: "Candidate URLs found but none produced a saved JPG.",
      }),
    );
  }
}

export async function fetchFiveInchImageCandidates(options = {}) {
  const flags = {
    includeLowConfidence: false,
    force: false,
    all: false,
    ...options,
  };
  const report = createReportBucket();
  const manifest = loadDownloadManifest();
  const auditReport = auditAllPartImages({ publicRoot });
  const missingPriority2 = auditReport.missingItems.filter(
    (entry) => entry.priority === 2,
  );
  const missingPartIds = new Set(missingPriority2.map((entry) => entry.partId));

  const todoEntries = flags.all
    ? fiveInchPartImageSources.map((entry) => ({
        partId: entry.partId,
        expectedPath: entry.expectedImagePath,
        categoryKey: entry.categoryKey,
      }))
    : missingPriority2.map(buildTodoEntry);

  for (const todoEntry of todoEntries) {
    if (!flags.all && !missingPartIds.has(todoEntry.partId)) {
      continue;
    }

    await processPart(todoEntry, flags, report, manifest);
  }

  saveDownloadManifest(manifest);

  const { removedPartIds } = cleanupDisallowedLocalImages(manifest);
  report.removedAfterReview = removedPartIds.map((partId) => ({
    partId,
    detail: "Removed after recommendation review (remove/unsure).",
  }));

  saveDownloadManifest(manifest);
  writeDownloadReport(manifest);

  return { report, manifest, auditReport, missingPriority2 };
}

function printReport(report, auditReport) {
  const priority2 = auditReport.checked.filter((entry) => entry.priority === 2);
  const foundP2 = priority2.filter((entry) => entry.exists).length;

  console.log("MaidenReady 5-inch freestyle image candidate fetch");
  console.log("-----------------------------------------------");
  console.log(
    "Developer-only: downloads manufacturer-page candidates for local review.",
  );
  console.log("These files are NOT approved for public use automatically.");
  console.log("");

  printBucket("Downloaded", report.downloaded);
  printBucket("Converted PNG/WebP → JPG", report.converted);
  printBucket("Skipped existing", report.skippedExisting);
  printBucket("Skipped proactive", report.skippedProactive);
  printBucket("Skipped low-confidence", report.skippedLowConfidence);
  printBucket("Removed after review", report.removedAfterReview);
  printBucket("No official URL", report.noOfficialUrl);
  printBucket("Blocked retailer URL", report.blockedRetailer);
  printBucket("No image found", report.noImageFound);
  printBucket("Unsupported format", report.unsupportedFormat);
  printBucket("Failed download", report.failedDownload);

  console.log("");
  console.log(
    `5-inch freestyle catalog images on disk: ${foundP2}/${priority2.length}`,
  );
  console.log(
    `Full catalog images on disk: ${auditReport.found}/${auditReport.total}`,
  );
}

async function main() {
  const flags = parseFlags(process.argv);
  const { report, auditReport } = await fetchFiveInchImageCandidates(flags);
  printReport(report, auditReport);
  console.log("");
  console.log("Download review report: docs/FIVE_INCH_IMAGE_DOWNLOAD_REPORT.md");
}

const isDirectRun =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === join(process.argv[1]);

if (isDirectRun) {
  main().catch((error) => {
    console.error("[MaidenReady] fetchFiveInchImages failed:", error);
    process.exitCode = 1;
  });
}
