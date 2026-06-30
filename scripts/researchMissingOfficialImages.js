/**
 * Research official manufacturer pages for missing-image queue entries.
 * Updates source files with preferredImageUrl when a clean packshot is found.
 * Does not download images.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildImageCompletionQueue } from "./generateImageCompletionQueue.js";
import {
  extractPageImageCandidates,
  fetchHtml,
  isBlockedRetailerUrl,
  isDiscouragedImageUrl,
  scoreImageCandidate,
} from "./imageFetchCore.js";
import { fiveInchPartImageSources } from "../src/data/fiveInchPartImageSources.js";
import { presetPartImageSources } from "../src/data/presetPartImageSources.js";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptDir, "..");
const researchJsonPath = join(projectRoot, "docs/image-research-results.json");

const SOURCE_FILES = [
  join(projectRoot, "src/data/supplementalPartImageSources.js"),
  join(projectRoot, "src/data/presetPartImageSources.js"),
  join(projectRoot, "src/data/fiveInchPartImageSources.js"),
];

const FRAME_REJECT =
  /withsmo4k|BNF|built[-_ ]?drone|assembled|wiring|diagram|Mach-R5|Nazgul|Backpack/i;
const MOTOR_REJECT = /esc|stack|fc|aio|combo/i;
const ESC_REJECT = /flight[-_]?controller|fc[-_]|stack[-_]/i;
const FC_REJECT = /esc[-_]|4in1|4-in-1|stack[-_]/i;

function rejectUrl(url, entry) {
  if (!url || isBlockedRetailerUrl(url) || isDiscouragedImageUrl(url)) return true;
  const cat = entry.categoryKey;
  if (cat === "frame" && FRAME_REJECT.test(url)) return true;
  if (cat === "motors" && MOTOR_REJECT.test(url)) return true;
  if (cat === "esc" && ESC_REJECT.test(url)) return true;
  if (cat === "flightController" && FC_REJECT.test(url)) return true;
  if (/\/upload\/ad\//i.test(url)) return true;
  return false;
}

function classifyCandidate(url, entry, score) {
  if (!url) {
    return { classification: "official_page_found_but_no_usable_packshot", reason: "No image candidates on page." };
  }
  if (rejectUrl(url, entry)) {
    return { classification: "mismatch_risk", reason: "Best candidate rejected by product-type filters." };
  }
  if (score >= 15) {
    return {
      classification: "exact_official_packshot_found",
      reason: "High-scoring manufacturer CDN product image.",
    };
  }
  if (score >= 10) {
    return {
      classification: "acceptable_official_family_packshot_found",
      reason: "Acceptable official product gallery image.",
    };
  }
  return { classification: "mismatch_risk", reason: "Low-scoring or ambiguous gallery image." };
}

function patchSourceFile(filePath, partId, preferredImageUrl) {
  if (!existsSync(filePath)) return false;
  let content = readFileSync(filePath, "utf8");
  const blockRe = new RegExp(
    `(partId:\\s*"${partId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[\\s\\S]*?)(urlConfidence:\\s*")([^"]+)(")`,
    "m",
  );
  if (!blockRe.test(content)) return false;

  let patched = content.replace(blockRe, (match, prefix, confKey, confVal, confEnd) => {
    if (prefix.includes("preferredImageUrl:")) {
      return prefix.replace(
        /preferredImageUrl:\s*[^,\n]+/,
        `preferredImageUrl: ${JSON.stringify(preferredImageUrl)}`,
      ) + `${confKey}high${confEnd}`;
    }
    return `${prefix}preferredImageUrl: ${JSON.stringify(preferredImageUrl)},\n    ${confKey}high${confEnd}`;
  });

  if (patched === content) return false;
  writeFileSync(filePath, patched);
  return true;
}

function findSourceFile(partId) {
  for (const filePath of SOURCE_FILES) {
    const content = readFileSync(filePath, "utf8");
    if (content.includes(`partId: "${partId}"`) || content.includes(`partId:"${partId}"`)) {
      return filePath;
    }
  }
  return null;
}

export async function researchMissingOfficialImages() {
  const queueReport = buildImageCompletionQueue();
  const targets = queueReport.queue.filter(
    (e) => e.classification === "needs_better_official_url",
  );

  const allSources = [...presetPartImageSources, ...fiveInchPartImageSources];
  const sourceById = new Map(allSources.map((e) => [e.partId, e]));

  const results = [];
  let patched = 0;

  for (const entry of targets) {
    const source = sourceById.get(entry.partId);
    const officialUrl = source?.officialUrl ?? entry.officialUrl;

    if (!officialUrl) {
      results.push({
        partId: entry.partId,
        classification: "should_remain_svg_placeholder",
        reason: "No official manufacturer URL on file.",
        preferredImageUrl: null,
      });
      continue;
    }

    try {
      const html = await fetchHtml(officialUrl);
      const candidates = extractPageImageCandidates(html, officialUrl)
        .filter((url) => !rejectUrl(url, entry))
        .map((url) => ({ url, score: scoreImageCandidate(url) }))
        .sort((a, b) => b.score - a.score);

      const best = candidates[0];
      const { classification, reason } = classifyCandidate(best?.url, entry, best?.score ?? 0);

      const fetchable =
        classification === "exact_official_packshot_found" ||
        classification === "acceptable_official_family_packshot_found";

      if (fetchable && best?.url) {
        const filePath = findSourceFile(entry.partId);
        if (filePath && patchSourceFile(filePath, entry.partId, best.url)) {
          patched++;
        }
      }

      results.push({
        partId: entry.partId,
        partName: entry.partName,
        categoryKey: entry.categoryKey,
        officialUrl,
        classification,
        reason,
        preferredImageUrl: fetchable ? best.url : null,
        candidateScore: best?.score ?? null,
        usedInPreset: entry.usedInPreset,
      });
    } catch (error) {
      results.push({
        partId: entry.partId,
        classification: "official_source_blocked",
        reason: error.message,
        preferredImageUrl: null,
      });
    }
  }

  const summary = results.reduce((acc, r) => {
    acc[r.classification] = (acc[r.classification] ?? 0) + 1;
    return acc;
  }, {});

  const output = {
    generatedAt: new Date().toISOString(),
    researched: results.length,
    sourceFilesPatched: patched,
    summary,
    results,
  };

  writeFileSync(researchJsonPath, `${JSON.stringify(output, null, 2)}\n`);
  return output;
}

const isDirectRun =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === join(process.argv[1]);

if (isDirectRun) {
  researchMissingOfficialImages()
    .then((output) => {
      console.log(`Researched ${output.researched} parts`);
      console.log(`Patched ${output.sourceFilesPatched} source entries`);
      console.log(JSON.stringify(output.summary, null, 2));
      console.log(`Wrote ${researchJsonPath}`);
    })
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
}
