import test from "node:test";
import assert from "node:assert/strict";
import { loadSavedBuilds } from "../src/utils/savedBuilds.js";

test("loadSavedBuilds returns array in node (no window)", () => {
  const builds = loadSavedBuilds();
  assert.ok(Array.isArray(builds));
});

test("loadSavedBuilds ignores malformed local storage", () => {
  const previousWindow = globalThis.window;
  globalThis.window = {
    localStorage: {
      getItem: () => "{not valid json",
    },
  };

  assert.deepEqual(loadSavedBuilds(), []);
  globalThis.window = previousWindow;
});

test("loadSavedBuilds ignores non-array payloads", () => {
  const previousWindow = globalThis.window;
  globalThis.window = {
    localStorage: {
      getItem: () => JSON.stringify({ build: "nope" }),
    },
  };

  assert.deepEqual(loadSavedBuilds(), []);
  globalThis.window = previousWindow;
});
