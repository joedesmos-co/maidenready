import { formatFlightTimeRange, getEstimateProfile } from "./buildCalculations.js";

const hasIntersection = (left = [], right = []) =>
  left.some((value) => right.includes(value));

const asArray = (value) => (Array.isArray(value) ? value : [value].filter(Boolean));

const isFiniteNumber = (value) =>
  value !== null && value !== undefined && Number.isFinite(Number(value));

const normalizeConnector = (value) =>
  String(value ?? "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[–—]/g, "-");

const pushUnknown = (warnings, id, title, message) => {
  warnings.push({ id, severity: "unknown", title, message });
};

export const getCompatibilityWarnings = ({
  frame,
  motors,
  esc,
  flightController,
  props,
  battery,
  camera,
  vtx,
  receiver,
}, buildClass = "5-inch-freestyle", stats = {}) => {
  const warnings = [];

  if (frame && props) {
    if (
      !isFiniteNumber(frame.maxPropInches) ||
      !isFiniteNumber(props.diameterInches)
    ) {
      pushUnknown(
        warnings,
        "unknown-prop-clearance",
        "Prop clearance cannot be confirmed",
        `${frame.name} or ${props.name} is missing a documented prop-size limit. Check the frame manual before ordering props.`,
      );
    } else if (props.diameterInches > frame.maxPropInches) {
      warnings.push({
        id: "prop-clearance",
        severity: "high",
        title: "Props are too large for this frame",
        message: `${props.name} (${props.diameterInches}") exceeds ${frame.name}'s ${frame.maxPropInches}" limit. Props may hit the frame, ducts, or stack — pick a smaller prop or a larger frame.`,
      });
    }
  }

  if (motors && battery) {
    if (!motors.recommendedCells?.length || !isFiniteNumber(battery.cells)) {
      pushUnknown(
        warnings,
        "unknown-motor-cells",
        "Motor voltage rating is not documented",
        `${motors.name} does not list supported cell counts. Confirm the motor's rated voltage against the ${battery.name} pack before ordering.`,
      );
    } else if (!motors.recommendedCells.includes(battery.cells)) {
      warnings.push({
        id: "motor-cell-count",
        severity: "high",
        title: "Motor and battery cell count do not match",
        message: `${motors.name} is rated for ${motors.recommendedCells.join(
          "S / ",
        )}S packs, but ${battery.name} is ${battery.cells}S. Wrong voltage can over-rev motors or feel weak and sluggish.`,
      });
    }
  }

  if (esc && motors) {
    if (!isFiniteNumber(esc.continuousAmp) || !isFiniteNumber(motors.maxCurrentA)) {
      pushUnknown(
        warnings,
        "unknown-esc-current",
        "ESC current headroom cannot be confirmed",
        `${esc.name} or ${motors.name} is missing a documented current rating. Check both datasheets before flying at full throttle.`,
      );
    } else {
      const estimatedMotorCurrent =
        Number(motors.maxCurrentA) * (props?.currentMultiplier ?? 1);

      if (Number(esc.continuousAmp) < estimatedMotorCurrent) {
        warnings.push({
          id: "esc-current",
          severity: "high",
          title: "ESC may not handle motor current",
          message: `${esc.name} is rated for ${esc.continuousAmp}A continuous, but motor + prop combo can draw about ${Math.round(
            estimatedMotorCurrent,
          )}A per motor under load. Undersized ESCs can overheat or fail in flight.`,
        });
      }
    }
  }

  if (esc && battery) {
    if (!esc.supportedCells?.length || !isFiniteNumber(battery.cells)) {
      pushUnknown(
        warnings,
        "unknown-esc-voltage",
        "ESC voltage range is not documented",
        `${esc.name} does not list supported cell counts. Confirm its input voltage against the ${battery.name} pack.`,
      );
    } else if (!esc.supportedCells.includes(battery.cells)) {
      warnings.push({
        id: "esc-voltage",
        severity: "high",
        title: "ESC does not support this battery voltage",
        message: `${esc.name} supports ${esc.supportedCells.join(
          "S / ",
        )}S packs only. ${battery.name} is ${battery.cells}S — the ESC may not arm or could be damaged.`,
      });
    }
  }

  if (
    buildClass === "tiny-whoop" &&
    flightController &&
    battery
  ) {
    if (
      !flightController.supportedCells?.length ||
      !isFiniteNumber(battery.cells)
    ) {
      pushUnknown(
        warnings,
        "unknown-fc-voltage",
        "Flight controller voltage range is not documented",
        `${flightController.name} does not list supported cell counts. Confirm it matches the ${battery.name} pack.`,
      );
    } else if (!flightController.supportedCells.includes(battery.cells)) {
      warnings.push({
        id: "tiny-fc-cell-count",
        severity: "high",
        title: "Flight controller voltage does not match battery",
        message: `${flightController.name} supports ${flightController.supportedCells.join(
          "S / ",
        )}S only. ${battery.name} is ${battery.cells}S — use a matching whoop pack.`,
      });
    }
  }

  if (frame && motors) {
    const frameMounts = asArray(frame.motorMounts);
    const motorMounts = asArray(motors.mountPattern);

    if (frameMounts.length === 0 || motorMounts.length === 0) {
      pushUnknown(
        warnings,
        "unknown-motor-mount",
        "Motor mounting pattern cannot be confirmed",
        `${frame.name} or ${motors.name} is missing a documented motor bolt pattern. Measure the frame and motor before ordering.`,
      );
    } else if (!hasIntersection(frameMounts, motorMounts)) {
      warnings.push({
        id: "motor-mount",
        severity: "high",
        title: "Motor bolt pattern does not fit frame",
        message: `${motors.name} uses ${motorMounts.join(
          " / ",
        )} mounting, but ${frame.name} supports ${frameMounts.join(
          ", ",
        )}. Motors will not bolt on without adapters.`,
      });
    }
  }

  if (frame && flightController) {
    const frameMounts = asArray(frame.stackMounts);
    const fcMounts = asArray(flightController.mountPattern);

    if (frameMounts.length === 0 || fcMounts.length === 0) {
      pushUnknown(
        warnings,
        "unknown-fc-frame-stack",
        "Flight controller stack fit cannot be confirmed",
        `${frame.name} or ${flightController.name} is missing a documented stack mounting size. Check the frame manual before ordering.`,
      );
    } else if (!hasIntersection(frameMounts, fcMounts)) {
      warnings.push({
        id: "fc-frame-stack",
        severity: "medium",
        title: "Flight controller may not fit frame stack",
        message: `${flightController.name} is ${fcMounts.join(
          ", ",
        )} stack size; ${frame.name} accepts ${frameMounts.join(
          ", ",
        )}. Check standoff spacing before ordering.`,
      });
    }
  }

  if (frame && esc) {
    const frameMounts = asArray(frame.stackMounts);
    const escMounts = asArray(esc.mountPattern);

    if (frameMounts.length === 0 || escMounts.length === 0) {
      pushUnknown(
        warnings,
        "unknown-esc-frame-stack",
        "ESC stack fit cannot be confirmed",
        `${frame.name} or ${esc.name} is missing a documented stack mounting size. Check the frame manual before ordering.`,
      );
    } else if (!hasIntersection(frameMounts, escMounts)) {
      warnings.push({
        id: "esc-frame-stack",
        severity: "medium",
        title: "ESC may not fit frame stack",
        message: `${esc.name} is ${escMounts.join(
          ", ",
        )} stack size; ${frame.name} accepts ${frameMounts.join(
          ", ",
        )}. You may need a different ESC or mounting adapter.`,
      });
    }
  }

  if (flightController && esc) {
    const fcMount = asArray(flightController.mountPattern);
    const escMount = asArray(esc.mountPattern);

    if (fcMount.length === 0 || escMount.length === 0) {
      pushUnknown(
        warnings,
        "unknown-fc-esc-stack",
        "FC and ESC stack match cannot be confirmed",
        `${flightController.name} or ${esc.name} is missing a documented stack mounting size. Verify the standoff pattern before ordering.`,
      );
    } else if (!hasIntersection(fcMount, escMount)) {
      warnings.push({
        id: "fc-esc-stack",
        severity: "medium",
        title: "FC and ESC stack sizes differ",
        message: `${flightController.name} (${fcMount.join(
          " / ",
        )}) and ${esc.name} (${escMount.join(
          " / ",
        )}) use different stack sizes. Plan for an adapter or split mounting.`,
      });
    }
  }

  if (camera && vtx) {
    if (!camera.videoSystem || !vtx.videoSystem) {
      pushUnknown(
        warnings,
        "unknown-video-system",
        "Video system compatibility cannot be confirmed",
        `${camera.name} or ${vtx.name} is missing a documented analog/digital video system. Confirm both before wiring.`,
      );
    } else if (camera.videoSystem !== vtx.videoSystem) {
      warnings.push({
        id: "video-analog-digital",
        severity: "high",
        title: "Camera and VTX video types do not match",
        message: `${camera.name} is ${camera.videoSystem}; ${vtx.name} is ${vtx.videoSystem}. Analog and digital systems cannot plug together without extra hardware.`,
      });
    } else if (camera.videoSystem === "digital") {
      if (!camera.digitalSystem || !vtx.digitalSystem) {
        pushUnknown(
          warnings,
          "unknown-digital-system",
          "Digital video ecosystem cannot be confirmed",
          `${camera.name} or ${vtx.name} is missing a documented digital system. Confirm the ecosystem and goggles before ordering.`,
        );
      } else if (camera.digitalSystem !== vtx.digitalSystem) {
        warnings.push({
          id: "video-digital-system",
          severity: "high",
          title: "Digital camera and VTX ecosystems do not match",
          message: `${camera.name} (${camera.digitalSystem}) and ${vtx.name} (${vtx.digitalSystem}) are from different digital ecosystems. They will not link without a matching air unit and goggles.`,
        });
      }
    }
  }

  if (battery && !battery.connector) {
    pushUnknown(
      warnings,
      "unknown-battery-connector",
      "Battery connector is not documented",
      `${battery.name} does not list a connector type. Confirm it matches your power lead or AIO before ordering.`,
    );
  }

  const aio = flightController?.isAio ? flightController : null;
  const aioConnector = aio?.batteryConnector ?? aio?.connector;
  if (battery?.connector && aio) {
    if (!aioConnector) {
      pushUnknown(
        warnings,
        "unknown-aio-connector",
        "AIO battery connector cannot be confirmed",
        `${aio.name} does not list a battery connector. Confirm it matches the ${battery.name} (${battery.connector}) before ordering.`,
      );
    } else if (
      normalizeConnector(aioConnector) !== normalizeConnector(battery.connector)
    ) {
      warnings.push({
        id: "battery-connector",
        severity: "high",
        title: "Battery connector does not match the AIO",
        message: `${battery.name} uses ${battery.connector}, but ${aio.name} expects ${aioConnector}. Do not force an adapter without checking polarity and current rating.`,
      });
    }
  }

  if (receiver && !receiver.protocol) {
    pushUnknown(
      warnings,
      "unknown-receiver-protocol",
      "Receiver protocol is not documented",
      `${receiver.name} does not list a control protocol. Confirm it matches your radio module before ordering.`,
    );
  }

  warnings.push(...getBuildClassWarnings(
    {
      frame,
      motors,
      esc,
      flightController,
      props,
      battery,
    },
    buildClass,
    stats,
  ));

  return warnings;
};

const getBuildClassWarnings = (
  { frame, esc, flightController, props, battery },
  buildClass,
  stats,
) => {
  const warnings = [];

  if (buildClass === "tiny-whoop") {
    if (battery && ![1, 2].includes(battery.cells)) {
      warnings.push({
        id: "tiny-cell-count",
        severity: "high",
        title: "Battery voltage is too high for a tiny whoop",
        message: "Tiny whoops normally run 1S or 2S. Higher cell counts add weight and stress the AIO — use a matched whoop pack.",
      });
    }

    if (frame && !frame.ducted) {
      warnings.push({
        id: "tiny-ducted-frame",
        severity: "high",
        title: "Frame is not a ducted whoop design",
        message: `${frame.name} is not marked as ducted. Open frames are harder to fly indoors and props are more exposed.`,
      });
    }

    if (props && props.diameterInches > 2) {
      warnings.push({
        id: "tiny-prop-size",
        severity: "high",
        title: "Props are too large for a tiny whoop",
        message: `${props.name} (${props.diameterInches}") is bigger than typical whoop props (31–40 mm). Expect poor fit and heavy current draw.`,
      });
    }

    if (esc && !esc.isAio) {
      warnings.push({
        id: "tiny-esc-aio",
        severity: "medium",
        title: "Separate ESC is unusual on a tiny whoop",
        message: `${esc.name} is not an AIO board. Most whoops use a single AIO FC/ESC to save weight and wiring.`,
      });
    }

    if (flightController && !flightController.isAio) {
      warnings.push({
        id: "tiny-fc-aio",
        severity: "medium",
        title: "Separate FC is unusual on a tiny whoop",
        message: `${flightController.name} is not an AIO board. A combined AIO FC/ESC keeps whoop builds light and simple.`,
      });
    }
  }

  if (buildClass === "cinewhoop") {
    if (frame && !frame.ducted) {
      warnings.push({
        id: "cinewhoop-ducted-frame",
        severity: "high",
        title: "Frame is not a ducted cinewhoop",
        message: `${frame.name} is not marked as ducted. Cinewhoops need ducts to protect props and people during slow cinematic flying.`,
      });
    }

    if (stats.thrustToWeight) {
      const ductFactor = getEstimateProfile(buildClass).ductThrustFactor || 1;
      const rawThrustToWeight = stats.thrustToWeight / ductFactor;

      if (rawThrustToWeight < 4) {
        warnings.push({
          id: "cinewhoop-low-thrust",
          severity: "medium",
          title: "Thrust margin looks low for a cinewhoop",
          message: `Estimated thrust-to-weight is ${stats.thrustToWeight}:1 after duct losses. Ducted builds need lift margin for slow lines — consider lighter AUW or higher-thrust props.`,
        });
      }
    }

    if (battery?.weightG > 260) {
      warnings.push({
        id: "cinewhoop-heavy-battery",
        severity: "medium",
        title: "Battery may be heavy for cinewhoop cruising",
        message: `${battery.name} (~${battery.weightG}g) adds mass in the ducts. Heavy packs make slow turns feel sluggish and reduce crash recovery.`,
      });
    }
  }

  if (buildClass === "7-inch-long-range") {
    if (battery && battery.cells !== 6) {
      warnings.push({
        id: "long-range-cell-count",
        severity: "high",
        title: "Long-range builds usually run 6S",
        message: `${battery.name} is ${battery.cells}S. Most 7" long-range rigs use 6S LiPo or Li-ion for efficient cruise and range.`,
      });
    }

    if (stats.flightTimeMinutes && stats.flightTimeMinutes < 6) {
      warnings.push({
        id: "long-range-flight-time",
        severity: "medium",
        title: "Estimated flight time is short for long range",
        message: `Estimated flight ${formatFlightTimeRange(stats)}. Long-range 7" builds should prioritize efficiency — lighter AUW, lower pitch, larger packs.`,
      });
    }

    if (props?.pitch > 4.2) {
      warnings.push({
        id: "long-range-prop-pitch",
        severity: "medium",
        title: "Prop pitch may be too aggressive for cruising",
        message: `${props.name} (${props.pitch}" pitch) draws more current at cruise. Lower-pitch 7" props usually give better range and cooler motors.`,
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

    if (warning.severity === "unknown") {
      return sum + 5;
    }

    return sum + 8;
  }, 0);

  return Math.max(0, 100 - penalty);
};
