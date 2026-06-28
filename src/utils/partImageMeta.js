export const hasPartImageMetadata = (part) =>
  Boolean(part?.imageCredit) ||
  Boolean(part?.imageLicense) ||
  Boolean(part?.imageSourceUrl) ||
  Boolean(part?.imageNeedsReview);

export const getPartImageAttribution = (part) => {
  if (!hasPartImageMetadata(part)) {
    return null;
  }

  return {
    credit: part.imageCredit ?? null,
    license: part.imageLicense ?? null,
    needsReview: Boolean(part.imageNeedsReview),
    sourceUrl: part.imageSourceUrl ?? null,
  };
};

/** @deprecated Prefer PartImageAttribution component for UI */
export const formatPartImageAttribution = (part) => {
  const attribution = getPartImageAttribution(part);

  if (!attribution) {
    return null;
  }

  const statusParts = [];

  if (attribution.needsReview) {
    statusParts.push("Candidate · needs review");
  }

  if (attribution.license) {
    statusParts.push(attribution.license);
  }

  if (attribution.credit && statusParts.length > 0) {
    return `Image: ${attribution.credit} / ${statusParts.join(" · ")}`;
  }

  if (attribution.credit) {
    return `Image: ${attribution.credit}`;
  }

  if (statusParts.length > 0) {
    return `Image: ${statusParts.join(" · ")}`;
  }

  if (attribution.sourceUrl) {
    return "Image: Documented source";
  }

  return null;
};
