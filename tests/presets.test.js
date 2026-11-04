import test from "node:test";
import assert from "node:assert/strict";
import { parts, buildSteps, buildClassIds } from "../src/data/parts.js";
import { presetBuilds } from "../src/data/presets.js";
import { resolvePresetParts } from "../src/utils/presets.js";
import { calculateBuildStats, getSelectedParts } from "../src/utils/buildCalculations.js";
import { getCompatibilityWarnings } from "../src/utils/compatibility.js";

for (const preset of presetBuilds) {
  test(`preset ${preset.id} resolves every category`, () => {
    const resolved = resolvePresetParts(preset, parts);
    assert.equal(resolved.isComplete, true);
    for (const step of buildSteps) {
      assert.ok(resolved.selections[step.key], `missing ${step.key}`);
    }
    assert.ok(buildClassIds.includes(preset.buildClass));
  });

  test(`preset ${preset.id} has finite stats and no hard conflicts`, () => {
    const resolved = resolvePresetParts(preset, parts);
    const selected = getSelectedParts(resolved.selections, parts);
    const stats = calculateBuildStats(selected, preset.buildClass);
    const warnings = getCompatibilityWarnings(selected, preset.buildClass, stats);

    for (const key of ["totalPrice", "totalWeightG", "totalThrustG", "thrustToWeight", "flightTimeMinutes"]) {
      assert.ok(Number.isFinite(stats[key]), `${key} is not finite`);
      assert.ok(stats[key] > 0, `${key} must be positive`);
    }

    assert.deepEqual(
      warnings.filter((warning) => warning.severity === "high"),
      [],
    );
  });
}
