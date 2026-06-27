import {
  buildClassById,
  buildSteps,
  categoryMeta,
  defaultBuildClass,
} from "../data/parts";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const safeNumber = (value, fallback = 0) => {
  const number = Number(value);

  return Number.isFinite(number) ? number : fallback;
};

export const roundTo = (value, digits = 1) => {
  const factor = 10 ** digits;
  return Math.round(safeNumber(value, 0) * factor) / factor;
};

export const formatStatNumber = (value, digits = 0) => {
  const safe = roundTo(value, digits);

  return safe.toLocaleString("en-US", {
    minimumFractionDigits: digits > 0 ? digits : 0,
    maximumFractionDigits: digits,
  });
};

export const formatWeightG = (value) => `${formatStatNumber(value, 0)} g`;
export const formatThrustG = (value) => `${formatStatNumber(value, 0)} g`;
export const formatThrustToWeight = (value) => `${formatStatNumber(value, 2)}:1`;
export const formatFlightTimeMinutes = (value) => `${formatStatNumber(value, 1)} min`;
export const formatTopSpeedMph = (value) => `${formatStatNumber(value, 0)} mph`;

export const getSelectedParts = (selectedIds, parts) =>
  buildSteps.reduce((selectedParts, step) => {
    selectedParts[step.key] =
      parts[step.key].find((part) => part.id === selectedIds[step.key]) ?? null;
    return selectedParts;
  }, {});

const getPartPrice = (part) => part.price_usd ?? part.price ?? 0;
const getPartWeightG = (part) => part.weight_g ?? part.weightG ?? 0;

export const calculateBuildStats = (selectedParts, buildClass = defaultBuildClass) => {
  const totalPrice = buildSteps.reduce((sum, step) => {
    const part = selectedParts[step.key];
    const multiplier = categoryMeta[step.key].priceMultiplier;
    return part ? sum + getPartPrice(part) * multiplier : sum;
  }, 0);

  const totalWeightG = buildSteps.reduce((sum, step) => {
    const part = selectedParts[step.key];
    const multiplier = categoryMeta[step.key].weightMultiplier;
    return part ? sum + getPartWeightG(part) * multiplier : sum;
  }, 0);

  const totalThrustG = calculateTotalThrust(selectedParts);
  const thrustToWeight = totalWeightG > 0 ? totalThrustG / totalWeightG : 0;
  const flightTimeMinutes = calculateFlightTimeMinutes(
    selectedParts,
    totalWeightG,
    totalThrustG,
  );
  const topSpeedMph = calculateTopSpeedMph(
    selectedParts,
    getTopSpeedEfficiencyFactor(buildClass),
  );

  return {
    totalPrice: roundTo(totalPrice, 2),
    totalWeightG: roundTo(totalWeightG, 1),
    totalThrustG: roundTo(totalThrustG, 0),
    thrustToWeight: roundTo(thrustToWeight, 2),
    flightTimeMinutes: roundTo(flightTimeMinutes, 1),
    topSpeedMph: roundTo(topSpeedMph, 0),
  };
};

export const getTopSpeedEfficiencyFactor = (buildClass = defaultBuildClass) =>
  buildClassById[buildClass]?.topSpeedEfficiency ??
  buildClassById[defaultBuildClass].topSpeedEfficiency;

export const calculateTotalThrust = ({ motors, props, battery }) => {
  if (!motors || !props || !battery) {
    return 0;
  }

  const thrustG = safeNumber(motors.thrustG, 0);
  const thrustMultiplier = safeNumber(props.thrustMultiplier, 1);
  const cells = safeNumber(battery.cells, motors.primaryCellCount ?? 0);
  const primaryCellCount = safeNumber(motors.primaryCellCount, cells);

  if (thrustG <= 0 || thrustMultiplier <= 0) {
    return 0;
  }

  const voltageFactor = clamp(1 + (cells - primaryCellCount) * 0.14, 0.72, 1.16);

  return thrustG * 4 * thrustMultiplier * voltageFactor;
};

export const calculateFlightTimeMinutes = (
  { motors, props, battery },
  totalWeightG,
  totalThrustG,
) => {
  if (!motors || !props || !battery || totalWeightG <= 0 || totalThrustG <= 0) {
    return 0;
  }

  const maxCurrentA = safeNumber(motors.maxCurrentA, 0);
  const currentMultiplier = safeNumber(props.currentMultiplier, 1);
  const capacityMah = safeNumber(battery.capacityMah, 0);
  const efficiencyMultiplier = safeNumber(props.efficiencyMultiplier, 1);
  const safeWeightG = safeNumber(totalWeightG, 0);
  const safeThrustG = safeNumber(totalThrustG, 0);

  if (maxCurrentA <= 0 || capacityMah <= 0 || safeWeightG <= 0 || safeThrustG <= 0) {
    return 0;
  }

  const totalMotorCurrentA = maxCurrentA * 4 * currentMultiplier;
  const loadRatio = clamp(safeWeightG / safeThrustG, 0.08, 0.28);
  const averageCurrentA = Math.max(12, totalMotorCurrentA * loadRatio * 1.25 + 3.5);
  const usableCapacityAh = (capacityMah / 1000) * 0.78;

  if (averageCurrentA <= 0) {
    return 0;
  }

  return (usableCapacityAh * 60 * efficiencyMultiplier) / averageCurrentA;
};

export const calculateTopSpeedMph = (
  { motors, props, battery },
  efficiencyFactor = 0.65,
) => {
  if (!motors || !props || !battery) {
    return 0;
  }

  const kv = safeNumber(motors.kv, 0);
  const pitch = safeNumber(props.pitch, 0);
  const cells = safeNumber(battery.cells, 0);
  const voltage = safeNumber(battery.voltage, cells * 3.7);
  const safeEfficiency = safeNumber(efficiencyFactor, 0.65);

  if (kv <= 0 || pitch <= 0 || voltage <= 0) {
    return 0;
  }

  return kv * voltage * pitch * 0.000947 * safeEfficiency;
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(safeNumber(value, 0));

export const formatPreciseCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(safeNumber(value, 0));
