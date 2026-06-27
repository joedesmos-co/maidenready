import { buildSteps, defaultBuildClass } from "../data/parts.js";

export const isPartCompatibleWithClass = (part, buildClass) =>
  part?.compatibleClasses?.includes(buildClass);

export const filterPartsForBuildClass = (partsCatalog, buildClass) =>
  buildSteps.reduce((filteredParts, step) => {
    filteredParts[step.key] = (partsCatalog[step.key] ?? []).filter((part) =>
      isPartCompatibleWithClass(part, buildClass),
    );
    return filteredParts;
  }, {});

export const getDefaultSelectionsForBuildClass = (buildClass, partsCatalog) =>
  buildSteps.reduce((selections, step) => {
    const firstCompatiblePart = (partsCatalog[step.key] ?? []).find((part) =>
      isPartCompatibleWithClass(part, buildClass),
    );

    if (firstCompatiblePart) {
      selections[step.key] = firstCompatiblePart.id;
    }

    return selections;
  }, {});

export const resolveSelectionsForBuildClass = (
  selectedIds,
  buildClass,
  partsCatalog,
) => {
  const defaults = getDefaultSelectionsForBuildClass(buildClass, partsCatalog);
  const selections = { ...defaults };
  const changedKeys = [];

  buildSteps.forEach((step) => {
    const currentPart = (partsCatalog[step.key] ?? []).find(
      (part) => part.id === selectedIds[step.key],
    );

    if (isPartCompatibleWithClass(currentPart, buildClass)) {
      selections[step.key] = currentPart.id;
      return;
    }

    const replacementPart = (partsCatalog[step.key] ?? []).find((part) =>
      isPartCompatibleWithClass(part, buildClass),
    );

    if (replacementPart) {
      if (currentPart && currentPart.id !== replacementPart.id) {
        changedKeys.push(step.key);
      } else if (selectedIds[step.key] && selectedIds[step.key] !== replacementPart.id) {
        changedKeys.push(step.key);
      }

      selections[step.key] = replacementPart.id;
    }
  });

  return {
    selections,
    changedKeys,
  };
};

export const inferBuildClassFromSelections = (
  selectedIds,
  partsCatalog,
  fallbackBuildClass = defaultBuildClass,
) => {
  const classCounts = new Map();

  buildSteps.forEach((step) => {
    const part = (partsCatalog[step.key] ?? []).find(
      (candidate) => candidate.id === selectedIds?.[step.key],
    );

    part?.compatibleClasses?.forEach((buildClass) => {
      classCounts.set(buildClass, (classCounts.get(buildClass) ?? 0) + 1);
    });
  });

  if (classCounts.size === 0) {
    return fallbackBuildClass;
  }

  return [...classCounts.entries()].sort((left, right) => right[1] - left[1])[0][0];
};
