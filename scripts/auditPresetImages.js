import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PRESET_PART_IMAGE_TODO } from "../src/data/presetPartImages.js";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptDir, "..");
const defaultPublicRoot = join(projectRoot, "public");

/**
 * Check preset image TODO entries against files under public/.
 * Browser code cannot scan public/ at runtime — use this from Node instead.
 */
export function auditPresetImagePaths(
  todoList,
  { publicRoot = defaultPublicRoot } = {},
) {
  const checked = todoList.map((entry) => {
    const relativePath = entry.expectedPath.replace(/^\//, "");
    const absolutePath = join(publicRoot, relativePath);

    return {
      ...entry,
      relativePath,
      absolutePath,
      exists: existsSync(absolutePath),
    };
  });

  const foundItems = checked.filter((entry) => entry.exists);
  const missingItems = checked.filter((entry) => !entry.exists);
  const missingByCategory = missingItems.reduce((grouped, entry) => {
    const categoryKey = entry.categoryKey ?? "unknown";

    if (!grouped[categoryKey]) {
      grouped[categoryKey] = [];
    }

    grouped[categoryKey].push(entry);
    return grouped;
  }, {});

  Object.values(missingByCategory).forEach((entries) => {
    entries.sort((left, right) => left.partId.localeCompare(right.partId));
  });

  return {
    total: checked.length,
    found: foundItems.length,
    missing: missingItems.length,
    foundItems,
    missingItems,
    missingByCategory,
  };
}

export function formatPresetImageAuditReport(report) {
  const lines = [
    "MaidenReady preset image audit",
    "------------------------------",
    `Total preset images: ${report.total}`,
    `Found: ${report.found}`,
    `Missing: ${report.missing}`,
  ];

  if (report.missing === 0) {
    lines.push("", "All preset image files exist under public/.");
    return lines.join("\n");
  }

  lines.push("", "Missing by category:");

  Object.entries(report.missingByCategory)
    .sort(([leftCategory], [rightCategory]) =>
      leftCategory.localeCompare(rightCategory),
    )
    .forEach(([categoryKey, entries]) => {
      lines.push("", `${categoryKey} (${entries.length})`);

      entries.forEach((entry) => {
        lines.push(`  public${entry.expectedPath}  [${entry.partId}]`);
      });
    });

  return lines.join("\n");
}

function main() {
  const report = auditPresetImagePaths(PRESET_PART_IMAGE_TODO);
  console.log(formatPresetImageAuditReport(report));

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
