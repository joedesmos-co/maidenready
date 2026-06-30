import {
  calculateBuildStats,
  formatCurrency,
  formatFlightTimeMinutes,
  formatFlightTimeRange,
  formatThrustG,
  formatThrustToWeight,
  formatTopSpeedMph,
  formatTopSpeedRange,
  formatWeightG,
  getSelectedParts,
  safeNumber,
} from "./buildCalculations.js";
import { getCompatibilityWarnings } from "./compatibility.js";
import {
  getDefaultSelectionsForBuildClass,
  inferBuildClassFromSelections,
  resolveSelectionsForBuildClass,
} from "./buildClasses.js";
import { calculateBuildGrades } from "./grades.js";
import { resolveSavedBuildSelections } from "./savedBuilds.js";

const gradeRank = {
  "A+": 12,
  A: 11,
  "A-": 10,
  "B+": 9,
  B: 8,
  "B-": 7,
  "C+": 6,
  C: 5,
  "C-": 4,
  "D+": 3,
  D: 2,
  "D-": 1,
  F: 0,
};

export const comparisonMetrics = [
  {
    key: "totalPrice",
    label: "Price",
    preference: "lower",
  },
  {
    key: "totalWeightG",
    label: "Mass",
    preference: "lower",
  },
  {
    key: "totalThrustG",
    label: "Thrust",
    preference: "higher",
  },
  {
    key: "thrustToWeight",
    label: "T:W",
    preference: "higher",
  },
  {
    key: "flightTimeMinutes",
    label: "Flight time",
    preference: "higher",
  },
  {
    key: "topSpeedMph",
    label: "Top speed",
    preference: "higher",
  },
  {
    key: "overallGrade",
    label: "Grade",
    preference: "higher",
    rank: (value) => gradeRank[value] ?? -1,
  },
  {
    key: "warningCount",
    label: "Warnings",
    preference: "lower",
  },
];

export const getSavedBuildComparisonStats = (savedBuild, partsCatalog) => {
  const buildClass =
    savedBuild.buildClass ??
    inferBuildClassFromSelections(savedBuild.selectedIds, partsCatalog);
  const fallbackSelections = getDefaultSelectionsForBuildClass(
    buildClass,
    partsCatalog,
  );
  const resolved = resolveSavedBuildSelections(
    savedBuild,
    partsCatalog,
    fallbackSelections,
    buildClass,
  );
  const classResolved = resolveSelectionsForBuildClass(
    resolved.selections,
    buildClass,
    partsCatalog,
  );
  const selectedParts = getSelectedParts(
    classResolved.selections,
    partsCatalog,
  );
  const stats = calculateBuildStats(selectedParts, buildClass);
  const warnings = getCompatibilityWarnings(
    selectedParts,
    buildClass,
    stats,
  );
  const grades = calculateBuildGrades(stats, warnings);

  return {
    ...stats,
    buildClass,
    overallGrade: grades.overall.grade,
    warningCount: warnings.length,
    missingPartCount: resolved.missing.length,
  };
};

export const compareMetric = (metric, leftStats, rightStats) => {
  const leftRaw = leftStats[metric.key];
  const rightRaw = rightStats[metric.key];
  const leftValue = metric.rank ? metric.rank(leftRaw) : safeNumber(leftRaw, 0);
  const rightValue = metric.rank ? metric.rank(rightRaw) : safeNumber(rightRaw, 0);

  if (leftValue === rightValue) {
    return "tie";
  }

  const leftWins =
    metric.preference === "lower"
      ? leftValue < rightValue
      : leftValue > rightValue;

  return leftWins ? "left" : "right";
};

const summaryFragments = {
  totalPrice: {
    left: "Build A is cheaper",
    right: "Build B is cheaper",
  },
  totalWeightG: {
    left: "Build A is lighter",
    right: "Build B is lighter",
  },
  totalThrustG: {
    left: "Build A has more thrust",
    right: "Build B has more thrust",
  },
  thrustToWeight: {
    left: "Build A has stronger punchout",
    right: "Build B has stronger punchout",
  },
  flightTimeMinutes: {
    left: "Build A should fly longer",
    right: "Build B should fly longer",
  },
  topSpeedMph: {
    left: "Build A has higher top speed",
    right: "Build B has higher top speed",
  },
  overallGrade: {
    left: "Build A grades higher overall",
    right: "Build B grades higher overall",
  },
  warningCount: {
    left: "Build A has fewer warnings",
    right: "Build B has fewer warnings",
  },
};

export const buildComparisonSummary = (results, leftBuildClass, rightBuildClass) => {
  const fragments = results
    .filter((result) => result.winner !== "tie")
    .map((result) => summaryFragments[result.metric.key]?.[result.winner])
    .filter(Boolean);

  const classNote =
    leftBuildClass &&
    rightBuildClass &&
    leftBuildClass !== rightBuildClass
      ? "Different build classes — compare trends, not absolute winners."
      : "";

  if (fragments.length === 0) {
    return classNote || "Build A and Build B are closely matched on the saved metrics.";
  }

  const summary = `${fragments.slice(0, 3).join("; ")}.`;

  return classNote ? `${classNote} ${summary}` : summary;
};
