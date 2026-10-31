import { buildSteps } from "../data/parts.js";
import { DroneVisual } from "./DroneVisual.jsx";

const hotspots = [
  { key: "frame", label: "Frame", left: 38, top: 44 },
  { key: "motors", label: "Motors", left: 29.4, top: 26.6 },
  { key: "props", label: "Props", left: 70.6, top: 26.6 },
  { key: "esc", label: "ESC", left: 50, top: 42 },
  { key: "flightController", label: "FC", left: 57, top: 47.5 },
  { key: "battery", label: "Battery", left: 50, top: 58 },
  { key: "camera", label: "Camera", left: 50, top: 31 },
  { key: "vtx", label: "VTX", left: 50, top: 68 },
  { key: "receiver", label: "RX", left: 62, top: 62 },
];

export function ConfiguratorStage({
  selectedParts,
  activeCategory,
  buildClass,
  changeNotice,
  onSelectCategory,
}) {
  const frame = selectedParts.frame;
  const battery = selectedParts.battery;
  const camera = selectedParts.camera;
  const vtx = selectedParts.vtx;
  const activeStep = buildSteps.find((step) => step.key === activeCategory);
  const activePart = activeCategory ? selectedParts[activeCategory] : frame;
  const heading = activePart?.name ?? "Start your build";
  const kicker = activeStep ? `Selected ${activeStep.label}` : "Live configuration";

  return (
    <section className="config-stage" aria-label="Build visualization">
      <div className="config-stage-top">
        <div>
          <p className="eyebrow">{kicker}</p>
          <h2>{heading}</h2>
          {changeNotice && (
            <p className="stage-change" role="status">{changeNotice}</p>
          )}
        </div>
        <span className="stage-badge">2D technical layout</span>
      </div>

      <div className="config-stage-canvas">
        <DroneVisual
          activeCategory={activeCategory}
          selectedParts={selectedParts}
          buildClass={buildClass}
          className="config-stage-drone"
        />

        {hotspots.map((hotspot) => (
          <button
            aria-label={`Choose ${hotspot.label}`}
            className={`hotspot ${activeCategory === hotspot.key ? "active" : ""}`}
            key={hotspot.key}
            style={{ left: `${hotspot.left}%`, top: `${hotspot.top}%` }}
            type="button"
            onClick={() => onSelectCategory(hotspot.key)}
          >
            <span className="hotspot-dot" aria-hidden="true" />
            <span className="hotspot-label">{hotspot.label}</span>
          </button>
        ))}
      </div>

      <div className="config-stage-ledger">
        <div>
          <span>Frame</span>
          <strong>{frame?.name ?? "Not selected"}</strong>
        </div>
        <div>
          <span>Power</span>
          <strong>
            {battery
              ? `${battery.cells ?? "?"}S · ${battery.capacityMah ?? "?"}mAh`
              : "Not selected"}
          </strong>
        </div>
        <div>
          <span>Video</span>
          <strong>
            {camera?.name ?? "Camera not selected"}
            {vtx ? ` · ${vtx.name}` : ""}
          </strong>
        </div>
      </div>

      <p className="stage-disclaimer">
        Top-view technical layout for planning. It is intentionally not a
        to-scale engineering drawing or a 3D product render.
      </p>
    </section>
  );
}