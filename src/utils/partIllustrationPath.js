/** Web path root for generated part illustrations (not product photos). */
export const ILLUSTRATIONS_ROOT = "/parts/illustrations";

export function getPartIllustrationPath(partId, categoryKey) {
  if (!partId || !categoryKey) {
    return null;
  }

  return `${ILLUSTRATIONS_ROOT}/${categoryKey}/${partId}.svg`;
}

export function getPartIllustrationRelativePath(partId, categoryKey) {
  const webPath = getPartIllustrationPath(partId, categoryKey);
  return webPath?.replace(/^\//, "") ?? null;
}
