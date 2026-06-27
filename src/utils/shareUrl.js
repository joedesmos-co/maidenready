export const buildQueryMap = {
  frame: "frame",
  motors: "motor",
  esc: "esc",
  flightController: "fc",
  props: "prop",
  battery: "battery",
  receiver: "receiver",
  camera: "camera",
  vtx: "vtx",
};

export const buildClassQueryKey = "class";

const queryToBuildKey = Object.fromEntries(
  Object.entries(buildQueryMap).map(([buildKey, queryKey]) => [queryKey, buildKey]),
);

export const resolveBuildClassFromSearch = (
  search,
  validBuildClasses,
  fallbackBuildClass,
) => {
  const params = new URLSearchParams(search);
  const buildClass = params.get(buildClassQueryKey);

  return validBuildClasses.includes(buildClass) ? buildClass : fallbackBuildClass;
};

export const resolveSelectionsFromSearch = (
  search,
  partsCatalog,
  fallbackSelections,
) => {
  const params = new URLSearchParams(search);
  const selections = { ...fallbackSelections };
  const ignored = [];

  Object.entries(queryToBuildKey).forEach(([queryKey, buildKey]) => {
    const partId = params.get(queryKey);

    if (!partId) {
      return;
    }

    const exists = partsCatalog[buildKey]?.some((part) => part.id === partId);

    if (exists) {
      selections[buildKey] = partId;
      return;
    }

    ignored.push({ queryKey, buildKey, partId });
  });

  if (ignored.length > 0) {
    console.warn("[MaidenReady] Ignored invalid build URL part IDs.", ignored);
  }

  return selections;
};

export const buildSearchFromSelections = (selectedIds, buildClass) => {
  const params = new URLSearchParams();

  if (buildClass) {
    params.set(buildClassQueryKey, buildClass);
  }

  Object.entries(buildQueryMap).forEach(([buildKey, queryKey]) => {
    const partId = selectedIds[buildKey];

    if (partId) {
      params.set(queryKey, partId);
    }
  });

  return `?${params.toString()}`;
};

export const buildShareUrl = (
  selectedIds,
  buildClass,
  currentHref = window.location.href,
) => {
  const url = new URL(currentHref);
  url.search = buildSearchFromSelections(selectedIds, buildClass);
  return url.toString();
};

export const copyTextToClipboard = async (text) => {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall through to the legacy path when browser permissions block the API.
    }
  }

  const handleCopy = (event) => {
    event.clipboardData?.setData("text/plain", text);
    event.preventDefault();
  };

  document.addEventListener("copy", handleCopy);
  const eventCopied = document.execCommand("copy");
  document.removeEventListener("copy", handleCopy);

  if (eventCopied) {
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
};
