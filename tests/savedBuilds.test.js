import test from "node:test";
import assert from "node:assert/strict";
import { loadSavedBuilds } from "../src/utils/savedBuilds.js";

test("loadSavedBuilds returns array in node (no window)", () => {
  const builds = loadSavedBuilds();
  assert.ok(Array.isArray(builds));
});