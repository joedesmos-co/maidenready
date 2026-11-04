const LAYOUTS = {
  "tiny-whoop": {
    label: "Tiny whoop",
    motors: [
      { x: 305, y: 250, rotation: 14 },
      { x: 495, y: 250, rotation: -12 },
      { x: 305, y: 370, rotation: -16 },
      { x: 495, y: 370, rotation: 18 },
    ],
    armWidth: 22,
    propLength: 82,
    ductRadius: 58,
    body: { x: 345, y: 262, width: 110, height: 96 },
    battery: { x: 362, y: 280, width: 76, height: 58 },
    esc: { x: 366, y: 292, width: 68, height: 18 },
    fc: { x: 366, y: 314, width: 68, height: 18 },
    camera: { x: 382, y: 226, width: 36, height: 24 },
    vtx: { x: 372, y: 342, width: 56, height: 16 },
    receiver: { x: 438, y: 330, width: 20, height: 14 },
    antennaLength: 40,
    defaultBlades: 3,
  },
  "3.5-inch-freestyle": {
    label: '3.5" freestyle',
    motors: [
      { x: 275, y: 205, rotation: 18 },
      { x: 525, y: 205, rotation: -16 },
      { x: 275, y: 405, rotation: -20 },
      { x: 525, y: 405, rotation: 22 },
    ],
    armWidth: 28,
    propLength: 118,
    ductRadius: 0,
    body: { x: 335, y: 255, width: 130, height: 110 },
    battery: { x: 358, y: 278, width: 84, height: 66 },
    esc: { x: 368, y: 290, width: 64, height: 19 },
    fc: { x: 368, y: 313, width: 64, height: 19 },
    camera: { x: 381, y: 218, width: 38, height: 25 },
    vtx: { x: 373, y: 342, width: 54, height: 17 },
    receiver: { x: 442, y: 330, width: 21, height: 14 },
    antennaLength: 62,
    defaultBlades: 3,
  },
  "5-inch-freestyle": {
    label: '5" freestyle',
    motors: [
      { x: 235, y: 165, rotation: 22 },
      { x: 565, y: 165, rotation: -18 },
      { x: 235, y: 445, rotation: -12 },
      { x: 565, y: 445, rotation: 28 },
    ],
    armWidth: 34,
    propLength: 152,
    ductRadius: 0,
    body: { x: 322, y: 232, width: 156, height: 146 },
    battery: { x: 354, y: 264, width: 92, height: 104 },
    esc: { x: 366, y: 246, width: 68, height: 26 },
    fc: { x: 366, y: 282, width: 68, height: 26 },
    camera: { x: 376, y: 204, width: 48, height: 30 },
    vtx: { x: 372, y: 374, width: 56, height: 24 },
    receiver: { x: 444, y: 356, width: 24, height: 16 },
    antennaLength: 72,
    defaultBlades: 3,
  },
  cinewhoop: {
    label: "Cinewhoop",
    motors: [
      { x: 285, y: 215, rotation: 16 },
      { x: 515, y: 215, rotation: -14 },
      { x: 285, y: 395, rotation: -18 },
      { x: 515, y: 395, rotation: 20 },
    ],
    armWidth: 30,
    propLength: 128,
    ductRadius: 72,
    body: { x: 325, y: 245, width: 150, height: 130 },
    battery: { x: 353, y: 274, width: 94, height: 74 },
    esc: { x: 370, y: 292, width: 60, height: 20 },
    fc: { x: 370, y: 316, width: 60, height: 20 },
    camera: { x: 378, y: 198, width: 44, height: 30 },
    vtx: { x: 372, y: 350, width: 56, height: 18 },
    receiver: { x: 440, y: 336, width: 22, height: 15 },
    antennaLength: 76,
    defaultBlades: 3,
  },
  "7-inch-long-range": {
    label: '7" long range',
    motors: [
      { x: 205, y: 185, rotation: 10 },
      { x: 595, y: 185, rotation: -8 },
      { x: 245, y: 445, rotation: -12 },
      { x: 555, y: 445, rotation: 14 },
    ],
    armWidth: 36,
    propLength: 178,
    ductRadius: 0,
    body: { x: 330, y: 238, width: 140, height: 150 },
    battery: { x: 344, y: 262, width: 112, height: 100 },
    esc: { x: 365, y: 296, width: 70, height: 18 },
    fc: { x: 365, y: 318, width: 70, height: 18 },
    camera: { x: 376, y: 196, width: 48, height: 28 },
    vtx: { x: 370, y: 360, width: 60, height: 18 },
    receiver: { x: 444, y: 342, width: 24, height: 16 },
    antennaLength: 104,
    defaultBlades: 2,
  },
};

const inferLayout = (frame, buildClass) => {
  if (buildClass && LAYOUTS[buildClass]) {
    return buildClass;
  }

  const size = String(frame?.size ?? "");
  const maxProp = Number(frame?.maxPropInches);

  if (size.includes("65") || size.includes("75") || maxProp <= 2) {
    return "tiny-whoop";
  }

  if (frame?.ducted && maxProp >= 3) {
    return "cinewhoop";
  }

  if (maxProp >= 6.5) {
    return "7-inch-long-range";
  }

  if (maxProp >= 4.5) {
    return "5-inch-freestyle";
  }

  return "3.5-inch-freestyle";
};

const formatProp = (props) => {
  const diameter = Number(props?.diameterInches);
  const blades = props?.blades;

  if (!Number.isFinite(diameter)) {
    return "Props not selected";
  }

  const size = diameter < 2 ? `${Math.round(diameter * 25.4)}mm` : `${diameter}"`;
  return `${size}${blades ? ` · ${blades}-blade` : ""}`;
};

export function DroneVisual({
  activeCategory = null,
  selectedParts = {},
  buildClass = null,
  className = "",
  showLabels = true,
}) {
  const frame = selectedParts.frame;
  const motors = selectedParts.motors;
  const props = selectedParts.props;
  const battery = selectedParts.battery;
  const layoutKey = inferLayout(frame, buildClass);
  const layout = LAYOUTS[layoutKey];
  const ducted = layout.ductRadius > 0;
  const blades = Number(props?.blades) || layout.defaultBlades;

  const frameLabel = (() => {
    if (layoutKey === "tiny-whoop") {
      return frame?.size?.includes("mm") ? frame.size : "65–75mm ducted";
    }

    if (layoutKey === "cinewhoop") {
      return '3.5" ducted';
    }

    if (layoutKey === "7-inch-long-range") {
      return '7" stretched';
    }

    const maxProp = Number(frame?.maxPropInches);
    return Number.isFinite(maxProp) ? `${maxProp}" frame` : layout.label;
  })();

  const motorLabel = motors?.kv
    ? `${motors.stator ? `${motors.stator} ` : ""}${motors.kv}KV`
    : "Motors not selected";
  const propLabel = formatProp(props);
  const batteryLabel = battery?.cells
    ? `${battery.cells}S${battery.capacityMah ? ` · ${battery.capacityMah}mAh` : ""}`
    : "Battery not selected";

  return (
    <div className={`drone-visual drone-layout-${layoutKey} ${className}`}>
      <svg
        aria-label={`Technical top-view layout of a ${layout.label} FPV drone. ${frameLabel}, ${motorLabel}, ${propLabel}, ${batteryLabel}.`}
        className="drone-visual-svg"
        role="img"
        viewBox="0 0 800 620"
      >
        <defs>
          <pattern id="dv-grid" width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M 26 0 L 0 0 0 26" className="dv-grid-line" fill="none" />
          </pattern>
          <linearGradient id="dv-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2b2f34" />
            <stop offset="1" stopColor="#17191c" />
          </linearGradient>
        </defs>

        <rect className="dv-grid" x="0" y="0" width="800" height="620" fill="url(#dv-grid)" />
        <line className="dv-axis" x1="400" y1="40" x2="400" y2="580" />
        <line className="dv-axis" x1="110" y1="305" x2="690" y2="305" />

        <g className={`dv-part dv-frame ${activeCategory === "frame" ? "is-active" : ""}`}>
          {layout.motors.map((motor, index) => (
            <path
              className="dv-arm"
              d={`M400 305 L${motor.x} ${motor.y}`}
              key={`arm-${index}`}
              style={{ strokeWidth: layout.armWidth }}
            />
          ))}
          {layout.motors.map((motor, index) => (
            <path
              className="dv-arm-accent"
              d={`M400 310 L${motor.x + 8} ${motor.y + 8}`}
              key={`arm-accent-${index}`}
            />
          ))}
          <rect
            className="dv-body"
            height={layout.body.height}
            rx="18"
            width={layout.body.width}
            x={layout.body.x}
            y={layout.body.y}
            fill="url(#dv-body)"
          />
          <rect
            className="dv-body-line"
            height={layout.body.height - 24}
            rx="12"
            width={layout.body.width - 24}
            x={layout.body.x + 12}
            y={layout.body.y + 12}
          />
          {layoutKey === "cinewhoop" && (
            <path
              className="dv-camera-platform"
              d="M360 204 L440 204 L452 238 L348 238 Z"
            />
          )}
        </g>

        {ducted && (
          <g className={`dv-part dv-ducts ${activeCategory === "props" || activeCategory === "frame" ? "is-active" : ""}`}>
            {layout.motors.map((motor, index) => (
              <g key={`duct-${index}`}>
                <circle className="dv-duct-outer" cx={motor.x} cy={motor.y} r={layout.ductRadius} />
                <circle className="dv-duct-inner" cx={motor.x} cy={motor.y} r={layout.ductRadius - 7} />
              </g>
            ))}
          </g>
        )}

        <g className={`dv-part dv-battery ${activeCategory === "battery" ? "is-active" : ""}`}>
          <rect
            className="dv-battery-body"
            height={layout.battery.height}
            rx="8"
            width={layout.battery.width}
            x={layout.battery.x}
            y={layout.battery.y}
          />
          <line
            className="dv-battery-strap"
            x1={layout.battery.x}
            x2={layout.battery.x + layout.battery.width}
            y1={layout.battery.y + layout.battery.height * 0.3}
            y2={layout.battery.y + layout.battery.height * 0.3}
          />
          <line
            className="dv-battery-strap"
            x1={layout.battery.x}
            x2={layout.battery.x + layout.battery.width}
            y1={layout.battery.y + layout.battery.height * 0.7}
            y2={layout.battery.y + layout.battery.height * 0.7}
          />
          <text
            className="dv-label"
            textAnchor="middle"
            x={layout.battery.x + layout.battery.width / 2}
            y={layout.battery.y + layout.battery.height / 2 + 4}
          >
            {battery?.cells ? `${battery.cells}S` : "PACK"}
          </text>
        </g>

        <g className={`dv-part dv-esc ${activeCategory === "esc" ? "is-active" : ""}`}>
          <rect className="dv-board" height={layout.esc.height} rx="4" width={layout.esc.width} x={layout.esc.x} y={layout.esc.y} />
          <text className="dv-label tiny" textAnchor="middle" x={layout.esc.x + layout.esc.width / 2} y={layout.esc.y + layout.esc.height / 2 + 3}>
            ESC
          </text>
        </g>

        <g className={`dv-part dv-fc ${activeCategory === "flightController" ? "is-active" : ""}`}>
          <rect className="dv-board" height={layout.fc.height} rx="4" width={layout.fc.width} x={layout.fc.x} y={layout.fc.y} />
          <text className="dv-label tiny" textAnchor="middle" x={layout.fc.x + layout.fc.width / 2} y={layout.fc.y + layout.fc.height / 2 + 3}>
            FC
          </text>
        </g>

        <g className={`dv-part dv-camera ${activeCategory === "camera" ? "is-active" : ""}`}>
          <rect className="dv-camera-body" height={layout.camera.height} rx="5" width={layout.camera.width} x={layout.camera.x} y={layout.camera.y} />
          <circle className="dv-lens" cx={layout.camera.x + layout.camera.width / 2} cy={layout.camera.y + layout.camera.height / 2} r="10" />
          <circle className="dv-lens-inner" cx={layout.camera.x + layout.camera.width / 2} cy={layout.camera.y + layout.camera.height / 2} r="4" />
        </g>

        <g className={`dv-part dv-vtx ${activeCategory === "vtx" ? "is-active" : ""}`}>
          <rect className="dv-board" height={layout.vtx.height} rx="4" width={layout.vtx.width} x={layout.vtx.x} y={layout.vtx.y} />
          <text className="dv-label tiny" textAnchor="middle" x={layout.vtx.x + layout.vtx.width / 2} y={layout.vtx.y + layout.vtx.height / 2 + 3}>
            VTX
          </text>
          <line
            className="dv-antenna"
            x1={layout.vtx.x + layout.vtx.width / 2}
            x2={layout.vtx.x + layout.vtx.width / 2}
            y1={layout.vtx.y + layout.vtx.height}
            y2={layout.vtx.y + layout.vtx.height + layout.antennaLength}
          />
          <circle
            className="dv-antenna-tip"
            cx={layout.vtx.x + layout.vtx.width / 2}
            cy={layout.vtx.y + layout.vtx.height + layout.antennaLength}
            r="4"
          />
        </g>

        <g className={`dv-part dv-receiver ${activeCategory === "receiver" ? "is-active" : ""}`}>
          <rect className="dv-rx" height={layout.receiver.height} rx="3" width={layout.receiver.width} x={layout.receiver.x} y={layout.receiver.y} />
          <line
            className="dv-rx-antenna"
            x1={layout.receiver.x + layout.receiver.width}
            x2={layout.receiver.x + layout.receiver.width + 28}
            y1={layout.receiver.y + layout.receiver.height / 2}
            y2={layout.receiver.y + layout.receiver.height / 2 - 24}
          />
        </g>

        <g className={`dv-part dv-props ${activeCategory === "props" ? "is-active" : ""}`}>
          {layout.motors.map((motor, motorIndex) =>
            Array.from({ length: blades }).map((_, bladeIndex) => (
              <rect
                className="dv-prop-blade"
                height={layoutKey === "7-inch-long-range" ? 13 : 11}
                key={`prop-${motorIndex}-${bladeIndex}`}
                rx="6"
                transform={`rotate(${motor.rotation + (360 / blades) * bladeIndex} ${motor.x} ${motor.y})`}
                width={layout.propLength}
                x={motor.x - layout.propLength / 2}
                y={motor.y - (layoutKey === "7-inch-long-range" ? 6.5 : 5.5)}
              />
            )),
          )}
        </g>

        <g className={`dv-part dv-motors ${activeCategory === "motors" ? "is-active" : ""}`}>
          {layout.motors.map((motor, index) => (
            <g key={`motor-${index}`} transform={`translate(${motor.x} ${motor.y})`}>
              <circle className="dv-motor-ring" r="34" />
              <circle className="dv-motor-bell" r="24" />
              <circle className="dv-motor-hub" r="8" />
              <line className="dv-motor-mark" x1="0" y1="-24" x2="0" y2="-12" />
            </g>
          ))}
        </g>

        {showLabels && (
          <g className="dv-annotations">
            <g transform="translate(54 84)">
              <text className="dv-annotation-kicker">{layout.label.toUpperCase()}</text>
              <text className="dv-annotation-value">{frameLabel}</text>
            </g>
            <g transform="translate(596 84)">
              <text className="dv-annotation-kicker">MOTORS</text>
              <text className="dv-annotation-value">{motorLabel}</text>
            </g>
            <g transform="translate(54 530)">
              <text className="dv-annotation-kicker">PROPS</text>
              <text className="dv-annotation-value">{propLabel}</text>
            </g>
            <g transform="translate(596 530)">
              <text className="dv-annotation-kicker">POWER</text>
              <text className="dv-annotation-value">{batteryLabel}</text>
            </g>
            <g transform="translate(400 566)">
              <text className="dv-caption" textAnchor="middle">
                {ducted ? "DUCTED TECHNICAL TOP VIEW" : "TECHNICAL TOP VIEW"} · NOT TO SCALE
              </text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}