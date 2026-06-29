import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { auditAllPartImages } from "./auditAllPartImages.js";
import {
  cleanupDisallowedLocalImages,
  createCandidateRecord,
  easyCategoryImageSources,
  loadDownloadManifest,
  saveDownloadManifest,
  upsertCandidate,
  writeDownloadReport,
} from "./easyCategoryImageDownloadReport.js";
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

const sourceByPartId = new Map(
  easyCategoryImageSources.map((entry) => [entry.partId, entry]),
);

const PROACTIVE_SKIP_PART_IDS = new Map([
  ["azure-5148", "Azure Power site unreachable; no reliable official product photo URL."],
  ["azure-vanover-5140", "Azure Power site unreachable; no reliable official product photo URL."],
  ["dalprop-cyclone-5046", "DAL prop site unreachable; no reliable official product photo URL."],
  ["dalprop-fold-f5-5040", "DAL prop site unreachable; no reliable official product photo URL."],
  ["cnhl-4s-1500-freestyle", "Only multi-pack CNHL listing available; catalog line is single 4S 1500mAh."],
  ["ethix-s3-5050", "Low-confidence HQProp search page; no dedicated Ethix S3 product URL."],
  ["gemfan-hurricane-mck-51433", "Low-confidence substitute listing (51466 MCK), not MCK 51433 SKU."],
  ["gnb-4s-1500", "Official GNB store blocks automated fetch; no verified single-battery packshot URL."],
  ["gnb-6s-1300-hv", "Genstattu/GNB product page 404; no working official URL."],
  ["gnb-6s-1400-freestyle", "Genstattu/GNB product page 404; no working official URL."],
  ["lumenier-6s-1100", "Lumenier N2O 6S 1100mAh product page 404 on official store."],
  ["lumenier-6s-1250-freestyle", "Lumenier N2O 6S 1250mAh product page 404 on official store."],
  ["ovonic-4s-1400-freestyle", "No exact Ovonic 4S 1400mAh 100C listing on official store."],
  ["tattu-4s-1300-freestyle", "Genstattu Tattu 4S 1300mAh product page 404."],
  ["tattu-4s-1550", "Genstattu Tattu 4S 1550mAh product page 404."],
  ["tattu-rline-6s-1550", "Genstattu Tattu R-Line 6S 1550mAh product page 404."],
  ["hqprop-t3x2-5x3-515", "HQProp T3x2.5x3 515 product page not found on official store."],
  ["walksnail-avatar-micro", "Low-confidence substitute page (Avatar V2 camera), not Micro SKU."],
  ["foxeer-toothless-2", "Foxeer official page only exposes /upload/ad/ marketing assets."],
  ["foxeer-falkor-2", "Foxeer official page images are VTX modules, not Falkor 2 camera packshots."],
  ["foxeer-predator-v5", "Foxeer official page images are accessory/VTX boards, not Predator V5 camera packshots."],
  ["hdzero-nano-90", "HDZero official page only exposes promo banners/spec composites, not an isolated camera packshot."],
  ["cnhl-6s-1500-freestyle", "CNHL CDN asset includes X2 multi-pack overlay and 130C label; catalog line is single 6S 1500mAh 100C."],
]);

const MULTIPACK_OK_PART_IDS = new Set([
  "betafpv-2s-450-xt30",
  "cnhl-black-6s-1300",
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

  if (MULTIPACK_OK_PART_IDS.has(partId)) {
    return /\/upload\/ad\//i.test(imageUrl) || /pinterest\.com/i.test(imageUrl);
  }

  return (
    /(?:^|[/_-])(?:2-?packs?|2pcs|4-?packs?|x2\b|_2p[_-]|2p_|[-_]2p\.|2pcs_)/i.test(imageUrl) ||
    (/-XT60-2(?:[_-]|\.)/i.test(imageUrl) && /6S1P-XT60-2/i.test(imageUrl)) ||
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

export async function fetchEasyCategoryImageCandidates(options = {}) {
  const flags = { force: false, ...options };
  const report = createReportBucket();
  const manifest = loadDownloadManifest();
  const auditReport = auditAllPartImages({ publicRoot });
  const sourcePartIds = new Set(easyCategoryImageSources.map((entry) => entry.partId));

  const todoEntries = auditReport.checked
    .filter(
      (entry) =>
        !entry.exists &&
        sourcePartIds.has(entry.partId) &&
        ["props", "battery", "camera"].includes(entry.categoryKey),
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
    detail: "Removed after easy-category cleanup rules.",
  }));

  saveDownloadManifest(manifest);
  writeDownloadReport(manifest);

  return { report, manifest, auditReport, todoEntries };
}

function printReport(report, auditReport, todoEntries) {
  const easyOnDisk = auditReport.checked.filter(
    (entry) =>
      entry.exists && ["props", "battery", "camera"].includes(entry.categoryKey),
  ).length;

  console.log("MaidenReady easy-category image fetch (props / batteries / cameras)");
  console.log("----------------------------------------------------------------");
  console.log(`Missing easy-category targets this run: ${todoEntries.length}`);
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
  console.log(`Easy-category images on disk: ${easyOnDisk}`);
  console.log(`Full catalog images on disk: ${auditReport.found}/${auditReport.total}`);
}

async function main() {
  const flags = parseFlags(process.argv);
  const { report, auditReport, todoEntries } =
    await fetchEasyCategoryImageCandidates(flags);
  printReport(report, auditReport, todoEntries);
  console.log("");
  console.log("Download review report: docs/EASY_CATEGORY_IMAGE_DOWNLOAD_REPORT.md");
}

const isDirectRun =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === join(process.argv[1]);

if (isDirectRun) {
  main().catch((error) => {
    console.error("[MaidenReady] fetchEasyCategoryImages failed:", error);
    process.exitCode = 1;
  });
}
