import { presetBuilds } from "./presets.js";
import { getPresetPartImageSource } from "./presetPartImageSources.js";

const categoryFolders = {
  frame: "frames",
  motors: "motors",
  esc: "escs",
  flightController: "flight-controllers",
  props: "props",
  battery: "batteries",
  receiver: "receivers",
  camera: "cameras",
  vtx: "vtx",
};

const presetPartImageCredits = {
  "betafpv-meteor75-pro-frame": "BETAFPV",
  "betafpv-pavo25-frame": "BETAFPV",
  "aos-3-5-v5": "AOS",
  "tbs-source-one-v5": "TBS",
  "geprc-cinelog35-v2": "GEPRC",
  "rekon7-pro-lr": "RekonFPV",
  "betafpv-0802se-19500kv": "BETAFPV",
  "betafpv-1102-18000kv": "BETAFPV",
  "iflight-xing2-1404-3800": "iFlight",
  "iflight-xing2-2207-1855": "iFlight",
  "iflight-xing-2005-2550": "iFlight",
  "brotherhobby-avenger-2806-5-1300": "BrotherHobby",
  "betafpv-1s-5a-aio-esc": "BETAFPV",
  "geprc-gep-f411-35a-aio-esc": "GEPRC",
  "speedybee-bls-35a-4in1": "SpeedyBee",
  "speedybee-bl32-50a": "SpeedyBee",
  "skystars-km55a-4in1": "Skystars",
  "betafpv-f4-1s-aio-fc": "BETAFPV",
  "geprc-gep-f411-35a-aio-fc": "GEPRC",
  "speedybee-f405-mini": "SpeedyBee",
  "speedybee-f405-v4": "SpeedyBee",
  "matek-h743-mini-lr": "Matek",
  "gemfan-40mm-4blade-whoop": "Gemfan",
  "gemfan-35mm-3blade-whoop": "Gemfan",
  "gemfan-hurricane-3520": "Gemfan",
  "gemfan-51466": "Gemfan",
  "hqprop-duct-t90-3": "HQProp",
  "hqprop-7x3-5x3": "HQProp",
  "tattu-1s-450-hv": "Tattu",
  "betafpv-2s-450-xt30": "BETAFPV",
  "tattu-rline-4s-850": "Tattu",
  "cnhl-black-6s-1300": "CNHL",
  "gnb-4s-1500": "GNB",
  "tattu-rline-6s-2200": "Tattu",
  "happymodel-ep2-elrs": "Happymodel",
  "betafpv-elrs-nano": "BETAFPV",
  "radiomaster-er6-elrs": "RadioMaster",
  "radiomaster-rp1-elrs": "RadioMaster",
  "tbs-crossfire-nano": "TBS",
  "caddx-ant-nano": "Caddx",
  "runcam-nano-4-whoop": "RunCam",
  "runcam-phoenix-2": "RunCam",
  "dji-o3-camera": "DJI",
  "betafpv-m03-vtx": "BETAFPV",
  "foxeer-reaper-nano-v2-vtx": "Foxeer",
  "rush-tank-solo": "RushFPV",
  "dji-o3-air-unit": "DJI",
  "tbs-unify-pro32-hv": "TBS",
};

const presetPartCategories = new Map();

presetBuilds.forEach((preset) => {
  Object.entries(preset.selections ?? {}).forEach(([categoryKey, partId]) => {
    if (partId) {
      presetPartCategories.set(partId, categoryKey);
    }
  });
});

export const presetPartIds = new Set(presetPartCategories.keys());

/*
 * TODO: Add real JPG files under public/parts/<category>/<part-id>.jpg
 * for each entry below. Until files exist, PartImage falls back to SVG placeholders.
 * Do not scrape store images. Use own photos or verified licenses only.
 */
export const PRESET_PART_IMAGE_TODO = [...presetPartIds]
  .sort()
  .map((partId) => {
    const categoryKey = presetPartCategories.get(partId);
    const folder = categoryFolders[categoryKey] ?? "unknown";

    return {
      partId,
      categoryKey,
      expectedPath: `/parts/${folder}/${partId}.jpg`,
      status: "needs-local-jpg",
    };
  });

export const isPresetPartId = (partId) => presetPartIds.has(partId);

export const applyPresetPartImageFields = (partId, categoryKey) => {
  if (!isPresetPartId(partId) || presetPartCategories.get(partId) !== categoryKey) {
    return null;
  }

  const folder = categoryFolders[categoryKey];

  if (!folder) {
    return null;
  }

  return {
    imagePath: `/parts/${folder}/${partId}.jpg`,
    imageCredit: presetPartImageCredits[partId] ?? "Unknown manufacturer",
    imageSourceUrl: getPresetPartImageSource(partId)?.officialUrl ?? undefined,
    imageLicense: "No verified license on file",
    imageNeedsReview: true,
  };
};
