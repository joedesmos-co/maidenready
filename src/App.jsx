import { useEffect, useMemo, useState } from "react";
import {
  buildClassById,
  buildClassIds,
  buildClasses,
  buildSteps,
  categoryMeta,
  defaultBuildClass,
  parts,
} from "./data/parts";
import { presetBuilds } from "./data/presets";
import {
  calculateBuildStats,
  formatCurrency,
  formatFlightTimeMinutes,
  formatFlightTimeRange,
  formatPreciseCurrency,
  formatThrustG,
  formatThrustToWeight,
  formatTopSpeedMph,
  formatTopSpeedRange,
  formatWeightG,
  getSelectedParts,
} from "./utils/buildCalculations";
import {
  buildComparisonSummary,
  compareMetric,
  comparisonMetrics,
  getSavedBuildComparisonStats,
} from "./utils/compareBuilds";
import { getCompatibilityWarnings } from "./utils/compatibility";
import { calculateBuildGrades } from "./utils/grades";
import { resolvePresetParts } from "./utils/presets";
import {
  createAutoBuildName,
  createSavedBuildSnapshot,
  loadSavedBuilds,
  persistSavedBuilds,
  resolveSavedBuildSelections,
} from "./utils/savedBuilds";
import {
  buildShareUrl,
  copyTextToClipboard,
  resolveBuildClassFromSearch,
  resolveSelectionsFromSearch,
} from "./utils/shareUrl";
import { explainBuild } from "./utils/explainBuild";
import {
  filterPartsForBuildClass,
  getDefaultSelectionsForBuildClass,
  inferBuildClassFromSelections,
  resolveSelectionsForBuildClass,
} from "./utils/buildClasses";
import { LegalPanel } from "./components/LegalPanel.jsx";
import { PartImage } from "./components/PartImage.jsx";
import { PartImageAttribution } from "./components/PartImageAttribution.jsx";
import { SiteFooter } from "./components/SiteFooter.jsx";
import { hasPartImageMetadata } from "./utils/partImageMeta.js";

const getInitialBuildClass = () => {
  if (typeof window === "undefined") {
    return defaultBuildClass;
  }

  return resolveBuildClassFromSearch(
    window.location.search,
    buildClassIds,
    defaultBuildClass,
  );
};

const getInitialSelections = (buildClass) => {
  const defaultSelections = getDefaultSelectionsForBuildClass(buildClass, parts);

  if (typeof window === "undefined") {
    return defaultSelections;
  }

  const urlSelections = resolveSelectionsFromSearch(
    window.location.search,
    parts,
    defaultSelections,
  );

  return resolveSelectionsForBuildClass(urlSelections, buildClass, parts).selections;
};

const statCards = [
  {
    key: "totalPrice",
    label: "Est. price",
    confidence: "HIGH",
    format: formatCurrency,
  },
  {
    key: "totalWeightG",
    label: "Est. mass",
    confidence: "MEDIUM",
    format: formatWeightG,
  },
  {
    key: "totalThrustG",
    label: "Est. thrust",
    confidence: "MEDIUM",
    format: formatThrustG,
  },
  {
    key: "thrustToWeight",
    label: "Est. T:W",
    confidence: "MEDIUM",
    format: formatThrustToWeight,
  },
  {
    key: "flightTimeMinutes",
    label: "Est. flight",
    confidence: "LOW",
    format: (_value, stats) => formatFlightTimeRange(stats),
  },
  {
    key: "topSpeedMph",
    label: "Est. top speed",
    confidence: "LOW",
    format: (_value, stats) => formatTopSpeedRange(stats),
  },
];

const appTabs = [
  { id: "presets", label: "Presets" },
  { id: "custom", label: "Custom Build" },
  { id: "saved", label: "Saved Builds" },
  { id: "compare", label: "Compare" },
  { id: "learn", label: "Learn" },
];

const learnEntries = [
  {
    term: "Build class",
    definition:
      "Airframe mode that filters compatible parts and tunes estimate models. Each class (whoop, 3.5\", 5\", cinewhoop, 7\" LR) uses different prop limits, efficiency, and warning rules.",
  },
  {
    term: "Flight controller (FC)",
    definition:
      "The brain of the quad — gyro, CPU, and firmware (Betaflight, etc.). Must match battery voltage and often stacks with the ESC on the same board (AIO) or mounting pattern.",
  },
  {
    term: "Stack / AIO",
    definition:
      "FC and ESC mounted together. AIO (all-in-one) boards combine both on one PCB — common on tiny whoops. Separate FC + 4-in-1 ESC stacks use standoffs; mount patterns must match the frame.",
  },
  {
    term: "Receiver (RX)",
    definition:
      "Radio link to your transmitter — ELRS, Crossfire, or analog protocols. Must match your radio module and firmware. Range and latency vary by protocol and antenna placement.",
  },
  {
    term: "VTX",
    definition:
      "Video transmitter that sends the camera feed to goggles or a monitor. Analog (5.8 GHz) and digital (HDZero, Walksnail, O3) systems are not interchangeable without matching camera and goggles.",
  },
  {
    term: "Motor KV",
    definition:
      "RPM per volt unloaded. Higher KV spins faster on the same cell count — more top speed and current draw. Match KV to prop size, frame class, and battery voltage.",
  },
  {
    term: "Battery cells / voltage",
    definition:
      "Cell count sets nominal pack voltage (1S ≈ 3.7V, 6S ≈ 22.2V). Motors, ESC, and FC must support the selected cell count. Capacity (mAh) and C rating affect burst current and flight time.",
  },
  {
    term: "Prop pitch",
    definition:
      "Inches of forward travel per revolution. Higher pitch loads the motors harder, increases thrust and current, and usually reduces efficiency at cruise.",
  },
  {
    term: "ESC amp rating",
    definition:
      "Continuous current the ESC can deliver per motor (or total on 4-in-1 boards). Undersized ESCs overheat when motor + prop draw exceeds rating under load.",
  },
  {
    term: "Thrust-to-weight (T:W)",
    definition:
      "Estimated total thrust divided by all-up mass. Higher ratios mean stronger punchout and recovery margin. Ducted and long-range builds often target lower T:W than freestyle.",
  },
  {
    term: "Flight time estimate",
    definition:
      "Conservative mixed-throttle range from pack capacity and estimated draw. Real flight time varies with tune, sag, wind, and flying style.",
  },
  {
    term: "Top speed estimate",
    definition:
      "Conservative comparison range derived from KV, voltage, and prop pitch, then capped by build class. Not GPS-verified performance.",
  },
];

function App() {
  const [buildClass, setBuildClass] = useState(getInitialBuildClass);
  const [selectedIds, setSelectedIds] = useState(() =>
    getInitialSelections(buildClass),
  );
  const [buildClassStatus, setBuildClassStatus] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [savedBuilds, setSavedBuilds] = useState(loadSavedBuilds);
  const [savedBuildName, setSavedBuildName] = useState("");
  const [savedBuildStatus, setSavedBuildStatus] = useState("");
  const [activePartKey, setActivePartKey] = useState(null);
  const [activeTab, setActiveTab] = useState("presets");
  const [presetStatus, setPresetStatus] = useState("");
  const [legalPageId, setLegalPageId] = useState(null);

  const filteredParts = useMemo(
    () => filterPartsForBuildClass(parts, buildClass),
    [buildClass],
  );
  const selectedParts = useMemo(
    () => getSelectedParts(selectedIds, parts),
    [selectedIds],
  );
  const activePartInfo = useMemo(() => {
    const step = buildSteps.find((buildStep) => buildStep.key === activePartKey);
    const part = activePartKey ? selectedParts[activePartKey] : null;

    return step && part ? { part, step } : null;
  }, [activePartKey, selectedParts]);
  const stats = useMemo(
    () => calculateBuildStats(selectedParts, buildClass),
    [buildClass, selectedParts],
  );
  const warnings = useMemo(
    () => getCompatibilityWarnings(selectedParts, buildClass, stats),
    [buildClass, selectedParts, stats],
  );
  const grades = useMemo(
    () => calculateBuildGrades(stats, warnings),
    [stats, warnings],
  );
  const buildExplanation = useMemo(
    () =>
      explainBuild({
        selectedParts,
        stats,
        warnings,
        overallGrade: grades.overall,
        buildClass,
      }),
    [buildClass, grades, selectedParts, stats, warnings],
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.history.replaceState(null, "", buildShareUrl(selectedIds, buildClass));
  }, [buildClass, selectedIds]);

  useEffect(() => {
    persistSavedBuilds(savedBuilds);
  }, [savedBuilds]);

  useEffect(() => {
    setSelectedIds((current) => {
      const resolved = resolveSelectionsForBuildClass(current, buildClass, parts);
      const isSame = buildSteps.every(
        (step) => resolved.selections[step.key] === current[step.key],
      );

      return isSame ? current : resolved.selections;
    });
  }, [buildClass]);

  useEffect(() => {
    if (!activePartInfo || typeof window === "undefined") {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActivePartKey(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePartInfo]);

  const handleSelectionChange = (key, partId) => {
    setSelectedIds((current) => ({ ...current, [key]: partId }));
  };

  const handleBuildClassChange = (nextBuildClass) => {
    const nextClassLabel =
      buildClassById[nextBuildClass]?.label ?? nextBuildClass;

    setBuildClass(nextBuildClass);
    setSelectedIds((current) => {
      const resolved = resolveSelectionsForBuildClass(current, nextBuildClass, parts);
      const changedCount = resolved.changedKeys.length;

      setBuildClassStatus(
        changedCount > 0
          ? `Swapped ${changedCount} incompatible part${changedCount === 1 ? "" : "s"} for ${nextClassLabel}.`
          : "",
      );

      if (changedCount > 0) {
        window.setTimeout(() => setBuildClassStatus(""), 2200);
      }

      return resolved.selections;
    });
  };

  const handlePresetLoad = (preset) => {
    const presetBuildClass = preset.buildClass ?? buildClass;
    const { isComplete } = resolvePresetParts(preset, parts);
    const resolved = resolveSelectionsForBuildClass(
      preset.selections ?? {},
      presetBuildClass,
      parts,
    );

    setBuildClass(presetBuildClass);
    setSelectedIds(resolved.selections);
    setPresetStatus(
      isComplete
        ? `${preset.name} loaded — open Custom Build to review.`
        : `${preset.name} loaded with compatibility adjustments.`,
    );
    setActiveTab("custom");
    window.setTimeout(() => setPresetStatus(""), 3200);
  };

  const handleCopyBuildLink = async () => {
    try {
      await copyTextToClipboard(buildShareUrl(selectedIds, buildClass));
      setCopyStatus("Link copied.");
    } catch (error) {
      console.warn("[MaidenReady] Failed to copy build URL.", error);
      setCopyStatus("Copy failed — copy the URL from the address bar.");
    }

    window.setTimeout(() => setCopyStatus(""), 1800);
  };

  const handleSaveBuild = () => {
    const savedBuild = createSavedBuildSnapshot({
      name: savedBuildName,
      buildClass,
      selectedIds,
      stats,
      overallGrade: grades.overall.grade,
    });

    setSavedBuilds((current) => [savedBuild, ...current]);
    setSavedBuildName("");
    setSavedBuildStatus("Build saved to this browser.");
    window.setTimeout(() => setSavedBuildStatus(""), 1800);
  };

  const handleLoadSavedBuild = (savedBuild) => {
    const savedBuildClass = buildClassIds.includes(savedBuild.buildClass)
      ? savedBuild.buildClass
      : null;
    const nextBuildClass =
      savedBuildClass ??
      inferBuildClassFromSelections(savedBuild.selectedIds, parts, buildClass);
    const fallbackSelections = getDefaultSelectionsForBuildClass(nextBuildClass, parts);
    const resolved = resolveSavedBuildSelections(
      savedBuild,
      parts,
      fallbackSelections,
      nextBuildClass,
    );
    const classResolved = resolveSelectionsForBuildClass(
      resolved.selections,
      nextBuildClass,
      parts,
    );

    setBuildClass(nextBuildClass);
    setSelectedIds(classResolved.selections);
    setSavedBuildStatus(
      resolved.isComplete
        ? "Saved build loaded — switched to Custom Build."
        : `${resolved.missing.length} part${resolved.missing.length === 1 ? "" : "s"} missing from catalog — defaults applied.`,
    );
    setActiveTab("custom");
    window.setTimeout(() => setSavedBuildStatus(""), 2200);
  };

  const handleDeleteSavedBuild = (buildId) => {
    setSavedBuilds((current) => current.filter((build) => build.id !== buildId));
    setSavedBuildStatus("Saved build removed.");
    window.setTimeout(() => setSavedBuildStatus(""), 1800);
  };

  const visiblePresets = useMemo(
    () => presetBuilds.filter((preset) => preset.buildClass === buildClass),
    [buildClass],
  );

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">MaidenReady.com</p>
          <h1>FPV build calculator</h1>
          <p className="topbar-tagline">
            Plan parts, estimates, and compatibility — not a store.
          </p>
        </div>
        <div className="topbar-actions">
          <GradePill grade={grades.overall.grade} label="Overall" />
        </div>
      </header>

      <TabNav activeTab={activeTab} tabs={appTabs} onTabChange={setActiveTab} />

      {activeTab === "presets" && (
        <section className="tab-panel module-panel" aria-label="Preset builds">
          <CornerMarks />
          <div className="section-heading">
            <p className="eyebrow">Quick start</p>
            <h2>Preset builds</h2>
          </div>
          <p className="section-intro">
            Curated starter part lists for common goals. Pick a build class, load a preset, then fine-tune in Custom Build.
          </p>
          <BuildClassSelector
            buildClass={buildClass}
            buildClasses={buildClasses}
            status={presetStatus}
            onBuildClassChange={handleBuildClassChange}
          />
          <PresetBuilds
            compact
            presets={visiblePresets}
            onLoadPreset={handlePresetLoad}
          />
        </section>
      )}

      {activeTab === "custom" && (
        <section className="workspace workspace-custom" aria-label="Custom build">
          <section className="picker-column module-panel" aria-labelledby="picker-heading">
            <CornerMarks />
            <div className="section-heading">
              <p className="eyebrow">Part picker</p>
              <h2 id="picker-heading">Build list</h2>
            </div>
            <p className="section-intro">
              Work through all nine parts in order. Stats and compatibility checks update as you go. Save builds on the Saved Builds tab; compare two saves on Compare.
            </p>

            <BuildClassSelector
              buildClass={buildClass}
              buildClasses={buildClasses}
              status={buildClassStatus}
              onBuildClassChange={handleBuildClassChange}
            />

            <div className="part-list">
              {buildSteps.map((step, index) => (
                <PartPicker
                  key={step.key}
                  index={index + 1}
                  step={step}
                  selectedPart={selectedParts[step.key]}
                  options={filteredParts[step.key]}
                  onChange={handleSelectionChange}
                  onOpenDetails={setActivePartKey}
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
                    value={stat.format(stats[stat.key], stats)}
                    confidence={stat.confidence}
                  />
                ))}
              </div>
              <EstimateAccuracy />
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
                <h2 id="warnings-heading">Compatibility checks</h2>
              </div>
              <WarningList buildClass={buildClass} warnings={warnings} />
            </section>

            <section className="results-section module-panel" aria-labelledby="explain-heading">
              <CornerMarks />
              <div className="section-heading">
                <p className="eyebrow">Explain my build</p>
                <h2 id="explain-heading">Rule readout</h2>
              </div>
              <ExplainBuildPanel explanation={buildExplanation} />
            </section>

            <section className="results-section module-panel share-panel" aria-labelledby="share-heading">
              <CornerMarks />
              <div className="section-heading">
                <p className="eyebrow">Share</p>
                <h2 id="share-heading">Build link</h2>
              </div>
              <ShareBuildButton
                status={copyStatus}
                onCopyBuildLink={handleCopyBuildLink}
              />
            </section>
          </div>
        </section>
      )}

      {activeTab === "saved" && (
        <section className="tab-panel module-panel" aria-label="Saved builds">
          <CornerMarks />
          <div className="section-heading">
            <p className="eyebrow">Saved builds</p>
            <h2>On this device</h2>
          </div>
          <p className="section-intro">
            Saves your current Custom Build selections to this browser only. Name optional — a date stamp is used if left blank.
          </p>
          <SavedBuilds
            buildName={savedBuildName}
            savedBuilds={savedBuilds}
            status={savedBuildStatus}
            onBuildNameChange={setSavedBuildName}
            onDeleteSavedBuild={handleDeleteSavedBuild}
            onLoadSavedBuild={handleLoadSavedBuild}
            onSaveBuild={handleSaveBuild}
          />
        </section>
      )}

      {activeTab === "compare" && (
        <section className="tab-panel module-panel" aria-label="Compare builds">
          <CornerMarks />
          <div className="section-heading">
            <p className="eyebrow">Compare builds</p>
            <h2>Side by side</h2>
          </div>
          <p className="section-intro">
            Compare estimated stats from two builds you saved on the Saved Builds tab.
          </p>
          <CompareBuilds savedBuilds={savedBuilds} partsCatalog={parts} />
        </section>
      )}

      {activeTab === "learn" && (
        <section className="tab-panel module-panel" aria-label="Learn">
          <CornerMarks />
          <LearnPanel entries={learnEntries} />
        </section>
      )}

      <PartInfoDrawer
        info={activePartInfo}
        onClose={() => setActivePartKey(null)}
      />

      <LegalPanel pageId={legalPageId} onClose={() => setLegalPageId(null)} />

      <SiteFooter onOpenLegalPage={setLegalPageId} />
    </main>
  );
}

function TabNav({ activeTab, tabs, onTabChange }) {
  return (
    <nav aria-label="Main sections" className="tab-nav">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            aria-selected={isActive}
            className={`tab-button ${isActive ? "active" : ""}`}
            role="tab"
            type="button"
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}

function LearnPanel({ entries }) {
  return (
    <section aria-labelledby="learn-heading">
      <div className="section-heading">
        <p className="eyebrow">Reference</p>
        <h2 id="learn-heading">Field glossary</h2>
      </div>
      <p className="section-intro">
        Plain-language definitions for specs and stats you will see while building. Numbers on Custom Build are estimates — see the accuracy notes there.
      </p>
      <dl className="learn-glossary">
        {entries.map((entry) => (
          <div className="learn-entry" key={entry.term}>
            <dt>{entry.term}</dt>
            <dd>{entry.definition}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function BuildClassSelector({
  buildClass,
  buildClasses,
  status,
  onBuildClassChange,
}) {
  return (
    <section className="build-class-module" aria-labelledby="build-class-heading">
      <div className="section-heading compact-heading">
        <p className="eyebrow">Build class</p>
        <h2 id="build-class-heading">Airframe mode</h2>
      </div>
      <div className="build-class-control">
        <label htmlFor="build-class-select">Class</label>
        <select
          id="build-class-select"
          value={buildClass}
          onChange={(event) => onBuildClassChange(event.target.value)}
        >
          {buildClasses.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
        <span aria-live="polite">{status}</span>
      </div>
    </section>
  );
}

function ExplainBuildPanel({ explanation }) {
  if (!explanation.isComplete) {
    return (
      <div className="explain-empty">
        Select all nine parts to generate a rule-based build readout.
      </div>
    );
  }

  return (
    <div className="explain-panel">
      {explanation.sections.map((section) => (
        <section
          className={`explain-section ${section.danger ? "danger" : ""}`}
          key={section.title}
        >
          <h3>{section.title}</h3>
          {section.body && <p>{section.body}</p>}
          {section.items?.length > 0 && (
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}

function PartInfoDrawer({ info, onClose }) {
  if (!info) {
    return null;
  }

  const { part, step } = info;
  const categoryLabel = categoryMeta[step.key]?.label ?? step.label;
  const bestFor = asList(part.bestFor).slice(0, 4);
  const watchOutFor = asList(part.watchOutFor).slice(0, 4);
  return (
    <div className="part-info-layer">
      <button
        aria-label="Close part details"
        className="part-info-scrim"
        type="button"
        onClick={onClose}
      />
      <aside
        aria-labelledby="part-info-heading"
        aria-modal="true"
        className="part-info-drawer"
        role="dialog"
      >
        <div className="part-info-header">
          <div>
            <p className="eyebrow">Part details</p>
            <h2 id="part-info-heading">{categoryLabel}</h2>
          </div>
          <button className="drawer-close" type="button" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="part-info-image">
          <PartImage
            categoryKey={step.key}
            part={part}
            partType={categoryLabel}
            variant="drawer"
          />
          {hasPartImageMetadata(part) && <PartImageAttribution part={part} />}
        </div>

        <div className="part-info-title">
          <span>{part.brand ?? "Unknown brand"}</span>
          <strong>{part.name ?? "Unnamed part"}</strong>
        </div>

        <div className="part-info-stats">
          <PartInfoStat label="Category" value={categoryLabel} />
          <PartInfoStat
            label="Price"
            value={getPartPriceLabel(step.key, part)}
          />
          <PartInfoStat
            label="Est. weight"
            value={getPartWeightLabel(step.key, part)}
          />
        </div>

        {part.description && (
          <p className="part-info-description">{part.description}</p>
        )}

        <PartInfoTagGroup title="Key specs" items={getKeySpecs(step.key, part)} />
        <PartInfoTagGroup title="Best for" items={bestFor} />
        <PartInfoTagGroup title="Watch outs" items={watchOutFor} />
      </aside>
    </div>
  );
}

function PartInfoStat({ label, value }) {
  if (!value) {
    return null;
  }

  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function PartInfoTagGroup({ title, items }) {
  const safeItems = asList(items);

  if (safeItems.length === 0) {
    return null;
  }

  return (
    <section className="part-info-group">
      <h3>{title}</h3>
      <div className="part-info-tags">
        {safeItems.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}

function CompareBuilds({ savedBuilds, partsCatalog }) {
  const [leftBuildId, setLeftBuildId] = useState(savedBuilds[0]?.id ?? "");
  const [rightBuildId, setRightBuildId] = useState(savedBuilds[1]?.id ?? "");

  useEffect(() => {
    if (savedBuilds.length < 2) {
      setLeftBuildId(savedBuilds[0]?.id ?? "");
      setRightBuildId("");
      return;
    }

    const hasLeftBuild = savedBuilds.some((build) => build.id === leftBuildId);
    const nextLeftBuildId = hasLeftBuild ? leftBuildId : savedBuilds[0].id;
    const hasRightBuild = savedBuilds.some((build) => build.id === rightBuildId);
    const fallbackRightBuildId =
      savedBuilds.find((build) => build.id !== nextLeftBuildId)?.id ?? "";
    const nextRightBuildId =
      hasRightBuild && rightBuildId !== nextLeftBuildId
        ? rightBuildId
        : fallbackRightBuildId;

    if (nextLeftBuildId !== leftBuildId) {
      setLeftBuildId(nextLeftBuildId);
    }

    if (nextRightBuildId !== rightBuildId) {
      setRightBuildId(nextRightBuildId);
    }
  }, [leftBuildId, rightBuildId, savedBuilds]);

  const leftBuild = savedBuilds.find((build) => build.id === leftBuildId);
  const rightBuild = savedBuilds.find((build) => build.id === rightBuildId);

  const comparison = useMemo(() => {
    if (!leftBuild || !rightBuild) {
      return null;
    }

    const leftStats = getSavedBuildComparisonStats(leftBuild, partsCatalog);
    const rightStats = getSavedBuildComparisonStats(rightBuild, partsCatalog);
    const results = comparisonMetrics.map((metric) => ({
      metric,
      winner: compareMetric(metric, leftStats, rightStats),
      leftValue: leftStats[metric.key],
      rightValue: rightStats[metric.key],
    }));

    return {
      leftStats,
      rightStats,
      results,
      summary: buildComparisonSummary(
        results,
        leftStats.buildClass,
        rightStats.buildClass,
      ),
    };
  }, [leftBuild, partsCatalog, rightBuild]);

  return (
    <section className="compare-module compare-module-standalone" aria-label="Compare saved builds">
      {savedBuilds.length < 2 ? (
        <div className="compare-empty">
          Save at least two builds on the Saved Builds tab to compare estimated stats.
        </div>
      ) : (
        <>
          <div className="compare-selectors">
            <label>
              Build A
              <select
                value={leftBuildId}
                onChange={(event) => setLeftBuildId(event.target.value)}
              >
                {savedBuilds.map((build) => (
                  <option
                    disabled={build.id === rightBuildId}
                    key={build.id}
                    value={build.id}
                  >
                    {formatSavedBuildOptionLabel(build)}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Build B
              <select
                value={rightBuildId}
                onChange={(event) => setRightBuildId(event.target.value)}
              >
                {savedBuilds.map((build) => (
                  <option
                    disabled={build.id === leftBuildId}
                    key={build.id}
                    value={build.id}
                  >
                    {formatSavedBuildOptionLabel(build)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {comparison && (
            <>
              <div className="comparison-table">
                <div className="comparison-head">Metric</div>
                <div className="comparison-head">Build A</div>
                <div className="comparison-head">Build B</div>
                {comparison.results.map((result) => (
                  <ComparisonRow
                    key={result.metric.key}
                    leftStats={comparison.leftStats}
                    result={result}
                    rightStats={comparison.rightStats}
                  />
                ))}
              </div>
              <p className="comparison-summary">{comparison.summary}</p>
            </>
          )}
        </>
      )}
    </section>
  );
}

function ComparisonRow({ result, leftStats, rightStats }) {
  const leftWins = result.winner === "left";
  const rightWins = result.winner === "right";

  return (
    <>
      <div className="comparison-label">{result.metric.label}</div>
      <div className={`comparison-value ${leftWins ? "better" : ""}`}>
        <span>{formatComparisonValue(result.metric.key, result.leftValue, leftStats)}</span>
      </div>
      <div className={`comparison-value ${rightWins ? "better" : ""}`}>
        <span>{formatComparisonValue(result.metric.key, result.rightValue, rightStats)}</span>
      </div>
    </>
  );
}

function formatComparisonValue(key, value, stats) {
  switch (key) {
    case "totalPrice":
      return formatCurrency(value);
    case "totalWeightG":
      return formatWeightG(value);
    case "totalThrustG":
      return formatThrustG(value);
    case "thrustToWeight":
      return formatThrustToWeight(value);
    case "flightTimeMinutes":
      return stats ? formatFlightTimeRange(stats) : formatFlightTimeMinutes(value);
    case "topSpeedMph":
      return stats ? formatTopSpeedRange(stats) : formatTopSpeedMph(value);
    case "overallGrade":
      return value || "N/A";
    case "warningCount":
      return String(value ?? 0);
    default:
      return value == null || value === "" ? "N/A" : String(value);
  }
}

function formatSavedBuildOptionLabel(savedBuild) {
  const classLabel = buildClassById[savedBuild.buildClass]?.label;

  return classLabel ? `${savedBuild.name} · ${classLabel}` : savedBuild.name;
}

function formatSavedBuildStat(savedBuild, key, formatter) {
  const value = savedBuild?.[key];

  if (value == null || value === "") {
    return "N/A";
  }

  if (key === "flightTimeMinutes" || key === "topSpeedMph") {
    return formatter(savedBuild);
  }

  return formatter(value);
}

function SavedBuilds({
  buildName,
  savedBuilds,
  status,
  onBuildNameChange,
  onDeleteSavedBuild,
  onLoadSavedBuild,
  onSaveBuild,
}) {
  const autoName = useMemo(() => createAutoBuildName(), []);

  return (
    <section className="saved-module saved-module-standalone" aria-label="Saved build controls">
      <div className="save-controls">
        <input
          aria-label="Build name"
          placeholder={`Auto: ${autoName}`}
          type="text"
          value={buildName}
          onChange={(event) => onBuildNameChange(event.target.value)}
        />
        <button type="button" onClick={onSaveBuild}>
          Save build
        </button>
        <span aria-live="polite">{status}</span>
      </div>

      {savedBuilds.length === 0 ? (
        <div className="saved-empty">
          No saved builds yet. Configure a build in Custom Build, then save it here.
        </div>
      ) : (
        <div className="saved-list">
          {savedBuilds.map((savedBuild) => (
            <SavedBuildRow
              key={savedBuild.id}
              savedBuild={savedBuild}
              onDeleteSavedBuild={onDeleteSavedBuild}
              onLoadSavedBuild={onLoadSavedBuild}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function SavedBuildRow({ savedBuild, onDeleteSavedBuild, onLoadSavedBuild }) {
  const createdDate = new Date(savedBuild.createdAt).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });

  return (
    <article className="saved-row">
      <div className="saved-row-main">
        <div>
          <strong>{savedBuild.name}</strong>
          <span>{createdDate}</span>
        </div>
        <div className="saved-row-stats">
          <span>{formatCurrency(savedBuild.totalPrice)}</span>
          <span>{formatSavedBuildStat(savedBuild, "totalWeightG", formatWeightG)}</span>
          <span>{formatSavedBuildStat(savedBuild, "thrustToWeight", formatThrustToWeight)}</span>
          <span>{formatSavedBuildStat(savedBuild, "flightTimeMinutes", formatFlightTimeRange)}</span>
          <span>{formatSavedBuildStat(savedBuild, "topSpeedMph", formatTopSpeedRange)}</span>
          <span>Grade {savedBuild.overallGrade || "N/A"}</span>
        </div>
      </div>
      <div className="saved-row-actions">
        <button type="button" onClick={() => onLoadSavedBuild(savedBuild)}>
          Load
        </button>
        <button type="button" onClick={() => onDeleteSavedBuild(savedBuild.id)}>
          Delete
        </button>
      </div>
    </article>
  );
}

function ShareBuildButton({ status, onCopyBuildLink }) {
  return (
    <div className="share-build share-build-panel">
      <p className="share-build-copy">
        Copies a URL with your current class and part selections. Anyone with the link can open the same build. The URL updates as you edit.
      </p>
      <button type="button" onClick={onCopyBuildLink}>
        Copy build link
      </button>
      <span aria-live="polite">{status}</span>
    </div>
  );
}

function PresetBuilds({ presets, onLoadPreset, compact = false }) {
  if (presets.length === 0) {
    return (
      <div className="preset-empty">
        No presets for this build class. Switch class or use Custom Build.
      </div>
    );
  }

  return (
    <section
      className={`preset-module ${compact ? "preset-module-compact" : ""}`}
      aria-label="Preset build cards"
    >
      <div className="preset-grid">
        {presets.map((preset) => (
          <article className="preset-card" key={preset.id}>
            <div>
              <span className="preset-role">{preset.role}</span>
              <h3>{preset.name}</h3>
              {!compact && <p>{preset.description}</p>}
              {compact && (
                <p className="preset-summary">{preset.description}</p>
              )}
            </div>
            <button type="button" onClick={() => onLoadPreset(preset)}>
              Load preset
            </button>
          </article>
        ))}
      </div>
    </section>
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

function PartPicker({
  index,
  step,
  selectedPart,
  options,
  onChange,
  onOpenDetails,
}) {
  const activePart = selectedPart ?? options[0] ?? null;

  if (!activePart) {
    return (
      <article className="part-row part-row-empty">
        <div className="part-control">
          <div className="part-heading">
            <span className="step-marker" aria-hidden="true">
              {String(index).padStart(2, "0")}
            </span>
            <label htmlFor={`${step.key}-select`}>{step.label}</label>
          </div>
          <p className="part-description">No compatible parts for this build class.</p>
        </div>
      </article>
    );
  }

  const price = getPartPriceLabel(step.key, activePart);
  const weight = getPartWeightLabel(step.key, activePart);
  const specs = [
    activePart.brand,
    price,
    weight,
    ...getKeySpecs(step.key, activePart),
  ].filter(Boolean);

  return (
    <article className="part-row">
      <div className="part-preview-stack">
        <PartImage
          key={`${step.key}-${activePart.id}`}
          categoryKey={step.key}
          part={activePart}
          partType={step.label}
        />
        <button
          aria-label={`Show details for ${activePart.name}`}
          className="part-details-button"
          type="button"
          onClick={() => onOpenDetails(step.key)}
        >
          Details
        </button>
      </div>
      <div className="part-control">
        <div className="part-heading">
          <span className="step-marker" aria-hidden="true">
            {String(index).padStart(2, "0")}
          </span>
          <label htmlFor={`${step.key}-select`}>{step.label}</label>
        </div>
        <select
          id={`${step.key}-select`}
          value={activePart.id}
          onChange={(event) => onChange(step.key, event.target.value)}
        >
          {options.map((part) => (
            <option key={part.id} value={part.id}>
              {part.name}
            </option>
          ))}
        </select>
        <p className="part-description">{activePart.description}</p>
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

function getPartPriceLabel(key, part) {
  if (!part || typeof part.price !== "number") {
    return "Price TBD";
  }

  const meta = categoryMeta[key] ?? {};

  if (meta.priceMultiplier > 1) {
    return `${formatPreciseCurrency(part.price)} ${
      meta.unitLabel ?? "each"
    } / ${formatCurrency(part.price * meta.priceMultiplier)} total`;
  }

  return `${formatPreciseCurrency(part.price)} ${
    meta.unitLabel ? meta.unitLabel : ""
  }`.trim();
}

function getPartWeightLabel(key, part) {
  if (!part || typeof part.weightG !== "number") {
    return "Weight TBD";
  }

  const meta = categoryMeta[key] ?? {};

  if (meta.weightMultiplier > 1) {
    return `${part.weightG} g each / ${Math.round(
      part.weightG * meta.weightMultiplier,
    )} g total`;
  }

  return `${part.weightG} g`;
}

function asList(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  return value ? [value] : [];
}

function getKeySpecs(key, part) {
  if (!part) {
    return [];
  }

  if (part.keySpecs?.length) {
    return part.keySpecs;
  }

  const specs = (() => {
    switch (key) {
    case "frame":
      return [
        part.maxPropInches ? `${part.maxPropInches}" max prop` : null,
        asList(part.motorMounts).length
          ? `${asList(part.motorMounts).join(" / ")} motor`
          : null,
        asList(part.stackMounts).length
          ? `${asList(part.stackMounts).join(" / ")} stack`
          : null,
      ];
    case "motors":
      return [
        part.stator,
        part.kv ? `${part.kv}KV` : null,
        part.mountPattern,
        asList(part.recommendedCells).length
          ? `${asList(part.recommendedCells).join("S / ")}S`
          : null,
        part.maxCurrentA ? `${part.maxCurrentA}A max` : null,
      ];
    case "esc":
      return [
        part.continuousAmp ? `${part.continuousAmp}A` : null,
        asList(part.supportedCells).length
          ? `${asList(part.supportedCells).join("S / ")}S`
          : null,
        part.mountPattern,
        part.firmware,
      ];
    case "flightController":
      return [part.mountPattern, part.gyro, part.osd];
    case "props":
      return [
        part.diameterInches && part.pitch
          ? `${part.diameterInches}x${part.pitch}`
          : null,
        part.blades ? `${part.blades} blade` : null,
      ];
    case "battery":
      return [
        part.cells ? `${part.cells}S` : null,
        part.voltage ? `${part.voltage}V` : null,
        part.capacityMah ? `${part.capacityMah}mAh` : null,
        part.cRating ? `${part.cRating}C` : null,
        part.connector,
        part.chemistry,
      ];
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
        part.maxPowerMw ? `${part.maxPowerMw}mW` : null,
      ];
    default:
      return part.highlights ?? [];
    }
  })();

  return specs.filter(Boolean);
}

function StatCard({ label, value, confidence }) {
  const safeValue = value == null || value === "" ? "N/A" : value;

  return (
    <article className="stat-card">
      <p>{label}</p>
      <strong>{safeValue}</strong>
      <span className="stat-confidence">Confidence: {confidence.toLowerCase()}</span>
    </article>
  );
}

function EstimateAccuracy() {
  return (
    <section className="accuracy-panel" aria-labelledby="accuracy-heading">
      <div className="accuracy-title" id="accuracy-heading">
        Estimate accuracy
      </div>
      <ul>
        <li>
          Mass includes a small hardware allowance per build class, but still excludes straps, mounts, and payload unless modeled in part data.
        </li>
        <li>
          Flight time shows a conservative range for mixed throttle. Aggressive flying, sag, tune quality, and wind reduce real-world time.
        </li>
        <li>
          Top speed uses pitch-speed math as one input, then applies class caps and drag correction. It is not GPS-verified performance.
        </li>
        <li>Use these numbers to compare configurations, not to certify airworthiness or range.</li>
      </ul>
    </section>
  );
}

function GradeCard({ grade }) {
  return (
    <article className="grade-card">
      <div>
        <p>{grade.label}</p>
        <span>{grade.score ?? 0}/100</span>
      </div>
      <GradePill grade={grade.grade || "N/A"} />
    </article>
  );
}

function GradePill({ grade, label }) {
  const safeGrade = grade || "N/A";

  return (
    <div className="grade-pill" aria-label={label ? `${label} grade ${safeGrade}` : undefined}>
      {label && <span>{label}</span>}
      <strong>{safeGrade}</strong>
    </div>
  );
}

function WarningList({ buildClass, warnings }) {
  if (warnings.length === 0) {
    const buildClassLabel = buildClassById[buildClass]?.label ?? "selected class";

    return (
      <div className="empty-warning">
        <strong>No issues flagged</strong>
        <span>
          Basic checks pass for this {buildClassLabel.toLowerCase()} configuration. Still verify wiring, stack fit, and tune before arming.
        </span>
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
