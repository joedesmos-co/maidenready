import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { auditAllPartImages } from "./auditAllPartImages.js";
import {
  cleanupDisallowedLocalImages,
  createCandidateRecord,
  loadDownloadManifest,
  motorImageSources,
  saveDownloadManifest,
  upsertCandidate,
  writeDownloadReport,
} from "./motorImageDownloadReport.js";
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

const sourceByPartId = new Map(motorImageSources.map((entry) => [entry.partId, entry]));

const PROACTIVE_SKIP_PART_IDS = new Map([
  [
    "axisflying-ae2207-1960",
    "AxisFlying official product pages unreachable from automated fetch; no verified packshot URL.",
  ],
  [
    "axisflying-joker-2207-1920kv",
    "AxisFlying official product pages unreachable from automated fetch; no verified packshot URL.",
  ],
  [
    "emax-eco-ii-2306-1900",
    "EMAX ECO II 2306 page only exposes 2207-sized gallery assets; no verified 2306 stator packshot.",
  ],
  [
    "fpvcycle-2207-1780kv",
    "FPVCycle official packshots carry a visible watermark.",
  ],
  [
    "fpvcycle-2207-1960",
    "FPVCycle official packshots carry a visible watermark.",
  ],
  [
    "hypetrain-acer-2306-1950kv",
    "Only Rotor Riot Revo 5 2207 substitute page on file — wrong Hypetrain motor family/size.",
  ],
  [
    "iflight-xing-2005-2550",
    "Official iFlight page only exposes a XING-2205 shaft diagram, not a 2005 motor packshot.",
  ],
  [
    "johnnyfpv-motor-v2-2207-1960kv",
    "Closest official Lumenier listing is JohnnyFPV V3 2307 — wrong motor size/family.",
  ],
  [
    "lumenier-2207-1800kv",
    "No dedicated Lumenier AX 2207 product page; motors collection is not a SKU-specific packshot.",
  ],
  [
    "samguk-v-2207-1960kv",
    "Samguk official store unreachable from automated fetch.",
  ],
  [
    "skystars-km2207-1910kv",
    "Skystars official store unreachable from automated fetch.",
  ],
  [
    "skystars-km2306-1950kv",
    "Skystars official store unreachable from automated fetch.",
  ],
  [
    "tmotor-f40-pro-2207-1950kv",
    "T-Motor store blocks automated fetch; no verified direct packshot URL.",
  ],
  [
    "tmotor-f60-pro-v-1950",
    "T-Motor store blocks automated fetch; no verified direct packshot URL.",
  ],
  [
    "tmotor-velox-v3-1750",
    "T-Motor store blocks automated fetch; no verified direct packshot URL.",
  ],
  [
    "tmotor-velox-v3-2207-1950kv",
    "T-Motor store blocks automated fetch; no verified direct packshot URL.",
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

function isRejectedCandidateUrl(imageUrl) {
  if (!imageUrl || isBlockedRetailerUrl(imageUrl)) {
    return true;
  }

  return (
    /Infographic/i.test(imageUrl) ||
    /\/shaft/i.test(imageUrl) ||
    /Mach-R5/i.test(imageUrl) ||
    /Backpack/i.test(imageUrl) ||
    /Logo-skull/i.test(imageUrl) ||
    /Rotor-Riot-Logo/i.test(imageUrl) ||
    /ueeshop\.ly200-cdn\.com/i.test(imageUrl) ||
    /Gimbal-Motor/i.test(imageUrl) ||
    /XING8108/i.test(imageUrl) ||
    /BOB57-Motor/i.test(imageUrl) ||
    /Nazgul/i.test(imageUrl) ||
    /\/upload\/ad\//i.test(imageUrl) ||
    /pinterest\.com/i.test(imageUrl) ||
    /static\.wixstatic\.com.*fill\/w_(?:32|64|100|147)/i.test(imageUrl)
  );
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
        detail: "No suitable manufacturer-owned image candidates found.",
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
          detail: convertedFrom
            ? `Converted official ${convertedFrom.toUpperCase()} source to local JPG (dev script only).`
            : "",
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

export async function fetchMotorImageCandidates(options = {}) {
  const flags = { force: false, ...options };
  const report = createReportBucket();
  const manifest = loadDownloadManifest();
  const auditReport = auditAllPartImages({ publicRoot });
  const sourcePartIds = new Set(motorImageSources.map((entry) => entry.partId));

  const todoEntries = auditReport.checked
    .filter(
      (entry) =>
        !entry.exists && sourcePartIds.has(entry.partId) && entry.categoryKey === "motors",
    )
    .map((entry) => {
      const source = sourceByPartId.get(entry.partId);
      return {
        partId: entry.partId,
        expectedPath: source?.expectedImagePath ?? entry.imagePath,
        categoryKey: entry.categoryKey,
        priority: entry.priority,
      };
    });

  for (const todoEntry of todoEntries) {
    await processPart(todoEntry, flags, report, manifest);
  }

  saveDownloadManifest(manifest);

  const { removedPartIds } = cleanupDisallowedLocalImages(manifest);
  report.removedAfterReview = removedPartIds.map((partId) => ({
    partId,
    detail: "Removed after motor cleanup rules.",
  }));

  saveDownloadManifest(manifest);
  writeDownloadReport(manifest);

  return { report, manifest, auditReport, todoEntries };
}

function printReport(report, auditReport, todoEntries) {
  const motorsOnDisk = auditReport.checked.filter(
    (entry) => entry.exists && entry.categoryKey === "motors",
  ).length;

  console.log("MaidenReady motor image fetch (motors only)");
  console.log("-----------------------------------------");
  console.log(`Missing motor targets this run: ${todoEntries.length}`);
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
  console.log(`Motor images on disk: ${motorsOnDisk}`);
  console.log(`Full catalog images on disk: ${auditReport.found}/${auditReport.total}`);
}

async function main() {
  const flags = parseFlags(process.argv);
  const { report, auditReport, todoEntries } = await fetchMotorImageCandidates(flags);
  printReport(report, auditReport, todoEntries);
  console.log("");
  console.log("Download review report: docs/MOTOR_IMAGE_DOWNLOAD_REPORT.md");
}

const isDirectRun =
  process.argv[1] && fileURLToPath(import.meta.url) === join(process.argv[1]);

if (isDirectRun) {
  main().catch((error) => {
    console.error("[MaidenReady] fetchMotorImages failed:", error);
    process.exitCode = 1;
  });
}
