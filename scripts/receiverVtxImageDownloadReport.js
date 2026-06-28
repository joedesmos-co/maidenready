import { existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { fiveInchPartImageSources } from "../src/data/fiveInchPartImageSources.js";
import { presetPartImageSources } from "../src/data/presetPartImageSources.js";

const RECEIVER_VTX_CATEGORY_KEYS = new Set(["receiver", "vtx"]);

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptDir, "..");
const publicRoot = join(projectRoot, "public");
const manifestPath = join(
  projectRoot,
  "docs/receiver-vtx-image-download-manifest.json",
);
const reportPath = join(projectRoot, "docs/RECEIVER_VTX_IMAGE_DOWNLOAD_REPORT.md");

const allSources = [...presetPartImageSources, ...fiveInchPartImageSources].filter(
  (entry) => RECEIVER_VTX_CATEGORY_KEYS.has(entry.categoryKey),
);

const sourceByPartId = new Map(allSources.map((entry) => [entry.partId, entry]));

export const FAMILY_VARIANT_PART_IDS = new Set([
  "happymodel-ep2-elrs",
  "happymodel-ep2-5inch-elrs",
  "happymodel-cine-ep2-elrs",
  "happymodel-ep1-dual-elrs",
  "tbs-crossfire-micro-v2",
  "tbs-crossfire-micro-lr",
  "hdzero-freestyle-vtx",
  "hdzero-race-vtx",
]);

export { allSources as receiverVtxImageSources };

export function loadDownloadManifest() {
  if (!existsSync(manifestPath)) {
    return { updatedAt: null, candidates: [] };
  }

  return JSON.parse(readFileSync(manifestPath, "utf8"));
}

export function saveDownloadManifest(manifest) {
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

function isWrongReceiverVtxImageUrl(imageUrl, partId) {
  if (!imageUrl) {
    return false;
  }

  const sourceEntry = sourceByPartId.get(partId);
  const categoryKey = sourceEntry?.categoryKey;

  const sharedReject =
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
    /blur_2/i.test(imageUrl);

  if (sharedReject) {
    return true;
  }

  if (categoryKey === "vtx" && /receiver|crossfire_nano_rx|elrs-receiver/i.test(imageUrl)) {
    return true;
  }

  if (categoryKey === "receiver" && /\/vtx|walksnail-avatar-gt-vtx|unify-pro|tank-solo/i.test(imageUrl)) {
    return false;
  }

  return false;
}

export function recommendCandidate(record) {
  const { confidence, status, partId, imageUrl, appearance, sourceType } = record;

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

  if (isWrongReceiverVtxImageUrl(imageUrl, partId)) {
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
  const familyNote = FAMILY_VARIANT_PART_IDS.has(partId)
    ? "Official manufacturer image represents this product family; catalog variant shares the same PCB/render."
    : null;

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
    imageLicense: "No verified license on file",
    recommendation: "unsure",
    status,
    notes: [sourceEntry?.notes, familyNote, detail].filter(Boolean).join(" "),
  };

  record.recommendation = recommendCandidate(record);
  return record;
}

export function upsertCandidate(manifest, candidate) {
  manifest.candidates = manifest.candidates.filter(
    (entry) => !(entry.partId === candidate.partId && entry.status === "downloaded"),
  );
  manifest.candidates.push({ ...candidate, imageNeedsReview: true });
  manifest.candidates.sort((left, right) => left.partId.localeCompare(right.partId));
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
  const familyLine = FAMILY_VARIANT_PART_IDS.has(record.partId)
    ? "- **Family variant note:** Official manufacturer image covers this receiver/VTX family; catalog SKU maps to a listed variant."
    : null;

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
    `- **imageLicense:** No verified license on file`,
    `- **Recommendation:** ${record.recommendation}`,
    familyLine,
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
  const rejected = manifest.candidates.filter((entry) => entry.status !== "downloaded");

  const lines = [
    "# Receiver and VTX image download report",
    "",
    "Developer-only review log for **receiver and VTX** manufacturer-source image **candidates**.",
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
        imageUrl: sourceEntry.preferredImageUrl ?? null,
        localPath: absolutePath,
        status: "downloaded",
        detail: "Local JPG present; re-evaluating before retention.",
      });
      upsertCandidate(manifest, downloadedEntry);
    } else {
      downloadedEntry.confidence =
        sourceEntry.urlConfidence === "low" ? "low" : "high";
      downloadedEntry.recommendation = recommendCandidate(downloadedEntry);
    }

    if (downloadedEntry.recommendation !== "keep for review") {
      unlinkSync(absolutePath);
      downloadedEntry.status = "removed_local";
      downloadedEntry.recommendation = "remove";
      if (isWrongReceiverVtxImageUrl(downloadedEntry.imageUrl, sourceEntry.partId)) {
        downloadedEntry.notes = [
          downloadedEntry.notes,
          "Rejected after review: image URL matches wrong PCB type, accessory, logo, or thumbnail pattern.",
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
        entry.status === "downloaded" && entry.recommendation === "keep for review",
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
  process.argv[1] && fileURLToPath(import.meta.url) === join(process.argv[1]);

if (isDirectRun) {
  const manifest = loadDownloadManifest();
  cleanupDisallowedLocalImages(manifest);
  writeDownloadReport(manifest);
  console.log(`Wrote ${reportPath}`);
}
