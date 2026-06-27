import { buildSteps, defaultBuildClass } from "../data/parts.js";
import {
  getDefaultSelectionsForBuildClass,
  isPartCompatibleWithClass,
} from "./buildClasses.js";

export const resolvePresetParts = (preset, partsCatalog) => {
  const presetBuildClass = preset.buildClass ?? defaultBuildClass;
  const defaults = getDefaultSelectionsForBuildClass(presetBuildClass, partsCatalog);
  const selections = { ...defaults };
  const selectedParts = {};
  const missing = [];
  const incompatible = [];

  buildSteps.forEach((step) => {
    const partId = preset.selections?.[step.key];
    const part = partsCatalog[step.key]?.find((candidate) => candidate.id === partId);

    if (
      preset.buildClass &&
      part &&
      !isPartCompatibleWithClass(part, preset.buildClass)
    ) {
      incompatible.push({
        category: step.key,
        id: part.id,
        buildClass: preset.buildClass,
      });
      return;
    }

    if (part) {
      selections[step.key] = partId;
      selectedParts[step.key] = part;
      return;
    }

    missing.push({
      category: step.key,
      id: partId ?? "(missing id)",
    });
  });

  if (missing.length > 0) {
    console.warn(
      `[MaidenReady] Preset "${preset.name}" references missing part IDs.`,
      missing,
    );
  }

  if (incompatible.length > 0) {
    console.warn(
      `[MaidenReady] Preset "${preset.name}" references incompatible parts.`,
      incompatible,
    );
  }

  return {
    selections,
    selectedParts,
    missing,
    incompatible,
    isComplete: missing.length === 0 && incompatible.length === 0,
    buildClass: presetBuildClass,
  };
};
