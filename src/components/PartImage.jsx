import { useEffect, useState } from "react";
import { PartCategoryPlaceholder } from "./PartCategoryPlaceholder.jsx";
import { getPartIllustrationPath } from "../utils/partIllustrationPath.js";

const DISPLAY_MODES = {
  photo: "photo",
  illustration: "illustration",
  placeholder: "placeholder",
};

export function PartImage({
  part,
  partType,
  categoryKey,
  variant = "card",
  onDisplayModeChange,
}) {
  const illustrationPath = getPartIllustrationPath(part.id, categoryKey);
  const [displayMode, setDisplayMode] = useState(
    part.imagePath ? DISPLAY_MODES.photo : DISPLAY_MODES.illustration,
  );
  const isDrawer = variant === "drawer";

  useEffect(() => {
    setDisplayMode(part.imagePath ? DISPLAY_MODES.photo : DISPLAY_MODES.illustration);
  }, [part.id, part.imagePath]);

  useEffect(() => {
    onDisplayModeChange?.(displayMode);
  }, [displayMode, onDisplayModeChange]);

  const showPlaceholder = displayMode === DISPLAY_MODES.placeholder;
  const showIllustrationLabel =
    displayMode === DISPLAY_MODES.illustration ||
    displayMode === DISPLAY_MODES.placeholder;
  const showCandidateBadge =
    displayMode === DISPLAY_MODES.photo && part.imageNeedsReview && isDrawer;

  const handlePhotoError = () => {
    setDisplayMode(DISPLAY_MODES.illustration);
  };

  const handleIllustrationError = () => {
    setDisplayMode(DISPLAY_MODES.placeholder);
  };

  return (
    <div
      aria-label={`${part.name} preview`}
      className={`part-image-frame${isDrawer ? " part-image-frame--drawer" : ""}`}
    >
      {showPlaceholder ? (
        <div
          className="part-image-placeholder"
          role="img"
          aria-label={`${partType} illustration placeholder`}
        >
          <div className="part-image-placeholder-icon">
            <PartCategoryPlaceholder categoryKey={categoryKey} />
          </div>
          <span className="part-image-placeholder-label">Illustration</span>
          {isDrawer && (
            <div className="part-image-placeholder-footer">
              <span>{partType}</span>
            </div>
          )}
        </div>
      ) : displayMode === DISPLAY_MODES.illustration ? (
        <div className="part-image-illustration" role="img" aria-label={`${part.name} illustration`}>
          {showIllustrationLabel && isDrawer && (
            <span className="part-image-illustration-badge">Illustration</span>
          )}
          <div className="part-image-media">
            <img
              src={illustrationPath}
              alt={`${part.name} illustration`}
              loading="lazy"
              onError={handleIllustrationError}
            />
          </div>
        </div>
      ) : (
        <>
          {showCandidateBadge && (
            <span className="part-image-review-badge">Candidate</span>
          )}
          <div className="part-image-media">
            <img
              src={part.imagePath}
              alt={part.name}
              loading="lazy"
              onError={handlePhotoError}
            />
          </div>
        </>
      )}
    </div>
  );
}
