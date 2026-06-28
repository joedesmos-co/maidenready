import { getPartImageAttribution, hasPartImageMetadata } from "../utils/partImageMeta.js";

export function PartImageAttribution({ part }) {
  if (!hasPartImageMetadata(part)) {
    return null;
  }

  const attribution = getPartImageAttribution(part);

  if (!attribution) {
    return null;
  }

  return (
    <div className="part-image-attribution">
      {attribution.credit && (
        <span className="part-image-attribution-credit">{attribution.credit}</span>
      )}
      {attribution.needsReview && (
        <span
          className="part-image-attribution-pill"
          title={
            attribution.license
              ? `${attribution.license} — not approved for public use`
              : "Image candidate pending review — not approved for public use"
          }
        >
          Needs review
        </span>
      )}
      {attribution.license && (
        <span className="part-image-attribution-license">{attribution.license}</span>
      )}
      {attribution.sourceUrl && (
        <a
          className="part-image-attribution-link"
          href={attribution.sourceUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          Source
        </a>
      )}
    </div>
  );
}
