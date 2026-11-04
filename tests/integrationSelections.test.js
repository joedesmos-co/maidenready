import test from "node:test";
import assert from "node:assert/strict";
import { parts } from "../src/data/parts.js";
import {
  getDefaultSelectionsForBuildClass,
  normalizeIntegratedSelections,
} from "../src/utils/buildClasses.js";

const tinyDefaults = getDefaultSelectionsForBuildClass("tiny-whoop", parts);

test("virtual parts are not counted as real purchasable products", () => {
  const all = Object.values(parts).flat();
  const virtual = all.filter((part) => part.isVirtual);
  const real = all.filter((part) => !part.isVirtual);

  assert.equal(virtual.length, 9);
  assert.equal(real.length, 324);
  assert.ok(virtual.every((part) => part.price === 0 && part.weightG === 0));
});

test("selecting an AIO fills integrated ESC and receiver roles", () => {
  const normalized = normalizeIntegratedSelections(
    tinyDefaults,
    "tiny-whoop",
    parts,
    "flightController",
  );

  const esc = parts.esc.find((part) => part.id === normalized.selections.esc);
  const receiver = parts.receiver.find(
    (part) => part.id === normalized.selections.receiver,
  );

  assert.equal(esc.isVirtual, true);
  assert.equal(esc.integratedInto, tinyDefaults.flightController);
  assert.equal(receiver.isVirtual, true);
  assert.equal(receiver.integratedInto, tinyDefaults.flightController);
});

test("changing to a standalone FC replaces virtual roles with real parts", () => {
  const normalized = normalizeIntegratedSelections(
    {
      ...tinyDefaults,
      flightController: "speedybee-f405-v4",
    },
    "5-inch-freestyle",
    parts,
    "flightController",
  );

  const esc = parts.esc.find((part) => part.id === normalized.selections.esc);
  const receiver = parts.receiver.find(
    (part) => part.id === normalized.selections.receiver,
  );

  assert.equal(esc.isVirtual, undefined);
  assert.equal(receiver.isVirtual, undefined);
  assert.ok(normalized.changedKeys.includes("esc"));
  assert.ok(normalized.changedKeys.includes("receiver"));
});

test("an orphaned virtual receiver falls back to a real receiver", () => {
  const normalized = normalizeIntegratedSelections(
    {
      ...tinyDefaults,
      flightController: "speedybee-f405-v4",
      receiver: "betafpv-f4-1s-aio-elrs",
    },
    "5-inch-freestyle",
    parts,
  );

  const receiver = parts.receiver.find(
    (part) => part.id === normalized.selections.receiver,
  );

  assert.equal(receiver.isVirtual, undefined);
  assert.ok(normalized.changedKeys.includes("receiver"));
});

test("virtual integrated receiver is visible only with its host AIO", () => {
  const virtualReceiver = parts.receiver.find(
    (part) => part.id === "betafpv-f4-1s-aio-elrs",
  );
  const host = parts.flightController.find(
    (part) => part.id === "betafpv-f4-1s-aio-fc",
  );

  assert.equal(virtualReceiver.isVirtual, true);
  assert.equal(virtualReceiver.integratedInto, host.id);
});
