import test from "node:test";
import assert from "node:assert/strict";
import {
  getCompatibilityScore,
  getCompatibilityWarnings,
} from "../src/utils/compatibility.js";

const build = (overrides = {}) => {
  const parts = {
    frame: {
      id: "frame",
      name: "Test Frame",
      maxPropInches: 5.1,
      motorMounts: ["16x16"],
      stackMounts: ["30.5x30.5"],
    },
    motors: {
      id: "motor",
      name: "Test Motor",
      recommendedCells: [6],
      mountPattern: "16x16",
      maxCurrentA: 40,
    },
    esc: {
      id: "esc",
      name: "Test ESC",
      continuousAmp: 60,
      supportedCells: [4, 5, 6],
      mountPattern: "30.5x30.5",
    },
    flightController: {
      id: "fc",
      name: "Test FC",
      mountPattern: "30.5x30.5",
      supportedCells: [6],
      isAio: false,
    },
    props: {
      id: "prop",
      name: "Test Prop",
      diameterInches: 5.1,
      currentMultiplier: 1,
    },
    battery: {
      id: "battery",
      name: "Test Battery",
      cells: 6,
      connector: "XT60",
    },
    receiver: {
      id: "rx",
      name: "Test RX",
      protocol: "ExpressLRS",
    },
    camera: {
      id: "cam",
      name: "Test Camera",
      videoSystem: "analog",
    },
    vtx: {
      id: "vtx",
      name: "Test VTX",
      videoSystem: "analog",
    },
  };

  for (const [key, value] of Object.entries(overrides)) {
    parts[key] = value === null ? null : { ...parts[key], ...value };
  }

  return parts;
};

const warningsFor = (overrides) =>
  getCompatibilityWarnings(build(overrides), "5-inch-freestyle", {});

const has = (warnings, id) => warnings.some((warning) => warning.id === id);

test("a fully documented build is clean", () => {
  assert.deepEqual(warningsFor({}), []);
});

test("motor cell mismatch is a hard incompatibility", () => {
  const warnings = warningsFor({ battery: { cells: 4 } });
  assert.ok(has(warnings, "motor-cell-count"));
  assert.equal(
    warnings.find((warning) => warning.id === "motor-cell-count").severity,
    "high",
  );
});

test("missing motor cell rating is unknown, not compatible", () => {
  const warnings = warningsFor({ motors: { recommendedCells: [] } });
  assert.ok(has(warnings, "unknown-motor-cells"));
  assert.equal(
    warnings.find((warning) => warning.id === "unknown-motor-cells").severity,
    "unknown",
  );
});

test("oversized props are a hard incompatibility", () => {
  const warnings = warningsFor({ props: { diameterInches: 7 } });
  assert.ok(has(warnings, "prop-clearance"));
});

test("missing prop or frame size is unknown", () => {
  const warnings = warningsFor({ frame: { maxPropInches: null } });
  assert.ok(has(warnings, "unknown-prop-clearance"));
});

test("motor mount mismatch is a hard incompatibility", () => {
  const warnings = warningsFor({ motors: { mountPattern: "19x19" } });
  assert.ok(has(warnings, "motor-mount"));
});

test("missing motor mount is unknown", () => {
  const warnings = warningsFor({ motors: { mountPattern: null } });
  assert.ok(has(warnings, "unknown-motor-mount"));
});

test("FC and ESC mount mismatch is a caution", () => {
  const warnings = warningsFor({ esc: { mountPattern: "20x20" } });
  assert.ok(has(warnings, "fc-esc-stack"));
  assert.equal(
    warnings.find((warning) => warning.id === "fc-esc-stack").severity,
    "medium",
  );
});

test("missing FC/ESC mount is unknown", () => {
  const warnings = warningsFor({ flightController: { mountPattern: null } });
  assert.ok(has(warnings, "unknown-fc-esc-stack"));
});

test("undersized ESC current is a hard incompatibility", () => {
  const warnings = warningsFor({ esc: { continuousAmp: 28 } });
  assert.ok(has(warnings, "esc-current"));
});

test("missing ESC or motor current is unknown", () => {
  const warnings = warningsFor({ motors: { maxCurrentA: null } });
  assert.ok(has(warnings, "unknown-esc-current"));
});

test("ESC voltage mismatch is a hard incompatibility", () => {
  const warnings = warningsFor({ esc: { supportedCells: [4] } });
  assert.ok(has(warnings, "esc-voltage"));
});

test("analog camera with digital VTX is a hard incompatibility", () => {
  const warnings = warningsFor({
    camera: { videoSystem: "analog" },
    vtx: { videoSystem: "digital", digitalSystem: "O3" },
  });
  assert.ok(has(warnings, "video-analog-digital"));
});

test("missing video system is unknown", () => {
  const warnings = warningsFor({ camera: { videoSystem: null } });
  assert.ok(has(warnings, "unknown-video-system"));
});

test("digital ecosystem mismatch is a hard incompatibility", () => {
  const warnings = warningsFor({
    camera: { videoSystem: "digital", digitalSystem: "O3" },
    vtx: { videoSystem: "digital", digitalSystem: "HDZero" },
  });
  assert.ok(has(warnings, "video-digital-system"));
});

test("AIO battery connector mismatch is a hard incompatibility", () => {
  const warnings = warningsFor({
    flightController: { isAio: true, batteryConnector: "XT30" },
    battery: { connector: "XT60" },
  });
  assert.ok(has(warnings, "battery-connector"));
});

test("unknown AIO connector is unknown", () => {
  const warnings = warningsFor({
    flightController: { isAio: true, batteryConnector: null },
    battery: { connector: "XT60" },
  });
  assert.ok(has(warnings, "unknown-aio-connector"));
});

test("unknown battery connector is unknown", () => {
  const warnings = warningsFor({ battery: { connector: null } });
  assert.ok(has(warnings, "unknown-battery-connector"));
});

test("receiver protocol missing is unknown", () => {
  const warnings = warningsFor({ receiver: { protocol: null } });
  assert.ok(has(warnings, "unknown-receiver-protocol"));
});

test("unknown warnings reduce the compatibility score less than hard issues", () => {
  const hard = getCompatibilityScore([
    { severity: "high", id: "prop-clearance" },
  ]);
  const unknown = getCompatibilityScore([
    { severity: "unknown", id: "unknown-prop-clearance" },
  ]);
  assert.ok(unknown > hard);
  assert.ok(unknown < 100);
});