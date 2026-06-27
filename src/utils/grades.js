import { getCompatibilityScore } from "./compatibility";
import { safeNumber } from "./buildCalculations";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const gradeScale = [
  { min: 97, grade: "A+" },
  { min: 93, grade: "A" },
  { min: 90, grade: "A-" },
  { min: 87, grade: "B+" },
  { min: 83, grade: "B" },
  { min: 80, grade: "B-" },
  { min: 77, grade: "C+" },
  { min: 73, grade: "C" },
  { min: 70, grade: "C-" },
  { min: 67, grade: "D+" },
  { min: 63, grade: "D" },
  { min: 60, grade: "D-" },
  { min: 0, grade: "F" },
];

export const scoreToGrade = (score) =>
  gradeScale.find((item) => score >= item.min)?.grade ?? "F";

const powerScore = (thrustToWeight) => {
  if (thrustToWeight >= 8) return 98;
  if (thrustToWeight >= 7) return 92;
  if (thrustToWeight >= 6) return 85;
  if (thrustToWeight >= 5) return 75;
  if (thrustToWeight >= 4) return 64;
  return 48;
};

const flightTimeScore = (minutes) => {
  if (minutes >= 5) return 96;
  if (minutes >= 4.2) return 88;
  if (minutes >= 3.4) return 80;
  if (minutes >= 2.7) return 70;
  if (minutes >= 2) return 62;
  return 48;
};

const costEfficiencyScore = (stats, compatibilityScore) => {
  const price = stats.totalPrice;
  let score = 50;

  if (price <= 320) score = 96;
  else if (price <= 400) score = 88;
  else if (price <= 500) score = 78;
  else if (price <= 650) score = 66;
  else score = 52;

  if (stats.thrustToWeight >= 6.5) score += 4;
  if (stats.flightTimeMinutes >= 3.5) score += 3;
  if (compatibilityScore < 75) score -= 10;

  return clamp(score, 0, 100);
};

export const calculateBuildGrades = (stats, warnings) => {
  const safeStats = {
    totalPrice: safeNumber(stats.totalPrice, 0),
    totalWeightG: safeNumber(stats.totalWeightG, 0),
    totalThrustG: safeNumber(stats.totalThrustG, 0),
    thrustToWeight: safeNumber(stats.thrustToWeight, 0),
    flightTimeMinutes: safeNumber(stats.flightTimeMinutes, 0),
    topSpeedMph: safeNumber(stats.topSpeedMph, 0),
  };
  const compatibilityScore = getCompatibilityScore(warnings);
  const scores = {
    power: powerScore(safeStats.thrustToWeight),
    flightTime: flightTimeScore(safeStats.flightTimeMinutes),
    compatibility: compatibilityScore,
    costEfficiency: costEfficiencyScore(safeStats, compatibilityScore),
  };

  scores.overall = Math.round(
    scores.power * 0.25 +
      scores.flightTime * 0.2 +
      scores.compatibility * 0.35 +
      scores.costEfficiency * 0.2,
  );

  return {
    overall: {
      label: "Overall",
      score: scores.overall,
      grade: scoreToGrade(scores.overall),
    },
    power: {
      label: "Power",
      score: scores.power,
      grade: scoreToGrade(scores.power),
    },
    flightTime: {
      label: "Flight time",
      score: scores.flightTime,
      grade: scoreToGrade(scores.flightTime),
    },
    compatibility: {
      label: "Compatibility",
      score: scores.compatibility,
      grade: scoreToGrade(scores.compatibility),
    },
    costEfficiency: {
      label: "Cost efficiency",
      score: scores.costEfficiency,
      grade: scoreToGrade(scores.costEfficiency),
    },
  };
};
