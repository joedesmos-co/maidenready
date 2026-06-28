import { useEffect, useState } from "react";
import { PartCategoryPlaceholder } from "./PartCategoryPlaceholder.jsx";

export function PartImage({ part, partType, categoryKey, variant = "card" }) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = failed || !part.imagePath;
  const isDrawer = variant === "drawer";

  useEffect(() => {
    setFailed(false);
  }, [part.id, part.imagePath]);

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
      ) : (
        <>
          {part.imageNeedsReview && isDrawer && (
            <span className="part-image-review-badge">Candidate</span>
          )}
          <div className="part-image-media">
            <img
              src={part.imagePath}
              alt={part.name}
              loading="lazy"
              onError={() => setFailed(true)}
            />
          </div>
        </>
      )}
    </div>
  );
}
