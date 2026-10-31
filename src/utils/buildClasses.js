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

export const getDefaultSelectionsForBuildClass = (buildClass, partsCatalog) => {
  const selections = buildSteps.reduce((nextSelections, step) => {
    const firstCompatiblePart = (partsCatalog[step.key] ?? []).find((part) =>
      isPartCompatibleWithClass(part, buildClass),
    );

    if (firstCompatiblePart) {
      nextSelections[step.key] = firstCompatiblePart.id;
    }

    return nextSelections;
  }, {});

  return normalizeIntegratedSelections(
    selections,
    buildClass,
    partsCatalog,
    "flightController",
  ).selections;
};

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

export function normalizeIntegratedSelections(
  selectedIds,
  buildClass,
  partsCatalog,
  changedKey = null,
) {
  const selections = { ...selectedIds };
  const changedKeys = [];
  const flightController = (partsCatalog.flightController ?? []).find(
    (part) => part.id === selections.flightController,
  );
  const roles = new Set(flightController?.integratedRoles ?? []);
  const virtualByRole = new Map();

  for (const role of ["esc", "receiver", "vtx"]) {
    const virtual = (partsCatalog[role] ?? []).find(
      (part) =>
        part.isVirtual &&
        part.integratedInto === flightController?.id &&
        part.integratedRole === role,
    );

    if (virtual) {
      virtualByRole.set(role, virtual);
    }
  }

  const firstRealPart = (role) =>
    (partsCatalog[role] ?? []).find(
      (part) =>
        !part.isVirtual &&
        !part.integratedInto &&
        isPartCompatibleWithClass(part, buildClass),
    );

  for (const role of ["esc", "receiver", "vtx"]) {
    const current = (partsCatalog[role] ?? []).find(
      (part) => part.id === selections[role],
    );
    const currentIsVirtual = Boolean(
      current?.isVirtual || current?.integratedInto,
    );
    const virtual = virtualByRole.get(role);

    if (changedKey === "flightController" && flightController) {
      if (roles.has(role) && virtual) {
        if (selections[role] !== virtual.id) {
          selections[role] = virtual.id;
          changedKeys.push(role);
        }
        continue;
      }

      if (currentIsVirtual) {
        const fallback = firstRealPart(role);
        if (fallback) {
          selections[role] = fallback.id;
          changedKeys.push(role);
        }
      }
      continue;
    }

    if (currentIsVirtual && (!flightController || current.integratedInto !== flightController.id)) {
      const fallback = firstRealPart(role);
      if (fallback) {
        selections[role] = fallback.id;
        changedKeys.push(role);
      }
    }
  }

  return { selections, changedKeys };
}
