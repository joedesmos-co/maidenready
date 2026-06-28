import { existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { fiveInchPartImageSources } from "../src/data/fiveInchPartImageSources.js";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptDir, "..");
const publicRoot = join(projectRoot, "public");
const manifestPath = join(projectRoot, "docs/five-inch-image-download-manifest.json");
const reportPath = join(projectRoot, "docs/FIVE_INCH_IMAGE_DOWNLOAD_REPORT.md");

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
  "rotorriot.com",
  "getlumenier.com",
  "lumenier.com",
  "holybro.com",
  "store.tmotor.com",
  "tmotor.com",
  "hobbywing.com",
  "shop.aikon.com",
  "diatone.us",
  "ethixrc.com",
  "flywoo.net",
  "fpvcycle.com",
  "rcinpower.com",
  "emaxmodel.com",
  "axisflying.com",
  "hdzero.com",
  "immersionrc.com",
  "walksnail.com",
  "hglrc.com",
  "jhemcu.com",
  "atomrc.com",
  "mepsking.com",
  "samgukfpv.com",
];

const FIVE_INCH_PART_TODO = fiveInchPartImageSources.map((entry) => ({
  partId: entry.partId,
  expectedPath: entry.expectedImagePath,
  categoryKey: entry.categoryKey,
}));

const sourceByPartId = new Map(
  fiveInchPartImageSources.map((entry) => [entry.partId, entry]),
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
    pageHost.includes("brotherhobby.com") ||
    pageHost.includes("armattan") ||
    pageHost.includes("impulserc.com") ||
    pageHost.includes("rushfpv.com") ||
    pageHost.includes("inew.foxeer.com") ||
    imageHost.includes("wixstatic.com")
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

  if (/\blogo\b/i.test(haystack)) {
    return "logo";
  }

  if (
    haystack.includes("1200x630") ||
    haystack.includes("social") ||
    haystack.includes("cover/") ||
    haystack.includes("@ultra.png") ||
    haystack.includes("aos%203.5%20v5%20(1)")
  ) {
    return "lifestyle photo";
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
    haystack.includes("layout") ||
    haystack.includes("wiring") ||
    haystack.includes("matek-m.jpg")
  ) {
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
    partId,
  } = record;

  if (status === "rejected" || status === "failed" || status === "skipped") {
    return "remove";
  }

  if (sourceType === "retailer") {
    return "remove";
  }

  if (
    /\bwatermark(ed)?\b/i.test(watermarkOrBranding) &&
    !/\bno (obvious )?watermark/i.test(watermarkOrBranding)
  ) {
    return "remove";
  }

  if (watermarkOrBranding.toLowerCase().includes("third-party store")) {
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

  if (
    notes?.includes("combined AIO") ||
    notes?.includes("Same source image") ||
    notes?.includes("Stack marketing photo") ||
    notes?.includes("complete aircraft") ||
    notes?.includes("full-drone") ||
    notes?.includes("complete drone")
  ) {
    return "remove";
  }

  if (confidence === "low" && status !== "downloaded") {
    return "remove";
  }

  if (confidence === "low" && status === "downloaded") {
    return "remove";
  }

  if (MANUAL_REJECT_DOWNLOADED_PART_IDS.has(partId) && status === "downloaded") {
    return "remove";
  }

  const stackOrAioPartIds = new Set([
    "geprc-gep-f411-35a-aio-esc",
    "geprc-gep-f411-35a-aio-fc",
    "speedybee-bls-35a-4in1",
    "speedybee-f405-mini",
    "speedybee-bl32-50a",
    "speedybee-f405-v4",
    "betafpv-1s-5a-aio-esc",
    "betafpv-f4-1s-aio-fc",
  ]);

  const fullDroneFramePartIds = new Set([
    "geprc-cinelog35-v2",
    "rekon7-pro-lr",
  ]);

  const promoOrSharedImagePartIds = new Set([
    "cnhl-black-6s-1300",
    "cnhl-4s-1500-freestyle",
    "betafpv-2s-450-xt30",
    "happymodel-ep2-elrs",
    "aos-3-5-v5",
    "aos-5-v5",
  ]);

  const stackEscOrFcOnlyPartIds = new Set([
    "speedybee-bl32-55a-4in1",
    "diatone-mamba-f722-s-fc",
    "speedybee-f7-v3-fc",
  ]);

  const fullDroneFramePartIdsFiveInch = new Set([
    "geprc-cinelog35-v2",
    "rekon7-pro-lr",
    "iflight-nazgul-eco5-frame",
  ]);

  if (
    stackOrAioPartIds.has(partId) ||
    fullDroneFramePartIds.has(partId) ||
    fullDroneFramePartIdsFiveInch.has(partId) ||
    stackEscOrFcOnlyPartIds.has(partId) ||
    promoOrSharedImagePartIds.has(partId)
  ) {
    return "remove";
  }

  if (status === "downloaded") {
    return "keep for review";
  }

  return "remove";
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
  const todoEntry = FIVE_INCH_PART_TODO.find((entry) => entry.partId === partId);
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
    (entry) => entry.status === "downloaded" && localFileExists(entry.localPath),
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
    "# 5-inch freestyle image download report",
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

export function compactDownloadManifest(manifest = loadDownloadManifest()) {
  const grouped = new Map();

  for (const entry of manifest.candidates) {
    const existing = grouped.get(entry.partId) ?? {
      downloaded: null,
      removedLocal: null,
      others: [],
    };

    if (entry.status === "downloaded") {
      if (
        !existing.downloaded ||
        scoreManifestEntry(entry) > scoreManifestEntry(existing.downloaded)
      ) {
        existing.downloaded = entry;
      }
    } else if (entry.status === "removed_local") {
      if (
        !existing.removedLocal ||
        scoreManifestEntry(entry) > scoreManifestEntry(existing.removedLocal)
      ) {
        existing.removedLocal = entry;
      }
    } else {
      existing.others.push(entry);
    }

    grouped.set(entry.partId, existing);
  }

  const compacted = [];

  for (const [partId, bucket] of grouped.entries()) {
    if (bucket.downloaded) {
      compacted.push(bucket.downloaded);
    } else if (bucket.removedLocal) {
      compacted.push(bucket.removedLocal);
    }

    const latestOther = bucket.others
      .sort((left, right) =>
        (right.notes?.length ?? 0) - (left.notes?.length ?? 0),
      )
      .slice(0, 3);

    compacted.push(...latestOther);
  }

  manifest.candidates = compacted.sort((left, right) =>
    left.partId.localeCompare(right.partId),
  );

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

const MANUAL_REJECT_DOWNLOADED_PART_IDS = new Set([
  "armattan-badger5-frame",
  "cnhl-6s-1500-freestyle",
  "diatone-mamba-f722",
  "ethix-p3-peanut-butter",
  "foxeer-f722-v4",
  "foxeer-falkor-2",
  "foxeer-h743-f722-fc",
  "foxeer-predator-v5",
  "foxeer-reaper-f4-65a",
  "foxeer-toothless-2",
  "geprc-mark4-frame",
  "happymodel-ep2-5inch-elrs",
  "hdzero-nano-90",
  "hypetrain-blaster-2450",
  "lumenier-qav-s-johnnyfpv",
  "walksnail-avatar-gt-vtx",
]);

const MANUAL_REJECTION_NOTES = new Map([
  [
    "matek-f405-se-fc",
    "Rejected after manual review: manufacturer spec-sheet composite, not an isolated FC packshot.",
  ],
  [
    "matek-f722-mini",
    "Rejected after manual review: manufacturer spec-sheet composite, not an isolated FC packshot.",
  ],
  [
    "matek-f722-std-fc",
    "Rejected after manual review: manufacturer spec-sheet composite, not an isolated FC packshot.",
  ],
  [
    "matek-h743-slate-freestyle",
    "Rejected after manual review: H743-SLIM-V4 spec-sheet composite; wrong variant for Slate Freestyle SKU.",
  ],
  [
    "foxeer-h743-f722-fc",
    "Rejected after manual review: downloaded image appears to be a VTX/heatsink product, not the H743 F722 FC SKU.",
  ],
  [
    "foxeer-f722-v4",
    "Rejected after manual review: page scrape saved a generic support icon, not the F722 V4 flight controller.",
  ],
  [
    "foxeer-reaper-f4-65a",
    "Rejected after manual review: page scrape saved a generic support icon, not the Reaper F4 65A ESC.",
  ],
  [
    "foxeer-toothless-2",
    "Rejected after manual review: page scrape saved a generic support icon, not the Toothless 2 camera.",
  ],
  [
    "foxeer-falkor-2",
    "Rejected after manual review: image shows a Foxeer VTX/heatsink module, not the Falkor 2 camera SKU.",
  ],
  [
    "foxeer-predator-v5",
    "Rejected after manual review: image shows a video-switch PCB accessory, not the Predator V5 camera.",
  ],
  [
    "diatone-mamba-f722",
    "Rejected after manual review: FC+O3 VTX/camera marketing composite, not an isolated Mamba F722 FC.",
  ],
  [
    "armattan-badger5-frame",
    "Rejected after manual review: source asset filename references Badger 6-inch frame, not Badger 5 SKU.",
  ],
  [
    "geprc-mark4-frame",
    "Rejected after manual review: partial build with motors and camera installed, not an isolated frame SKU.",
  ],
  [
    "lumenier-qav-s-johnnyfpv",
    "Rejected after manual review: image labels QAV-S 2 JohnnyFPV Edition, not the QAV-S JohnnyFPV SE catalog line.",
  ],
  [
    "hypetrain-blaster-2450",
    "Rejected after manual review: image is a Gemfan propeller, not the Hypetrain Blaster motor.",
  ],
  [
    "hdzero-nano-90",
    "Rejected after manual review: manufacturer logo graphic only, not the HDZero Nano 90 camera product.",
  ],
  [
    "hqprop-5x4-5x3-v1s",
    "Rejected after manual review: prop labeled 7x3.5x3, not the 5x4.5x3 V1S catalog SKU.",
  ],
  [
    "happymodel-ep2-5inch-elrs",
    "Rejected after manual review: composite lineup of multiple receivers, not an isolated EP2 5-inch SKU.",
  ],
  [
    "ethix-p3-peanut-butter",
    "Rejected after manual review: heavy Ethix/HQProp marketing logo overlay on prop packshot.",
  ],
  [
    "cnhl-6s-1500-freestyle",
    "Rejected after manual review: 130C two-pack promo image; catalog line is single 6S 1500mAh 100C.",
  ],
  [
    "ethix-s3-5050",
    "Rejected after manual review: low-confidence source; image shows HQProp R29 prop, not Ethix S3 5x5x3.",
  ],
  [
    "fpvcycle-2207-1780kv",
    "Rejected after manual review: low-confidence source; image has FPV Cycle watermark on motor bell crop.",
  ],
  [
    "fpvcycle-2207-1960",
    "Rejected after manual review: low-confidence source; image has FPV Cycle watermark on motor bell crop.",
  ],
  [
    "hypetrain-acer-2306-1950kv",
    "Rejected after manual review: low-confidence source; image shows Hypetrain Revo 5 1860KV motor, wrong SKU.",
  ],
  [
    "johnnyfpv-motor-v2-2207-1960kv",
    "Rejected after manual review: low-confidence source; image shows Lumenier 2307 1750KV V3 motor, wrong SKU.",
  ],
  [
    "lumenier-2207-1800kv",
    "Rejected after manual review: low-confidence source; image shows Lumenier ZIP V2 3115 900KV motor, wrong SKU.",
  ],
  [
    "brotherhobby-avenger-2507-1850",
    "Rejected after manual review: low-confidence source; image shows Avenger V3 2812 motor, wrong variant.",
  ],
  [
    "brotherhobby-returner-r6-2207-1850kv",
    "Rejected after manual review: low-confidence source; thumbnail product image retained without verified match.",
  ],
  [
    "emax-eco-ii-2207-1900kv",
    "Rejected after manual review: low-confidence source URL metadata; removed per cleanup policy.",
  ],
  [
    "emax-eco-ii-2306-1900",
    "Rejected after manual review: low-confidence source URL metadata; removed per cleanup policy.",
  ],
  [
    "frsky-r-xsr",
    "Rejected after manual review: low-confidence source; graphic icon placeholder, not a product photo.",
  ],
  [
    "frsky-xsr-sbus",
    "Rejected after manual review: low-confidence source; graphic icon placeholder, not a product photo.",
  ],
  [
    "gemfan-5152",
    "Rejected after manual review: low-confidence source; removed per cleanup policy.",
  ],
  [
    "gemfan-hurricane-mck-51433",
    "Rejected after manual review: low-confidence source; multi-color lineup from wrong prop page.",
  ],
  [
    "meps-konvex-f55-55a-4in1",
    "Rejected after manual review: low-confidence source; homepage NEW UPDATE banner, not ESC product photo.",
  ],
  [
    "meps-konvex-g2-50a",
    "Rejected after manual review: low-confidence source; homepage NEW UPDATE banner, not ESC product photo.",
  ],
  [
    "walksnail-avatar-micro",
    "Rejected after manual review: low-confidence source; generic camera render from V2 page, not Micro SKU.",
  ],
]);

export function reconcileMissingLocalDownloads(manifest = loadDownloadManifest()) {
  for (const entry of manifest.candidates) {
    if (entry.status !== "downloaded" || !entry.localPath) {
      continue;
    }

    if (localFileExists(entry.localPath)) {
      continue;
    }

    entry.status = "removed_local";
    entry.recommendation = "remove";

    const manualNote = MANUAL_REJECTION_NOTES.get(entry.partId);
    const notes = [entry.notes, manualNote, "Local JPG missing on disk during report sync."]
      .filter(Boolean)
      .join(" ");

    entry.notes = notes;
  }

  manifest.updatedAt = new Date().toISOString();
  return manifest;
}

function scoreManifestEntry(entry) {
  return (
    (entry.imageUrl ? 4 : 0) +
    (entry.confidence === "high" ? 3 : entry.confidence === "medium" ? 2 : 1) +
    (entry.sourceType === "manufacturer page" ? 2 : 0)
  );
}

export function writeDownloadReport(manifest = loadDownloadManifest()) {
  const reconciled = reconcileMissingLocalDownloads({
    ...manifest,
    candidates: [...manifest.candidates],
  });
  const compacted = compactDownloadManifest({
    ...reconciled,
    candidates: [...reconciled.candidates],
  });
  writeFileSync(manifestPath, `${JSON.stringify(compacted, null, 2)}\n`, "utf8");
  writeFileSync(reportPath, formatDownloadReportMarkdown(compacted), "utf8");
  return compacted;
}

export function syncDownloadedFilesToManifest(manifest = loadDownloadManifest()) {
  for (const todoEntry of FIVE_INCH_PART_TODO) {
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

function pickBestDownloadedCandidate(manifest, partId) {
  const candidates = manifest.candidates.filter(
    (entry) =>
      entry.partId === partId &&
      entry.imageUrl &&
      (entry.status === "downloaded" || entry.status === "removed_local"),
  );

  if (candidates.length === 0) {
    return null;
  }

  return candidates.sort((left, right) => {
    const leftScore =
      (left.status === "downloaded" ? 4 : 0) +
      (left.confidence === "high" ? 3 : left.confidence === "medium" ? 2 : 1) +
      (left.sourceType === "manufacturer page" ? 2 : 0);
    const rightScore =
      (right.status === "downloaded" ? 4 : 0) +
      (right.confidence === "high" ? 3 : right.confidence === "medium" ? 2 : 1) +
      (right.sourceType === "manufacturer page" ? 2 : 0);

    return rightScore - leftScore;
  })[0];
}

export function cleanupDisallowedLocalImages(manifest = loadDownloadManifest()) {
  const removedPartIds = [];

  for (const todoEntry of FIVE_INCH_PART_TODO) {
    const relativePath = todoEntry.expectedPath.replace(/^\//, "");
    const absolutePath = join(publicRoot, relativePath);

    if (!existsSync(absolutePath)) {
      continue;
    }

    const sourceEntry = sourceByPartId.get(todoEntry.partId);
    let downloadedEntry = pickBestDownloadedCandidate(manifest, todoEntry.partId);

    if (!downloadedEntry) {
      downloadedEntry = createCandidateRecord({
        partId: todoEntry.partId,
        sourcePageUrl: sourceEntry?.officialUrl ?? null,
        imageUrl: null,
        localPath: absolutePath,
        status: "downloaded",
        detail: "Local JPG present; re-evaluating recommendation before retention.",
      });
      upsertCandidate(manifest, downloadedEntry);
    } else {
      downloadedEntry.status = "downloaded";
      if (sourceEntry?.urlConfidence) {
        downloadedEntry.confidence =
          sourceEntry.urlConfidence === "low" ? "low" : "high";
      }
      downloadedEntry.recommendation = recommendCandidate(downloadedEntry);
    }

    if (
      downloadedEntry.recommendation === "remove" ||
      downloadedEntry.recommendation === "unsure"
    ) {
      unlinkSync(absolutePath);
      downloadedEntry.status = "removed_local";
      downloadedEntry.recommendation = "remove";
      const manualNote = MANUAL_REJECTION_NOTES.get(todoEntry.partId);
      if (manualNote) {
        downloadedEntry.notes = [downloadedEntry.notes, manualNote]
          .filter(Boolean)
          .join(" ");
      }
      removedPartIds.push(todoEntry.partId);
    }
  }

  const retainedDownloadedCount = manifest.candidates.filter(
    (entry) =>
      entry.status === "downloaded" &&
      entry.recommendation === "keep for review",
  ).length;

  manifest.lastCleanup = {
    date: new Date().toISOString(),
    removedPartIds,
    retainedDownloadedCount,
  };
  manifest.updatedAt = new Date().toISOString();

  return { manifest, removedPartIds, retainedDownloadedCount };
}

const isDirectRun =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === join(process.argv[1]);

if (isDirectRun) {
  const manifest = syncDownloadedFilesToManifest(loadDownloadManifest());
  reconcileMissingLocalDownloads(manifest);
  const { removedPartIds } = cleanupDisallowedLocalImages(manifest);
  writeDownloadReport(manifest);
  console.log(`Wrote ${reportPath}`);
  if (removedPartIds.length > 0) {
    console.log(`Removed ${removedPartIds.length} disallowed local JPG(s): ${removedPartIds.join(", ")}`);
  }
}
