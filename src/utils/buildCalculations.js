import {
  buildClassById,
  buildSteps,
  categoryMeta,
  defaultBuildClass,
} from "../data/parts.js";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const buildClassEstimateProfiles = {
  "tiny-whoop": {
    hardwareWeightG: 6,
    topSpeedMph: { min: 15, max: 35 },
    topSpeedDragFactor: 0.22,
    flightTimeMinutes: { min: 2, max: 5 },
    flightTimeScale: 0.88,
    ductThrustFactor: 0.78,
  },
  cinewhoop: {
    hardwareWeightG: 28,
    topSpeedMph: { min: 25, max: 55 },
    topSpeedDragFactor: 0.28,
    flightTimeMinutes: { min: 3, max: 8 },
    flightTimeScale: 0.92,
    ductThrustFactor: 0.8,
  },
  "3.5-inch-freestyle": {
    hardwareWeightG: 22,
    topSpeedMph: { min: 50, max: 90 },
    topSpeedDragFactor: 0.42,
    flightTimeMinutes: { min: 3, max: 6 },
    flightTimeScale: 0.95,
    ductThrustFactor: 1,
  },
  "5-inch-freestyle": {
    hardwareWeightG: 38,
    topSpeedMph: { min: 70, max: 125 },
    topSpeedDragFactor: 0.48,
    flightTimeMinutes: { min: 3, max: 6 },
    flightTimeScale: 1,
    ductThrustFactor: 1,
  },
  "7-inch-long-range": {
    hardwareWeightG: 55,
    topSpeedMph: { min: 45, max: 95 },
    topSpeedDragFactor: 0.35,
    flightTimeMinutes: { min: 6, max: 18 },
    flightTimeScale: 1.12,
    ductThrustFactor: 1,
  },
};

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

export const formatWeightG = (value) => `~${formatStatNumber(value, 0)} g`;
export const formatThrustG = (value) => `${formatStatNumber(value, 0)} g`;
export const formatThrustToWeight = (value) => `${formatStatNumber(value, 2)}:1`;

export const formatFlightTimeMinutes = (value) => {
  const minutes = safeNumber(value, 0);

  if (minutes <= 0) {
    return "N/A";
  }

  return `~${formatStatNumber(minutes, 0)} min`;
};

export const formatTopSpeedMph = (value) => {
  const mph = safeNumber(value, 0);

  if (mph <= 0) {
    return "N/A";
  }

  return `~${formatStatNumber(mph, 0)} mph`;
};

export const formatFlightTimeRange = (stats) => {
  const min = safeNumber(stats?.flightTimeMinutesMin, 0);
  const max = safeNumber(stats?.flightTimeMinutesMax, 0);

  if (min <= 0 || max <= 0) {
    return formatFlightTimeMinutes(stats?.flightTimeMinutes);
  }

  if (min === max) {
    return `~${formatStatNumber(min, 0)} min`;
  }

  return `${formatStatNumber(min, 0)}–${formatStatNumber(max, 0)} min`;
};

export const formatTopSpeedRange = (stats) => {
  const min = safeNumber(stats?.topSpeedMphMin, 0);
  const max = safeNumber(stats?.topSpeedMphMax, 0);

  if (min <= 0 || max <= 0) {
    return formatTopSpeedMph(stats?.topSpeedMph);
  }

  if (min === max) {
    return `~${formatStatNumber(min, 0)} mph`;
  }

  return `${formatStatNumber(min, 0)}–${formatStatNumber(max, 0)} mph`;
};

export const getEstimateProfile = (buildClass = defaultBuildClass) =>
  buildClassEstimateProfiles[buildClass] ??
  buildClassEstimateProfiles[defaultBuildClass];

export const getSelectedParts = (selectedIds, parts) =>
  buildSteps.reduce((selectedParts, step) => {
    selectedParts[step.key] =
      parts[step.key].find((part) => part.id === selectedIds[step.key]) ?? null;
    return selectedParts;
  }, {});

const getPartPrice = (part) => part.price_usd ?? part.price ?? 0;
const getPartWeightG = (part) => part.weight_g ?? part.weightG ?? 0;

const roundRange = (min, max, step = 1) => ({
  min: Math.round(min / step) * step,
  max: Math.round(max / step) * step,
});

export const calculateBuildStats = (selectedParts, buildClass = defaultBuildClass) => {
  const profile = getEstimateProfile(buildClass);

  const partsWeightG = buildSteps.reduce((sum, step) => {
    const part = selectedParts[step.key];
    const multiplier = categoryMeta[step.key].weightMultiplier;
    return part ? sum + getPartWeightG(part) * multiplier : sum;
  }, 0);

  const totalWeightG = partsWeightG + profile.hardwareWeightG;

  const totalPrice = buildSteps.reduce((sum, step) => {
    const part = selectedParts[step.key];
    const multiplier = categoryMeta[step.key].priceMultiplier;
    return part ? sum + getPartPrice(part) * multiplier : sum;
  }, 0);

  const rawThrustG = calculateTotalThrust(selectedParts);
  const ductFactor =
    selectedParts.frame?.ducted || buildClass === "tiny-whoop" || buildClass === "cinewhoop"
      ? profile.ductThrustFactor
      : 1;
  const totalThrustG = rawThrustG * ductFactor;
  const thrustToWeight = totalWeightG > 0 ? totalThrustG / totalWeightG : 0;

  const rawFlightMinutes = calculateFlightTimeMinutes(
    selectedParts,
    totalWeightG,
    totalThrustG,
  );
  const flightEstimate = calculateFlightTimeEstimate(rawFlightMinutes, profile);
  const topSpeedEstimate = calculateTopSpeedEstimate(selectedParts, profile);

  return {
    totalPrice: roundTo(totalPrice, 2),
    totalWeightG: roundTo(totalWeightG, 0),
    totalThrustG: roundTo(totalThrustG, 0),
    thrustToWeight: roundTo(thrustToWeight, 2),
    flightTimeMinutes: roundTo(flightEstimate.midpoint, 0),
    flightTimeMinutesMin: flightEstimate.min,
    flightTimeMinutesMax: flightEstimate.max,
    topSpeedMph: topSpeedEstimate.midpoint,
    topSpeedMphMin: topSpeedEstimate.min,
    topSpeedMphMax: topSpeedEstimate.max,
    pitchSpeedMph: roundTo(topSpeedEstimate.pitchSpeedMph, 0),
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

export const calculatePitchSpeedMph = ({ motors, props, battery }) => {
  if (!motors || !props || !battery) {
    return 0;
  }

  const kv = safeNumber(motors.kv, 0);
  const pitch = safeNumber(props.pitch, 0);
  const cells = safeNumber(battery.cells, 0);
  const voltage = safeNumber(battery.voltage, cells * 3.7);

  if (kv <= 0 || pitch <= 0 || voltage <= 0) {
    return 0;
  }

  return kv * voltage * pitch * 0.000947;
};

export const calculateTopSpeedEstimate = (selectedParts, profile = getEstimateProfile()) => {
  const pitchSpeedMph = calculatePitchSpeedMph(selectedParts);

  if (pitchSpeedMph <= 0) {
    return {
      pitchSpeedMph: 0,
      min: 0,
      max: 0,
      midpoint: 0,
    };
  }

  const dragAdjusted = pitchSpeedMph * profile.topSpeedDragFactor;
  const midpoint = clamp(
    dragAdjusted,
    profile.topSpeedMph.min,
    profile.topSpeedMph.max,
  );
  const spread = Math.max(3, Math.round(midpoint * 0.12));
  const range = roundRange(
    clamp(midpoint - spread, profile.topSpeedMph.min, profile.topSpeedMph.max),
    clamp(midpoint + spread, profile.topSpeedMph.min, profile.topSpeedMph.max),
    1,
  );

  return {
    pitchSpeedMph,
    min: range.min,
    max: range.max,
    midpoint: Math.round((range.min + range.max) / 2),
  };
};

export const calculateFlightTimeEstimate = (rawMinutes, profile = getEstimateProfile()) => {
  if (rawMinutes <= 0) {
    return { min: 0, max: 0, midpoint: 0 };
  }

  const scaled = rawMinutes * profile.flightTimeScale;
  const midpoint = clamp(
    scaled,
    profile.flightTimeMinutes.min,
    profile.flightTimeMinutes.max,
  );
  const minSpread = Math.max(0.5, midpoint * 0.18);
  const range = roundRange(
    clamp(midpoint - minSpread, profile.flightTimeMinutes.min, profile.flightTimeMinutes.max),
    clamp(midpoint + minSpread, profile.flightTimeMinutes.min, profile.flightTimeMinutes.max),
    1,
  );

  return {
    min: range.min,
    max: range.max,
    midpoint: Math.round((range.min + range.max) / 2),
  };
};

/** @deprecated Use calculatePitchSpeedMph + calculateTopSpeedEstimate instead. */
export const calculateTopSpeedMph = (
  selectedParts,
  efficiencyFactor = 0.65,
  buildClass = defaultBuildClass,
) => {
  const profile = getEstimateProfile(buildClass);
  const estimate = calculateTopSpeedEstimate(selectedParts, {
    ...profile,
    topSpeedDragFactor: profile.topSpeedDragFactor * safeNumber(efficiencyFactor, 0.65),
  });

  return estimate.midpoint;
};

export const validateBuildStats = (stats, buildClass = defaultBuildClass) => {
  const profile = getEstimateProfile(buildClass);
  const issues = [];

  const requiredNumbers = [
    "totalPrice",
    "totalWeightG",
    "totalThrustG",
    "thrustToWeight",
    "flightTimeMinutes",
    "flightTimeMinutesMin",
    "flightTimeMinutesMax",
    "topSpeedMph",
    "topSpeedMphMin",
    "topSpeedMphMax",
  ];

  requiredNumbers.forEach((key) => {
    const value = stats?.[key];

    if (value == null || !Number.isFinite(value)) {
      issues.push(`${key} is missing or not a finite number`);
    }
  });

  if (stats?.flightTimeMinutes <= 0) {
    issues.push("flightTimeMinutes must be greater than zero");
  }

  if (stats?.topSpeedMphMax > profile.topSpeedMph.max + 1) {
    issues.push(
      `top speed max ${stats.topSpeedMphMax} mph exceeds ${buildClass} cap (${profile.topSpeedMph.max} mph)`,
    );
  }

  if (stats?.topSpeedMphMin < profile.topSpeedMph.min - 1) {
    issues.push(
      `top speed min ${stats.topSpeedMphMin} mph below ${buildClass} floor (${profile.topSpeedMph.min} mph)`,
    );
  }

  if (stats?.topSpeedMphMin > stats?.topSpeedMphMax) {
    issues.push("top speed min exceeds max");
  }

  if (stats?.flightTimeMinutesMin > stats?.flightTimeMinutesMax) {
    issues.push("flight time min exceeds max");
  }

  return issues;
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
