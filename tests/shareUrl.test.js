import test from "node:test";
import assert from "node:assert/strict";
import { buildSteps, parts, buildClassIds } from "../src/data/parts.js";
import { buildShareUrl, resolveSelectionsFromSearch, resolveBuildClassFromSearch, hasSharedBuildInSearch } from "../src/utils/shareUrl.js";
import { getDefaultSelectionsForBuildClass } from "../src/utils/buildClasses.js";

test("resolveBuildClassFromSearch validates", () => {
  assert.equal(resolveBuildClassFromSearch("?class=tiny-whoop", buildClassIds, "5-inch-freestyle"), "tiny-whoop");
  assert.equal(resolveBuildClassFromSearch("?class=invalid", buildClassIds, "5-inch-freestyle"), "5-inch-freestyle");
});

test("resolveSelectionsFromSearch ignores unknown ids", () => {
  const defaults = getDefaultSelectionsForBuildClass("5-inch-freestyle", parts);
  const resolved = resolveSelectionsFromSearch("?frame=does-not-exist", parts, defaults);
  assert.equal(resolved.frame, defaults.frame);
});

test("hasSharedBuildInSearch false without params", () => {
  assert.equal(hasSharedBuildInSearch("", "5-inch-freestyle"), false);
});