import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { auditAllPartImages } from "./auditAllPartImages.js";
import {
  cleanupDisallowedLocalImages,
  createCandidateRecord,
  frameImageSources,
  loadDownloadManifest,
  saveDownloadManifest,
  upsertCandidate,
  writeDownloadReport,
} from "./frameImageDownloadReport.js";
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

const sourceByPartId = new Map(frameImageSources.map((entry) => [entry.partId, entry]));

const PROACTIVE_SKIP_PART_IDS = new Map([
  [
    "armattan-badger5-frame",
    "Official Armattan Badger page only exposes a 6-inch frame packshot; catalog entry is 5-inch frame-only.",
  ],
  [
    "geprc-cinelog35-v2",
    "Official GEPRC listing is a full BNF drone; no separated frame-kit packshot.",
  ],
  [
    "rekon7-pro-lr",
    "Official RekonFPV listing is a complete drone; frame-only SKU not separated.",
  ],
  [
    "iflight-nazgul-eco5-frame",
    "Official iFlight listing is a full BNF drone; frame-only SKU not clearly separated.",
  ],
  [
    "ethix-lithium5-frame",
    "Ethix official store intermittently unreachable from automated fetch.",
  ],
  [
    "flywoo-explorer5-frame",
    "Official Flywoo Explorer page is a long-range BNF-style listing without a verified frame-kit packshot.",
  ],
  [
    "hglrc-zeus5-frame",
    "No Zeus5 frame SKU on HGLRC store; Sector X5 substitute is a different frame family.",
  ],
  [
    "tbs-source-one-v5",
    "Official GitHub repo only exposes a social OG card, not a frame-kit packshot.",
  ],
  [
    "tbs-source-one-v6-frame",
    "Official GitHub repo only exposes a social OG card, not a frame-kit packshot.",
  ],
  [
    "impulserc-apexdc",
    "ImpulseRC closed; remaining docs page has no verified frame-kit packshot.",
  ],
  [
    "impulserc-reverb5-frame",
    "ImpulseRC closed; homepage has no verified Reverb 5 frame-kit packshot.",
  ],
  [
    "iflight-xl5-v6",
    "XL5 V6 discontinued; replacement-parts page has no verified V6 frame-kit packshot.",
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
    /Mach-R5|Backpack-V2|Race-Drone\/Mach/i.test(imageUrl) ||
    /Nazgul-F5V3|Evoque-F5/i.test(imageUrl) ||
    /withsmo4k|BNF|built[-_ ]?drone|assembled[-_ ]?quad/i.test(imageUrl) ||
    /Badger.*6|6[-_]?inch|6_inch/i.test(imageUrl) ||
    /opengraph\.githubassets/i.test(imageUrl) ||
    /\/upload\/ad\//i.test(imageUrl) ||
    /enc_avif|blur_2|pinterest\.com/i.test(imageUrl) ||
    /AOS%205%20V5%20\(1\)|AOS%203\.5%20V5%20\(1\)/i.test(imageUrl) ||
    /wp-logo|happymodel_logo|Logo-skull/i.test(imageUrl) ||
    /w_49,h_49|w_32,h_32|w_50,h_50|w_64,h_64|w_200,h_200|_150x150|_200x200|_300x300|_60x60/i.test(
      imageUrl,
    ) ||
    /nsplsh|stock[-_]?photo|lifestyle|action[-_]?shot/i.test(imageUrl) ||
    /Sector[-_]?X5/i.test(imageUrl) ||
    /paypal|affirm|payment/i.test(imageUrl)
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
    (imageUrl) => !isRejectedCandidateUrl(imageUrl),
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
        detail: "No suitable manufacturer-owned frame-kit image candidates found.",
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

export async function fetchFrameImageCandidates(options = {}) {
  const flags = { force: false, ...options };
  const report = createReportBucket();
  const manifest = loadDownloadManifest();
  const auditReport = auditAllPartImages({ publicRoot });
  const sourcePartIds = new Set(frameImageSources.map((entry) => entry.partId));

  const todoEntries = auditReport.checked
    .filter(
      (entry) => !entry.exists && sourcePartIds.has(entry.partId) && entry.categoryKey === "frame",
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
    detail: "Removed after frame cleanup rules.",
  }));

  saveDownloadManifest(manifest);
  writeDownloadReport(manifest);

  return { report, manifest, auditReport, todoEntries };
}

function printReport(report, auditReport, todoEntries) {
  const framesOnDisk = auditReport.checked.filter(
    (entry) => entry.exists && entry.categoryKey === "frame",
  ).length;

  console.log("MaidenReady frame image fetch");
  console.log("-----------------------------");
  console.log(`Missing frame targets this run: ${todoEntries.length}`);
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
  console.log(`Frame images on disk: ${framesOnDisk}`);
  console.log(`Full catalog images on disk: ${auditReport.found}/${auditReport.total}`);
}

async function main() {
  const flags = parseFlags(process.argv);
  const { report, auditReport, todoEntries } = await fetchFrameImageCandidates(flags);
  printReport(report, auditReport, todoEntries);
  console.log("");
  console.log("Download review report: docs/FRAME_IMAGE_DOWNLOAD_REPORT.md");
}

const isDirectRun =
  process.argv[1] && fileURLToPath(import.meta.url) === join(process.argv[1]);

if (isDirectRun) {
  main().catch((error) => {
    console.error("[MaidenReady] fetchFrameImages failed:", error);
    process.exitCode = 1;
  });
}
