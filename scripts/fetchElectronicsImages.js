import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { auditAllPartImages } from "./auditAllPartImages.js";
import {
  cleanupDisallowedLocalImages,
  createCandidateRecord,
  electronicsImageSources,
  isAioBoardPart,
  isWrongElectronicsImageUrl,
  loadDownloadManifest,
  saveDownloadManifest,
  upsertCandidate,
  writeDownloadReport,
} from "./electronicsImageDownloadReport.js";
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

const ELECTRONICS_CATEGORY_KEYS = new Set(["flightController", "esc"]);

const sourceByPartId = new Map(
  electronicsImageSources.map((entry) => [entry.partId, entry]),
);

const PROACTIVE_SKIP_PART_IDS = new Map([
  [
    "aikon-ak32-50a-4in1",
    "Aikon official store blocks automated fetch; no verified direct ESC packshot URL.",
  ],
  [
    "aikon-f7-mini-35a",
    "Aikon official store blocks automated fetch; no verified direct ESC packshot URL.",
  ],
  [
    "atomrc-f405-fc",
    "AtomRC official product page 404; no verified FC packshot URL.",
  ],
  [
    "axisflying-h743-mini",
    "AxisFlying official product page 404; no verified FC packshot URL.",
  ],
  [
    "diatone-mamba-f722",
    "Official Diatone page only exposes FC+O3/camera marketing composite, not an isolated Mamba F722 FC.",
  ],
  [
    "diatone-mamba-f722-s-fc",
    "F722 S variant not separately listed; stack page has no verified isolated FC packshot.",
  ],
  [
    "foxeer-f722-v4",
    "Foxeer page scrape only exposes generic /upload/ad/ icons, not F722 V4 FC packshot.",
  ],
  [
    "foxeer-h743-f722-fc",
    "Prior review: downloaded Foxeer asset matched VTX/heatsink module, not H743 F722 FC SKU.",
  ],
  [
    "foxeer-reaper-f4-65a",
    "Foxeer page scrape only exposes generic /upload/ad/ icons, not Reaper F4 65A ESC packshot.",
  ],
  [
    "hglrc-f722-silver-fc",
    "HGLRC official F722 Silver product page 404 from automated fetch.",
  ],
  [
    "hglrc-tekko32-f55-mini-esc",
    "HGLRC official Tekko32 F55 Mini ESC product page 404 from automated fetch.",
  ],
  [
    "hobbywing-xrotor-60a",
    "Hobbywing official page has no isolated 4-in-1 ESC packshot in page HTML.",
  ],
  [
    "hobbywing-xrotor-g2-50a",
    "Hobbywing official page has no isolated 4-in-1 ESC packshot in page HTML.",
  ],
  [
    "iflight-beast-f722-fc",
    "iFlight Beast F722 product page 404 from automated fetch.",
  ],
  [
    "iflight-succex-e-f4-50a",
    "iFlight SucceX-E F4 50A ESC product page 404 from automated fetch.",
  ],
  [
    "jhemcu-g743-pro-fc",
    "JHEMCU store homepage only; no stable G743 Pro FC product URL or packshot.",
  ],
  [
    "matek-f405-se-fc",
    "Matek portfolio only exposes spec-sheet composite, not an isolated F405-SE FC packshot.",
  ],
  [
    "matek-f722-mini",
    "Matek portfolio only exposes spec-sheet composite, not an isolated F722 Mini FC packshot.",
  ],
  [
    "matek-f722-std-fc",
    "Matek portfolio only exposes spec-sheet composite, not an isolated F722-STD FC packshot.",
  ],
  [
    "matek-h743-mini-lr",
    "Matek H743-MINI portfolio only exposes spec-sheet/layout composites, not an isolated FC packshot.",
  ],
  [
    "matek-h743-slate-freestyle",
    "No H743 Slate SKU on Matek; H743-SLIM-V4 substitute is a different board family.",
  ],
  [
    "meps-konvex-f55-55a-4in1",
    "MEPS homepage only; no standalone Konvex F55 product URL or packshot.",
  ],
  [
    "meps-konvex-g2-50a",
    "MEPS homepage only; no standalone Konvex G2 product URL or packshot.",
  ],
  [
    "rush-blade-f7-60a-4in1",
    "RushFPV Blade F7 ESC product page unreachable from automated fetch.",
  ],
  [
    "skystars-km55a-4in1",
    "Skystars official store unreachable from automated fetch.",
  ],
  [
    "speedybee-bl32-50a",
    "Catalog entry is individual ESC; official source is F7 V3 stack page with FC+ESC combo imagery only.",
  ],
  [
    "speedybee-bls-35a-4in1",
    "Catalog entry is individual ESC; official source is F405 Mini stack page with FC+ESC combo imagery only.",
  ],
  [
    "speedybee-f405-mini",
    "Catalog entry is individual FC; official source is F405 Mini stack page with FC+ESC combo imagery only.",
  ],
  [
    "speedybee-f405-v4",
    "Catalog entry is individual FC; official source is F405 V4 stack page with FC+ESC combo imagery only.",
  ],
  [
    "speedybee-f7-v3-fc",
    "Catalog entry is individual FC; official source is F7 V3 stack page with FC+ESC combo imagery only.",
  ],
  [
    "tmotor-f55a-pro-ii",
    "T-Motor store product page 404 from automated fetch.",
  ],
  [
    "tmotor-velox45a-4in1",
    "T-Motor store product page 404 from automated fetch.",
  ],
]);

function parseFlags(argv) {
  return {
    force: argv.includes("--force"),
  };
}

function toPublicAbsolutePath(expectedPath) {
  return join(publicRoot, expectedPath.replace(/^\//, ""));
}

function isRejectedCandidateUrl(imageUrl, partId) {
  if (!imageUrl || isBlockedRetailerUrl(imageUrl)) {
    return true;
  }

  return isWrongElectronicsImageUrl(imageUrl, partId);
}

function buildCandidateUrls(source, html) {
  const urls = [];

  if (source.preferredImageUrl) {
    urls.push(source.preferredImageUrl);
  }

  if (html && source.officialUrl) {
    urls.push(...extractPageImageCandidates(html, source.officialUrl));
  }

  return [...new Set(urls)].slice(0, MAX_CANDIDATES_PER_PART);
}

async function processPart(todoEntry, flags, report, manifest) {
  const source = sourceByPartId.get(todoEntry.partId);
  const absolutePath = toPublicAbsolutePath(todoEntry.expectedPath);

  if (existsSync(absolutePath) && !flags.force) {
    report.skippedExisting.push({
      partId: todoEntry.partId,
      detail: todoEntry.expectedPath,
    });
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
        status: "skipped",
        detail: proactiveSkipReason,
      }),
    );
    return;
  }

  if (!source?.officialUrl && !source?.preferredImageUrl) {
    report.noOfficialUrl.push({
      partId: todoEntry.partId,
      detail: "No officialUrl or preferredImageUrl configured.",
    });
    return;
  }

  if (source.urlConfidence === "low") {
    report.skippedLowConfidence.push({
      partId: todoEntry.partId,
      detail: source.officialUrl ?? source.preferredImageUrl,
    });
    upsertCandidate(
      manifest,
      createCandidateRecord({
        partId: todoEntry.partId,
        sourcePageUrl: source.officialUrl ?? null,
        status: "skipped",
        detail: "Skipped low-confidence source.",
      }),
    );
    return;
  }

  if (source.officialUrl && isBlockedRetailerUrl(source.officialUrl)) {
    report.blockedRetailer.push({
      partId: todoEntry.partId,
      detail: source.officialUrl,
    });
    return;
  }

  let html = null;

  if (source.officialUrl && !source.preferredImageUrl) {
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
          status: "failed",
          detail: error.message,
        }),
      );
      return;
    }
  } else if (source.officialUrl) {
    try {
      html = await fetchHtml(source.officialUrl);
    } catch {
      // preferredImageUrl may still succeed
    }
  }

  const candidates = buildCandidateUrls(source, html).filter(
    (imageUrl) => !isRejectedCandidateUrl(imageUrl, todoEntry.partId),
  );

  if (candidates.length === 0) {
    report.noImageFound.push({
      partId: todoEntry.partId,
      detail: source.officialUrl ?? source.preferredImageUrl,
    });
    upsertCandidate(
      manifest,
      createCandidateRecord({
        partId: todoEntry.partId,
        sourcePageUrl: source.officialUrl ?? null,
        status: "failed",
        detail: "No suitable manufacturer-owned board image candidates found.",
      }),
    );
    return;
  }

  for (const imageUrl of candidates) {
    try {
      const { buffer, format } = await fetchImageBuffer(imageUrl);
      const { jpegBuffer, convertedFrom } = await prepareJpegBuffer(buffer, format);

      mkdirSync(dirname(absolutePath), { recursive: true });
      writeFileSync(absolutePath, jpegBuffer);

      const detail = `${todoEntry.expectedPath} <= ${imageUrl}${
        convertedFrom ? ` (converted ${convertedFrom.toUpperCase()} → JPG)` : ""
      }`;

      if (convertedFrom) {
        report.converted.push({ partId: todoEntry.partId, detail });
      }

      report.downloaded.push({ partId: todoEntry.partId, detail });

      upsertCandidate(
        manifest,
        createCandidateRecord({
          partId: todoEntry.partId,
          sourcePageUrl: source.officialUrl ?? null,
          imageUrl,
          localPath: absolutePath,
          status: "downloaded",
          detail: [
            convertedFrom
              ? `Converted official ${convertedFrom.toUpperCase()} source to local JPG (dev script only).`
              : "",
            isAioBoardPart(todoEntry.partId)
              ? "AIO board image retained for split FC/ESC catalog entries."
              : "",
          ]
            .filter(Boolean)
            .join(" "),
        }),
      );
      return;
    } catch (error) {
      report.failedDownload.push({
        partId: todoEntry.partId,
        detail: `Image fetch failed (${imageUrl}): ${error.message}`,
      });
    }
  }

  report.noImageFound.push({
    partId: todoEntry.partId,
    detail: `${source.officialUrl ?? source.preferredImageUrl} (candidates exhausted)`,
  });
}

export async function fetchElectronicsImageCandidates(options = {}) {
  const flags = { force: false, ...options };
  const report = createReportBucket();
  const manifest = loadDownloadManifest();
  const auditReport = auditAllPartImages({ publicRoot });
  const sourcePartIds = new Set(electronicsImageSources.map((entry) => entry.partId));

  const todoEntries = auditReport.checked
    .filter(
      (entry) =>
        !entry.exists &&
        sourcePartIds.has(entry.partId) &&
        ELECTRONICS_CATEGORY_KEYS.has(entry.categoryKey),
    )
    .map((entry) => ({
      partId: entry.partId,
      expectedPath: entry.imagePath,
      categoryKey: entry.categoryKey,
      priority: entry.priority,
    }));

  for (const todoEntry of todoEntries) {
    await processPart(todoEntry, flags, report, manifest);
  }

  saveDownloadManifest(manifest);

  const { removedPartIds } = cleanupDisallowedLocalImages(manifest);
  report.removedAfterReview = removedPartIds.map((partId) => ({
    partId,
    detail: "Removed after electronics cleanup rules.",
  }));

  saveDownloadManifest(manifest);
  writeDownloadReport(manifest);

  return { report, manifest, auditReport, todoEntries };
}

function printReport(report, auditReport, todoEntries) {
  const electronicsOnDisk = auditReport.checked.filter(
    (entry) => entry.exists && ELECTRONICS_CATEGORY_KEYS.has(entry.categoryKey),
  ).length;

  console.log("MaidenReady FC/ESC/AIO electronics image fetch");
  console.log("----------------------------------------------");
  console.log(`Missing electronics targets this run: ${todoEntries.length}`);
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
  printBucket("Failed download", report.failedDownload);

  console.log("");
  console.log(`FC/ESC/AIO images on disk: ${electronicsOnDisk}`);
  console.log(`Full catalog images on disk: ${auditReport.found}/${auditReport.total}`);
}

async function main() {
  const flags = parseFlags(process.argv);
  const { report, auditReport, todoEntries } =
    await fetchElectronicsImageCandidates(flags);
  printReport(report, auditReport, todoEntries);
  console.log("");
  console.log("Download review report: docs/ELECTRONICS_IMAGE_DOWNLOAD_REPORT.md");
}

const isDirectRun =
  process.argv[1] && fileURLToPath(import.meta.url) === join(process.argv[1]);

if (isDirectRun) {
  main().catch((error) => {
    console.error("[MaidenReady] fetchElectronicsImages failed:", error);
    process.exitCode = 1;
  });
}
