import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { auditAllPartImages } from "./auditAllPartImages.js";
import { getPartIllustrationRelativePath } from "../src/utils/partIllustrationPath.js";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptDir, "..");
const defaultPublicRoot = join(projectRoot, "public");
const manifestPath = join(projectRoot, "docs/part-illustrations-manifest.json");

const COLORS = {
  bg: "#0d1219",
  bgInner: "#141c28",
  stroke: "#5a6d82",
  accent: "#00e5ff",
  text: "#c5d0dc",
  muted: "#7a8a9c",
  label: "#4d8f9c",
};

function escapeXml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function truncate(value, maxLength) {
  const text = String(value ?? "").trim();

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 1)}…`;
}

function extractMotorKv(partName) {
  const match = String(partName).match(/(\d{3,5})\s*kv/i);
  return match ? `${match[1]}KV` : null;
}

function extractBatteryCells(partName) {
  const match = String(partName).match(/(\d)\s*s\b/i);
  return match ? `${match[1]}S` : null;
}

function wrapLines(text, maxChars, maxLines) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;

    if (candidate.length <= maxChars) {
      current = candidate;
      continue;
    }

    if (current) {
      lines.push(current);
      current = word;
    } else {
      lines.push(truncate(word, maxChars));
      current = "";
    }

    if (lines.length >= maxLines) {
      break;
    }
  }

  if (current && lines.length < maxLines) {
    lines.push(current);
  }

  return lines.slice(0, maxLines);
}

function strokeAttrs(extra = "") {
  return `fill="none" stroke="${COLORS.stroke}" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter"${extra}`;
}

function categoryGraphic(categoryKey, part) {
  const accent = COLORS.accent;
  const s = strokeAttrs();
  const motorKv = extractMotorKv(part.partName);
  const cellCount = extractBatteryCells(part.partName);

  switch (categoryKey) {
    case "frame":
      return `
        <g transform="translate(120 72)">
          <rect x="-14" y="-14" width="28" height="28" ${s} />
          <line x1="0" y1="-14" x2="0" y2="-42" ${s} />
          <line x1="0" y1="14" x2="0" y2="42" ${s} />
          <line x1="-14" y1="0" x2="-42" y2="0" ${s} />
          <line x1="14" y1="0" x2="42" y2="0" ${s} />
          <circle cx="0" cy="-42" r="5" ${s} stroke="${accent}" />
          <circle cx="0" cy="42" r="5" ${s} stroke="${accent}" />
          <circle cx="-42" cy="0" r="5" ${s} stroke="${accent}" />
          <circle cx="42" cy="0" r="5" ${s} stroke="${accent}" />
          <line x1="-8" y1="-8" x2="8" y2="8" ${s} />
          <line x1="8" y1="-8" x2="-8" y2="8" ${s} />
        </g>`;

    case "motors":
      return `
        <g transform="translate(120 72)">
          <circle cx="0" cy="0" r="34" ${s} />
          <circle cx="0" cy="0" r="14" ${s} stroke="${accent}" />
          <circle cx="0" cy="0" r="3" fill="${accent}" stroke="none" />
          <line x1="0" y1="-20" x2="0" y2="-32" ${s} />
          <line x1="0" y1="20" x2="0" y2="32" ${s} />
          <line x1="-20" y1="0" x2="-32" y2="0" ${s} />
          <line x1="20" y1="0" x2="32" y2="0" ${s} />
          <rect x="-5" y="-46" width="10" height="10" ${s} />
          ${
            motorKv
              ? `<text x="0" y="56" text-anchor="middle" fill="${accent}" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="11" font-weight="600">${escapeXml(motorKv)}</text>`
              : ""
          }
        </g>`;

    case "esc":
      return `
        <g transform="translate(120 72)">
          <rect x="-38" y="-24" width="76" height="48" rx="2" ${s} />
          <rect x="-14" y="-8" width="28" height="16" ${s} stroke="${accent}" />
          <rect x="-34" y="-20" width="10" height="10" ${s} />
          <rect x="24" y="-20" width="10" height="10" ${s} />
          <rect x="-34" y="10" width="10" height="10" ${s} />
          <rect x="24" y="10" width="10" height="10" ${s} />
          <text x="0" y="40" text-anchor="middle" fill="${COLORS.muted}" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="9">4-in-1</text>
        </g>`;

    case "flightController":
      return `
        <g transform="translate(120 72)">
          <rect x="-34" y="-26" width="68" height="52" rx="2" ${s} />
          <rect x="-12" y="-6" width="24" height="14" ${s} stroke="${accent}" />
          <rect x="-30" y="-22" width="8" height="8" ${s} />
          <rect x="22" y="-22" width="8" height="8" ${s} />
          <rect x="-30" y="14" width="8" height="8" ${s} />
          <rect x="22" y="14" width="8" height="8" ${s} />
          <rect x="-4" y="-34" width="8" height="8" ${s} />
          <text x="0" y="42" text-anchor="middle" fill="${COLORS.muted}" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="9">FC</text>
        </g>`;

    case "props":
      return `
        <g transform="translate(120 72)">
          <circle cx="0" cy="0" r="6" ${s} stroke="${accent}" />
          <line x1="0" y1="0" x2="0" y2="-36" ${s} />
          <line x1="0" y1="0" x2="31" y2="18" ${s} />
          <line x1="0" y1="0" x2="-31" y2="18" ${s} />
          <line x1="0" y1="-36" x2="-6" y2="-28" ${s} />
          <line x1="0" y1="-36" x2="6" y2="-28" ${s} />
          <line x1="31" y1="18" x2="23" y2="14" ${s} />
          <line x1="31" y1="18" x2="27" y2="26" ${s} />
          <line x1="-31" y1="18" x2="-23" y2="14" ${s} />
          <line x1="-31" y1="18" x2="-27" y2="26" ${s} />
        </g>`;

    case "battery":
      return `
        <g transform="translate(120 72)">
          <rect x="-40" y="-22" width="72" height="44" rx="3" ${s} />
          <rect x="32" y="-10" width="12" height="20" rx="1" fill="none" stroke="${accent}" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter" />
          <line x1="-24" y1="-22" x2="-24" y2="22" ${s} />
          <line x1="-4" y1="-22" x2="-4" y2="22" ${s} />
          <line x1="16" y1="-22" x2="16" y2="22" ${s} />
          <line x1="-34" y1="-6" x2="26" y2="-6" ${s} />
          <line x1="-34" y1="8" x2="26" y2="8" ${s} />
          ${
            cellCount
              ? `<text x="0" y="40" text-anchor="middle" fill="${accent}" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="11" font-weight="600">${escapeXml(cellCount)}</text>`
              : ""
          }
        </g>`;

    case "receiver":
      return `
        <g transform="translate(120 72)">
          <rect x="-28" y="-10" width="44" height="22" rx="2" ${s} />
          <rect x="-20" y="-4" width="12" height="10" ${s} stroke="${accent}" />
          <polyline points="16,-2 24,-2 24,-18 32,-18 32,-2 40,-2" ${s} />
          <line x1="-24" y1="2" x2="8" y2="2" ${s} />
          <line x1="-24" y1="8" x2="4" y2="8" ${s} />
        </g>`;

    case "camera":
      return `
        <g transform="translate(120 72)">
          <rect x="-32" y="-18" width="64" height="36" rx="3" ${s} />
          <circle cx="0" cy="0" r="12" ${s} stroke="${accent}" />
          <circle cx="0" cy="0" r="5" fill="${COLORS.bgInner}" ${s} />
          <rect x="-18" y="-10" width="12" height="8" ${s} />
          <line x1="-32" y1="-4" x2="-40" y2="-4" ${s} />
        </g>`;

    case "vtx":
      return `
        <g transform="translate(120 72)">
          <rect x="-30" y="-14" width="52" height="28" rx="2" ${s} />
          <rect x="-18" y="-6" width="18" height="12" ${s} stroke="${accent}" />
          <line x1="22" y1="0" x2="34" y2="0" ${s} />
          <line x1="34" y1="0" x2="34" y2="-24" ${s} />
          <line x1="34" y1="-24" x2="40" y2="-30" ${s} stroke="${accent}" />
          <line x1="-14" y1="16" x2="10" y2="16" ${s} />
        </g>`;

    default:
      return categoryGraphic("flightController", part);
  }
}

export function buildPartIllustrationSvg(part) {
  const brand = truncate(part.brand ?? "Unknown", 22);
  const nameLines = wrapLines(part.partName ?? part.partId, 26, 2);
  const graphic = categoryGraphic(part.categoryKey, part);

  const nameSvg = nameLines
    .map(
      (line, index) =>
        `<tspan x="120" dy="${index === 0 ? 0 : 14}">${escapeXml(line)}</tspan>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 200" role="img" aria-label="${escapeXml(`${part.partName} illustration`)}">
  <title>${escapeXml(part.partName)} — illustration</title>
  <desc>Generated category illustration, not a manufacturer product photo.</desc>
  <rect width="240" height="200" fill="${COLORS.bg}" rx="8"/>
  <rect x="8" y="8" width="224" height="124" fill="${COLORS.bgInner}" rx="6" stroke="${COLORS.stroke}" stroke-width="1" opacity="0.55"/>
  ${graphic}
  <text x="120" y="152" text-anchor="middle" fill="${COLORS.muted}" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="10" letter-spacing="0.06em">${escapeXml(brand.toUpperCase())}</text>
  <text x="120" y="168" text-anchor="middle" fill="${COLORS.text}" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="11" font-weight="500">${nameSvg}</text>
  <text x="120" y="190" text-anchor="middle" fill="${COLORS.label}" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="9" letter-spacing="0.12em">ILLUSTRATION</text>
</svg>
`;
}

export function generatePartIllustrations({
  publicRoot = defaultPublicRoot,
  force = false,
} = {}) {
  const audit = auditAllPartImages({ publicRoot });
  const generated = [];
  const skippedReal = [];
  const skippedExisting = [];

  for (const entry of audit.checked) {
    if (entry.exists) {
      skippedReal.push(entry.partId);
      continue;
    }

    const relativePath = getPartIllustrationRelativePath(entry.partId, entry.categoryKey);
    const absolutePath = join(publicRoot, relativePath);

    if (!force && existsSync(absolutePath)) {
      skippedExisting.push(entry.partId);
      continue;
    }

    mkdirSync(dirname(absolutePath), { recursive: true });
    writeFileSync(absolutePath, buildPartIllustrationSvg(entry), "utf8");
    generated.push({
      partId: entry.partId,
      categoryKey: entry.categoryKey,
      illustrationPath: `/${relativePath}`,
    });
  }

  const withIllustration = audit.checked.filter((entry) => {
    if (entry.exists) {
      return false;
    }

    const relativePath = getPartIllustrationRelativePath(entry.partId, entry.categoryKey);
    return relativePath && existsSync(join(publicRoot, relativePath));
  });

  const fallbackOnly = audit.checked.filter((entry) => {
    if (entry.exists) {
      return false;
    }

    const relativePath = getPartIllustrationRelativePath(entry.partId, entry.categoryKey);
    return !relativePath || !existsSync(join(publicRoot, relativePath));
  });

  const summary = {
    total: audit.total,
    realProductImages: audit.found,
    generatedIllustrations: withIllustration.length,
    fallbackOnly: fallbackOnly.length,
    visualCoverage: audit.found + withIllustration.length,
    newlyGenerated: generated.length,
    skippedHasRealImage: skippedReal.length,
    skippedExistingIllustration: skippedExisting.length,
  };

  const manifest = {
    generatedAt: new Date().toISOString(),
    summary,
    realProductImagePartIds: audit.foundItems.map((entry) => entry.partId),
    illustrationPartIds: withIllustration.map((entry) => entry.partId),
    generated,
  };

  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  return { audit, manifest, generated, summary };
}

function parseFlags(argv) {
  return { force: argv.includes("--force") };
}

function main() {
  const flags = parseFlags(process.argv.slice(2));
  const { manifest, generated, summary } = generatePartIllustrations({
    force: flags.force,
  });

  console.log("MaidenReady part illustration generator");
  console.log("-------------------------------------");
  console.log(`Newly generated: ${generated.length}`);
  console.log(`Real product images: ${summary.realProductImages}`);
  console.log(`Generated illustrations: ${summary.generatedIllustrations}`);
  console.log(`Fallback only: ${summary.fallbackOnly}`);
  console.log(`Visual coverage: ${summary.visualCoverage}/${summary.total}`);
  console.log(`Wrote ${manifestPath}`);
}

const isDirectRun =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === join(process.argv[1]);

if (isDirectRun) {
  main();
}
