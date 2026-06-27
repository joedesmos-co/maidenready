import { buildSteps, categoryMeta } from "../data/parts";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const roundTo = (value, digits = 1) => {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
};

export const getSelectedParts = (selectedIds, parts) =>
  buildSteps.reduce((selectedParts, step) => {
    selectedParts[step.key] =
      parts[step.key].find((part) => part.id === selectedIds[step.key]) ?? null;
    return selectedParts;
  }, {});

export const calculateBuildStats = (selectedParts) => {
  const totalPrice = buildSteps.reduce((sum, step) => {
    const part = selectedParts[step.key];
    const multiplier = categoryMeta[step.key].priceMultiplier;
    return part ? sum + part.price * multiplier : sum;
  }, 0);

  const totalWeightG = buildSteps.reduce((sum, step) => {
    const part = selectedParts[step.key];
    const multiplier = categoryMeta[step.key].weightMultiplier;
    return part ? sum + part.weightG * multiplier : sum;
  }, 0);

  const totalThrustG = calculateTotalThrust(selectedParts);
  const thrustToWeight = totalWeightG > 0 ? totalThrustG / totalWeightG : 0;
  const flightTimeMinutes = calculateFlightTimeMinutes(
    selectedParts,
    totalWeightG,
    totalThrustG,
  );

  return {
    totalPrice: roundTo(totalPrice, 2),
    totalWeightG: roundTo(totalWeightG, 1),
    totalThrustG: roundTo(totalThrustG, 0),
    thrustToWeight: roundTo(thrustToWeight, 2),
    flightTimeMinutes: roundTo(flightTimeMinutes, 1),
  };
};

export const calculateTotalThrust = ({ motors, props, battery }) => {
  if (!motors || !props || !battery) {
    return 0;
  }

  const voltageFactor = clamp(
    1 + (battery.cells - motors.primaryCellCount) * 0.14,
    0.72,
    1.16,
  );

  return motors.thrustG * 4 * props.thrustMultiplier * voltageFactor;
};

export const calculateFlightTimeMinutes = (
  { motors, props, battery },
  totalWeightG,
  totalThrustG,
) => {
  if (!motors || !props || !battery || totalWeightG <= 0 || totalThrustG <= 0) {
    return 0;
  }

  const totalMotorCurrentA =
    motors.maxCurrentA * 4 * (props.currentMultiplier ?? 1);
  const loadRatio = clamp(totalWeightG / totalThrustG, 0.08, 0.28);
  const averageCurrentA = Math.max(12, totalMotorCurrentA * loadRatio * 1.25 + 3.5);
  const usableCapacityAh = (battery.capacityMah / 1000) * 0.78;

  return usableCapacityAh * 60 * (props.efficiencyMultiplier ?? 1) / averageCurrentA;
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export const formatPreciseCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
