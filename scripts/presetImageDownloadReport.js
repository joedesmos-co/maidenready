import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PRESET_PART_IMAGE_TODO } from "../src/data/presetPartImages.js";
import { presetPartImageSources } from "../src/data/presetPartImageSources.js";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptDir, "..");
const publicRoot = join(projectRoot, "public");
const manifestPath = join(projectRoot, "docs/preset-image-download-manifest.json");
const reportPath = join(projectRoot, "docs/PRESET_IMAGE_DOWNLOAD_REPORT.md");

const BLOCKED_RETAILER_HOST_PATTERNS = [
  /(^|\.)amazon\./i,
  /(^|\.)getfpv\.com$/i,
  /(^|\.)racedayquads\.com$/i,
  /(^|\.)aliexpress\.com$/i,
  /(^|\.)banggood\.com$/i,
  /(^|\.)ebay\./i,
];

const MANUFACTURER_STORE_HOSTS = [
  "betafpv.com",
  "shop.iflight.com",
  "store.dji.com",
  "shop.runcam.com",
  "genstattu.com",
  "radiomasterrc.com",
  "rushfpv.net",
  "rekonfpv.com",
  "chinahobbyline.com",
  "gaoneng.shop",
  "team-blacksheep.com",
];

const sourceByPartId = new Map(
  presetPartImageSources.map((entry) => [entry.partId, entry]),
);

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

export function isBlockedRetailerHost(hostname) {
  return BLOCKED_RETAILER_HOST_PATTERNS.some((pattern) => pattern.test(hostname));
}

export function classifySourceType(sourcePageUrl, imageUrl) {
  const pageHost = hostnameFromUrl(sourcePageUrl);
  const imageHost = hostnameFromUrl(imageUrl);

  if (!sourcePageUrl && !imageUrl) {
    return "unknown";
  }

  if (imageHost && isBlockedRetailerHost(imageHost)) {
    return "retailer";
  }

  if (pageHost.includes("github.com")) {
    return "manufacturer page";
  }

  if (
    MANUFACTURER_STORE_HOSTS.some(
      (host) => pageHost === host || pageHost.endsWith(`.${host}`),
    )
  ) {
    return "manufacturer page";
  }

  if (
    imageHost.includes("bigcommerce.com") &&
    (pageHost.includes("runcam.com") ||
      pageHost.includes("speedybee.com") ||
      pageHost.includes("genstattu.com"))
  ) {
    return "manufacturer page";
  }

  if (
    pageHost.includes("geprc.com") ||
    pageHost.includes("gemfan") ||
    pageHost.includes("hqprop.com") ||
    pageHost.includes("happymodel.cn") ||
    pageHost.includes("mateksys.com") ||
    pageHost.includes("foxeer.com") ||
    pageHost.includes("caddxfpv.com") ||
    pageHost.includes("aos-rc.com") ||
    pageHost.includes("skystars-rc.com") ||
    pageHost.includes("brotherhobby.com")
  ) {
    return "manufacturer page";
  }

  if (pageHost && isBlockedRetailerHost(pageHost)) {
    return "retailer";
  }

  return "unknown";
}

export function classifyConfidence(sourceEntry, sourceType) {
  if (sourceEntry?.urlConfidence === "low") {
    return "low";
  }

  if (sourceType === "retailer" || sourceType === "unknown") {
    return "low";
  }

  if (sourceEntry?.urlConfidence === "high") {
    return "high";
  }

  return "medium";
}

export function classifyAppearance(sourceEntry, imageUrl, sourcePageUrl) {
  const haystack = `${imageUrl ?? ""} ${sourcePageUrl ?? ""} ${sourceEntry?.notes ?? ""}`.toLowerCase();

  if (haystack.includes("github.com") || haystack.includes("opengraph.githubassets.com")) {
    return "diagram";
  }

  if (haystack.includes("logo") || haystack.includes("brand")) {
    return "logo";
  }

  if (
    haystack.includes("1200x630") ||
    haystack.includes("social") ||
    haystack.includes("cover/") ||
    haystack.includes("@ultra.png")
  ) {
    return "render";
  }

  if (
    haystack.includes("complete drone") ||
    haystack.includes("full-drone") ||
    haystack.includes("rekon7") ||
    haystack.includes("cinelog35-v2-hd-o3")
  ) {
    return "lifestyle photo";
  }

  if (haystack.includes("100x100") || haystack.includes("imageview2/1/w/100/h/100")) {
    return "diagram";
  }

  if (
    haystack.includes("wp-content/uploads") ||
    haystack.includes("/products/") ||
    haystack.includes("/u_file/") ||
    haystack.includes("img03.71360.com")
  ) {
    return "product photo";
  }

  return "product photo";
}

export function detectWatermarkOrBranding(sourceType, imageUrl, appearance) {
  const imageHost = hostnameFromUrl(imageUrl);

  if (sourceType === "retailer") {
    return "Possible third-party store branding — verify host before use.";
  }

  if (imageHost.includes("bigcommerce.com")) {
    return "No obvious watermark seen in URL metadata; official store CDN image — still unverified for reuse.";
  }

  if (appearance === "render" || appearance === "lifestyle photo") {
    return "Marketing-style asset; check for composite branding or scene elements.";
  }

  if (imageHost.includes("71360.com")) {
    return "Manufacturer CDN host; no watermark noted from URL review only.";
  }

  return "None noted from URL/page metadata review only — inspect file manually.";
}

export function recommendCandidate(record) {
  const {
    sourceType,
    appearance,
    watermarkOrBranding,
    status,
    notes,
    confidence,
  } = record;

  if (status === "rejected" || status === "failed") {
    return "remove";
  }

  if (sourceType === "retailer") {
    return "remove";
  }

  if (
    watermarkOrBranding.toLowerCase().includes("watermark") ||
    watermarkOrBranding.toLowerCase().includes("third-party store")
  ) {
    return "remove";
  }

  if (appearance === "lifestyle photo") {
    return "unsure";
  }

  if (appearance === "diagram" || appearance === "logo") {
    return "unsure";
  }

  if (notes?.includes("duplicate") || notes?.includes("stack photo")) {
    return "unsure";
  }

  if (confidence === "low") {
    return "unsure";
  }

  if (status === "downloaded") {
    return "keep for review";
  }

  return "unsure";
}

export function upsertCandidate(manifest, candidate) {
  const next = manifest.candidates.filter(
    (entry) =>
      !(
        entry.partId === candidate.partId &&
        entry.imageUrl === candidate.imageUrl &&
        entry.status === candidate.status
      ),
  );

  next.push({
    ...candidate,
    imageNeedsReview: true,
  });

  manifest.candidates = next.sort((left, right) =>
    left.partId.localeCompare(right.partId),
  );
  manifest.updatedAt = new Date().toISOString();

  return manifest;
}

function buildNotes(sourceEntry, appearance, imageUrl, localExists) {
  const notes = [];

  if (sourceEntry?.notes) {
    notes.push(sourceEntry.notes);
  }

  if (
    sourceEntry?.partId === "geprc-gep-f411-35a-aio-esc" ||
    sourceEntry?.partId === "geprc-gep-f411-35a-aio-fc"
  ) {
    notes.push("Same source image as the combined GEP-F411-35A AIO board.");
  }

  if (
    sourceEntry?.partId === "speedybee-bls-35a-4in1" ||
    sourceEntry?.partId === "speedybee-f405-mini"
  ) {
    notes.push("Stack marketing photo may show FC+ESC together rather than the single catalog line item.");
  }

  if (appearance === "lifestyle photo") {
    notes.push("Source page appears to show a complete aircraft, not an isolated frame SKU.");
  }

  if (!localExists && imageUrl) {
    notes.push("Candidate URL identified but no local JPG saved yet.");
  }

  return notes.length > 0 ? notes.join(" ") : "";
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
  const todoEntry = PRESET_PART_IMAGE_TODO.find((entry) => entry.partId === partId);
  const expectedPath = sourceEntry?.expectedImagePath ?? todoEntry?.expectedPath ?? null;
  const relativeLocalPath = localPath
    ? localPath.replace(`${projectRoot}/`, "")
    : expectedPath
      ? expectedPath.replace(/^\//, `public/`)
      : null;
  const localExists = relativeLocalPath
    ? existsSync(join(projectRoot, relativeLocalPath))
    : false;
  const sourceType = classifySourceType(sourcePageUrl, imageUrl);
  const appearance = classifyAppearance(sourceEntry, imageUrl, sourcePageUrl);
  const watermarkOrBranding = detectWatermarkOrBranding(
    sourceType,
    imageUrl,
    appearance,
  );
  const confidence = classifyConfidence(sourceEntry, sourceType);
  const notes = [buildNotes(sourceEntry, appearance, imageUrl, localExists), detail]
    .filter(Boolean)
    .join(" ");

  const record = {
    partId,
    partName: sourceEntry?.partName ?? partId,
    category: sourceEntry?.category ?? todoEntry?.categoryKey ?? "unknown",
    sourcePageUrl: sourcePageUrl ?? sourceEntry?.officialUrl ?? null,
    imageUrl,
    localPath: localExists ? relativeLocalPath : relativeLocalPath,
    sourceType,
    confidence,
    appearance,
    watermarkOrBranding,
    imageNeedsReview: true,
    recommendation: "unsure",
    status,
    notes,
  };

  record.recommendation = recommendCandidate(record);
  return record;
}

function formatRecordSection(record, index) {
  const lines = [
    `### ${index + 1}. ${record.partName} (\`${record.partId}\`)`,
    "",
    `- **Category:** ${record.category}`,
    `- **Manufacturer/source page URL:** ${record.sourcePageUrl ?? "—"}`,
    `- **Exact image URL downloaded:** ${record.imageUrl ?? "—"}`,
    `- **Local file path:** ${record.localPath ?? "—"}`,
    `- **Status:** ${record.status}`,
    `- **Source type:** ${record.sourceType}`,
    `- **Confidence:** ${record.confidence}`,
    `- **Appears to be:** ${record.appearance}`,
    `- **Watermark / store branding:** ${record.watermarkOrBranding}`,
    `- **imageNeedsReview:** true`,
    `- **Recommendation:** ${record.recommendation}`,
  ];

  if (record.notes) {
    lines.push(`- **Notes:** ${record.notes}`);
  }

  lines.push("");
  return lines.join("\n");
}

export function formatDownloadReportMarkdown(manifest) {
  const downloaded = manifest.candidates.filter(
    (entry) => entry.status === "downloaded",
  );
  const rejected = manifest.candidates.filter(
    (entry) => entry.status !== "downloaded",
  );
  const keep = manifest.candidates.filter(
    (entry) => entry.recommendation === "keep for review",
  ).length;
  const remove = manifest.candidates.filter(
    (entry) => entry.recommendation === "remove",
  ).length;
  const unsure = manifest.candidates.filter(
    (entry) => entry.recommendation === "unsure",
  ).length;

  const lines = [
    "# Preset image download report",
    "",
    "Developer-only review log for manufacturer-source image **candidates**.",
    "",
    "> **Not approved for public use.** Nothing in this report grants image rights.",
    "> Keep `imageNeedsReview: true` and `imageLicense: \"No verified license on file\"` until permission is verified separately.",
    "",
    `Last updated: ${manifest.updatedAt ?? "unknown"}`,
    "",
  ];

  if (manifest.lastCleanup) {
    lines.push(
      `Last local cleanup: ${manifest.lastCleanup.date} — removed ${manifest.lastCleanup.removedPartIds?.length ?? 0} unsure local JPG(s); **${manifest.lastCleanup.retainedDownloadedCount ?? downloaded.length}** retained for review.`,
      "",
    );
  }

  lines.push(
    "## Summary",
    "",
    `- Downloaded local JPG candidates: **${downloaded.length}**`,
    `- Rejected / not saved candidates: **${rejected.length}**`,
    `- Recommendation counts: **${keep} keep for review**, **${unsure} unsure**, **${remove} remove**`,
    "",
    "## Rules applied",
    "",
    "- No entries marked approved.",
    "- Retailer/third-party store images avoided unless explicitly manufacturer-owned.",
    "- No Google Images scraping.",
    "- Watermarked, wrong-format, or clearly unsuitable marketing assets should be removed after manual inspection.",
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

  lines.push("## Rejected or not saved candidates", "");

  if (rejected.length === 0) {
    lines.push("_No rejected candidate URLs recorded yet._", "");
  } else {
    rejected.forEach((record, index) => {
      lines.push(formatRecordSection(record, index));
    });
  }

  lines.push(
    "## Manual review checklist",
    "",
    "1. Open each local JPG and confirm it matches the catalog part (not a stack, drone bundle, or wrong variant).",
    "2. Confirm no watermark, retailer badge, or lifestyle scene with people unless explicitly acceptable.",
    "3. Replace weak candidates with own photos, media-kit assets, or written permission.",
    "4. Do not set `imageNeedsReview` to false without documented license/permission.",
    "",
  );

  return lines.join("\n");
}

export function writeDownloadReport(manifest = loadDownloadManifest()) {
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  writeFileSync(reportPath, formatDownloadReportMarkdown(manifest), "utf8");
}

export function syncDownloadedFilesToManifest(manifest = loadDownloadManifest()) {
  for (const todoEntry of PRESET_PART_IMAGE_TODO) {
    const absolutePath = join(publicRoot, todoEntry.expectedPath.replace(/^\//, ""));

    if (!existsSync(absolutePath)) {
      continue;
    }

    const existing = manifest.candidates.find(
      (entry) => entry.partId === todoEntry.partId && entry.status === "downloaded",
    );

    if (existing?.imageUrl) {
      continue;
    }

    const sourceEntry = sourceByPartId.get(todoEntry.partId);
    upsertCandidate(
      manifest,
      createCandidateRecord({
        partId: todoEntry.partId,
        sourcePageUrl: sourceEntry?.officialUrl ?? null,
        imageUrl: existing?.imageUrl ?? null,
        localPath: absolutePath,
        status: "downloaded",
        detail: existing?.imageUrl
          ? ""
          : "Local JPG exists; exact source image URL not recorded in manifest yet.",
      }),
    );
  }

  return manifest;
}

const isDirectRun =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === join(process.argv[1]);

if (isDirectRun) {
  const manifest = syncDownloadedFilesToManifest(loadDownloadManifest());
  writeDownloadReport(manifest);
  console.log(`Wrote ${reportPath}`);
}
