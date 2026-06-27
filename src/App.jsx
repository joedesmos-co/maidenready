import { useMemo, useState } from "react";
import { buildSteps, categoryMeta, parts } from "./data/parts";
import {
  calculateBuildStats,
  formatCurrency,
  formatPreciseCurrency,
  getSelectedParts,
} from "./utils/buildCalculations";
import { getCompatibilityWarnings } from "./utils/compatibility";
import { calculateBuildGrades } from "./utils/grades";

const initialSelections = buildSteps.reduce((selections, step) => {
  selections[step.key] = parts[step.key][0].id;
  return selections;
}, {});

const statCards = [
  { key: "totalPrice", label: "Est. price", format: formatCurrency },
  {
    key: "totalWeightG",
    label: "Est. mass",
    format: (value) => `${value.toLocaleString()} g`,
  },
  {
    key: "totalThrustG",
    label: "Est. thrust",
    format: (value) => `${value.toLocaleString()} g`,
  },
  {
    key: "thrustToWeight",
    label: "Est. T:W",
    format: (value) => `${value.toFixed(2)}:1`,
  },
  {
    key: "flightTimeMinutes",
    label: "Est. flight",
    format: (value) => `${value.toFixed(1)} min`,
  },
];

function App() {
  const [selectedIds, setSelectedIds] = useState(initialSelections);

  const selectedParts = useMemo(
    () => getSelectedParts(selectedIds, parts),
    [selectedIds],
  );
  const stats = useMemo(() => calculateBuildStats(selectedParts), [selectedParts]);
  const warnings = useMemo(
    () => getCompatibilityWarnings(selectedParts),
    [selectedParts],
  );
  const grades = useMemo(
    () => calculateBuildGrades(stats, warnings),
    [stats, warnings],
  );

  const handleSelectionChange = (key, partId) => {
    setSelectedIds((current) => ({ ...current, [key]: partId }));
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">MaidenReady.com</p>
          <h1>5-inch FPV build calculator</h1>
        </div>
        <GradePill grade={grades.overall.grade} label="Overall" />
      </header>

      <section className="workspace" aria-label="Build planner">
        <section className="picker-column module-panel" aria-labelledby="picker-heading">
          <CornerMarks />
          <div className="section-heading">
            <p className="eyebrow">Part picker</p>
            <h2 id="picker-heading">Build list</h2>
          </div>

          <div className="part-list">
            {buildSteps.map((step, index) => (
              <PartPicker
                key={step.key}
                index={index + 1}
                step={step}
                selectedPart={selectedParts[step.key]}
                options={parts[step.key]}
                onChange={handleSelectionChange}
              />
            ))}
          </div>
        </section>

        <div className="results-column">
          <section className="results-section module-panel" aria-labelledby="stats-heading">
            <CornerMarks />
            <div className="section-heading">
              <p className="eyebrow">Estimates</p>
              <h2 id="stats-heading">Build stats</h2>
            </div>
            <div className="stats-grid">
              {statCards.map((stat) => (
                <StatCard
                  key={stat.key}
                  label={stat.label}
                  value={stat.format(stats[stat.key])}
                />
              ))}
            </div>
          </section>

          <section className="results-section module-panel" aria-labelledby="grades-heading">
            <CornerMarks />
            <div className="section-heading">
              <p className="eyebrow">Grades</p>
              <h2 id="grades-heading">Build score</h2>
            </div>
            <div className="grade-grid">
              {Object.values(grades).map((grade) => (
                <GradeCard key={grade.label} grade={grade} />
              ))}
            </div>
          </section>

          <section className="results-section module-panel" aria-labelledby="warnings-heading">
            <CornerMarks />
            <div className="section-heading">
              <p className="eyebrow">Compatibility</p>
              <h2 id="warnings-heading">Warnings</h2>
            </div>
            <WarningList warnings={warnings} />
          </section>
        </div>
      </section>
    </main>
  );
}

function CornerMarks() {
  return (
    <>
      <span className="corner-mark top-left" aria-hidden="true" />
      <span className="corner-mark top-right" aria-hidden="true" />
      <span className="corner-mark bottom-left" aria-hidden="true" />
      <span className="corner-mark bottom-right" aria-hidden="true" />
    </>
  );
}

function PartPicker({ index, step, selectedPart, options, onChange }) {
  const meta = categoryMeta[step.key];
  const price =
    meta.priceMultiplier > 1
      ? `${formatPreciseCurrency(selectedPart.price)} ${meta.unitLabel} / ${formatCurrency(
          selectedPart.price * meta.priceMultiplier,
        )} total`
      : `${formatPreciseCurrency(selectedPart.price)} ${
          meta.unitLabel ? meta.unitLabel : ""
        }`.trim();
  const weight =
    meta.weightMultiplier > 1
      ? `${selectedPart.weightG} g each / ${Math.round(
          selectedPart.weightG * meta.weightMultiplier,
        )} g total`
      : `${selectedPart.weightG} g`;
  const specs = [
    selectedPart.brand,
    price,
    weight,
    ...getKeySpecs(step.key, selectedPart),
  ];

  return (
    <article className="part-row">
      <div className="part-control">
        <div className="part-heading">
          <span className="step-marker" aria-hidden="true">
            {String(index).padStart(2, "0")}
          </span>
          <label htmlFor={`${step.key}-select`}>{step.label}</label>
        </div>
        <select
          id={`${step.key}-select`}
          value={selectedPart.id}
          onChange={(event) => onChange(step.key, event.target.value)}
        >
          {options.map((part) => (
            <option key={part.id} value={part.id}>
              {part.name}
            </option>
          ))}
        </select>
        <div className="part-meta" aria-label={`${step.label} details`}>
          {specs.map((spec) => (
            <span key={spec} title={spec}>
              {spec}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function getKeySpecs(key, part) {
  switch (key) {
    case "frame":
      return [
        `${part.maxPropInches}" max prop`,
        `${part.motorMounts.join(" / ")} motor`,
        `${part.stackMounts.join(" / ")} stack`,
      ];
    case "motors":
      return [
        `${part.stator}`,
        `${part.kv}KV`,
        `${part.recommendedCells.join("S / ")}S`,
        `${part.maxCurrentA}A max`,
      ];
    case "esc":
      return [
        `${part.continuousAmp}A`,
        `${part.supportedCells.join("S / ")}S`,
        part.mountPattern,
      ];
    case "flightController":
      return [part.mountPattern, part.gyro, part.osd];
    case "props":
      return [`${part.diameterInches}x${part.pitch}`, `${part.blades} blade`];
    case "battery":
      return [`${part.cells}S`, `${part.capacityMah}mAh`, `${part.cRating}C`];
    case "receiver":
      return [part.protocol, part.frequency];
    case "camera":
      return [
        part.videoSystem,
        part.digitalSystem ?? "analog",
        part.aspectRatio,
      ];
    case "vtx":
      return [
        part.videoSystem,
        part.digitalSystem ?? "analog",
        `${part.maxPowerMw}mW`,
      ];
    default:
      return part.highlights ?? [];
  }
}

function StatCard({ label, value }) {
  return (
    <article className="stat-card">
      <p>{label}</p>
      <strong>{value}</strong>
    </article>
  );
}

function GradeCard({ grade }) {
  return (
    <article className="grade-card">
      <div>
        <p>{grade.label}</p>
        <span>{grade.score}/100</span>
      </div>
      <GradePill grade={grade.grade} />
    </article>
  );
}

function GradePill({ grade, label }) {
  return (
    <div className="grade-pill" aria-label={label ? `${label} grade ${grade}` : undefined}>
      {label && <span>{label}</span>}
      <strong>{grade}</strong>
    </div>
  );
}

function WarningList({ warnings }) {
  if (warnings.length === 0) {
    return (
      <div className="empty-warning">
        <strong>No compatibility warnings</strong>
        <span>Current selections look ready for a normal 5-inch freestyle build.</span>
      </div>
    );
  }

  return (
    <div className="warning-list">
      {warnings.map((warning) => (
        <article className={`warning-item ${warning.severity}`} key={warning.id}>
          <div className="severity-dot" aria-hidden="true" />
          <div>
            <strong>{warning.title}</strong>
            <p>{warning.message}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default App;
