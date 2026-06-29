import { existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { fiveInchPartImageSources } from "../src/data/fiveInchPartImageSources.js";
import { presetPartImageSources } from "../src/data/presetPartImageSources.js";

const EASY_CATEGORY_KEYS = new Set(["props", "battery", "camera"]);

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptDir, "..");
const publicRoot = join(projectRoot, "public");
const manifestPath = join(
  projectRoot,
  "docs/easy-category-image-download-manifest.json",
);
const reportPath = join(projectRoot, "docs/EASY_CATEGORY_IMAGE_DOWNLOAD_REPORT.md");

const allSources = [
  ...presetPartImageSources,
  ...fiveInchPartImageSources,
].filter((entry) => EASY_CATEGORY_KEYS.has(entry.categoryKey));

const sourceByPartId = new Map(allSources.map((entry) => [entry.partId, entry]));

const MULTIPACK_OK_PART_IDS = new Set([
  "betafpv-2s-450-xt30",
  "cnhl-black-6s-1300",
]);

const MANUAL_REJECT_DOWNLOADED_PART_IDS = new Set([
  "foxeer-falkor-2",
  "foxeer-predator-v5",
  "foxeer-toothless-2",
  "hdzero-nano-90",
  "cnhl-6s-1500-freestyle",
  "ethix-p3-peanut-butter",
]);

const MANUAL_REJECTION_NOTES = new Map([
  [
    "foxeer-toothless-2",
    "Rejected after review: only Foxeer /upload/ad/ marketing assets available, not an isolated product packshot.",
  ],
  [
    "ethix-p3-peanut-butter",
    "Rejected after review: heavy Ethix/HQProp marketing logo overlay on prop packshot.",
  ],
  [
    "foxeer-falkor-2",
    "Rejected after review: Foxeer source image is a VTX/heatsink module, not the Falkor 2 camera SKU.",
  ],
  [
    "foxeer-predator-v5",
    "Rejected after review: Foxeer source image is a VS1011 video board, not the Predator V5 camera SKU.",
  ],
  [
    "hdzero-nano-90",
    "Rejected after review: HDZero assets are promo banners or lifestyle goggle-battery shots, not isolated Nano 90 camera packshots.",
  ],
  [
    "cnhl-6s-1500-freestyle",
    "Rejected after review: CNHL CDN asset includes X2 multi-pack overlay and 130C label; catalog line is single 6S 1500mAh 100C.",
  ],
]);

export { EASY_CATEGORY_KEYS, allSources as easyCategoryImageSources };

export function loadDownloadManifest() {
  if (!existsSync(manifestPath)) {
    return { updatedAt: null, candidates: [] };
  }

  return JSON.parse(readFileSync(manifestPath, "utf8"));
}

export function saveDownloadManifest(manifest) {
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

function hostnameFromUrl(urlString) {
  try {
    return new URL(urlString).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function isMultipackImageUrl(imageUrl, partId) {
  if (!imageUrl || MULTIPACK_OK_PART_IDS.has(partId)) {
    return false;
  }

  if (/-XT60-2(?:[_-]|\.)/i.test(imageUrl) && /6S1P-XT60-2/i.test(imageUrl)) {
    return true;
  }

  return /(?:^|[/_-])(?:2-?packs?|2pcs|4-?packs?|x2\b|_2p[_-]|2p_|[-_]2p\.|2pcs_)/i.test(
    imageUrl,
  );
}

function isMarketingAssetUrl(imageUrl) {
  if (!imageUrl) {
    return false;
  }

  return (
    /\/upload\/ad\//i.test(imageUrl) ||
    /pinterest\.com/i.test(imageUrl) ||
    /\/favicon/i.test(imageUrl) ||
    /static\.wixstatic\.com.*fill\/w_(?:32|64|100|147)/i.test(imageUrl)
  );
}

export function recommendCandidate(record) {
  const { confidence, status, partId, imageUrl, appearance, sourceType } =
    record;

  if (status === "rejected" || status === "failed" || status === "skipped") {
    return "remove";
  }

  if (sourceType === "retailer") {
    return "remove";
  }

  if (
    appearance === "lifestyle photo" ||
    appearance === "diagram" ||
    appearance === "logo" ||
    appearance === "render"
  ) {
    return "remove";
  }

  if (confidence === "low") {
    return "remove";
  }

  if (MANUAL_REJECT_DOWNLOADED_PART_IDS.has(partId)) {
    return "remove";
  }

  if (isMultipackImageUrl(imageUrl, partId)) {
    return "remove";
  }

  if (isMarketingAssetUrl(imageUrl)) {
    return "remove";
  }

  if (status === "downloaded") {
    return "keep for review";
  }

  return "remove";
}

export function createCandidateRecord({
  partId,
  sourcePageUrl,
  imageUrl = null,
  localPath = null,
  status,
  detail = "",
}) {
  const sourceEntry = sourceByPartId.get(partId);
  const relativeLocalPath = localPath
    ? localPath.replace(`${projectRoot}/`, "")
    : sourceEntry?.expectedImagePath?.replace(/^\//, "public/") ?? null;
  const localExists = relativeLocalPath
    ? existsSync(join(projectRoot, relativeLocalPath))
    : false;

  const record = {
    partId,
    partName: sourceEntry?.partName ?? partId,
    category: sourceEntry?.category ?? sourceEntry?.categoryKey ?? "unknown",
    categoryKey: sourceEntry?.categoryKey ?? "unknown",
    sourcePageUrl: sourcePageUrl ?? sourceEntry?.officialUrl ?? null,
    imageUrl,
    localPath: relativeLocalPath,
    sourceType: "manufacturer page",
    confidence: sourceEntry?.urlConfidence === "low" ? "low" : "high",
    appearance: "product photo",
    watermarkOrBranding:
      "None noted from URL/page metadata review only — inspect file manually.",
    imageNeedsReview: true,
    recommendation: "unsure",
    status,
    notes: [sourceEntry?.notes, detail].filter(Boolean).join(" "),
  };

  record.recommendation = recommendCandidate(record);
  return record;
}

export function upsertCandidate(manifest, candidate) {
  manifest.candidates = manifest.candidates.filter(
    (entry) => !(entry.partId === candidate.partId && entry.status === "downloaded"),
  );
  manifest.candidates.push({ ...candidate, imageNeedsReview: true });
  manifest.candidates.sort((left, right) =>
    left.partId.localeCompare(right.partId),
  );
  manifest.updatedAt = new Date().toISOString();
  return manifest;
}

function localFileExists(localPath) {
  if (!localPath) {
    return false;
  }

  const absolutePath = localPath.startsWith("public/")
    ? join(projectRoot, localPath)
    : join(publicRoot, localPath.replace(/^\//, ""));

  return existsSync(absolutePath);
}

function formatRecordSection(record, index) {
  return [
    `### ${index + 1}. ${record.partName} (\`${record.partId}\`)`,
    "",
    `- **Category:** ${record.category}`,
    `- **Manufacturer/source page URL:** ${record.sourcePageUrl ?? "—"}`,
    `- **Exact image URL downloaded:** ${record.imageUrl ?? "—"}`,
    `- **Local file path:** ${record.localPath ?? "—"}`,
    `- **Status:** ${record.status}`,
    `- **Confidence:** ${record.confidence}`,
    `- **imageNeedsReview:** true`,
    `- **Recommendation:** ${record.recommendation}`,
    record.notes ? `- **Notes:** ${record.notes}` : null,
    "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function formatDownloadReportMarkdown(manifest) {
  const downloaded = manifest.candidates.filter(
    (entry) => entry.status === "downloaded" && localFileExists(entry.localPath),
  );
  const rejected = manifest.candidates.filter(
    (entry) => entry.status !== "downloaded",
  );

  const lines = [
    "# Easy-category image download report (props, batteries, cameras)",
    "",
    "Developer-only review log for manufacturer-source image **candidates**.",
    "",
    "> **Not approved for public use.** Keep `imageNeedsReview: true` and",
    "> `imageLicense: \"No verified license on file\"` until permission is verified.",
    "",
    `Last updated: ${manifest.updatedAt ?? "unknown"}`,
    "",
  ];

  if (manifest.lastCleanup) {
    lines.push(
      `Last local cleanup: ${manifest.lastCleanup.date} — removed **${manifest.lastCleanup.removedPartIds?.length ?? 0}** JPG(s); **${manifest.lastCleanup.retainedDownloadedCount ?? downloaded.length}** retained.`,
      "",
    );
  }

  lines.push(
    "## Summary",
    "",
    `- Downloaded local JPG candidates: **${downloaded.length}**`,
    `- Rejected / skipped / failed: **${rejected.length}**`,
    "",
    "## Downloaded candidates (local JPG on disk)",
    "",
  );

  if (downloaded.length === 0) {
    lines.push("_No downloaded JPG candidates recorded yet._", "");
  } else {
    downloaded.forEach((record, index) => {
      lines.push(formatRecordSection(record, index));
    });
  }

  lines.push("## Rejected, skipped, or failed", "");

  if (rejected.length === 0) {
    lines.push("_None recorded yet._", "");
  } else {
    rejected.forEach((record, index) => {
      lines.push(formatRecordSection(record, index));
    });
  }

  return lines.join("\n");
}

export function cleanupDisallowedLocalImages(manifest = loadDownloadManifest()) {
  const removedPartIds = [];

  for (const sourceEntry of allSources) {
    const relativePath = sourceEntry.expectedImagePath.replace(/^\//, "");
    const absolutePath = join(publicRoot, relativePath);

    if (!existsSync(absolutePath)) {
      continue;
    }

    let downloadedEntry = manifest.candidates.find(
      (entry) => entry.partId === sourceEntry.partId && entry.status === "downloaded",
    );

    if (!downloadedEntry) {
      downloadedEntry = createCandidateRecord({
        partId: sourceEntry.partId,
        sourcePageUrl: sourceEntry.officialUrl,
        imageUrl: null,
        localPath: absolutePath,
        status: "downloaded",
        detail: "Local JPG present; re-evaluating before retention.",
      });
      upsertCandidate(manifest, downloadedEntry);
    } else {
      downloadedEntry.recommendation = recommendCandidate(downloadedEntry);
    }

    if (downloadedEntry.recommendation !== "keep for review") {
      unlinkSync(absolutePath);
      downloadedEntry.status = "removed_local";
      downloadedEntry.recommendation = "remove";
      const manualNote = MANUAL_REJECTION_NOTES.get(sourceEntry.partId);
      if (manualNote) {
        downloadedEntry.notes = [downloadedEntry.notes, manualNote]
          .filter(Boolean)
          .join(" ");
      } else if (isMultipackImageUrl(downloadedEntry.imageUrl, sourceEntry.partId)) {
        downloadedEntry.notes = [
          downloadedEntry.notes,
          "Rejected after review: multi-pack promo image for a single-unit catalog SKU.",
        ]
          .filter(Boolean)
          .join(" ");
      }
      removedPartIds.push(sourceEntry.partId);
    }
  }

  manifest.lastCleanup = {
    date: new Date().toISOString(),
    removedPartIds,
    retainedDownloadedCount: manifest.candidates.filter(
      (entry) =>
        entry.status === "downloaded" &&
        entry.recommendation === "keep for review",
    ).length,
  };
  manifest.updatedAt = new Date().toISOString();

  return { manifest, removedPartIds };
}

export function writeDownloadReport(manifest = loadDownloadManifest()) {
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  writeFileSync(reportPath, formatDownloadReportMarkdown(manifest), "utf8");
  return manifest;
}

const isDirectRun =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === join(process.argv[1]);

if (isDirectRun) {
  const manifest = loadDownloadManifest();
  cleanupDisallowedLocalImages(manifest);
  writeDownloadReport(manifest);
  console.log(`Wrote ${reportPath}`);
}
