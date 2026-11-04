import test from "node:test";
import assert from "node:assert/strict";
import { buildSteps, parts, defaultBuildClass } from "../src/data/parts.js";
import { filterPartsForBuildClass, getDefaultSelectionsForBuildClass, resolveSelectionsForBuildClass } from "../src/utils/buildClasses.js";
import { isPartCompatibleWithClass } from "../src/utils/buildClasses.js";

test("filterPartsForBuildClass returns compatible parts only", () => {
  const filtered = filterPartsForBuildClass(parts, "tiny-whoop");
  for (const step of buildSteps) {
    for (const part of filtered[step.key]) {
      assert.ok(isPartCompatibleWithClass(part, "tiny-whoop"));
    }
  }
});

test("getDefaultSelectionsForBuildClass returns a part for every step", () => {
  const selections = getDefaultSelectionsForBuildClass("5-inch-freestyle", parts);
  for (const step of buildSteps) {
    assert.ok(selections[step.key], `missing ${step.key}`);
  }
});

test("resolveSelectionsForBuildClass swaps incompatible parts", () => {
  const defaults = getDefaultSelectionsForBuildClass("5-inch-freestyle", parts);
  const resolved = resolveSelectionsForBuildClass(defaults, "tiny-whoop", parts);
  assert.ok(Object.keys(resolved.selections).length === buildSteps.length);
});