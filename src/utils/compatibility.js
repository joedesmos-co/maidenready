const hasIntersection = (left = [], right = []) =>
  left.some((value) => right.includes(value));

const asArray = (value) => (Array.isArray(value) ? value : [value].filter(Boolean));

export const getCompatibilityWarnings = ({
  frame,
  motors,
  esc,
  flightController,
  props,
  battery,
  camera,
  vtx,
}) => {
  const warnings = [];

  if (frame && props && props.diameterInches > frame.maxPropInches) {
    warnings.push({
      id: "prop-clearance",
      severity: "high",
      title: "Props may not clear the frame",
      message: `${props.name} is ${props.diameterInches}" and ${frame.name} is rated up to ${frame.maxPropInches}".`,
    });
  }

  if (motors && battery && !motors.recommendedCells.includes(battery.cells)) {
    warnings.push({
      id: "motor-cell-count",
      severity: "high",
      title: "Motor and battery cell count mismatch",
      message: `${motors.name} is recommended for ${motors.recommendedCells.join(
        "S / ",
      )}S, but ${battery.name} is ${battery.cells}S.`,
    });
  }

  if (esc && motors && props) {
    const estimatedMotorCurrent = motors.maxCurrentA * (props.currentMultiplier ?? 1);

    if (esc.continuousAmp < estimatedMotorCurrent) {
      warnings.push({
        id: "esc-current",
        severity: "high",
        title: "ESC amp rating may be too low",
        message: `${esc.name} is rated for ${esc.continuousAmp}A continuous, while the selected motor and prop estimate can reach ${Math.round(
          estimatedMotorCurrent,
        )}A per motor.`,
      });
    }
  }

  if (esc && battery && !esc.supportedCells.includes(battery.cells)) {
    warnings.push({
      id: "esc-voltage",
      severity: "high",
      title: "ESC does not support the battery voltage",
      message: `${esc.name} supports ${esc.supportedCells.join(
        "S / ",
      )}S packs, but ${battery.name} is ${battery.cells}S.`,
    });
  }

  if (
    frame &&
    motors &&
    !hasIntersection(frame.motorMounts, asArray(motors.mountPattern))
  ) {
    warnings.push({
      id: "motor-mount",
      severity: "high",
      title: "Motor mount mismatch",
      message: `${motors.name} uses a ${motors.mountPattern} mount and ${frame.name} supports ${frame.motorMounts.join(
        ", ",
      )}.`,
    });
  }

  if (frame && flightController) {
    const fcMounts = asArray(flightController.mountPattern);
    if (!hasIntersection(frame.stackMounts, fcMounts)) {
      warnings.push({
        id: "fc-frame-stack",
        severity: "medium",
        title: "Flight controller stack mount may not fit",
        message: `${flightController.name} uses ${fcMounts.join(
          ", ",
        )}; ${frame.name} supports ${frame.stackMounts.join(", ")}.`,
      });
    }
  }

  if (frame && esc) {
    const escMounts = asArray(esc.mountPattern);
    if (!hasIntersection(frame.stackMounts, escMounts)) {
      warnings.push({
        id: "esc-frame-stack",
        severity: "medium",
        title: "ESC stack mount may not fit",
        message: `${esc.name} uses ${escMounts.join(", ")}; ${frame.name} supports ${frame.stackMounts.join(
          ", ",
        )}.`,
      });
    }
  }

  if (flightController && esc && flightController.mountPattern !== esc.mountPattern) {
    warnings.push({
      id: "fc-esc-stack",
      severity: "medium",
      title: "FC and ESC stack sizes differ",
      message: `${flightController.name} uses ${flightController.mountPattern}; ${esc.name} uses ${esc.mountPattern}. Plan for an adapter or split mounting.`,
    });
  }

  if (camera && vtx) {
    if (camera.videoSystem !== vtx.videoSystem) {
      warnings.push({
        id: "video-analog-digital",
        severity: "high",
        title: "Camera and VTX video systems mismatch",
        message: `${camera.name} is ${camera.videoSystem}; ${vtx.name} is ${vtx.videoSystem}.`,
      });
    } else if (
      camera.videoSystem === "digital" &&
      camera.digitalSystem !== vtx.digitalSystem
    ) {
      warnings.push({
        id: "video-digital-system",
        severity: "high",
        title: "Digital camera and VTX ecosystem mismatch",
        message: `${camera.name} is for ${camera.digitalSystem}; ${vtx.name} is for ${vtx.digitalSystem}.`,
      });
    }
  }

  return warnings;
};

export const getCompatibilityScore = (warnings) => {
  const penalty = warnings.reduce((sum, warning) => {
    if (warning.severity === "high") {
      return sum + 28;
    }

    if (warning.severity === "medium") {
      return sum + 16;
    }

    return sum + 8;
  }, 0);

  return Math.max(0, 100 - penalty);
};
