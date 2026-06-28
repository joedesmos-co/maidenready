import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PRESET_PART_IMAGE_TODO } from "../src/data/presetPartImages.js";
import { presetPartImageSources } from "../src/data/presetPartImageSources.js";
import {
  auditPresetImagePaths,
  formatPresetImageAuditReport,
} from "./auditPresetImages.js";
import {
  cleanupDisallowedLocalImages,
  createCandidateRecord,
  loadDownloadManifest,
  saveDownloadManifest,
  upsertCandidate,
  writeDownloadReport,
} from "./presetImageDownloadReport.js";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptDir, "..");
const publicRoot = join(projectRoot, "public");

const FETCH_TIMEOUT_MS = 20_000;
const USER_AGENT = "MaidenReadyDevImageFetcher/1.0 (+local developer script)";

const BLOCKED_HOST_PATTERNS = [
  /(^|\.)amazon\./i,
  /(^|\.)getfpv\.com$/i,
  /(^|\.)racedayquads\.com$/i,
  /(^|\.)aliexpress\.com$/i,
  /(^|\.)banggood\.com$/i,
  /(^|\.)ebay\./i,
  /(^|\.)hobbyking\.com$/i,
  /(^|\.)pyrodrone\.com$/i,
  /(^|\.)rdq\.com$/i,
];

const DISCOURAGED_IMAGE_URL_PATTERNS = [
  /1200x630/i,
  /opengraph\.githubassets/i,
  /imageview2\/1\/w\/100\/h\/100/i,
  /\.images\.100x100\./i,
  /@ultra\.png/i,
  /\/thumb(?:s|nail)?\//i,
  /\/favicon/i,
  /\/logo/i,
  /\/icon/i,
  /social[-_]?share/i,
  /judgeme\.imgix\.net/i,
  /AOS%203\.5%20V5%20\(1\)/i,
  /\/X2\.jpg/i,
  /[_-]x2[_-]/i,
  /%7Bwidth%7D/i,
  /\{width\}/i,
  /_150x150\./i,
  /_180x\./i,
  /[/_-]layout/i,
  /[/_-]wiring/i,
  /matek-m\.jpg/i,
];

const PROACTIVE_SKIP_PART_IDS = new Map([
  ["geprc-cinelog35-v2", "Frame listing shows complete aircraft; no isolated frame packshot expected."],
  ["rekon7-pro-lr", "Frame listing shows complete aircraft; no isolated frame packshot expected."],
  ["geprc-gep-f411-35a-aio-esc", "Manufacturer page is AIO combo; no isolated ESC packshot."],
  ["geprc-gep-f411-35a-aio-fc", "Manufacturer page is AIO combo; no isolated FC packshot."],
  ["speedybee-bls-35a-4in1", "Manufacturer page is FC+ESC stack; no isolated ESC packshot."],
  ["speedybee-f405-mini", "Manufacturer page is FC+ESC stack; no isolated FC packshot."],
  ["speedybee-bl32-50a", "Manufacturer page is FC+ESC stack; no isolated ESC packshot."],
  ["betafpv-1s-5a-aio-esc", "Manufacturer page is AIO combo; no isolated ESC packshot."],
  ["betafpv-f4-1s-aio-fc", "Manufacturer page is AIO combo; no isolated FC packshot."],
  ["speedybee-f405-v4", "Manufacturer page is FC+ESC stack; no isolated FC packshot."],
  ["tbs-source-one-v5", "GitHub project page only exposes social/diagram og:image."],
  ["happymodel-ep2-elrs", "Manufacturer page only exposes a shared EP1/EP2/EP1 Dual comparison image."],
  ["betafpv-2s-450-xt30", "Manufacturer 2pcs listing image shows two batteries for a single-pack catalog line."],
  ["aos-3-5-v5", "Official design page has no isolated frame JPEG; hero assets are lifestyle or unrelated."],
  ["cnhl-black-6s-1300", "Manufacturer listing images include multi-pack X2/X4 promo overlays on store CDN."],
  ["gnb-4s-1500", "No exact 1500mAh official product page; closest gaoneng.shop listing is a different capacity."],
]);

const MAX_CANDIDATES_PER_PART = 20;

const sourceByPartId = new Map(
  presetPartImageSources.map((entry) => [entry.partId, entry]),
);

function parseFlags(argv) {
  return {
    includeLowConfidence: argv.includes("--include-low-confidence"),
    force: argv.includes("--force"),
    all: argv.includes("--all"),
  };
}

function isBlockedRetailerUrl(urlString) {
  let hostname;

  try {
    hostname = new URL(urlString).hostname.toLowerCase();
  } catch {
    return true;
  }

  return BLOCKED_HOST_PATTERNS.some((pattern) => pattern.test(hostname));
}

function resolveUrl(baseUrl, candidateUrl) {
  try {
    return new URL(candidateUrl, baseUrl).href;
  } catch {
    return null;
  }
}

function decodeHtmlEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function extractMetaContent(html, attrName, attrValue) {
  const patterns = [
    new RegExp(
      `<meta[^>]+${attrName}=["']${attrValue}["'][^>]+content=["']([^"']+)["']`,
      "gi",
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+${attrName}=["']${attrValue}["']`,
      "gi",
    ),
  ];

  const values = [];

  for (const pattern of patterns) {
    for (const match of html.matchAll(pattern)) {
      if (match?.[1]) {
        values.push(decodeHtmlEntities(match[1].trim()));
      }
    }
  }

  return values.length > 0 ? values : null;
}

function extractImageSrcLink(html) {
  const match = html.match(
    /<link[^>]+rel=["']image_src["'][^>]+href=["']([^"']+)["']/i,
  );

  return match?.[1] ? decodeHtmlEntities(match[1].trim()) : null;
}

function extractJsonLdImages(html) {
  const images = [];
  const scriptPattern =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

  for (const match of html.matchAll(scriptPattern)) {
    try {
      const parsed = JSON.parse(match[1].trim());
      const nodes = Array.isArray(parsed)
        ? parsed
        : parsed["@graph"]
          ? parsed["@graph"]
          : [parsed];

      for (const node of nodes) {
        if (!node?.image) {
          continue;
        }

        const nodeImages = Array.isArray(node.image) ? node.image : [node.image];

        for (const image of nodeImages) {
          if (typeof image === "string") {
            images.push(image);
          } else if (image?.url) {
            images.push(image.url);
          }
        }
      }
    } catch {
      // Ignore malformed JSON-LD blocks.
    }
  }

  return images;
}

function unescapeEmbeddedJsonUrl(value) {
  try {
    return JSON.parse(`"${value}"`);
  } catch {
    return value.replaceAll("\\/", "/");
  }
}

function extractEmbeddedJsonImageUrls(html) {
  const urls = [];
  const rasterPattern = String.raw`(?:jpe?g|png|webp)`;

  for (const match of html.matchAll(
    new RegExp(`"url"\\s*:\\s*"(https?:\\\\/\\\\/[^"]+\\.${rasterPattern}[^"]*)"`, "gi"),
  )) {
    urls.push(unescapeEmbeddedJsonUrl(match[1]));
  }

  for (const match of html.matchAll(
    new RegExp(`"url"\\s*:\\s*"(https?:\\/\\/[^"]+\\.${rasterPattern}[^"]*)"`, "gi"),
  )) {
    urls.push(match[1]);
  }

  for (const match of html.matchAll(
    new RegExp(`"src"\\s*:\\s*"(\\\\/\\\\/[^"]+\\.${rasterPattern}[^"]*)"`, "gi"),
  )) {
    urls.push(unescapeEmbeddedJsonUrl(match[1]));
  }

  return urls;
}

function extractHtmlImageUrls(html) {
  const urls = new Set();
  const absolutePattern =
    /https?:\/\/[^"'\s>]+\.(?:jpe?g|png|webp)(?:\?[^"'\s>]*)?/gi;
  const protocolRelativePattern =
    /\/\/[^"'\s>]+\.(?:jpe?g|png|webp)(?:\?[^"'\s>]*)?/gi;

  for (const match of html.matchAll(absolutePattern)) {
    urls.add(match[0]);
  }

  for (const match of html.matchAll(protocolRelativePattern)) {
    urls.add(`https:${match[0]}`);
  }

  return [...urls];
}

function isDiscouragedImageUrl(url) {
  return DISCOURAGED_IMAGE_URL_PATTERNS.some((pattern) => pattern.test(url));
}

function scoreImageCandidate(url) {
  let score = 0;
  const lower = url.toLowerCase();

  if (/\.(?:jpe?g|png|webp)(?:\?|$)/i.test(url)) {
    score += 12;
  }

  if (lower.includes("/cdn/shop/products/")) {
    score += 10;
  }

  if (lower.includes("/cdn/shop/files/")) {
    score += 9;
  }

  if (lower.includes("wp-content/uploads")) {
    score += 9;
  }

  if (lower.includes("/u_file/")) {
    score += 9;
  }

  if (lower.includes("bigcommerce.com") && lower.includes("/products/")) {
    score += 8;
  }

  if (lower.includes("/products/") && lower.includes(".jpg")) {
    score += 6;
  }

  if (lower.includes("img03.71360.com")) {
    score += 7;
  }

  if (lower.includes("static.wixstatic.com")) {
    score += 8;
  }

  if (lower.includes("1200x630")) {
    score -= 30;
  }

  if (lower.includes(".webp")) {
    score -= 2;
  }

  if (lower.includes(".png")) {
    score -= 1;
  }

  if (lower.includes("thumb")) {
    score -= 12;
  }

  if (lower.includes("layout") || lower.includes("wiring")) {
    score -= 20;
  }

  if (lower.includes("matek-m.jpg")) {
    score -= 25;
  }

  if (lower.includes("_150x150") || lower.includes("{width}")) {
    score -= 18;
  }

  if (lower.includes("_1200x1200")) {
    score += 4;
  }

  return score;
}

function rankImageCandidates(urls) {
  return [...new Set(urls)].sort(
    (left, right) => scoreImageCandidate(right) - scoreImageCandidate(left),
  );
}

function flattenMetaValues(value) {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

function extractPageImageCandidates(html, pageUrl) {
  const metaCandidates = [
    ...flattenMetaValues(extractMetaContent(html, "property", "og:image")),
    ...flattenMetaValues(extractMetaContent(html, "property", "og:image:url")),
    ...flattenMetaValues(
      extractMetaContent(html, "property", "og:image:secure_url"),
    ),
    ...flattenMetaValues(extractMetaContent(html, "name", "twitter:image")),
    ...flattenMetaValues(extractMetaContent(html, "name", "twitter:image:src")),
    extractImageSrcLink(html),
  ].filter(Boolean);

  const galleryCandidates = [
    ...extractEmbeddedJsonImageUrls(html),
    ...extractJsonLdImages(html),
    ...extractHtmlImageUrls(html),
  ];

  const combined = [...galleryCandidates, ...metaCandidates]
    .map((candidate) => resolveUrl(pageUrl, candidate))
    .filter(Boolean)
    .filter((candidate) => /\.(?:jpe?g|png|webp)(?:\?|$)/i.test(candidate))
    .filter((candidate) => !isDiscouragedImageUrl(candidate))
    .filter((candidate) => !isBlockedRetailerUrl(candidate));

  return rankImageCandidates(combined);
}

function detectImageFormat(buffer) {
  if (!buffer || buffer.length < 12) {
    return "unknown";
  }

  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "jpeg";
  }

  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return "png";
  }

  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
    return "gif";
  }

  if (
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return "webp";
  }

  return "unknown";
}

function formatFromContentType(contentType) {
  if (!contentType) {
    return "unknown";
  }

  const normalized = contentType.split(";")[0].trim().toLowerCase();

  if (normalized === "image/jpeg" || normalized === "image/jpg") {
    return "jpeg";
  }

  if (normalized === "image/png") {
    return "png";
  }

  if (normalized === "image/webp") {
    return "webp";
  }

  if (normalized === "image/gif") {
    return "gif";
  }

  return "unknown";
}

const CONVERTIBLE_FORMATS = new Set(["jpeg", "png", "webp"]);

let sharpModule = null;

async function getSharp() {
  if (!sharpModule) {
    sharpModule = (await import("sharp")).default;
  }

  return sharpModule;
}

async function convertRasterToJpeg(buffer, sourceFormat) {
  const sharp = await getSharp();

  return sharp(buffer, sourceFormat === "webp" ? { animated: false } : undefined)
    .flatten({ background: "#ffffff" })
    .jpeg({ quality: 90, mozjpeg: true })
    .toBuffer();
}

async function prepareJpegBuffer(buffer, format) {
  if (format === "jpeg") {
    return { jpegBuffer: buffer, convertedFrom: null };
  }

  if (format === "png" || format === "webp") {
    return {
      jpegBuffer: await convertRasterToJpeg(buffer, format),
      convertedFrom: format,
    };
  }

  throw new Error(`Unsupported ${format} format`);
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "User-Agent": USER_AGENT,
        Accept: options.accept ?? "*/*",
        ...(options.headers ?? {}),
      },
      redirect: "follow",
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchHtml(pageUrl) {
  const response = await fetchWithTimeout(pageUrl, {
    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for page ${pageUrl}`);
  }

  return response.text();
}

async function fetchImageBuffer(imageUrl) {
  const response = await fetchWithTimeout(imageUrl, {
    accept:
      "image/avif,image/webp,image/apng,image/png,image/jpeg,image/*,*/*;q=0.8",
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for image ${imageUrl}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const headerFormat = detectImageFormat(buffer);
  const contentTypeFormat = formatFromContentType(
    response.headers.get("content-type"),
  );
  const format = headerFormat !== "unknown" ? headerFormat : contentTypeFormat;

  if (!CONVERTIBLE_FORMATS.has(format)) {
    throw new Error(`Unsupported ${format} format for ${imageUrl}`);
  }

  return {
    buffer,
    format,
    contentType: response.headers.get("content-type"),
  };
}

function ensureDirectory(filePath) {
  mkdirSync(dirname(filePath), { recursive: true });
}

function toPublicAbsolutePath(expectedPath) {
  return join(publicRoot, expectedPath.replace(/^\//, ""));
}

function createReportBucket() {
  return {
    downloaded: [],
    converted: [],
    skippedExisting: [],
    skippedLowConfidence: [],
    skippedProactive: [],
    noOfficialUrl: [],
    blockedRetailer: [],
    noImageFound: [],
    unsupportedFormat: [],
    failedDownload: [],
    removedAfterReview: [],
  };
}

function printBucket(title, items) {
  console.log(`${title}: ${items.length}`);

  items.forEach((item) => {
    console.log(`  - ${item.partId}: ${item.detail}`);
  });
}

async function processPart(todoEntry, flags, report, manifest) {
  const source = sourceByPartId.get(todoEntry.partId);
  const absolutePath = toPublicAbsolutePath(todoEntry.expectedPath);

  if (existsSync(absolutePath) && !flags.force) {
    report.skippedExisting.push({
      partId: todoEntry.partId,
      detail: todoEntry.expectedPath,
    });

    const existingDownload = manifest.candidates.find(
      (entry) =>
        entry.partId === todoEntry.partId && entry.status === "downloaded",
    );

    if (existingDownload) {
      upsertCandidate(manifest, existingDownload);
    } else {
      upsertCandidate(
        manifest,
        createCandidateRecord({
          partId: todoEntry.partId,
          sourcePageUrl: source?.officialUrl ?? null,
          imageUrl: null,
          localPath: absolutePath,
          status: "downloaded",
          detail:
            "Local JPG already present; exact image URL not captured on this run.",
        }),
      );
    }

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
        imageUrl: null,
        status: "skipped",
        detail: proactiveSkipReason,
      }),
    );
    return;
  }

  if (!source?.officialUrl) {
    report.noOfficialUrl.push({
      partId: todoEntry.partId,
      detail: "No officialUrl in presetPartImageSources.js",
    });
    return;
  }

  if (source.urlConfidence === "low" && !flags.includeLowConfidence) {
    report.skippedLowConfidence.push({
      partId: todoEntry.partId,
      detail: source.officialUrl,
    });

    upsertCandidate(
      manifest,
      createCandidateRecord({
        partId: todoEntry.partId,
        sourcePageUrl: source.officialUrl,
        imageUrl: null,
        status: "skipped",
        detail: "Skipped low-confidence source URL (use --include-low-confidence).",
      }),
    );
    return;
  }

  if (isBlockedRetailerUrl(source.officialUrl)) {
    report.blockedRetailer.push({
      partId: todoEntry.partId,
      detail: source.officialUrl,
    });

    upsertCandidate(
      manifest,
      createCandidateRecord({
        partId: todoEntry.partId,
        sourcePageUrl: source.officialUrl,
        imageUrl: null,
        status: "rejected",
        detail: "Blocked third-party retailer source page.",
      }),
    );
    return;
  }

  let html;

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
        imageUrl: null,
        status: "failed",
        detail: error.message,
      }),
    );
    return;
  }

  const candidates = extractPageImageCandidates(html, source.officialUrl).slice(
    0,
    MAX_CANDIDATES_PER_PART,
  );

  if (candidates.length === 0) {
    report.noImageFound.push({
      partId: todoEntry.partId,
      detail: source.officialUrl,
    });

    upsertCandidate(
      manifest,
      createCandidateRecord({
        partId: todoEntry.partId,
        sourcePageUrl: source.officialUrl,
        imageUrl: null,
        status: "failed",
        detail: "No manufacturer-owned image candidates found on page.",
      }),
    );
    return;
  }

  let recordedUnsupported = false;

  let sawCandidateAttempt = false;

  for (const imageUrl of candidates) {
    if (isBlockedRetailerUrl(imageUrl)) {
      continue;
    }

    sawCandidateAttempt = true;

    try {
      const { buffer, format } = await fetchImageBuffer(imageUrl);
      const { jpegBuffer, convertedFrom } = await prepareJpegBuffer(buffer, format);

      ensureDirectory(absolutePath);
      writeFileSync(absolutePath, jpegBuffer);

      const conversionNote = convertedFrom
        ? ` (converted ${convertedFrom.toUpperCase()} → JPG via sharp)`
        : "";
      const detail = `${todoEntry.expectedPath} <= ${imageUrl}${conversionNote}`;

      if (convertedFrom) {
        report.converted.push({
          partId: todoEntry.partId,
          detail,
        });
      }

      report.downloaded.push({
        partId: todoEntry.partId,
        detail,
      });

      upsertCandidate(
        manifest,
        createCandidateRecord({
          partId: todoEntry.partId,
          sourcePageUrl: source.officialUrl,
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
      if (
        error.message.includes("Unsupported") &&
        !error.message.includes("sharp")
      ) {
        report.unsupportedFormat.push({
          partId: todoEntry.partId,
          detail: `${error.message} (${imageUrl})`,
        });

        if (!recordedUnsupported) {
          upsertCandidate(
            manifest,
            createCandidateRecord({
              partId: todoEntry.partId,
              sourcePageUrl: source.officialUrl,
              imageUrl,
              status: "rejected",
              detail: error.message,
            }),
          );
          recordedUnsupported = true;
        }

        continue;
      }

      report.failedDownload.push({
        partId: todoEntry.partId,
        detail: `Image fetch failed (${imageUrl}): ${error.message}`,
      });

      upsertCandidate(
        manifest,
        createCandidateRecord({
          partId: todoEntry.partId,
          sourcePageUrl: source.officialUrl,
          imageUrl,
          status: "failed",
          detail: error.message,
        }),
      );
    }
  }

  const partDownloaded = report.downloaded.some(
    (entry) => entry.partId === todoEntry.partId,
  );
  const partUnsupported = report.unsupportedFormat.some(
    (entry) => entry.partId === todoEntry.partId,
  );
  const partFailed = report.failedDownload.some(
    (entry) => entry.partId === todoEntry.partId,
  );

  if (!partDownloaded && !partUnsupported && !partFailed && !sawCandidateAttempt) {
    report.noImageFound.push({
      partId: todoEntry.partId,
      detail: `${source.officialUrl} (image URLs blocked or missing)`,
    });
  } else if (!partDownloaded && !partUnsupported && !partFailed && sawCandidateAttempt) {
    report.noImageFound.push({
      partId: todoEntry.partId,
      detail: source.officialUrl,
    });

    upsertCandidate(
      manifest,
      createCandidateRecord({
        partId: todoEntry.partId,
        sourcePageUrl: source.officialUrl,
        imageUrl: null,
        status: "failed",
        detail: "Candidate URLs found but none produced a saved JPG.",
      }),
    );
  }
}

export async function fetchPresetImageCandidates(options = {}) {
  const flags = {
    includeLowConfidence: false,
    force: false,
    all: false,
    ...options,
  };
  const report = createReportBucket();
  const manifest = loadDownloadManifest();
  const auditReport = auditPresetImagePaths(PRESET_PART_IMAGE_TODO, {
    publicRoot,
  });
  const missingPartIds = new Set(
    auditReport.missingItems.map((entry) => entry.partId),
  );

  const todoEntries = flags.all
    ? PRESET_PART_IMAGE_TODO
    : PRESET_PART_IMAGE_TODO.filter((entry) => missingPartIds.has(entry.partId));

  for (const todoEntry of todoEntries) {
    await processPart(todoEntry, flags, report, manifest);
  }

  saveDownloadManifest(manifest);

  const { removedPartIds } = cleanupDisallowedLocalImages(manifest);
  report.removedAfterReview = removedPartIds.map((partId) => ({
    partId,
    detail: "Removed after recommendation review (remove/unsure).",
  }));

  saveDownloadManifest(manifest);
  writeDownloadReport(manifest);

  return { report, manifest, auditReport };
}

function printReport(report) {
  console.log("MaidenReady preset image candidate fetch");
  console.log("---------------------------------------");
  console.log(
    "Developer-only: downloads manufacturer-page candidates for local review.",
  );
  console.log("These files are NOT approved for public use automatically.");
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
  printBucket("Unsupported format", report.unsupportedFormat);
  printBucket("Failed download", report.failedDownload);

  const auditReport = auditPresetImagePaths(PRESET_PART_IMAGE_TODO, {
    publicRoot,
  });

  console.log("");
  console.log(formatPresetImageAuditReport(auditReport));
  console.log("");
  console.log(`Total found after fetch: ${auditReport.found}/${auditReport.total}`);
}

async function main() {
  const flags = parseFlags(process.argv);
  const { report } = await fetchPresetImageCandidates(flags);
  printReport(report);
  console.log("");
  console.log("Download review report: docs/PRESET_IMAGE_DOWNLOAD_REPORT.md");
}

const isDirectRun =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === join(process.argv[1]);

if (isDirectRun) {
  main().catch((error) => {
    console.error("[MaidenReady] fetchPresetImages failed:", error);
    process.exitCode = 1;
  });
}
