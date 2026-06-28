import { existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { fiveInchPartImageSources } from "../src/data/fiveInchPartImageSources.js";
import { presetPartImageSources } from "../src/data/presetPartImageSources.js";

const MOTOR_CATEGORY_KEY = "motors";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptDir, "..");
const publicRoot = join(projectRoot, "public");
const manifestPath = join(projectRoot, "docs/motor-image-download-manifest.json");
const reportPath = join(projectRoot, "docs/MOTOR_IMAGE_DOWNLOAD_REPORT.md");

const allSources = [...presetPartImageSources, ...fiveInchPartImageSources].filter(
  (entry) => entry.categoryKey === MOTOR_CATEGORY_KEY,
);

const sourceByPartId = new Map(allSources.map((entry) => [entry.partId, entry]));

export const FAMILY_KV_VARIANT_PART_IDS = new Set([
  "brotherhobby-avenger-2507-1850",
  "brotherhobby-avenger-2806-5-1300",
  "brotherhobby-returner-r6-2207-1850kv",
  "emax-eco-ii-2207-1900kv",
  "iflight-xing2-2207-1855",
  "iflight-xing2-2207-2750kv",
  "rcinpower-gts-v2-2207-1950kv",
  "rcinpower-gts-v3-2207-1860",
  "xing-e-pro-2207-1800",
]);

const MANUAL_REJECT_DOWNLOADED_PART_IDS = new Set([
  "fpvcycle-2207-1780kv",
  "fpvcycle-2207-1960",
]);

const MANUAL_REJECTION_NOTES = new Map([
  [
    "fpvcycle-2207-1780kv",
    "Rejected after review: FPVCycle official packshots carry a visible watermark.",
  ],
  [
    "fpvcycle-2207-1960",
    "Rejected after review: FPVCycle official packshots carry a visible watermark.",
  ],
  [
    "iflight-xing-2005-2550",
    "Rejected after review: official page only exposes a XING-2205 shaft diagram, not a 2005 motor packshot.",
  ],
]);

export { allSources as motorImageSources };

export function loadDownloadManifest() {
  if (!existsSync(manifestPath)) {
    return { updatedAt: null, candidates: [] };
  }

  return JSON.parse(readFileSync(manifestPath, "utf8"));
}

export function saveDownloadManifest(manifest) {
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

function isWrongMotorImageUrl(imageUrl) {
  if (!imageUrl) {
    return false;
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
    /fpvcycle\.com.*watermark/i.test(imageUrl)
  );
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

  if (MANUAL_REJECT_DOWNLOADED_PART_IDS.has(partId)) {
    return "remove";
  }

  if (isWrongMotorImageUrl(imageUrl)) {
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
  const familyKvNote = FAMILY_KV_VARIANT_PART_IDS.has(partId)
    ? "Official manufacturer image represents this motor family; multiple KV options share the same product render."
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
    notes: [sourceEntry?.notes, familyKvNote, detail].filter(Boolean).join(" "),
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
  const familyKvLine = FAMILY_KV_VARIANT_PART_IDS.has(record.partId)
    ? "- **Family KV note:** Official manufacturer image covers multiple KV variants of this motor family."
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
    familyKvLine,
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
    "# Motor image download report",
    "",
    "Developer-only review log for **motor** manufacturer-source image **candidates**.",
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
      const manualNote = MANUAL_REJECTION_NOTES.get(sourceEntry.partId);
      if (manualNote) {
        downloadedEntry.notes = [downloadedEntry.notes, manualNote]
          .filter(Boolean)
          .join(" ");
      } else if (isWrongMotorImageUrl(downloadedEntry.imageUrl)) {
        downloadedEntry.notes = [
          downloadedEntry.notes,
          "Rejected after review: image URL matches a wrong-family, diagram, or non-motor asset pattern.",
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
