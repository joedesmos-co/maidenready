import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { auditAllPartImages } from "./auditAllPartImages.js";
import {
  cleanupDisallowedLocalImages,
  createCandidateRecord,
  loadDownloadManifest,
  receiverVtxImageSources,
  saveDownloadManifest,
  upsertCandidate,
  writeDownloadReport,
} from "./receiverVtxImageDownloadReport.js";
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
  receiverVtxImageSources.map((entry) => [entry.partId, entry]),
);

const PROACTIVE_SKIP_PART_IDS = new Map([
  [
    "akk-x2-ultimate-vtx",
    "AKK official store blocks automated fetch; no verified direct packshot URL.",
  ],
  [
    "imm-rc-fusion-v2-elrs",
    "ImmersionRC Fusion family page is not a verified V2 ELRS receiver packshot.",
  ],
  [
    "jhemcu-ep28-elrs",
    "JHEMCU store homepage only; no stable EP28 ELRS product URL or packshot.",
  ],
  [
    "radiomaster-er5-915-lr",
    "RadioMaster ER5 series is 2.4GHz only; no official ER5 915MHz receiver listing.",
  ],
  [
    "rush-tank-ii-vtx",
    "RushFPV Tank II product page unreachable from automated fetch.",
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

  const sourceEntry = sourceByPartId.get(partId);
  const categoryKey = sourceEntry?.categoryKey;

  if (
    /\/upload\/ad\//i.test(imageUrl) ||
    /@ultra\.png/i.test(imageUrl) ||
    /@thumb/i.test(imageUrl) ||
    /paypal|affirm|payment/i.test(imageUrl) ||
    /enc_avif/i.test(imageUrl) ||
    /HDtou-01/i.test(imageUrl) ||
    /AnalogFPVCamera/i.test(imageUrl) ||
    /CoaxialCable/i.test(imageUrl) ||
    /\/6pin\.jpg/i.test(imageUrl) ||
    /Vista3_/i.test(imageUrl) ||
    /w_49,h_49|w_32,h_32|w_50,h_50|w_64,h_64|_150x150|_200x200|_300x300/i.test(imageUrl) ||
    /blur_2/i.test(imageUrl) ||
    /pinterest\.com/i.test(imageUrl)
  ) {
    return true;
  }

  if (categoryKey === "vtx" && /CaddxAnt|camera/i.test(imageUrl) && !/vtx|VTX/i.test(imageUrl)) {
    return true;
  }

  if (categoryKey === "receiver" && /tank-solo|unify-pro|avatar-gt-vtx|hdzero-.*vtx/i.test(imageUrl)) {
    return true;
  }

  return false;
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

export async function fetchReceiverVtxImageCandidates(options = {}) {
  const flags = { force: false, ...options };
  const report = createReportBucket();
  const manifest = loadDownloadManifest();
  const auditReport = auditAllPartImages({ publicRoot });
  const sourcePartIds = new Set(receiverVtxImageSources.map((entry) => entry.partId));

  const todoEntries = auditReport.checked
    .filter(
      (entry) =>
        !entry.exists &&
        sourcePartIds.has(entry.partId) &&
        ["receiver", "vtx"].includes(entry.categoryKey),
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
    detail: "Removed after receiver/VTX cleanup rules.",
  }));

  saveDownloadManifest(manifest);
  writeDownloadReport(manifest);

  return { report, manifest, auditReport, todoEntries };
}

function printReport(report, auditReport, todoEntries) {
  const receiverVtxOnDisk = auditReport.checked.filter(
    (entry) => entry.exists && ["receiver", "vtx"].includes(entry.categoryKey),
  ).length;

  console.log("MaidenReady receiver/VTX image fetch");
  console.log("------------------------------------");
  console.log(`Missing receiver/VTX targets this run: ${todoEntries.length}`);
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
  console.log(`Receiver/VTX images on disk: ${receiverVtxOnDisk}`);
  console.log(`Full catalog images on disk: ${auditReport.found}/${auditReport.total}`);
}

async function main() {
  const flags = parseFlags(process.argv);
  const { report, auditReport, todoEntries } =
    await fetchReceiverVtxImageCandidates(flags);
  printReport(report, auditReport, todoEntries);
  console.log("");
  console.log("Download review report: docs/RECEIVER_VTX_IMAGE_DOWNLOAD_REPORT.md");
}

const isDirectRun =
  process.argv[1] && fileURLToPath(import.meta.url) === join(process.argv[1]);

if (isDirectRun) {
  main().catch((error) => {
    console.error("[MaidenReady] fetchReceiverVtxImages failed:", error);
    process.exitCode = 1;
  });
}
