import { existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { fiveInchPartImageSources } from "../src/data/fiveInchPartImageSources.js";
import { presetPartImageSources } from "../src/data/presetPartImageSources.js";

const ELECTRONICS_CATEGORY_KEYS = new Set(["flightController", "esc"]);

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptDir, "..");
const publicRoot = join(projectRoot, "public");
const manifestPath = join(
  projectRoot,
  "docs/electronics-image-download-manifest.json",
);
const reportPath = join(projectRoot, "docs/ELECTRONICS_IMAGE_DOWNLOAD_REPORT.md");

const allSources = [...presetPartImageSources, ...fiveInchPartImageSources].filter(
  (entry) => ELECTRONICS_CATEGORY_KEYS.has(entry.categoryKey),
);

const sourceByPartId = new Map(allSources.map((entry) => [entry.partId, entry]));

export const AIO_BOARD_PART_IDS = new Set([
  "betafpv-1s-5a-aio-esc",
  "betafpv-f4-1s-aio-fc",
  "geprc-gep-f411-35a-aio-esc",
  "geprc-gep-f411-35a-aio-fc",
]);

export const FAMILY_VARIANT_PART_IDS = new Set([
  "betafpv-1s-5a-aio-esc",
  "betafpv-f4-1s-aio-fc",
  "geprc-gep-f411-35a-aio-esc",
  "geprc-gep-f411-35a-aio-fc",
]);

export { allSources as electronicsImageSources };

export function loadDownloadManifest() {
  if (!existsSync(manifestPath)) {
    return { updatedAt: null, candidates: [] };
  }

  return JSON.parse(readFileSync(manifestPath, "utf8"));
}

export function saveDownloadManifest(manifest) {
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

export function isAioBoardPart(partId) {
  return AIO_BOARD_PART_IDS.has(partId);
}

export function isWrongElectronicsImageUrl(imageUrl, partId) {
  if (!imageUrl) {
    return false;
  }

  const sourceEntry = sourceByPartId.get(partId);
  const categoryKey = sourceEntry?.categoryKey;
  const isAio = isAioBoardPart(partId);

  const sharedReject =
    /\/upload\/ad\//i.test(imageUrl) ||
    /pinout|schematic|diagram|wiring|[_-]layout/i.test(imageUrl) ||
    /1200x630|opengraph\.githubassets/i.test(imageUrl) ||
    /enc_avif|blur_2|pinterest\.com/i.test(imageUrl) ||
    /wp-logo|Logo-skull|paypal|affirm|payment/i.test(imageUrl) ||
    /w_49,h_49|w_32,h_32|w_50,h_50|w_64,h_64|w_200,h_200|_150x150|_200x200|_300x300|_60x60/i.test(
      imageUrl,
    ) ||
    /judgeme|nsplsh|stock[-_]?photo|lifestyle|installed[-_ ]?on[-_ ]?drone/i.test(
      imageUrl,
    );

  if (sharedReject) {
    return true;
  }

  if (!isAio && /stack|fc[-_]?esc|fc\+esc|combo[-_ ]?kit|f7v3-11|f405mini-1__|SB_f405mini/i.test(imageUrl)) {
    return true;
  }

  if (
    categoryKey === "flightController" &&
    !isAio &&
    /4in1|4-in-1|esc/i.test(imageUrl) &&
    !/flight[-_ ]?controller|fc/i.test(imageUrl)
  ) {
    return true;
  }

  if (
    categoryKey === "esc" &&
    !isAio &&
    /flight[-_ ]?controller|\bfc\b/i.test(imageUrl) &&
    !/4in1|4-in-1|esc/i.test(imageUrl)
  ) {
    return true;
  }

  if (/mateksys\.com.*1500x600|H743-MINI_1|F405-SE_1|F722-mini_1|F722-STD_1/i.test(imageUrl)) {
    return true;
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
    appearance === "pinout graphic" ||
    appearance === "full stack combo"
  ) {
    return "remove";
  }

  if (confidence === "low") {
    return "remove";
  }

  if (isWrongElectronicsImageUrl(imageUrl, partId)) {
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
    ? "Official manufacturer image is the combined AIO board; FC and ESC catalog entries represent the same physical board."
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
    appearance: isAioBoardPart(partId) ? "AIO board photo" : "board photo",
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
    ? "- **Family / AIO note:** Official manufacturer image is the combined AIO board; FC and ESC catalog entries represent the same physical board."
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
    "# FC, ESC, and AIO electronics image download report",
    "",
    "Developer-only review log for **flight controllers, ESCs, and AIO boards** manufacturer-source image **candidates**.",
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
      if (isWrongElectronicsImageUrl(downloadedEntry.imageUrl, sourceEntry.partId)) {
        downloadedEntry.notes = [
          downloadedEntry.notes,
          "Rejected after review: image URL matches stack combo, pinout/layout, marketing composite, or wrong board type pattern.",
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
