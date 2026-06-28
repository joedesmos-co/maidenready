import { presetBuilds } from "../src/data/presets.js";
import { parts } from "../src/data/parts.js";
import {
  calculateBuildStats,
  getSelectedParts,
  validateBuildStats,
} from "../src/utils/buildCalculations.js";

let issueCount = 0;

console.log("MaidenReady preset stats validation");
console.log("--------------------------------");

for (const preset of presetBuilds) {
  const selectedParts = getSelectedParts(preset.selections, parts);
  const stats = calculateBuildStats(selectedParts, preset.buildClass);
  const issues = validateBuildStats(stats, preset.buildClass);

  console.log(`\n${preset.name} (${preset.buildClass})`);
  console.log(
    `  mass ~${stats.totalWeightG}g | T:W ${stats.thrustToWeight}:1 | flight ${stats.flightTimeMinutesMin}-${stats.flightTimeMinutesMax} min | speed ${stats.topSpeedMphMin}-${stats.topSpeedMphMax} mph`,
  );

  if (issues.length === 0) {
    console.log("  OK");
    continue;
  }

  issueCount += issues.length;
  issues.forEach((issue) => console.log(`  ISSUE: ${issue}`));
}

console.log("\n--------------------------------");
console.log(`Presets checked: ${presetBuilds.length}`);
console.log(`Issues found: ${issueCount}`);

if (issueCount > 0) {
  process.exitCode = 1;
}
