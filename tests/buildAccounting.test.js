import test from "node:test";
import assert from "node:assert/strict";
import { parts, buildSteps } from "../src/data/parts.js";
import { presetBuilds } from "../src/data/presets.js";
import {
  calculateBuildStats,
  getPartAccounting,
  getSelectedParts,
} from "../src/utils/buildCalculations.js";
import { createSavedBuildSnapshot, recalculateSavedBuildSnapshot } from "../src/utils/savedBuilds.js";
import { getCompatibilityWarnings } from "../src/utils/compatibility.js";

const presetById = (id) => presetBuilds.find((preset) => preset.id === id);

test("AIO FC and its integrated ESC contribute price once", () => {
  const preset = presetById("tiny-whoop-beginner");
  const selected = getSelectedParts(preset.selections, parts);
  const stats = calculateBuildStats(selected, preset.buildClass);
  const esc = stats.partBreakdown.find((entry) => entry.categoryKey === "esc");
  const fc = stats.partBreakdown.find((entry) => entry.categoryKey === "flightController");

  assert.equal(esc.integrated, true);
  assert.equal(esc.purchaseCost, 0);
  assert.equal(fc.purchaseCost, 39.99);
  assert.equal(stats.totalPrice, 143.4);
});

test("AIO FC and its integrated ESC contribute weight once", () => {
  const preset = presetById("tiny-whoop-beginner");
  const selected = getSelectedParts(preset.selections, parts);
  const stats = calculateBuildStats(selected, preset.buildClass);
  const esc = stats.partBreakdown.find((entry) => entry.categoryKey === "esc");
  const fc = stats.partBreakdown.find((entry) => entry.categoryKey === "flightController");

  assert.equal(esc.installedWeightG, 0);
  assert.equal(fc.installedWeightG, 3.64);
  assert.equal(stats.totalWeightG, 42);
});

test("integrated receiver contributes zero cost and weight", () => {
  const preset = presetById("tiny-whoop-beginner");
  const selected = getSelectedParts(preset.selections, parts);
  const stats = calculateBuildStats(selected, preset.buildClass);
  const receiver = stats.partBreakdown.find((entry) => entry.categoryKey === "receiver");

  assert.equal(receiver.integrated, true);
  assert.equal(receiver.purchaseCost, 0);
  assert.equal(receiver.installedWeightG, 0);
});

test("separate FC and ESC are both counted", () => {
  const preset = presetById("standard-5-freestyle");
  const selected = getSelectedParts(preset.selections, parts);
  const stats = calculateBuildStats(selected, preset.buildClass);
  const esc = stats.partBreakdown.find((entry) => entry.categoryKey === "esc");
  const fc = stats.partBreakdown.find((entry) => entry.categoryKey === "flightController");

  assert.equal(esc.integrated, false);
  assert.equal(esc.purchaseCost, 69.99);
  assert.equal(fc.purchaseCost, 44.99);
});

test("individual ESC installed quantity is four", () => {
  const accounting = getPartAccounting(
    {
      id: "individual-esc",
      name: "Individual ESC",
      price: 20,
      weightG: 5,
      escKind: "individual",
      installedQuantity: 4,
      priceBasis: "each",
      weightBasis: "each",
    },
    "esc",
    {},
  );

  assert.equal(accounting.installedQuantity, 4);
  assert.equal(accounting.purchaseCost, 80);
  assert.equal(accounting.installedWeightG, 20);
});

test("four motors are always costed and weighed four times", () => {
  const accounting = getPartAccounting(
    { id: "motor", name: "Motor", price: 25, weightG: 30 },
    "motors",
    {},
  );

  assert.equal(accounting.installedQuantity, 4);
  assert.equal(accounting.purchaseCost, 100);
  assert.equal(accounting.installedWeightG, 120);
});

test("prop package of four is purchased once and weighs four props", () => {
  const accounting = getPartAccounting(
    {
      id: "props",
      name: "Props",
      price: 3.49,
      weightG: 4.2,
      packageQuantity: 4,
      installedQuantity: 4,
      priceBasis: "package",
      weightBasis: "each",
    },
    "props",
    {},
  );

  assert.equal(accounting.packages, 1);
  assert.equal(accounting.purchaseCost, 3.49);
  assert.equal(accounting.installedWeightG, 16.8);
});

test("individually sold props are purchased four times", () => {
  const accounting = getPartAccounting(
    {
      id: "props-single",
      name: "Single Prop",
      price: 1,
      weightG: 1,
      packageQuantity: 1,
      installedQuantity: 4,
      priceBasis: "each",
      weightBasis: "each",
    },
    "props",
    {},
  );

  assert.equal(accounting.packages, 4);
  assert.equal(accounting.purchaseCost, 4);
  assert.equal(accounting.installedWeightG, 4);
});

test("Pavo25 catalog entry uses complete kit price and weight", () => {
  const frame = parts.frame.find((entry) => entry.id === "betafpv-pavo25-frame");
  assert.equal(frame.price, 31.99);
  assert.equal(frame.weightG, 68);
  assert.equal(frame.variantName, "Frame Kit");
  assert.equal(frame.sku, "01090010");
  assert.equal(frame.availabilityStatus, "out_of_stock");
});

test("every preset total equals the sum of its breakdown", () => {
  for (const preset of presetBuilds) {
    const selected = getSelectedParts(preset.selections, parts);
    const stats = calculateBuildStats(selected, preset.buildClass);
    const costSum = stats.partBreakdown.reduce((sum, entry) => sum + entry.purchaseCost, 0);
    const weightSum = stats.partBreakdown.reduce((sum, entry) => sum + entry.installedWeightG, 0);

    assert.ok(Math.abs(costSum - stats.totalPrice) < 0.02, preset.id);
    assert.ok(
      Math.abs(weightSum + (stats.totalWeightG - weightSum) - stats.totalWeightG) < 0.01,
      preset.id,
    );
    assert.ok(stats.partBreakdown.length > 0);
  }
});

test("saved build snapshots are migrated to current AIO totals", () => {
  const preset = presetById("tiny-whoop-beginner");
  const snapshot = createSavedBuildSnapshot({
    name: "Legacy AIO Build",
    buildClass: preset.buildClass,
    selectedIds: preset.selections,
    stats: {
      totalPrice: 999,
      totalWeightG: 999,
      thrustToWeight: 1,
      flightTimeMinutes: 1,
      topSpeedMph: 1,
    },
    overallGrade: "F",
  });
  const migrated = recalculateSavedBuildSnapshot(snapshot, parts);

  assert.equal(migrated.totalPrice, 143.4);
  assert.equal(migrated.totalWeightG, 42);
  assert.notEqual(migrated.overallGrade, "F");
  assert.equal(migrated.selectedIds.frame, preset.selections.frame);
});

test("AIO with a separate receiver produces a redundancy caution", () => {
  const preset = presetById("tiny-whoop-beginner");
  const selected = getSelectedParts(preset.selections, parts);
  const warnings = getCompatibilityWarnings(
    {
      ...selected,
      receiver: parts.receiver.find((part) => part.id === "betafpv-elrs-nano"),
    },
    preset.buildClass,
    calculateBuildStats(selected, preset.buildClass),
  );

  assert.ok(warnings.some((warning) => warning.id === "aio-receiver-redundant"));
});

test("AIO with its integrated receiver produces no redundancy caution", () => {
  const preset = presetById("tiny-whoop-beginner");
  const selected = getSelectedParts(preset.selections, parts);
  const stats = calculateBuildStats(selected, preset.buildClass);
  const warnings = getCompatibilityWarnings(selected, preset.buildClass, stats);

  assert.ok(!warnings.some((warning) => warning.id === "aio-receiver-redundant"));
});

test("Matrix 5IN1 integrated receiver and VTX are zero-cost when hosted", () => {
  const fc = parts.flightController.find((part) => part.id === "betafpv-matrix-1s-5in1-ii");
  const receiver = parts.receiver.find((part) => part.id === "betafpv-matrix-5in1-elrs");
  const vtx = parts.vtx.find((part) => part.id === "betafpv-matrix-5in1-vtx");
  const stats = calculateBuildStats(
    {
      frame: null,
      motors: null,
      esc: null,
      flightController: fc,
      props: null,
      battery: null,
      receiver,
      camera: null,
      vtx,
    },
    "tiny-whoop",
  );
  const receiverEntry = stats.partBreakdown.find((entry) => entry.categoryKey === "receiver");
  const vtxEntry = stats.partBreakdown.find((entry) => entry.categoryKey === "vtx");

  assert.equal(receiverEntry.integrated, true);
  assert.equal(receiverEntry.purchaseCost, 0);
  assert.equal(vtxEntry.integrated, true);
  assert.equal(vtxEntry.purchaseCost, 0);
});

test("AIO with a separate ESC produces a redundancy caution", () => {
  const preset = presetById("tiny-whoop-beginner");
  const selected = getSelectedParts(preset.selections, parts);
  const warnings = getCompatibilityWarnings(
    {
      ...selected,
      flightController: parts.flightController.find((part) => part.id === "betafpv-matrix-1s-5in1-ii"),
      esc: parts.esc.find((part) => part.id === "speedybee-bl32-50a"),
    },
    "5-inch-freestyle",
    calculateBuildStats(selected, "5-inch-freestyle"),
  );

  assert.ok(warnings.some((warning) => warning.id === "aio-esc-redundant"));
});

test("unknown weight is labeled instead of treated as zero mass", () => {
  const part = parts.props.find((entry) => entry.id === "gemfan-1811-3");
  const accounting = getPartAccounting(part, "props", {});
  assert.equal(accounting.weightKnown, false);
  assert.equal(accounting.installedWeightG, 0);
  assert.match(accounting.accountingWarning, /weight is not documented/i);
});
