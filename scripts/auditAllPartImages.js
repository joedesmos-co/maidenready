import { existsSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildClassById,
  buildSteps,
  categoryMeta,
  parts,
} from "../src/data/parts.js";
import { presetBuilds } from "../src/data/presets.js";
import { isPresetPartId } from "../src/data/presetPartImages.js";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptDir, "..");
const defaultPublicRoot = join(projectRoot, "public");
const reportPath = join(projectRoot, "docs/ALL_PART_IMAGE_COVERAGE_REPORT.md");
const manifestPath = join(projectRoot, "docs/all-part-image-coverage.json");

const PRIORITY_LABELS = {
  1: "Preset parts",
  2: "5-inch freestyle catalog",
  3: "Other build-class catalog",
};

function buildPresetUsageByPartId() {
  const usageByPartId = new Map();

  for (const preset of presetBuilds) {
    for (const [categoryKey, partId] of Object.entries(preset.selections ?? {})) {
      if (!partId) {
        continue;
      }

      const existing = usageByPartId.get(partId) ?? [];
      existing.push({
        presetId: preset.id,
        presetName: preset.name,
        buildClass: preset.buildClass,
        categoryKey,
      });
      usageByPartId.set(partId, existing);
    }
  }

  return usageByPartId;
}

function getImagePriority(part, usedInPreset) {
  if (usedInPreset) {
    return 1;
  }

  if (part.compatibleClasses?.includes("5-inch-freestyle")) {
    return 2;
  }

  return 3;
}

function compareAuditEntries(left, right) {
  if (left.priority !== right.priority) {
    return left.priority - right.priority;
  }

  const categoryCompare = left.categoryKey.localeCompare(right.categoryKey);

  if (categoryCompare !== 0) {
    return categoryCompare;
  }

  return left.partId.localeCompare(right.partId);
}

function formatBuildClassList(buildClassIds) {
  return buildClassIds
    .map((buildClassId) => buildClassById[buildClassId]?.label ?? buildClassId)
    .join(", ");
}

function formatPresetUsage(presetUsage) {
  if (!presetUsage?.length) {
    return "—";
  }

  return presetUsage
    .map((entry) => `${entry.presetName} (${entry.presetId})`)
    .join("; ");
}

export function auditAllPartImages({ publicRoot = defaultPublicRoot } = {}) {
  const presetUsageByPartId = buildPresetUsageByPartId();
  const checked = [];

  for (const step of buildSteps) {
    for (const part of parts[step.key] ?? []) {
      const imagePath = part.imagePath;
      const relativePath = imagePath?.replace(/^\//, "") ?? null;
      const absolutePath = relativePath ? join(publicRoot, relativePath) : null;
      const exists = relativePath ? existsSync(absolutePath) : false;
      const presetUsage = presetUsageByPartId.get(part.id) ?? [];
      const usedInPreset = isPresetPartId(part.id);
      const priority = getImagePriority(part, usedInPreset);

      checked.push({
        partId: part.id,
        partName: part.name,
        brand: part.brand ?? null,
        categoryKey: step.key,
        categoryLabel: categoryMeta[step.key]?.label ?? step.label ?? step.key,
        imagePath,
        relativePath,
        absolutePath,
        exists,
        usedInPreset,
        presetUsage,
        compatibleClasses: part.compatibleClasses ?? [],
        priority,
        priorityLabel: PRIORITY_LABELS[priority],
      });
    }
  }

  checked.sort(compareAuditEntries);

  const foundItems = checked.filter((entry) => entry.exists);
  const missingItems = checked.filter((entry) => !entry.exists);

  const missingByCategory = missingItems.reduce((grouped, entry) => {
    if (!grouped[entry.categoryKey]) {
      grouped[entry.categoryKey] = [];
    }

    grouped[entry.categoryKey].push(entry);
    return grouped;
  }, {});

  const missingByBuildClass = {};

  for (const entry of missingItems) {
    for (const buildClassId of entry.compatibleClasses) {
      if (!missingByBuildClass[buildClassId]) {
        missingByBuildClass[buildClassId] = [];
      }

      missingByBuildClass[buildClassId].push(entry);
    }
  }

  for (const entries of Object.values(missingByCategory)) {
    entries.sort(compareAuditEntries);
  }

  for (const entries of Object.values(missingByBuildClass)) {
    entries.sort(compareAuditEntries);
  }

  const missingByPriority = {
    1: missingItems.filter((entry) => entry.priority === 1),
    2: missingItems.filter((entry) => entry.priority === 2),
    3: missingItems.filter((entry) => entry.priority === 3),
  };

  const presetMissing = missingItems.filter((entry) => entry.usedInPreset);

  return {
    generatedAt: new Date().toISOString(),
    total: checked.length,
    found: foundItems.length,
    missing: missingItems.length,
    presetPartTotal: checked.filter((entry) => entry.usedInPreset).length,
    presetPartFound: foundItems.filter((entry) => entry.usedInPreset).length,
    presetPartMissing: presetMissing.length,
    missingByPriority,
    checked,
    foundItems,
    missingItems,
    missingByCategory,
    missingByBuildClass,
  };
}

export function formatAllPartImageAuditReport(report) {
  const lines = [
    "MaidenReady full catalog image audit",
    "-----------------------------------",
    `Total catalog parts: ${report.total}`,
    `Found under public/: ${report.found}`,
    `Missing: ${report.missing}`,
    "",
    "Preset coverage:",
    `  Preset parts total: ${report.presetPartTotal}`,
    `  Preset parts found: ${report.presetPartFound}`,
    `  Preset parts missing: ${report.presetPartMissing}`,
    "",
    "Missing by priority:",
    `  Priority 1 (${PRIORITY_LABELS[1]}): ${report.missingByPriority[1].length}`,
    `  Priority 2 (${PRIORITY_LABELS[2]}): ${report.missingByPriority[2].length}`,
    `  Priority 3 (${PRIORITY_LABELS[3]}): ${report.missingByPriority[3].length}`,
  ];

  if (report.missing === 0) {
    lines.push("", "All catalog image files exist under public/.");
    return lines.join("\n");
  }

  for (const priority of [1, 2, 3]) {
    const entries = report.missingByPriority[priority];

    if (entries.length === 0) {
      continue;
    }

    lines.push("", `Priority ${priority} missing (${PRIORITY_LABELS[priority]})`);

    entries.forEach((entry) => {
      const presetFlag = entry.usedInPreset ? "preset" : "catalog";
      lines.push(
        `  public${entry.imagePath}  [${entry.partId}]  (${presetFlag}; ${formatBuildClassList(entry.compatibleClasses)})`,
      );
    });
  }

  lines.push("", "Missing by category:");

  Object.entries(report.missingByCategory)
    .sort(([leftCategory], [rightCategory]) => leftCategory.localeCompare(rightCategory))
    .forEach(([categoryKey, entries]) => {
      lines.push("", `${categoryKey} (${entries.length})`);

      entries.forEach((entry) => {
        const presetFlag = entry.usedInPreset ? "preset" : "catalog-only";
        lines.push(
          `  public${entry.imagePath}  [${entry.partId}]  (${presetFlag}; ${formatBuildClassList(entry.compatibleClasses)})`,
        );
      });
    });

  lines.push("", "Missing by build class:");

  Object.entries(report.missingByBuildClass)
    .sort(([leftClass], [rightClass]) => leftClass.localeCompare(rightClass))
    .forEach(([buildClassId, entries]) => {
      const label = buildClassById[buildClassId]?.label ?? buildClassId;
      lines.push("", `${label} (${buildClassId}) — ${entries.length} missing slot(s)`);

      entries.forEach((entry) => {
        const presetFlag = entry.usedInPreset ? "preset" : "catalog-only";
        lines.push(`  public${entry.imagePath}  [${entry.partId}]  (${presetFlag})`);
      });
    });

  return lines.join("\n");
}

function formatMarkdownEntry(entry, index) {
  return [
    `### ${index + 1}. ${entry.partName} (\`${entry.partId}\`)`,
    "",
    `- **Category:** ${entry.categoryLabel} (\`${entry.categoryKey}\`)`,
    `- **Build classes:** ${formatBuildClassList(entry.compatibleClasses)}`,
    `- **Used in preset:** ${entry.usedInPreset ? "yes" : "no"}`,
    `- **Preset usage:** ${formatPresetUsage(entry.presetUsage)}`,
    `- **Priority:** ${entry.priority} (${entry.priorityLabel})`,
    `- **Expected image path:** \`public${entry.imagePath}\``,
    `- **Status:** missing local JPG`,
    "",
  ].join("\n");
}

export function formatAllPartImageCoverageMarkdown(report) {
  const lines = [
    "# Full catalog image coverage report",
    "",
    "Developer-facing TODO for every part in `src/data/parts.js`.",
    "",
    "> No images are downloaded by this report. Add local JPGs under `public/` manually or via the preset image workflow.",
    "",
    `Generated: ${report.generatedAt}`,
    "",
    "## Summary",
    "",
    `- Total catalog parts: **${report.total}**`,
    `- Found under \`public/\`: **${report.found}**`,
    `- Missing local JPGs: **${report.missing}**`,
    `- Preset parts: **${report.presetPartFound}/${report.presetPartTotal}** found`,
    "",
    "### Missing by priority",
    "",
    "| Priority | Scope | Missing |",
    "| --- | --- | ---: |",
    `| 1 | ${PRIORITY_LABELS[1]} | **${report.missingByPriority[1].length}** |`,
    `| 2 | ${PRIORITY_LABELS[2]} | **${report.missingByPriority[2].length}** |`,
    `| 3 | ${PRIORITY_LABELS[3]} | **${report.missingByPriority[3].length}** |`,
    "",
    "## Priority TODO (missing only)",
    "",
  ];

  for (const priority of [1, 2, 3]) {
    const entries = report.missingByPriority[priority];
    lines.push(`### Priority ${priority} — ${PRIORITY_LABELS[priority]} (${entries.length})`, "");

    if (entries.length === 0) {
      lines.push("_None — all parts in this priority tier have local JPGs._", "");
      continue;
    }

    entries.forEach((entry, index) => {
      lines.push(formatMarkdownEntry(entry, index));
    });
  }

  lines.push("## Missing by category", "");

  Object.entries(report.missingByCategory)
    .sort(([leftCategory], [rightCategory]) => leftCategory.localeCompare(rightCategory))
    .forEach(([categoryKey, entries]) => {
      const label = categoryMeta[categoryKey]?.label ?? categoryKey;
      lines.push(`### ${label} (\`${categoryKey}\`) — ${entries.length} missing`, "");

      entries.forEach((entry, index) => {
        lines.push(formatMarkdownEntry(entry, index));
      });
    });

  lines.push("## Missing by build class", "");
  lines.push(
    "_Parts compatible with multiple build classes appear once per class below._",
    "",
  );

  Object.entries(report.missingByBuildClass)
    .sort(([leftClass], [rightClass]) => leftClass.localeCompare(rightClass))
    .forEach(([buildClassId, entries]) => {
      const label = buildClassById[buildClassId]?.label ?? buildClassId;
      lines.push(`### ${label} (\`${buildClassId}\`) — ${entries.length} missing slot(s)`, "");

      entries.forEach((entry, index) => {
        lines.push(formatMarkdownEntry(entry, index));
      });
    });

  return lines.join("\n");
}

export function writeAllPartImageCoverageArtifacts(report) {
  const manifest = {
    generatedAt: report.generatedAt,
    summary: {
      total: report.total,
      found: report.found,
      missing: report.missing,
      presetPartTotal: report.presetPartTotal,
      presetPartFound: report.presetPartFound,
      presetPartMissing: report.presetPartMissing,
      missingByPriority: {
        1: report.missingByPriority[1].length,
        2: report.missingByPriority[2].length,
        3: report.missingByPriority[3].length,
      },
    },
    missingByPriority: Object.fromEntries(
      Object.entries(report.missingByPriority).map(([priority, entries]) => [
        priority,
        entries.map((entry) => ({
          partId: entry.partId,
          partName: entry.partName,
          categoryKey: entry.categoryKey,
          imagePath: entry.imagePath,
          usedInPreset: entry.usedInPreset,
          presetUsage: entry.presetUsage,
          compatibleClasses: entry.compatibleClasses,
          priority: entry.priority,
        })),
      ]),
    ),
    missingByCategory: Object.fromEntries(
      Object.entries(report.missingByCategory).map(([categoryKey, entries]) => [
        categoryKey,
        entries.map((entry) => entry.partId),
      ]),
    ),
    missingByBuildClass: Object.fromEntries(
      Object.entries(report.missingByBuildClass).map(([buildClassId, entries]) => [
        buildClassId,
        entries.map((entry) => entry.partId),
      ]),
    ),
    checked: report.checked.map((entry) => ({
      partId: entry.partId,
      partName: entry.partName,
      categoryKey: entry.categoryKey,
      imagePath: entry.imagePath,
      exists: entry.exists,
      usedInPreset: entry.usedInPreset,
      presetUsage: entry.presetUsage,
      compatibleClasses: entry.compatibleClasses,
      priority: entry.priority,
    })),
  };

  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  writeFileSync(reportPath, formatAllPartImageCoverageMarkdown(report), "utf8");

  return { reportPath, manifestPath };
}

function main() {
  const report = auditAllPartImages();
  const { reportPath: markdownPath, manifestPath: jsonPath } =
    writeAllPartImageCoverageArtifacts(report);

  console.log(formatAllPartImageAuditReport(report));
  console.log("");
  console.log(`Wrote ${markdownPath}`);
  console.log(`Wrote ${jsonPath}`);

  if (report.missing > 0) {
    process.exitCode = 1;
  }
}

const isDirectRun =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === join(process.argv[1]);

if (isDirectRun) {
  main();
}
