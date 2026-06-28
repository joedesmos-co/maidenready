export const hasPartImageMetadata = (part) =>
  Boolean(part?.imageCredit) ||
  Boolean(part?.imageLicense) ||
  Boolean(part?.imageSourceUrl) ||
  Boolean(part?.imageNeedsReview);

export const formatPartImageAttribution = (part) => {
  if (!hasPartImageMetadata(part)) {
    return null;
  }

  const statusParts = [];

  if (part.imageNeedsReview) {
    statusParts.push("Needs review");
  }

  if (part.imageCredit && part.imageLicense) {
    statusParts.push(part.imageLicense);
  }

  const primary =
    part.imageCredit ||
    (part.imageLicense && !part.imageNeedsReview ? part.imageLicense : null);

  if (primary && statusParts.length > 0) {
    return `Image: ${primary} / ${statusParts.join(" · ")}`;
  }

  if (primary) {
    return `Image: ${primary}`;
  }

  if (statusParts.length > 0) {
    return `Image: ${statusParts.join(" · ")}`;
  }

  if (part.imageLicense) {
    return `Image: ${part.imageLicense}`;
  }

  if (part.imageSourceUrl) {
    return "Image: Documented source";
  }

  return null;
};
