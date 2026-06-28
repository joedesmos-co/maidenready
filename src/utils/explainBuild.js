import { buildClassById, buildSteps, defaultBuildClass } from "../data/parts";
import { formatStatNumber, formatFlightTimeRange, formatTopSpeedRange } from "./buildCalculations.js";

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

const formatCount = (count, singular, plural = `${singular}s`) =>
  `${count} ${count === 1 ? singular : plural}`;

const getPowerClass = (thrustToWeight) => {
  if (thrustToWeight >= 14) {
    return "high-power";
  }

  if (thrustToWeight >= 11) {
    return "strong";
  }

  if (thrustToWeight >= 8.5) {
    return "balanced";
  }

  return "efficiency-oriented";
};

const getKvClass = (cells, kv) => {
  if ((cells >= 6 && kv >= 1950) || (cells <= 4 && kv >= 2400)) {
    return "aggressive KV";
  }

  if ((cells >= 6 && kv < 1800) || (cells <= 4 && kv < 2200)) {
    return "controlled KV";
  }

  return "middle KV";
};

const getSpeedClass = (topSpeedMph) => {
  if (topSpeedMph >= 125) {
    return "high top-end speed";
  }

  if (topSpeedMph >= 105) {
    return "fast top-end";
  }

  if (topSpeedMph >= 85) {
    return "moderate top speed";
  }

  return "low top speed";
};

const hasCompleteBuild = (selectedParts) =>
  buildSteps.every((step) => Boolean(selectedParts[step.key]));

const uniqueItems = (items) => [...new Set(items.filter(Boolean))];

export const explainBuild = ({
  selectedParts,
  stats,
  warnings,
  overallGrade,
  buildClass = defaultBuildClass,
}) => {
  if (!hasCompleteBuild(selectedParts)) {
    return {
      isComplete: false,
      sections: [],
    };
  }

  const highWarnings = warnings.filter((warning) => warning.severity === "high");
  const hasDangerWarnings = highWarnings.length > 0;
  const { battery, motors } = selectedParts;
  const cells = battery.cells;
  const cellLabel = `${cells}S`;
  const kv = motors.kv;
  const powerClass = getPowerClass(stats.thrustToWeight);
  const kvClass = getKvClass(cells, kv);
  const speedClass = getSpeedClass(stats.topSpeedMph);
  const grade = overallGrade?.grade ?? "N/A";
  const gradeIsStrong = (gradeRank[grade] ?? 0) >= gradeRank["B+"];
  const warningLabel = formatCount(warnings.length, "warning");
  const buildClassLabel =
    buildClassById[buildClass]?.label.toLowerCase() ??
    buildClassById[defaultBuildClass].label.toLowerCase();

  const personalityLead = hasDangerWarnings
    ? `This configuration is not maiden-ready: ${formatCount(
        highWarnings.length,
        "high-severity compatibility issue",
        "high-severity compatibility issues",
      )} must be resolved before arming.`
    : `This reads as a ${powerClass} ${cellLabel} ${buildClassLabel} build.`;

  const flightRange = formatFlightTimeRange(stats);
  const speedRange = formatTopSpeedRange(stats);
  const buildPersonality = `${personalityLead} Estimated all-up mass is ~${formatStatNumber(stats.totalWeightG, 0)}g with ${formatStatNumber(stats.thrustToWeight, 2)}:1 thrust-to-weight, estimated flight ${flightRange}, estimated top speed ${speedRange}. Overall grade: ${grade}. Motor choice: ${kv}KV on ${cellLabel}.`;

  const strengths = uniqueItems([
    stats.thrustToWeight >= 13 &&
      "Strong punchout margin for freestyle recoveries and vertical moves.",
    stats.topSpeedMph >= 115 &&
      `The ${speedClass} estimate should feel quick in open space when the tune and battery are healthy.`,
    stats.flightTimeMinutes >= 3.5 &&
      "Flight-time estimate is usable for longer practice lines and less rushed packs.",
    stats.totalWeightG < 530 &&
      `Estimated mass is on the lighter side for a ${buildClassLabel} build, which should help response and braking.`,
    warnings.length === 0 &&
      "Static compatibility rules do not see frame, voltage, stack, or video-system conflicts.",
    gradeIsStrong &&
      `The ${grade} overall grade suggests the current choices are balanced for this calculator's rules.`,
  ]);

  if (strengths.length === 0) {
    strengths.push(
      `The build uses standard ${buildClassLabel} part categories, so it should be easy to reason about and iterate.`,
    );
  }

  const tradeoffs = uniqueItems([
    hasDangerWarnings &&
      "High-severity compatibility warnings must be resolved before a first hover or maiden flight.",
    warnings.length > 0 &&
      `${warningLabel} remain in the compatibility check, so inspect the flagged areas before ordering parts.`,
    stats.flightTimeMinutes < 3 &&
      "Flight time is estimated short; high throttle use, voltage sag, and wind can make it shorter.",
    stats.thrustToWeight >= 13 &&
      "High power usually means higher current draw, more prop load, and more battery stress.",
    stats.totalWeightG > 590 &&
      `Estimated mass is heavy for a ${buildClassLabel} quad, so inertia and crash energy will be higher.`,
    stats.topSpeedMph < 95 &&
      "Top-speed estimate is modest; this setup is more about control than outright speed.",
    kvClass === "aggressive KV" &&
      `${kvClass} on ${cellLabel} will feel sharp, but it leaves less room for sloppy throttle management.`,
  ]);

  if (tradeoffs.length === 0) {
    tradeoffs.push(
      "Main uncertainty is real-world drag, voltage sag, tune quality, battery health, and hardware weight.",
    );
  }

  const beginnerNote = (() => {
    if (hasDangerWarnings) {
      return "Not beginner-ready yet. Fix the high-severity warnings first, then have an experienced builder inspect wiring, failsafe, motor direction, and video link before the first hover.";
    }

    if (stats.thrustToWeight >= 13 || stats.topSpeedMph >= 120) {
      return "Probably not the easiest first quad unless you already have simulator time. Use conservative rates, a throttle limit, and a large open area for the first packs.";
    }

    if (cells <= 4 && stats.thrustToWeight < 11 && warnings.length === 0) {
      return `More approachable for a first ${buildClassLabel} build, but still treat it like a full-power quad. Check failsafe, props-off motor direction, and range before flight.`;
    }

    return `Reasonable as a first ${buildClassLabel} build only if the setup is checked carefully. Start with gentle props, conservative rates, and short line-of-sight shakedown packs.`;
  })();

  return {
    isComplete: true,
    isMaidenReady: !hasDangerWarnings,
    sections: [
      {
        title: "Build personality",
        body: buildPersonality,
        danger: hasDangerWarnings,
      },
      {
        title: "Strengths",
        items: strengths,
      },
      {
        title: "Tradeoffs",
        items: tradeoffs,
        danger: hasDangerWarnings,
      },
      {
        title: "Beginner note",
        body: beginnerNote,
        danger: hasDangerWarnings,
      },
    ],
  };
};
