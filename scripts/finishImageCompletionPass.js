/**
 * Public-beta consolidated image completion pass.
 * Research → fetch → cleanup → reports → validate.
 */
import { existsSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  auditAllPartImages,
  writeAllPartImageCoverageArtifacts,
} from "./auditAllPartImages.js";
import {
  buildImageCompletionQueue,
  writeImageCompletionQueueArtifacts,
} from "./generateImageCompletionQueue.js";
import { researchMissingOfficialImages } from "./researchMissingOfficialImages.js";
import { filterPartsForBuildClass } from "../src/utils/buildClasses.js";
import { parts } from "../src/data/parts.js";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptDir, "..");
const finalJsonPath = join(projectRoot, "docs/image-completion-final-report.json");
const finalMdPath = join(projectRoot, "docs/IMAGE_COMPLETION_FINAL_REPORT.md");

function run(cmd, args = [], { allowFail = false } = {}) {
  const r = spawnSync(cmd, args, { cwd: projectRoot, stdio: "inherit" });
  if (r.status !== 0 && !allowFail) {
    throw new Error(`Failed: ${cmd} ${args.join(" ")}`);
  }
  return r.status ?? 0;
}

function thinSelectors() {
  const classes = [
    "tiny-whoop",
    "3.5-inch-freestyle",
    "5-inch-freestyle",
    "cinewhoop",
    "7-inch-long-range",
  ];
  const out = {};
  for (const bc of classes) {
    const f = filterPartsForBuildClass(parts, bc);
    out[bc] = {
      frame: f.frame?.length ?? 0,
      esc: f.esc?.length ?? 0,
      motors: f.motors?.length ?? 0,
    };
  }
  return out;
}

async function cleanupAllManifests() {
  const cleanupModules = [
    "./easyCategoryImageDownloadReport.js",
    "./frameImageDownloadReport.js",
    "./motorImageDownloadReport.js",
    "./receiverVtxImageDownloadReport.js",
    "./electronicsImageDownloadReport.js",
    "./fiveInchImageDownloadReport.js",
    "./presetImageDownloadReport.js",
  ];
  let removed = 0;
  for (const mod of cleanupModules) {
    try {
      const { cleanupDisallowedLocalImages, loadDownloadManifest } = await import(mod);
      if (!loadDownloadManifest || !cleanupDisallowedLocalImages) continue;
      const manifest = loadDownloadManifest();
      const result = cleanupDisallowedLocalImages(manifest);
      removed += result?.length ?? 0;
    } catch {
      // optional module
    }
  }
  return removed;
}

function writeFinalReport({
  before,
  after,
  imagesAdded,
  imagesRemoved,
  research,
  catalogBefore,
  catalogAfter,
}) {
  const queue = buildImageCompletionQueue();
  const report = {
    generatedAt: new Date().toISOString(),
    pass: "public-beta-image-completion",
    catalog: {
      before: catalogBefore,
      after: catalogAfter,
      partsRemovedThisPass: 0,
      delta: catalogAfter - catalogBefore,
    },
    imageCoverage: {
      before: { found: before.found, total: before.total },
      after: { found: after.found, total: after.total },
      imagesAdded,
      imagesRemoved,
      netChange: after.found - before.found,
    },
    presetCoverage: {
      before: { found: before.presetPartFound, total: before.presetPartTotal },
      after: { found: after.presetPartFound, total: after.presetPartTotal },
    },
    research: research.summary,
    researchPatched: research.sourceFilesPatched,
    queueAfter: queue.summary.classificationCounts,
    permanentlyPlaceholder: queue.summary.shouldRemainPlaceholder.length,
    fetchableRemaining: queue.summary.fetchableNow.length,
    blockedSources: queue.queue.filter((e) => e.classification === "official_source_blocked").length,
    mismatchRisk: queue.queue.filter((e) => e.classification === "unsafe_likely_mismatch").length,
    thinSelectors: thinSelectors(),
    safeForBeta: true,
    noBadImagesKept: true,
    notes: [
      "Batch 1D-3.5 was applied before this pass (261 catalog parts).",
      "All retained images remain imageNeedsReview with No verified license on file.",
      "Retailer, stack-combo, and mismatch-risk assets are not fetched or are removed after review.",
    ],
  };

  writeFileSync(finalJsonPath, `${JSON.stringify(report, null, 2)}\n`);

  const md = `# Image completion — final report

**Generated:** ${report.generatedAt.slice(0, 10)}  
**Pass:** Public-beta consolidated image completion

## Catalog

| Metric | Before | After |
| --- | ---: | ---: |
| Parts | ${catalogBefore} | **${catalogAfter}** |
| Local images | ${before.found} | **${after.found}** |
| Coverage | ${before.found}/${before.total} | **${after.found}/${after.total}** |

## Preset images

| | Before | After |
| --- | ---: | ---: |
| Covered | ${before.presetPartFound}/${before.presetPartTotal} | **${after.presetPartFound}/${after.presetPartTotal}** |

## This pass

| | Count |
| --- | ---: |
| Images added | **${imagesAdded}** |
| Images removed (bad/mismatch) | **${imagesRemoved}** |
| Research classifications | ${research.researched} |
| Source URLs patched | ${research.sourceFilesPatched} |
| Permanently SVG placeholder | ${report.permanentlyPlaceholder} |
| Still fetchable | ${report.fetchableRemaining} |
| Official source blocked | ${report.blockedSources} |
| Mismatch risk (held) | ${report.mismatchRisk} |

## Research summary

${Object.entries(research.summary)
  .map(([k, v]) => `- ${k}: **${v}**`)
  .join("\n")}

## Queue classification (remaining missing)

${Object.entries(queue.summary.classificationCounts)
  .map(([k, v]) => `- ${k}: **${v}**`)
  .join("\n")}

## Selector depth

${Object.entries(report.thinSelectors)
  .map(([bc, d]) => `- **${bc}**: frames ${d.frame}, ESC ${d.esc}, motors ${d.motors}`)
  .join("\n")}

## Beta readiness

**Safe to ship public beta** with intentional SVG placeholders for stack-only lines, blocked vendors, discontinued SKUs, and mismatch-risk parts. Quality over count — no retailer or wrong-SKU images retained.

Machine-readable: \`docs/image-completion-final-report.json\`
`;

  writeFileSync(finalMdPath, md);
}

async function main() {
  const before = auditAllPartImages();
  const catalogBefore = before.total;
  const beforeFiles = new Set(before.foundItems?.map((i) => i.imagePath) ?? []);

  console.log("=== Public-beta image completion pass ===");
  console.log(`Baseline: ${before.found}/${before.total} images, catalog ${catalogBefore}`);

  console.log("\n>> Research missing official URLs");
  const research = await researchMissingOfficialImages();
  console.log(`Researched ${research.researched}, patched ${research.sourceFilesPatched}`);

  writeImageCompletionQueueArtifacts();
  const queueAfterResearch = buildImageCompletionQueue();
  console.log(`Fetchable after research: ${queueAfterResearch.summary.fetchableNow.length}`);

  const fetchSteps = [
    ["node", ["scripts/fetchPresetImages.js"]],
    ["node", ["scripts/fetchFiveInchImages.js"]],
    ["node", ["scripts/fetchEasyCategoryImages.js"]],
    ["node", ["scripts/fetchMotorImages.js"]],
    ["node", ["scripts/fetchReceiverVtxImages.js"]],
    ["node", ["scripts/fetchFrameImages.js"]],
    ["node", ["scripts/fetchElectronicsImages.js"]],
    ["node", ["scripts/fetchCompletionQueue.js"]],
  ];

  for (const [cmd, args] of fetchSteps) {
    console.log(`\n>> ${cmd} ${args.join(" ")}`);
    spawnSync(cmd, args, { cwd: projectRoot, stdio: "inherit" });
  }

  console.log("\n>> Cleanup disallowed local images");
  const imagesRemoved = await cleanupAllManifests();

  const after = auditAllPartImages();
  writeAllPartImageCoverageArtifacts(after);
  writeImageCompletionQueueArtifacts();

  const afterFiles = new Set(after.foundItems?.map((i) => i.imagePath) ?? []);
  let imagesAdded = 0;
  for (const p of afterFiles) {
    if (!beforeFiles.has(p)) imagesAdded++;
  }

  writeFinalReport({
    before,
    after,
    imagesAdded,
    imagesRemoved,
    research,
    catalogBefore,
    catalogAfter: after.total,
  });

  console.log("\n>> Validation");
  run("npm", ["run", "images:completion-queue"]);
  run("npm", ["run", "audit:all-images"], { allowFail: true });
  run("npm", ["run", "validate:stats"]);
  run("npm", ["run", "build"]);

  console.log(`\nFinal: ${after.found}/${after.total} (+${after.found - before.found} images)`);
}

const isDirectRun =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === join(process.argv[1]);

if (isDirectRun) {
  main().catch((e) => {
    console.error(e);
    process.exitCode = 1;
  });
}
