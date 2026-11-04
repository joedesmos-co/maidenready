import { useMemo } from "react";
import { buildClasses, parts } from "../data/parts.js";
import { presetBuilds } from "../data/presets.js";
import { resolvePresetParts } from "../utils/presets.js";
import {
  calculateBuildStats,
  formatCurrency,
  formatFlightTimeRange,
  formatThrustToWeight,
  getSelectedParts,
} from "../utils/buildCalculations.js";
import { DroneVisual } from "./DroneVisual.jsx";
import { PartImage } from "./PartImage.jsx";

const howItWorksSteps = [
  {
    title: "Choose a starting point",
    body: "Open a preset or start blank with the frame class you want to fly.",
  },
  {
    title: "Configure every component",
    body: "Pick frame, motors, electronics, props, battery, and video gear from the live catalog.",
  },
  {
    title: "See the build come together",
    body: "Follow the technical layout, price, weight, estimates, and compatibility as you go.",
  },
];

const componentRail = [
  { key: "frame", label: "Frame", copy: "The chassis and geometry" },
  { key: "motors", label: "Motors", copy: "Thrust and response" },
  { key: "battery", label: "Battery", copy: "Voltage and endurance" },
  { key: "camera", label: "Camera", copy: "The FPV feed" },
];

export function HomePanel({ onNavigateTab, onSelectBuildClass }) {
  const heroPreset = useMemo(
    () =>
      presetBuilds.find((item) => item.id === "cinewhoop-cruiser") ??
      presetBuilds[0],
    [],
  );
  const heroBuild = useMemo(() => {
    const resolved = resolvePresetParts(heroPreset, parts);
    const selected = getSelectedParts(resolved.selections, parts);
    const stats = calculateBuildStats(selected, heroPreset.buildClass);

    return { selected, stats };
  }, [heroPreset]);

  const classCards = useMemo(
    () =>
      buildClasses.map((buildClass) => {
        const preset =
          presetBuilds.find((item) => item.buildClass === buildClass.id) ??
          presetBuilds[0];
        const resolved = resolvePresetParts(preset, parts);
        const selected = getSelectedParts(resolved.selections, parts);

        return {
          ...buildClass,
          selected,
          frame: selected.frame,
          preset,
        };
      }),
    [],
  );

  return (
    <div className="home-panel">
      <section className="home-hero" aria-labelledby="home-hero-heading">
        <div className="home-hero-copy">
          <p className="eyebrow">FPV configurator</p>
          <h1 id="home-hero-heading" className="home-hero-title">
            Your quad.
            <br />
            Your build.
          </h1>
          <p className="home-hero-lead">
            Configure a real FPV drone part by part. See the layout, price,
            weight, flight estimates, and compatibility update as you choose.
          </p>
          <div className="home-cta-row">
            <button
              className="home-cta-button primary"
              type="button"
              onClick={() => onNavigateTab("custom")}
            >
              Build your drone
            </button>
            <button
              className="home-cta-button"
              type="button"
              onClick={() => onNavigateTab("presets")}
            >
              Explore builds
            </button>
          </div>
          <p className="home-hero-note">
            Free planning tool. No account required. Always verify parts against
            manufacturer documentation before ordering.
          </p>
        </div>

        <div className="home-hero-visual">
          <div className="home-hero-visual-top">
            <span>Featured configuration</span>
            <span>{heroPreset.role}</span>
          </div>
          <DroneVisual
            selectedParts={heroBuild.selected}
            buildClass={heroPreset.buildClass}
            className="home-drone"
          />
          <div className="home-hero-specs">
            <div>
              <span>Build</span>
              <strong>{heroPreset.name}</strong>
            </div>
            <div>
              <span>Est. price</span>
              <strong>{formatCurrency(heroBuild.stats.totalPrice)}</strong>
            </div>
            <div>
              <span>T:W</span>
              <strong>{formatThrustToWeight(heroBuild.stats.thrustToWeight)}</strong>
            </div>
            <div>
              <span>Flight</span>
              <strong>{formatFlightTimeRange(heroBuild.stats)}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="home-spec-strip" aria-label="Catalog summary">
        <div>
          <strong>{Object.values(parts).flat().length}</strong>
          <span>catalog parts</span>
        </div>
        <div>
          <strong>{buildClasses.length}</strong>
          <span>build classes</span>
        </div>
        <div>
          <strong>{presetBuilds.length}</strong>
          <span>starter presets</span>
        </div>
        <div>
          <strong>2D</strong>
          <span>honest technical layout</span>
        </div>
      </section>

      <section className="home-component-section" aria-labelledby="home-components-heading">
        <div className="home-section-header">
          <div>
            <p className="eyebrow">Real components</p>
            <h2 id="home-components-heading">Built around the parts you choose</h2>
          </div>
          <button
            className="home-text-action"
            type="button"
            onClick={() => onNavigateTab("custom")}
          >
            Open configurator →
          </button>
        </div>
        <div className="component-rail">
          {componentRail.map((item) => {
            const part = heroBuild.selected[item.key];

            return (
              <article className="component-tile" key={item.key}>
                <div className="component-tile-image">
                  {part && (
                    <PartImage
                      categoryKey={item.key}
                      part={part}
                      partType={item.label}
                    />
                  )}
                </div>
                <div className="component-tile-copy">
                  <span>{item.label}</span>
                  <strong>{part?.name ?? "Choose a part"}</strong>
                  <p>{item.copy}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="home-class-section" aria-labelledby="home-classes-heading">
        <div className="home-section-header">
          <div>
            <p className="eyebrow">Pick a discipline</p>
            <h2 id="home-classes-heading">One platform. Five ways to fly.</h2>
          </div>
        </div>
        <div className="home-class-grid">
          {classCards.map((buildClass) => (
            <button
              className="home-class-card"
              key={buildClass.id}
              type="button"
              onClick={() => onSelectBuildClass(buildClass.id)}
            >
              <span className="home-class-image">
                <DroneVisual
                  selectedParts={buildClass.selected}
                  buildClass={buildClass.id}
                  showLabels={false}
                />
              </span>
              <span className="home-class-copy">
                <strong>{buildClass.label}</strong>
                <span>{buildClass.preset.name}</span>
              </span>
              <span className="home-class-arrow" aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </section>

      <section className="home-process" aria-labelledby="home-process-heading">
        <div className="home-section-header">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 id="home-process-heading">Configure. Check. Fly.</h2>
          </div>
        </div>
        <ol className="home-process-list">
          {howItWorksSteps.map((step, index) => (
            <li key={step.title}>
              <span className="home-process-index">{String(index + 1).padStart(2, "0")}</span>
              <strong>{step.title}</strong>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-final-cta" aria-label="Start building">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2>Build the quad before you buy the parts.</h2>
        </div>
        <button
          className="home-cta-button primary"
          type="button"
          onClick={() => onNavigateTab("custom")}
        >
          Build your drone
        </button>
      </section>
    </div>
  );
}