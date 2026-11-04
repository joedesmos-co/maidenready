import test from "node:test";
import assert from "node:assert/strict";
import { calculateBuildStats, validateBuildStats, formatCurrency } from "../src/utils/buildCalculations.js";
import { parts } from "../src/data/parts.js";

test("calculateBuildStats returns finite numbers for default selections", () => {
  const selected = {
    frame: parts.frame[0],
    motors: parts.motors[0],
    esc: parts.esc[0],
    flightController: parts.flightController[0],
    props: parts.props[0],
    battery: parts.battery[0],
    receiver: parts.receiver[0],
    camera: parts.camera[0],
    vtx: parts.vtx[0],
  };
  const stats = calculateBuildStats(selected, "5-inch-freestyle");
  const issues = validateBuildStats(stats, "5-inch-freestyle");
  assert.equal(issues.length, 0, issues.join("; "));
  assert.ok(stats.totalPrice > 0);
  assert.ok(stats.totalWeightG > 0);
  assert.ok(stats.totalThrustG > 0);
  assert.ok(stats.thrustToWeight > 0);
});

test("validateBuildStats catches bad stats", () => {
  const issues = validateBuildStats({ totalPrice: NaN }, "5-inch-freestyle");
  assert.ok(issues.length > 0);
});

test("formatCurrency formats USD", () => {
  assert.equal(formatCurrency(1234.5), "$1,235");
});