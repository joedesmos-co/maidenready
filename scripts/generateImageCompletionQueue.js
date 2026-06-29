import { existsSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { auditAllPartImages } from "./auditAllPartImages.js";
import {
  CLASSIFICATION_LABELS,
  classifyMissingPart,
  getQueueTier,
  QUEUE_TIER_LABELS,
} from "./imageCompletionRules.js";
import { fiveInchPartImageSources } from "../src/data/fiveInchPartImageSources.js";
import { presetPartImageSources } from "../src/data/presetPartImageSources.js";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptDir, "..");
const markdownPath = join(projectRoot, "docs/IMAGE_COMPLETION_QUEUE.md");
const jsonPath = join(projectRoot, "docs/image-completion-queue.json");

const allSources = [...presetPartImageSources, ...fiveInchPartImageSources];
const sourceByPartId = new Map(allSources.map((entry) => [entry.partId, entry]));

function compareQueueEntries(left, right) {
  if (left.queueTier !== right.queueTier) {
    return left.queueTier - right.queueTier;
  }

  if (left.classificationRank !== right.classificationRank) {
    return left.classificationRank - right.classificationRank;
  }

  const categoryCompare = left.categoryKey.localeCompare(right.categoryKey);

  if (categoryCompare !== 0) {
    return categoryCompare;
  }

  return left.partId.localeCompare(right.partId);
}

const CLASSIFICATION_RANK = {
  fetchable_now: 0,
  needs_better_official_url: 1,
  official_source_blocked: 2,
  no_clean_packshot_found: 3,
  should_remain_svg_placeholder: 4,
  unsafe_likely_mismatch: 5,
};

export function buildImageCompletionQueue({ publicRoot } = {}) {
  const audit = auditAllPartImages(publicRoot ? { publicRoot } : {});
  const missingItems = audit.missingItems;

  const queue = missingItems.map((entry) => {
    const sourceEntry = sourceByPartId.get(entry.partId) ?? null;
    const { classification, reason } = classifyMissingPart(entry, sourceEntry);
    const queueTier = getQueueTier(entry);

    return {
      rank: 0,
      queueTier,
      queueTierLabel: QUEUE_TIER_LABELS[queueTier],
      partId: entry.partId,
      partName: entry.partName,
      brand: entry.brand,
      categoryKey: entry.categoryKey,
      categoryLabel: entry.categoryLabel,
      imagePath: entry.imagePath,
      usedInPreset: entry.usedInPreset,
      presetUsage: entry.presetUsage,
      compatibleClasses: entry.compatibleClasses,
      auditPriority: entry.priority,
      classification,
      classificationLabel: CLASSIFICATION_LABELS[classification],
      classificationRank: CLASSIFICATION_RANK[classification] ?? 99,
      reason,
      officialUrl: sourceEntry?.officialUrl ?? null,
      preferredImageUrl: sourceEntry?.preferredImageUrl ?? null,
      urlConfidence: sourceEntry?.urlConfidence ?? null,
      sourceNotes: sourceEntry?.notes ?? null,
      fetchScript:
        classification === "fetchable_now"
          ? guessFetchScript(entry.categoryKey)
          : null,
    };
  });

  queue.sort(compareQueueEntries);
  queue.forEach((entry, index) => {
    entry.rank = index + 1;
  });

  const classificationCounts = queue.reduce((counts, entry) => {
    counts[entry.classification] = (counts[entry.classification] ?? 0) + 1;
    return counts;
  }, {});

  const tierCounts = queue.reduce((counts, entry) => {
    counts[entry.queueTier] = (counts[entry.queueTier] ?? 0) + 1;
    return counts;
  }, {});

  return {
    generatedAt: new Date().toISOString(),
    baseline: {
      total: audit.total,
      found: audit.found,
      missing: audit.missing,
      presetPartFound: audit.presetPartFound,
      presetPartTotal: audit.presetPartTotal,
      presetPartMissing: audit.presetPartMissing,
    },
    summary: {
      queueTotal: queue.length,
      classificationCounts,
      tierCounts,
      fetchableNow: queue.filter((entry) => entry.classification === "fetchable_now"),
      shouldRemainPlaceholder: queue.filter(
        (entry) =>
          entry.classification === "should_remain_svg_placeholder" ||
          entry.classification === "unsafe_likely_mismatch" ||
          entry.classification === "no_clean_packshot_found",
      ),
      topResearchTargets: queue
        .filter(
          (entry) =>
            entry.classification === "needs_better_official_url" &&
            (entry.queueTier <= 3 || entry.usedInPreset),
        )
        .slice(0, 20),
    },
    queue,
  };
}

function guessFetchScript(categoryKey) {
  if (["props", "battery", "camera"].includes(categoryKey)) {
    return "images:fetch-easy-categories";
  }

  if (categoryKey === "motors") {
    return "images:fetch-motors";
  }

  if (["receiver", "vtx"].includes(categoryKey)) {
    return "images:fetch-receiver-vtx";
  }

  if (categoryKey === "frame") {
    return "images:fetch-frames";
  }

  if (["esc", "flightController"].includes(categoryKey)) {
    return "images:fetch-electronics";
  }

  return "images:fetch-five-inch";
}

function formatMarkdown(queueReport) {
  const { baseline, summary, queue, generatedAt } = queueReport;
  const lines = [
    "# Image completion queue",
    "",
    "Ranked workflow for missing catalog JPGs. Generated from `scripts/generateImageCompletionQueue.js`.",
    "",
    `Generated: ${generatedAt}`,
    "",
    "## Baseline coverage",
    "",
    "| Metric | Count |",
    "| --- | ---: |",
    `| Total catalog parts | ${baseline.total} |`,
    `| Found under public/ | ${baseline.found} |`,
    `| Missing | ${baseline.missing} |`,
    `| Preset parts found | ${baseline.presetPartFound}/${baseline.presetPartTotal} |`,
    "",
    "## Classification summary",
    "",
    "| Classification | Count |",
    "| --- | ---: |",
  ];

  for (const [key, label] of Object.entries(CLASSIFICATION_LABELS)) {
    lines.push(`| ${label} | ${summary.classificationCounts[key] ?? 0} |`);
  }

  lines.push(
    "",
    `**Should remain SVG placeholder (incl. unsafe / no packshot):** ${summary.shouldRemainPlaceholder.length}`,
    "",
    "## Queue tiers",
    "",
    "| Tier | Scope | Missing |",
    "| ---: | --- | ---: |",
  );

  for (const [tier, label] of Object.entries(QUEUE_TIER_LABELS)) {
    lines.push(`| ${tier} | ${label} | ${summary.tierCounts[tier] ?? 0} |`);
  }

  lines.push("", "## Fetchable now", "");

  if (summary.fetchableNow.length === 0) {
    lines.push("_None at generation time._", "");
  } else {
    summary.fetchableNow.forEach((entry) => {
      lines.push(
        `- **${entry.partName}** (\`${entry.partId}\`) — ${entry.imagePath}`,
        `  - URL: ${entry.preferredImageUrl}`,
        `  - Script: \`${entry.fetchScript}\``,
        "",
      );
    });
  }

  lines.push("## Top 20 manual research targets", "");
  lines.push(
    "_High-value missing parts that need a better official direct packshot URL._",
    "",
  );

  summary.topResearchTargets.forEach((entry, index) => {
    lines.push(
      `${index + 1}. **${entry.partName}** (\`${entry.partId}\`) — tier ${entry.queueTier}, ${entry.categoryKey}`,
      `   - Official: ${entry.officialUrl ?? "—"}`,
      `   - ${entry.reason}`,
      "",
    );
  });

  lines.push("## Full ranked queue", "");

  for (const entry of queue) {
    lines.push(
      `### ${entry.rank}. ${entry.partName} (\`${entry.partId}\`)`,
      "",
      `- **Tier:** ${entry.queueTier} — ${entry.queueTierLabel}`,
      `- **Classification:** ${entry.classificationLabel} (\`${entry.classification}\`)`,
      `- **Category:** ${entry.categoryLabel} (\`${entry.categoryKey}\`)`,
      `- **Preset part:** ${entry.usedInPreset ? "yes" : "no"}`,
      `- **Image path:** \`public${entry.imagePath}\``,
      `- **Official URL:** ${entry.officialUrl ?? "—"}`,
      `- **Preferred image URL:** ${entry.preferredImageUrl ?? "—"}`,
      `- **URL confidence:** ${entry.urlConfidence ?? "—"}`,
      `- **Reason:** ${entry.reason}`,
      "",
    );
  }

  return lines.join("\n");
}

export function writeImageCompletionQueueArtifacts(queueReport = buildImageCompletionQueue()) {
  writeFileSync(jsonPath, `${JSON.stringify(queueReport, null, 2)}\n`, "utf8");
  writeFileSync(markdownPath, formatMarkdown(queueReport), "utf8");

  return { markdownPath, jsonPath, queueReport };
}

function main() {
  const { queueReport, markdownPath: mdPath, jsonPath: jsPath } =
    writeImageCompletionQueueArtifacts();

  console.log("Image completion queue");
  console.log("----------------------");
  console.log(`Missing parts queued: ${queueReport.summary.queueTotal}`);
  console.log(
    `Fetchable now: ${queueReport.summary.fetchableNow.length}`,
  );
  console.log(
    `Should remain placeholder: ${queueReport.summary.shouldRemainPlaceholder.length}`,
  );
  console.log("");
  console.log(`Wrote ${mdPath}`);
  console.log(`Wrote ${jsPath}`);
}

const isDirectRun =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === join(process.argv[1]);

if (isDirectRun) {
  main();
}
