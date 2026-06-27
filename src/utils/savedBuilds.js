import { buildSteps } from "../data/parts.js";
import { safeNumber } from "./buildCalculations.js";

export const savedBuildsStorageKey = "maidenready.savedBuilds.v1";

const isObject = (value) =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const loadSavedBuilds = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawBuilds = window.localStorage.getItem(savedBuildsStorageKey);

    if (!rawBuilds) {
      return [];
    }

    const parsed = JSON.parse(rawBuilds);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (build) =>
        isObject(build) &&
        typeof build.id === "string" &&
        typeof build.name === "string" &&
        typeof build.createdAt === "string" &&
        isObject(build.selectedIds) &&
        (build.buildClass === undefined || typeof build.buildClass === "string") &&
        typeof build.totalPrice === "number" &&
        typeof build.totalWeightG === "number" &&
        typeof build.thrustToWeight === "number" &&
        typeof build.flightTimeMinutes === "number" &&
        typeof build.topSpeedMph === "number" &&
        typeof build.overallGrade === "string",
    );
  } catch (error) {
    console.warn("[MaidenReady] Failed to read saved builds.", error);
    return [];
  }
};

export const persistSavedBuilds = (savedBuilds) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      savedBuildsStorageKey,
      JSON.stringify(savedBuilds),
    );
  } catch (error) {
    console.warn("[MaidenReady] Failed to persist saved builds.", error);
  }
};

export const createAutoBuildName = (date = new Date()) => {
  const stamp = date
    .toISOString()
    .slice(0, 16)
    .replace(/[-:T]/g, "")
    .slice(2);

  return `MR-${stamp}`;
};

export const createSavedBuildSnapshot = ({
  name,
  buildClass,
  selectedIds,
  stats,
  overallGrade,
  createdAt = new Date().toISOString(),
}) => ({
  id: globalThis.crypto?.randomUUID?.() ?? `saved-${Date.now()}`,
  name: name.trim() || createAutoBuildName(new Date(createdAt)),
  createdAt,
  buildClass,
  selectedIds: { ...selectedIds },
  totalPrice: safeNumber(stats.totalPrice, 0),
  totalWeightG: safeNumber(stats.totalWeightG, 0),
  thrustToWeight: safeNumber(stats.thrustToWeight, 0),
  flightTimeMinutes: safeNumber(stats.flightTimeMinutes, 0),
  topSpeedMph: safeNumber(stats.topSpeedMph, 0),
  overallGrade: overallGrade || "N/A",
});

export const resolveSavedBuildSelections = (
  savedBuild,
  partsCatalog,
  fallbackSelections,
  buildClass,
) => {
  const selections = {};
  const missing = [];

  buildSteps.forEach((step) => {
    const partId = savedBuild.selectedIds?.[step.key];
    const part = partsCatalog[step.key]?.find((candidate) => candidate.id === partId);
    const partExists =
      part &&
      (!buildClass || part.compatibleClasses?.includes(buildClass));

    if (partExists) {
      selections[step.key] = partId;
      return;
    }

    missing.push({
      category: step.key,
      id: partId ?? "(missing id)",
    });
  });

  if (missing.length > 0) {
    console.warn(
      `[MaidenReady] Saved build "${savedBuild.name}" contains missing parts.`,
      missing,
    );
  }

  return {
    selections: {
      ...fallbackSelections,
      ...selections,
    },
    missing,
    isComplete: missing.length === 0,
  };
};
