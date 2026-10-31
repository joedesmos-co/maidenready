import { useEffect, useMemo, useRef, useState } from "react";
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
  hasSharedBuildInSearch,
  resolveBuildClassFromSearch,
  resolveSelectionsFromSearch,
} from "./utils/shareUrl";
import { explainBuild } from "./utils/explainBuild";
import {
  getDefaultSelectionsForBuildClass,
  inferBuildClassFromSelections,
  resolveSelectionsForBuildClass,
} from "./utils/buildClasses";
import { LegalPanel } from "./components/LegalPanel.jsx";
import { ConfiguratorStage } from "./components/ConfiguratorStage.jsx";
import { DroneVisual } from "./components/DroneVisual.jsx";
import { HomePanel } from "./components/HomePanel.jsx";
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

/** Home by default; shared build links open Custom Build so parts are visible. */
const getInitialActiveTab = () => {
  if (typeof window === "undefined") {
    return "home";
  }

  return hasSharedBuildInSearch(window.location.search, getInitialBuildClass())
    ? "custom"
    : "home";
};

const appTabs = [
  { id: "home", label: "Home" },
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
  const [pickerStepKey, setPickerStepKey] = useState(null);
  const [changeNotice, setChangeNotice] = useState("");
  const [detailInfo, setDetailInfo] = useState(null);
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(getInitialActiveTab);
  const [presetStatus, setPresetStatus] = useState("");
  const [presetClassFilter, setPresetClassFilter] = useState("all");
  const [legalPageId, setLegalPageId] = useState(null);

  const selectedParts = useMemo(
    () => getSelectedParts(selectedIds, parts),
    [selectedIds],
  );
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
    if (typeof window === "undefined") {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key !== "Escape") {
        return;
      }

      if (detailInfo) {
        setDetailInfo(null);
      } else if (pickerStepKey) {
        setPickerStepKey(null);
      } else if (mobileSummaryOpen) {
        setMobileSummaryOpen(false);
      } else if (legalPageId) {
        setLegalPageId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [detailInfo, legalPageId, mobileSummaryOpen, pickerStepKey]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    const isOpen = Boolean(pickerStepKey || detailInfo || mobileSummaryOpen || legalPageId);
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [detailInfo, legalPageId, mobileSummaryOpen, pickerStepKey]);

  const changeNoticeTimer = useRef(null);

  const handleSelectionChange = (key, partId) => {
    const step = buildSteps.find((buildStep) => buildStep.key === key);
    const part = parts[key]?.find((candidate) => candidate.id === partId);

    setSelectedIds((current) => ({ ...current, [key]: partId }));

    if (step && part) {
      setChangeNotice(`${step.label} updated: ${part.name}`);
      window.clearTimeout(changeNoticeTimer.current);
      changeNoticeTimer.current = window.setTimeout(() => {
        setChangeNotice("");
      }, 3600);
    }
  };

  useEffect(
    () => () => {
      window.clearTimeout(changeNoticeTimer.current);
    },
    [],
  );

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setPickerStepKey(null);
    setDetailInfo(null);
    setMobileSummaryOpen(false);
    setLegalPageId(null);
  };

  const handleBuildClassChange = (nextBuildClass) => {
    const nextClassLabel =
      buildClassById[nextBuildClass]?.label ?? nextBuildClass;
    const resolved = resolveSelectionsForBuildClass(
      selectedIds,
      nextBuildClass,
      parts,
    );
    const changedCount = resolved.changedKeys.length;

    setBuildClass(nextBuildClass);
    setSelectedIds(resolved.selections);
    setBuildClassStatus(
      changedCount > 0
        ? `Swapped ${changedCount} incompatible part${changedCount === 1 ? "" : "s"} for ${nextClassLabel}.`
        : "",
    );

    if (changedCount > 0) {
      window.setTimeout(() => setBuildClassStatus(""), 2200);
    }
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
    handleTabChange("custom");
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
    handleTabChange("custom");
    window.setTimeout(() => setSavedBuildStatus(""), 2200);
  };

  const handleDeleteSavedBuild = (buildId) => {
    setSavedBuilds((current) => current.filter((build) => build.id !== buildId));
    setSavedBuildStatus("Saved build removed.");
    window.setTimeout(() => setSavedBuildStatus(""), 1800);
  };

  const visiblePresets = useMemo(
    () =>
      presetClassFilter === "all"
        ? presetBuilds
        : presetBuilds.filter((preset) => preset.buildClass === presetClassFilter),
    [presetClassFilter],
  );

  return (
    <main className={`app-shell ${activeTab === "custom" ? "has-mobile-summary" : ""}`}>
      <header className="topbar">
        <button
          aria-label="MaidenReady home"
          className="topbar-brand"
          type="button"
          onClick={() => handleTabChange("home")}
        >
          <span className="brand-mark" aria-hidden="true">MR</span>
          <span className="brand-copy">
            <span className="brand-name">MaidenReady</span>
            <span className="brand-tag">FPV Build Planner</span>
          </span>
        </button>
      </header>

      <TabNav activeTab={activeTab} tabs={appTabs} onTabChange={handleTabChange} />

      {activeTab === "home" && (
        <section className="tab-panel module-panel" aria-label="Home">
          <HomePanel
            onNavigateTab={handleTabChange}
            onSelectBuildClass={(buildClassId) => {
              handleBuildClassChange(buildClassId);
              setPresetClassFilter(buildClassId);
              handleTabChange("presets");
            }}
          />
        </section>
      )}

      {activeTab === "presets" && (
        <section className="tab-panel module-panel" aria-label="Preset builds">
          <div className="section-heading">
            <h2>Starter builds</h2>
          </div>
          <p className="section-intro">
            Starting points for common FPV goals. These are part lists to
            customize and verify — not physically tested kits or proven
            configurations.
          </p>
          <div
            aria-label="Filter starter builds by class"
            className="preset-filter"
            role="group"
          >
            <button
              aria-pressed={presetClassFilter === "all"}
              className={presetClassFilter === "all" ? "active" : ""}
              type="button"
              onClick={() => setPresetClassFilter("all")}
            >
              All builds
            </button>
            {buildClasses.map((item) => (
              <button
                aria-pressed={presetClassFilter === item.id}
                className={presetClassFilter === item.id ? "active" : ""}
                key={item.id}
                type="button"
                onClick={() => setPresetClassFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p aria-live="polite" className="preset-status">{presetStatus}</p>
          <PresetBuilds
            presets={visiblePresets}
            partsCatalog={parts}
            onLoadPreset={handlePresetLoad}
          />
        </section>
      )}

      {activeTab === "custom" && (
        <section className="workspace workspace-custom" aria-label="Custom build">
          <section className="picker-column module-panel" aria-labelledby="picker-heading">
            <div className="workspace-header">
              <div>
                <h2 id="picker-heading">Build your quad</h2>
                <p>Choose a category to browse parts. Estimates update as you go.</p>
              </div>
              <div className="build-progress" aria-label={`${Object.values(selectedParts).filter(Boolean).length} of ${buildSteps.length} parts selected`}>
                <span>{Object.values(selectedParts).filter(Boolean).length}/{buildSteps.length} parts</span>
                <span className="build-progress-bar" aria-hidden="true">
                  <span style={{ width: `${(Object.values(selectedParts).filter(Boolean).length / buildSteps.length) * 100}%` }} />
                </span>
              </div>
            </div>

            <BuildClassSelector
              buildClass={buildClass}
              buildClasses={buildClasses}
              status={buildClassStatus}
              onBuildClassChange={handleBuildClassChange}
            />

            <ConfiguratorStage
              selectedParts={selectedParts}
              activeCategory={pickerStepKey}
              buildClass={buildClass}
              changeNotice={changeNotice}
              onSelectCategory={setPickerStepKey}
            />

            <ConfiguratorNav
              selectedParts={selectedParts}
              activeCategory={pickerStepKey}
              warnings={warnings}
              onSelectCategory={setPickerStepKey}
            />

            <div className="build-overview">
              {buildSteps.map((step, index) => (
                <BuildOverviewRow
                  key={step.key}
                  index={index + 1}
                  step={step}
                  selectedPart={selectedParts[step.key]}
                  warnings={warnings}
                  onOpenPicker={setPickerStepKey}
                  onOpenDetails={setDetailInfo}
                />
              ))}
            </div>
          </section>

          <div className="results-column">
            <BuildSummary
              stats={stats}
              warnings={warnings}
              grades={grades}
              buildExplanation={buildExplanation}
              buildClass={buildClass}
              selectedParts={selectedParts}
              copyStatus={copyStatus}
              onCopyBuildLink={handleCopyBuildLink}
            />
          </div>

          <MobileSummaryBar
            stats={stats}
            warnings={warnings}
            selectedParts={selectedParts}
            onOpenSummary={() => setMobileSummaryOpen(true)}
          />

          {mobileSummaryOpen && (
            <MobileSummaryPanel onClose={() => setMobileSummaryOpen(false)}>
              <BuildSummary
                stats={stats}
                warnings={warnings}
                grades={grades}
                buildExplanation={buildExplanation}
                buildClass={buildClass}
                selectedParts={selectedParts}
                copyStatus={copyStatus}
                onCopyBuildLink={handleCopyBuildLink}
              />
            </MobileSummaryPanel>
          )}

          {pickerStepKey && (
            <PartPickerPanel
              stepKey={pickerStepKey}
              selectedIds={selectedIds}
              selectedParts={selectedParts}
              buildClass={buildClass}
              onClose={() => setPickerStepKey(null)}
              onSelect={(key, partId) => {
                handleSelectionChange(key, partId);
              }}
              onOpenDetails={setDetailInfo}
            />
          )}
        </section>
      )}

      {activeTab === "saved" && (
        <section className="tab-panel module-panel" aria-label="Saved builds">
          <div className="section-heading">
            <h2>Saved builds</h2>
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
          <div className="section-heading">
            <h2>Compare builds</h2>
          </div>
          <p className="section-intro">
            Compare estimated stats from two builds you saved on the Saved Builds tab.
          </p>
          <CompareBuilds savedBuilds={savedBuilds} partsCatalog={parts} />
        </section>
      )}

      {activeTab === "learn" && (
        <section className="tab-panel module-panel" aria-label="Learn">
          <LearnPanel entries={learnEntries} />
        </section>
      )}

      <PartInfoDrawer
        info={detailInfo}
        onClose={() => setDetailInfo(null)}
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
        <h2 id="learn-heading">FPV terms, in plain language</h2>
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
  const [imageDisplayMode, setImageDisplayMode] = useState("photo");
  const closeRef = useRef(null);

  useEffect(() => {
    if (info) {
      closeRef.current?.focus();
    }
  }, [info]);

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
          <button ref={closeRef} className="drawer-close" type="button" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="part-info-image">
          <PartImage
            categoryKey={step.key}
            part={part}
            partType={categoryLabel}
            variant="drawer"
            onDisplayModeChange={setImageDisplayMode}
          />
          {imageDisplayMode === "photo" && hasPartImageMetadata(part) && (
            <PartImageAttribution part={part} />
          )}
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
          <PartInfoStat
            label="Verification"
            value={(part.verificationStatus ?? "unverified").replaceAll("-", " ")}
          />
          {part.verifiedFields?.length > 0 && (
            <PartInfoStat
              label="Verified fields"
              value={`${part.verifiedFields.length} fields`}
            />
          )}
        </div>
        {part.sourceUrl && (
          <p className="part-info-description">
            <a href={part.sourceUrl} rel="noopener noreferrer" target="_blank">
              View manufacturer source
            </a>
            {part.sourceDate ? ` · reviewed ${part.sourceDate}` : ""}
          </p>
        )}

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
              {(comparison.leftStats.missingPartCount > 0 ||
                comparison.rightStats.missingPartCount > 0) && (
                <p className="comparison-note">
                  {comparison.leftStats.missingPartCount > 0 &&
                    `Build A is missing ${comparison.leftStats.missingPartCount} catalog part${comparison.leftStats.missingPartCount === 1 ? "" : "s"} — defaults were used in these estimates.`}
                  {comparison.leftStats.missingPartCount > 0 &&
                    comparison.rightStats.missingPartCount > 0 &&
                    " "}
                  {comparison.rightStats.missingPartCount > 0 &&
                    `Build B is missing ${comparison.rightStats.missingPartCount} catalog part${comparison.rightStats.missingPartCount === 1 ? "" : "s"} — defaults were used in these estimates.`}
                </p>
              )}
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
    <section className="save-panel" aria-label="Saved build controls">
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
  const createdDate = Number.isFinite(Date.parse(savedBuild.createdAt))
    ? new Date(savedBuild.createdAt).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      })
    : "—";

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

function PresetBuilds({ presets, partsCatalog, onLoadPreset, compact = false }) {
  const enrichedPresets = useMemo(
    () =>
      presets.map((preset) => {
        const resolved = resolvePresetParts(preset, partsCatalog);
        const selected = getSelectedParts(resolved.selections, partsCatalog);
        const stats = calculateBuildStats(selected, preset.buildClass);

        return { ...preset, selected, stats };
      }),
    [partsCatalog, presets],
  );

  if (presets.length === 0) {
    return (
      <div className="preset-empty">
        No starter builds match this class. Choose another class or use Custom
        Build.
      </div>
    );
  }

  return (
    <section
      className={`preset-module ${compact ? "preset-module-compact" : ""}`}
      aria-label="Starter build cards"
    >
      <div className="preset-grid">
        {enrichedPresets.map((preset) => (
          <article className="preset-card" key={preset.id}>
            <div className="preset-image">
              <DroneVisual
                selectedParts={preset.selected}
                buildClass={preset.buildClass}
                showLabels={false}
              />
            </div>
            <div className="preset-body">
              <span className="preset-role">
                {buildClassById[preset.buildClass]?.label ?? preset.buildClass} ·
                {" "}Starter
              </span>
              <h3>{preset.name}</h3>
              <p>{preset.description}</p>
              <div className="preset-stats">
                <span>{formatCurrency(preset.stats.totalPrice)}</span>
                <span>{formatFlightTimeRange(preset.stats)}</span>
                <span>{formatThrustToWeight(preset.stats.thrustToWeight)}</span>
              </div>
            </div>
            <div className="preset-actions">
              <button type="button" onClick={() => onLoadPreset(preset)}>
                Load build
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CompatibilityBanner({ warnings, buildClass, selectedParts }) {
  const high = warnings.filter((warning) => warning.severity === "high");
  const medium = warnings.filter((warning) => warning.severity === "medium");
  const unknown = warnings.filter((warning) => warning.severity === "unknown");
  const unverified = Object.values(selectedParts ?? {}).filter(
    (part) =>
      part &&
      ["unverified", "partially-verified"].includes(
        part.verificationStatus ?? "unverified",
      ),
  ).length;
  const needsVerification = unknown.length > 0 || unverified > 0;
  const className = high.length ? "bad" : medium.length || needsVerification ? "warn" : "ok";
  const title = high.length
    ? `Incompatible · ${high.length} conflict${high.length === 1 ? "" : "s"}`
    : medium.length || unknown.length
      ? "Check specifications"
      : unverified > 0
        ? "No known conflicts · specs unverified"
        : "No known compatibility conflicts";
  const body = high.length
    ? "These parts are unlikely to work together safely without changes."
    : medium.length || unknown.length
      ? "One or more specifications are unknown or need a closer look. Missing documentation is not proof that parts fit."
      : unverified > 0
        ? "Static checks found no known conflicts, but some selected specifications are unverified. Confirm them against manufacturer docs."
        : `No known conflicts for this ${buildClassById[buildClass]?.label ?? "build"}. Still verify wiring, stack fit, and tune before arming.`;

  return (
    <div className={`compat-banner ${className}`}>
      <span className="compat-icon" aria-hidden="true">{high.length ? "!" : medium.length || needsVerification ? "?" : "✓"}</span>
      <div>
        <strong>{title}</strong>
        <p>{body}</p>
      </div>
    </div>
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

const warningCategoryMap = {
  "prop-clearance": ["props", "frame"],
  "motor-cell-count": ["motors", "battery"],
  "esc-current": ["esc", "motors", "props"],
  "esc-voltage": ["esc", "battery"],
  "tiny-fc-cell-count": ["flightController", "battery"],
  "motor-mount": ["motors", "frame"],
  "fc-frame-stack": ["flightController", "frame"],
  "esc-frame-stack": ["esc", "frame"],
  "fc-esc-stack": ["flightController", "esc"],
  "video-analog-digital": ["camera", "vtx"],
  "video-digital-system": ["camera", "vtx"],
  "tiny-cell-count": ["battery"],
  "tiny-ducted-frame": ["frame"],
  "tiny-prop-size": ["props"],
  "tiny-esc-aio": ["esc"],
  "tiny-fc-aio": ["flightController"],
  "cinewhoop-ducted-frame": ["frame"],
  "cinewhoop-low-thrust": ["motors", "props", "battery"],
  "cinewhoop-heavy-battery": ["battery"],
  "long-range-cell-count": ["battery"],
  "long-range-flight-time": ["battery", "motors", "props"],
  "long-range-prop-pitch": ["props"],
  "unknown-prop-clearance": ["props", "frame"],
  "unknown-motor-cells": ["motors", "battery"],
  "unknown-esc-current": ["esc", "motors"],
  "unknown-esc-voltage": ["esc", "battery"],
  "unknown-fc-voltage": ["flightController", "battery"],
  "unknown-motor-mount": ["motors", "frame"],
  "unknown-fc-frame-stack": ["flightController", "frame"],
  "unknown-esc-frame-stack": ["esc", "frame"],
  "unknown-fc-esc-stack": ["flightController", "esc"],
  "unknown-video-system": ["camera", "vtx"],
  "unknown-digital-system": ["camera", "vtx"],
  "unknown-battery-connector": ["battery"],
  "unknown-aio-connector": ["battery", "flightController"],
  "battery-connector": ["battery", "flightController"],
  "unknown-receiver-protocol": ["receiver"],
};

function getBuildCompatibility(warnings, selectedParts = {}) {
  const high = warnings.filter((warning) => warning.severity === "high");
  const medium = warnings.filter((warning) => warning.severity === "medium");
  const unknown = warnings.filter((warning) => warning.severity === "unknown");
  const unverified = Object.values(selectedParts).filter(
    (part) =>
      part &&
      ["unverified", "partially-verified"].includes(
        part.verificationStatus ?? "unverified",
      ),
  ).length;

  if (high.length > 0) {
    return {
      level: "issue",
      label: `Incompatible · ${high.length}`,
      shortLabel: "Incompatible",
    };
  }

  if (medium.length > 0) {
    return {
      level: "caution",
      label: "Check specs",
      shortLabel: "Check",
    };
  }

  if (unknown.length > 0) {
    return {
      level: "caution",
      label: "Check specs",
      shortLabel: "Check",
    };
  }

  if (unverified > 0) {
    return {
      level: "caution",
      label: "No known conflicts · unverified",
      shortLabel: "Unverified",
    };
  }

  return { level: "ok", label: "No known conflicts", shortLabel: "No conflicts" };
}

function getCategoryWarningStatus(categoryKey, warnings) {
  const relevant = warnings.filter((warning) =>
    (warningCategoryMap[warning.id] ?? []).includes(categoryKey),
  );
  const high = relevant.filter((warning) => warning.severity === "high");
  const medium = relevant.filter((warning) => warning.severity === "medium");
  const unknown = relevant.filter((warning) => warning.severity === "unknown");

  if (high.length > 0) {
    return { level: "issue", label: "Incompatible" };
  }

  if (medium.length > 0 || unknown.length > 0) {
    return { level: "caution", label: "Check specs" };
  }

  return { level: "ok", label: "No known conflicts", shortLabel: "No conflicts" };
}

function ConfiguratorNav({
  selectedParts,
  activeCategory,
  warnings,
  onSelectCategory,
}) {
  return (
    <nav aria-label="Component categories" className="config-nav">
      {buildSteps.map((step, index) => {
        const selected = selectedParts[step.key];
        const status = selected
          ? getCategoryWarningStatus(step.key, warnings)
          : { level: "empty", label: "Empty" };

        return (
          <button
            aria-label={`${step.label}: ${selected?.name ?? "not selected"}`}
            className={`config-nav-item ${activeCategory === step.key ? "active" : ""}`}
            key={step.key}
            type="button"
            onClick={() => onSelectCategory(step.key)}
          >
            <span className="config-nav-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="config-nav-label">{step.label}</span>
            <span className={`config-nav-dot ${status.level}`} aria-hidden="true" />
          </button>
        );
      })}
    </nav>
  );
}

function BuildOverviewRow({
  index,
  step,
  selectedPart,
  warnings,
  onOpenPicker,
  onOpenDetails,
}) {
  const status = selectedPart
    ? getCategoryWarningStatus(step.key, warnings)
    : { level: "empty", label: "Empty" };

  return (
    <article className={`build-row ${selectedPart ? "" : "build-row-empty"}`}>
      <button
        className="build-row-main"
        type="button"
        onClick={() => onOpenPicker(step.key)}
      >
        <span className="build-row-number" aria-hidden="true">
          {String(index).padStart(2, "0")}
        </span>
        <span className="build-row-thumb" aria-hidden="true">
          {selectedPart ? (
            <PartImage
              categoryKey={step.key}
              part={selectedPart}
              partType={step.label}
            />
          ) : (
            <span className="build-row-empty-mark">+</span>
          )}
        </span>
        <span className="build-row-copy">
          <span className="build-row-category">{step.label}</span>
          <strong>{selectedPart?.name ?? `Choose ${step.label.toLowerCase()}`}</strong>
          <span className="build-row-meta">
            {selectedPart
              ? `${getPartPriceLabel(step.key, selectedPart)} · ${getPartWeightLabel(step.key, selectedPart)}`
              : "No part selected"}
          </span>
          <span className={`build-row-inline-status ${status.level}`}>
            {status.label}
          </span>
        </span>
        <span className={`build-row-status ${status.level}`}>{status.label}</span>
        <span className="build-row-action">
          {selectedPart ? "Change" : "Choose"} <span aria-hidden="true">→</span>
        </span>
      </button>
      {selectedPart && (
        <button
          className="build-row-details"
          type="button"
          onClick={() => onOpenDetails({ step, part: selectedPart })}
        >
          Details
        </button>
      )}
    </article>
  );
}

function BuildSummary({
  stats,
  warnings,
  grades,
  buildExplanation,
  buildClass,
  selectedParts,
  copyStatus,
  onCopyBuildLink,
}) {
  const compatibility = getBuildCompatibility(warnings, selectedParts);

  return (
    <section className="results-section build-summary" aria-label="Build summary">
      <div className="summary-heading">
        <div>
          <p className="eyebrow">Estimated build</p>
          <h2>Build summary</h2>
        </div>
        <span className={`summary-status ${compatibility.level}`}>
          {compatibility.label}
        </span>
      </div>

      <div className="summary-total">
        <span>Estimated total</span>
        <strong>{formatCurrency(stats.totalPrice)}</strong>
        <span className="summary-confidence">High confidence · part prices vary by retailer</span>
      </div>

      <div className="summary-kpis">
        <div>
          <span>Estimated weight</span>
          <strong>{formatWeightG(stats.totalWeightG)}</strong>
          <span>Medium confidence</span>
        </div>
        <div>
          <span>Estimated flight time</span>
          <strong>{formatFlightTimeRange(stats)}</strong>
          <span>Low confidence</span>
        </div>
      </div>

      <CompatibilityBanner warnings={warnings} buildClass={buildClass} selectedParts={selectedParts} />

      <details className="advanced-section">
        <summary>Performance details</summary>
        <div className="stats-grid advanced-stats">
          <StatCard
            label="Est. thrust"
            value={formatThrustG(stats.totalThrustG)}
            confidence="MEDIUM"
          />
          <StatCard
            label="Est. T:W"
            value={formatThrustToWeight(stats.thrustToWeight)}
            confidence="MEDIUM"
          />
          <StatCard
            label="Est. top speed"
            value={formatTopSpeedRange(stats)}
            confidence="LOW"
          />
        </div>
        <EstimateAccuracy />
      </details>

      <details className="advanced-section">
        <summary>Build assessment</summary>
        <div className="grade-grid">
          {Object.values(grades)
            .filter((grade) => grade.label !== "Overall")
            .map((grade) => (
              <GradeCard key={grade.label} grade={grade} />
            ))}
        </div>
        <ExplainBuildPanel explanation={buildExplanation} />
        <p className="summary-note">
          Letter grades are a rough comparison tool, not a safety or performance
          certification. Static checks cannot catch every wiring, firmware, or
          physical-fit issue.
        </p>
      </details>

      <div className="summary-share">
        <h3>Share this build</h3>
        <ShareBuildButton
          status={copyStatus}
          onCopyBuildLink={onCopyBuildLink}
        />
      </div>
    </section>
  );
}

function MobileSummaryBar({ stats, warnings, selectedParts, onOpenSummary }) {
  const compatibility = getBuildCompatibility(warnings, selectedParts);

  return (
    <div className="mobile-summary-bar">
      <div className="mobile-summary-price">
        <span>Estimated total</span>
        <strong>{formatCurrency(stats.totalPrice)}</strong>
      </div>
      <span className={`mobile-summary-status ${compatibility.level}`}>
        {compatibility.shortLabel}
      </span>
      <button type="button" onClick={onOpenSummary}>
        View summary
      </button>
    </div>
  );
}

function MobileSummaryPanel({ children, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <div className="mobile-summary-layer">
      <button
        aria-label="Close build summary"
        className="mobile-summary-scrim"
        type="button"
        onClick={onClose}
      />
      <div
        aria-label="Build summary"
        aria-modal="true"
        className="mobile-summary-panel"
        role="dialog"
      >
        <div className="mobile-summary-head">
          <span>Configuration</span>
          <button ref={closeRef} className="drawer-close" type="button" onClick={onClose}>
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function PartPickerPanel({
  stepKey,
  selectedIds,
  selectedParts,
  buildClass,
  onClose,
  onSelect,
  onOpenDetails,
}) {
  const step = buildSteps.find((buildStep) => buildStep.key === stepKey);
  const options = parts[stepKey] ?? [];
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("all");
  const [specFilter, setSpecFilter] = useState("all");
  const [sort, setSort] = useState("best");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  const brands = useMemo(
    () =>
      [...new Set(options.map((part) => part.brand).filter(Boolean))].sort(
        (left, right) => left.localeCompare(right),
      ),
    [options],
  );
  const specFilters = useMemo(
    () => getSpecFilterOptions(stepKey, options),
    [options, stepKey],
  );

  const filteredOptions = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return options.filter((part) => {
      if (brand !== "all" && part.brand !== brand) {
        return false;
      }

      if (!matchesSpecFilter(part, specFilter)) {
        return false;
      }

      if (!needle) {
        return true;
      }

      const haystack = [
        part.name,
        part.brand,
        part.description,
        ...(part.keySpecs ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(needle);
    });
  }, [brand, options, query, specFilter]);

  const evaluatedOptions = useMemo(
    () =>
      filteredOptions.map((part) => {
        const candidateSelections = { ...selectedIds, [stepKey]: part.id };
        const candidateParts = getSelectedParts(candidateSelections, parts);
        const candidateStats = calculateBuildStats(candidateParts, buildClass);
        const candidateWarnings = getCompatibilityWarnings(
          candidateParts,
          buildClass,
          candidateStats,
        );
        const high = candidateWarnings.filter(
          (warning) => warning.severity === "high",
        );
        const cautions = candidateWarnings.filter(
          (warning) => warning.severity === "medium",
        );
        const unknowns = candidateWarnings.filter(
          (warning) => warning.severity === "unknown",
        );
        const unverified = Object.values(candidateParts).filter(
          (candidate) =>
            candidate &&
            ["unverified", "partially-verified"].includes(
              candidate.verificationStatus ?? "unverified",
            ),
        ).length;
        const classCompatible =
          !part.compatibleClasses?.length ||
          part.compatibleClasses.includes(buildClass);

        return {
          part,
          classCompatible,
          high,
          cautions,
          unknowns,
          unverified,
          firstWarning:
            high[0] ?? cautions[0] ?? unknowns[0] ?? null,
        };
      }),
    [buildClass, filteredOptions, selectedIds, stepKey],
  );

  const sortedOptions = useMemo(() => {
    const selectedId = selectedIds[stepKey];

    return [...evaluatedOptions].sort((left, right) => {
      if (left.part.id === selectedId) return -1;
      if (right.part.id === selectedId) return 1;

      if (sort === "price-asc") {
        return (left.part.price ?? 0) - (right.part.price ?? 0);
      }

      if (sort === "price-desc") {
        return (right.part.price ?? 0) - (left.part.price ?? 0);
      }

      if (left.classCompatible !== right.classCompatible) {
        return left.classCompatible ? -1 : 1;
      }

      if (left.high.length !== right.high.length) {
        return left.high.length - right.high.length;
      }

      if (left.cautions.length !== right.cautions.length) {
        return left.cautions.length - right.cautions.length;
      }

      return left.part.name.localeCompare(right.part.name);
    });
  }, [evaluatedOptions, selectedIds, sort, stepKey]);

  const activeFilterCount =
    (brand !== "all" ? 1 : 0) + (specFilter !== "all" ? 1 : 0);

  if (!step) {
    return null;
  }

  return (
    <div
      aria-labelledby="picker-title"
      aria-modal="true"
      className="picker-layer"
      role="dialog"
    >
      <button
        aria-label="Close part picker"
        className="picker-scrim"
        type="button"
        onClick={onClose}
      />
      <div className="picker-panel">
        <header className="picker-header">
          <div>
            <p className="eyebrow">Choose a part</p>
            <h2 id="picker-title">{step.label}</h2>
            <p className="picker-subtitle">
              All options stay visible. Incompatible parts are labeled with the
              reason instead of being hidden.
            </p>
          </div>
          <button ref={closeRef} className="drawer-close" type="button" onClick={onClose}>
            Close
          </button>
        </header>

        <div className="picker-toolbar">
          <input
            aria-label={`Search ${step.label} parts`}
            className="picker-search-input"
            placeholder={`Search ${options.length} ${step.label.toLowerCase()} parts`}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select
            aria-label="Sort parts"
            className="picker-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="best">Best fit first</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
          <button
            aria-expanded={filtersOpen}
            className="picker-filter-toggle"
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
          >
            Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
          </button>
        </div>

        <div className={`picker-filters-panel ${filtersOpen ? "open" : ""}`}>
          <select
            aria-label="Filter by brand"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
          >
            <option value="all">All brands</option>
            {brands.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {specFilters.length > 0 && (
            <select
              aria-label="Filter by specification"
              value={specFilter}
              onChange={(event) => setSpecFilter(event.target.value)}
            >
              <option value="all">All specs</option>
              {specFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          )}
          <button
            className="picker-reset"
            type="button"
            onClick={() => {
              setBrand("all");
              setSpecFilter("all");
            }}
          >
            Reset filters
          </button>
        </div>

        {activeFilterCount > 0 && (
          <div className="picker-active-filters">
            <span>{activeFilterCount} active filter{activeFilterCount === 1 ? "" : "s"}</span>
            <button
              type="button"
              onClick={() => {
                setBrand("all");
                setSpecFilter("all");
              }}
            >
              Clear all
            </button>
          </div>
        )}

        <div className="picker-count">
          {sortedOptions.length} of {options.length} parts shown
          {selectedParts[stepKey] ? ` · current: ${selectedParts[stepKey].name}` : ""}
        </div>

        <div className="picker-results">
          {sortedOptions.length === 0 ? (
            <div className="picker-empty">
              No parts match those filters. Try clearing the search or brand
              filter.
            </div>
          ) : (
            sortedOptions.map(
              ({ part, classCompatible, high, cautions, unknowns, unverified, firstWarning }) => {
                const isSelected = selectedIds[stepKey] === part.id;
                const status = high.length
                  ? `Incompatible · ${high.length}`
                  : cautions.length || unknowns.length
                    ? "Check specs"
                    : unverified > 0
                      ? "No known conflicts · unverified"
                      : "No known conflicts";

                return (
                  <article
                    className={`picker-result ${isSelected ? "selected" : ""}`}
                    key={part.id}
                  >
                    <div className="picker-result-image">
                      <PartImage
                        categoryKey={stepKey}
                        part={part}
                        partType={step.label}
                      />
                    </div>
                    <div className="picker-result-body">
                      <div className="picker-result-top">
                        <span className="picker-result-brand">
                          {part.brand ?? "Unknown brand"}
                        </span>
                        <span className={`verification-badge ${part.verificationStatus ?? "unverified"}`}>
                          {(part.verificationStatus ?? "unverified").replaceAll("-", " ")}
                        </span>
                      </div>
                      <h3>{part.name}</h3>
                      <div className="picker-result-meta">
                        {getPartPriceLabel(stepKey, part)} ·{" "}
                        {getPartWeightLabel(stepKey, part)}
                      </div>
                      <div className="picker-result-specs">
                        {getKeySpecs(stepKey, part).slice(0, 4).map((spec) => (
                          <span key={spec}>{spec}</span>
                        ))}
                      </div>
                      <div className="picker-result-footer">
                        <span
                          className={`picker-compat ${!classCompatible ? "issue" : high.length ? "issue" : cautions.length || unknowns.length || unverified ? "caution" : "ok"}`}
                        >
                          {!classCompatible
                            ? `Not compatible with ${buildClassById[buildClass]?.label ?? "this build class"}`
                            : status}
                        </span>
                        {firstWarning && classCompatible && (
                          <span className="picker-warning">
                            {firstWarning.title}
                          </span>
                        )}
                      </div>
                      <div className="picker-result-actions">
                        <button
                          type="button"
                          onClick={() => onOpenDetails({ step, part })}
                        >
                          Details
                        </button>
                        <button
                          className="picker-select"
                          disabled={!classCompatible}
                          type="button"
                          onClick={() => onSelect(stepKey, part.id)}
                        >
                          {isSelected ? "Selected" : "Select"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              },
            )
          )}
        </div>
      </div>
    </div>
  );
}

function getSpecFilterOptions(stepKey, options) {
  const cells = [
    ...new Set(
      options.flatMap((part) => [
        ...(part.cells ? [part.cells] : []),
        ...(part.recommendedCells ?? []),
        ...(part.supportedCells ?? []),
      ]),
    ),
  ]
    .filter(Number.isFinite)
    .sort((left, right) => left - right);

  switch (stepKey) {
    case "motors":
      return [
        { value: "kv:under2000", label: "KV under 2000" },
        { value: "kv:2000-2999", label: "KV 2000–2999" },
        { value: "kv:3000plus", label: "KV 3000+" },
        ...cells.map((cell) => ({
          value: `cells:${cell}`,
          label: `${cell}S`,
        })),
      ];
    case "battery":
      return [
        ...cells.map((cell) => ({
          value: `cells:${cell}`,
          label: `${cell}S`,
        })),
        { value: "chemistry:LiHV", label: "LiHV" },
        { value: "chemistry:LiPo", label: "LiPo" },
      ];
    case "props":
      return [
        { value: "diameter:under2", label: 'Under 2"' },
        { value: "diameter:2-3", label: '2–3"' },
        { value: "diameter:3.5", label: '3.5"' },
        { value: "diameter:5", label: '5"' },
        { value: "diameter:7", label: '7"' },
      ];
    case "frame":
      return [
        { value: "maxprop:under3", label: 'Props under 3"' },
        { value: "maxprop:3-4", label: 'Props 3–4"' },
        { value: "maxprop:5", label: '5" props' },
        { value: "maxprop:7", label: '7" props' },
        { value: "ducted:true", label: "Ducted" },
      ];
    case "esc":
      return [
        { value: "amp:under40", label: "Under 40A" },
        { value: "amp:40-59", label: "40–59A" },
        { value: "amp:60plus", label: "60A+" },
        ...cells.map((cell) => ({
          value: `cells:${cell}`,
          label: `${cell}S`,
        })),
      ];
    case "flightController":
      return [
        { value: "mount:20x20", label: "20x20 mount" },
        { value: "mount:25.5x25.5", label: "25.5x25.5 mount" },
        { value: "mount:30.5x30.5", label: "30.5x30.5 mount" },
        { value: "aio:true", label: "AIO" },
      ];
    case "camera":
    case "vtx":
      return [
        { value: "video:analog", label: "Analog" },
        { value: "video:digital", label: "Digital" },
      ];
    case "receiver":
      return [
        { value: "protocol:ExpressLRS", label: "ExpressLRS" },
        { value: "protocol:Crossfire", label: "Crossfire" },
      ];
    default:
      return [];
  }
}

function matchesSpecFilter(part, filter) {
  if (!filter || filter === "all") {
    return true;
  }

  const [kind, raw] = filter.split(":");
  const number = Number(raw);

  switch (kind) {
    case "kv": {
      const kv = Number(part.kv);
      if (!Number.isFinite(kv)) return false;
      if (raw === "under2000") return kv < 2000;
      if (raw === "2000-2999") return kv >= 2000 && kv < 3000;
      if (raw === "3000plus") return kv >= 3000;
      return true;
    }
    case "cells":
      return [
        ...(part.cells ? [part.cells] : []),
        ...(part.recommendedCells ?? []),
        ...(part.supportedCells ?? []),
      ].includes(number);
    case "chemistry":
      return (part.chemistry ?? "").toLowerCase() === raw.toLowerCase();
    case "diameter": {
      const diameter = Number(part.diameterInches);
      if (!Number.isFinite(diameter)) return false;
      if (raw === "under2") return diameter < 2;
      if (raw === "2-3") return diameter >= 2 && diameter < 3.5;
      if (raw === "3.5") return diameter >= 3.4 && diameter < 4;
      if (raw === "5") return diameter >= 5 && diameter < 6;
      if (raw === "7") return diameter >= 6.5;
      return true;
    }
    case "maxprop": {
      const maxProp = Number(part.maxPropInches);
      if (!Number.isFinite(maxProp)) return false;
      if (raw === "under3") return maxProp < 3;
      if (raw === "3-4") return maxProp >= 3 && maxProp < 5;
      if (raw === "5") return maxProp >= 5 && maxProp < 6.5;
      if (raw === "7") return maxProp >= 6.5;
      return true;
    }
    case "amp": {
      const amp = Number(part.continuousAmp);
      if (!Number.isFinite(amp)) return false;
      if (raw === "under40") return amp < 40;
      if (raw === "40-59") return amp >= 40 && amp < 60;
      if (raw === "60plus") return amp >= 60;
      return true;
    }
    case "mount":
      return [part.mountPattern, ...(part.stackMounts ?? [])]
        .filter(Boolean)
        .some((mount) => String(mount).includes(raw));
    case "aio":
      return Boolean(part.isAio);
    case "video":
      return part.videoSystem === raw;
    case "protocol":
      return (part.protocol ?? "").toLowerCase() === raw.toLowerCase();
    case "ducted":
      return Boolean(part.ducted);
    default:
      return true;
  }
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

const statHelp = {
  "Est. price": "Sum of selected part prices (estimated; real prices vary by retailer).",
  "Est. mass": "All-up mass including a small hardware allowance per build class.",
  "Est. thrust": "Estimated total thrust after duct losses for whoops/cinewhoops.",
  "Est. T:W": "Thrust divided by all-up mass. Higher = stronger punchout.",
  "Est. flight": "Conservative mixed-throttle range from pack capacity and estimated draw.",
  "Est. top speed": "Conservative range from KV, voltage, and prop pitch, capped by class.",
};

function StatCard({ label, value, confidence }) {
  const safeValue = value == null || value === "" ? "N/A" : value;

  return (
    <article className="stat-card">
      <p>
        {label}
        <span className="help-tip" tabIndex={0} aria-label={statHelp[label] ?? ""}>
          ?
          <span className="help-text">{statHelp[label]}</span>
        </span>
      </p>
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
