export const FETCH_TIMEOUT_MS = 20_000;
export const USER_AGENT = "MaidenReadyDevImageFetcher/1.0 (+local developer script)";

export const BLOCKED_HOST_PATTERNS = [
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

export const DISCOURAGED_IMAGE_URL_PATTERNS = [
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

export const MAX_CANDIDATES_PER_PART = 20;

const CONVERTIBLE_FORMATS = new Set(["jpeg", "png", "webp"]);

let sharpModule = null;

export function isBlockedRetailerUrl(urlString) {
  let hostname;

  try {
    hostname = new URL(urlString).hostname.toLowerCase();
  } catch {
    return true;
  }

  return BLOCKED_HOST_PATTERNS.some((pattern) => pattern.test(hostname));
}

export function resolveUrl(baseUrl, candidateUrl) {
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

export function isDiscouragedImageUrl(url) {
  return DISCOURAGED_IMAGE_URL_PATTERNS.some((pattern) => pattern.test(url));
}

export function scoreImageCandidate(url) {
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

  if (lower.includes("inew.foxeer.com")) {
    score += 7;
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

export function rankImageCandidates(urls) {
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

export function extractPageImageCandidates(html, pageUrl) {
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

export async function prepareJpegBuffer(buffer, format) {
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

export async function fetchWithTimeout(url, options = {}) {
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

export async function fetchHtml(pageUrl) {
  const response = await fetchWithTimeout(pageUrl, {
    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for page ${pageUrl}`);
  }

  return response.text();
}

export async function fetchImageBuffer(imageUrl) {
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

export function createReportBucket() {
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

export function printBucket(title, items) {
  console.log(`${title}: ${items.length}`);

  items.forEach((item) => {
    console.log(`  - ${item.partId}: ${item.detail}`);
  });
}
