/**
 * Central classification rules for docs/image-completion-queue.json.
 * Aligns with proactive skips and manual rejects in image fetch/report scripts.
 */

export const QUEUE_TIER_LABELS = {
  1: "Preset parts (remaining)",
  2: "5-inch freestyle catalog",
  3: "Multi build-class catalog",
  4: "Easy-match: props, batteries, cameras, motors",
  5: "Receivers / VTX",
  6: "Frames",
  7: "Electronics: FC / ESC / stack / AIO",
};

export const EASY_MATCH_CATEGORIES = new Set(["props", "battery", "camera", "motors"]);
export const RECEIVER_VTX_CATEGORIES = new Set(["receiver", "vtx"]);
export const ELECTRONICS_CATEGORIES = new Set(["esc", "flightController"]);

/** Stack pages mapped to individual FC or ESC catalog lines — do not split photos. */
export const STACK_ONLY_INDIVIDUAL_PART_IDS = new Set([
  "speedybee-bls-35a-4in1",
  "speedybee-f405-mini",
  "speedybee-bl32-50a",
  "speedybee-f405-v4",
  "speedybee-bl32-55a-4in1",
  "speedybee-f7-v3-fc",
  "diatone-mamba-f722-s-fc",
  "aikon-f7-mini-35a",
  "iflight-succex-e-f4-50a",
  "rush-blade-f7-60a-4in1",
]);

/** Full-aircraft listings without isolated frame-kit packshots. */
export const FULL_DRONE_FRAME_PART_IDS = new Set([
  "geprc-cinelog35-v2",
  "rekon7-pro-lr",
  "iflight-nazgul-eco5-frame",
  "tbs-source-one-v5",
  "tbs-source-one-v6-frame",
]);

/** Prior manual review — downloaded asset was wrong product, variant, or composite. */
export const UNSAFE_LIKELY_MISMATCH_PART_IDS = new Set([
  "foxeer-reaper-nano-v2-vtx",
  "foxeer-falkor-2",
  "foxeer-predator-v5",
  "foxeer-toothless-2",
  "foxeer-f722-v4",
  "foxeer-h743-f722-fc",
  "foxeer-reaper-f4-65a",
  "geprc-mark4-frame",
  "lumenier-qav-s-johnnyfpv",
  "hypetrain-blaster-2450",
  "armattan-badger5-frame",
  "ethix-p3-peanut-butter",
  "cnhl-6s-1500-freestyle",
  "gemfan-hurricane-mck-51433",
  "ethix-s3-5050",
  "fpvcycle-2207-1780kv",
  "fpvcycle-2207-1960",
  "hypetrain-acer-2306-1950kv",
  "johnnyfpv-motor-v2-2207-1960kv",
  "lumenier-2207-1800kv",
  "brotherhobby-avenger-2507-1850",
  "brotherhobby-returner-r6-2207-1850kv",
  "rush-tank-solo",
  "betafpv-1404-4600kv",
  "brotherhobby-2004-2600kv",
  "brotherhobby-2806-1400kv-lr",
  "emax-e1106-7200kv",
  "emax-eco-1404-4000kv",
  "iflight-xing-e-pro-2806-1300kv",
]);

/** Official source exists but automated fetch or TLS blocks reliable packshot retrieval. */
export const OFFICIAL_SOURCE_BLOCKED_PART_IDS = new Map([
  ["skystars-km2207-1910kv", "Skystars store unreachable from automated fetch."],
  ["skystars-km2306-1950kv", "Skystars store unreachable from automated fetch."],
  ["azure-5148", "Azure Power site unreachable from automated fetch."],
  ["azure-vanover-5140", "Azure Power site unreachable from automated fetch."],
  ["dalprop-cyclone-5046", "DAL prop site unreachable from automated fetch."],
  ["dalprop-fold-f5-5040", "DAL prop site unreachable from automated fetch."],
  ["tmotor-f40-pro-2207-1950kv", "T-Motor store blocks automated fetch."],
  ["tmotor-f60-pro-v-1950", "T-Motor store blocks automated fetch."],
  ["tmotor-velox-v3-1750", "T-Motor store blocks automated fetch."],
  ["tmotor-velox-v3-2207-1950kv", "T-Motor store blocks automated fetch."],
  ["akk-x2-ultimate-vtx", "AKK official store blocks automated fetch."],
  ["rush-tank-ii-vtx", "RushFPV Tank II product page unreachable from automated fetch."],
  ["gnb-4s-1500", "No exact 1500mAh official GNB/Gaoneng product page."],
  ["gn-1s-550-bt2", "GNB/Gaoneng official store blocks automated fetch; no verified 1S 550mAh BT2.0 URL."],
  ["gnb-4s-750-mini", "GNB/Gaoneng store blocks fetch; Genstattu 4S 750mAh page 404."],
  ["gnb-4s-1100-park", "GNB/Gaoneng store blocks fetch; Genstattu 4S 1100mAh page 404."],
  ["gnb-4s-1300-cine", "GNB/Gaoneng store blocks fetch; Genstattu 4S 1300mAh page 404."],
  ["gnb-6s-2500-lr-lipo", "GNB/Gaoneng store blocks fetch; Genstattu 6S 2500mAh page 404."],
  ["gnb-6s-1300-hv", "Genstattu/GNB product page 404 or blocks automated fetch."],
  ["gnb-6s-1400-freestyle", "Genstattu/GNB product page 404 or blocks automated fetch."],
  ["ethix-lithium5-frame", "Ethix official store intermittently unreachable."],
]);

/** No isolated official packshot — keep SVG placeholder rather than substitute. */
export const NO_CLEAN_PACKSHOT_PART_IDS = new Map([
  ["speedybee-bl32-50a", "Official page is FC+ESC stack; no isolated ESC packshot."],
  ["speedybee-bls-35a-4in1", "Official page is FC+ESC stack; no isolated ESC packshot."],
  ["speedybee-f405-mini", "Official page is FC+ESC stack; no isolated FC packshot."],
  ["speedybee-f405-v4", "Official page is FC+ESC stack; no isolated FC packshot."],
  ["geprc-cinelog35-v2", "Official listing is complete BNF aircraft."],
  ["rekon7-pro-lr", "Official listing is complete aircraft."],
  ["tbs-source-one-v5", "GitHub project page only exposes social OG card."],
  ["tbs-source-one-v6-frame", "GitHub project page only exposes social OG card."],
  ["iflight-xing-2005-2550", "Official page lacks isolated 2005 motor packshot."],
  ["aos-5-v5", "Official AOS design page has lifestyle hero, not isolated frame packshot."],
  ["matek-f722-mini", "Matek portfolio only exposes spec-sheet composite."],
  ["matek-f722-std-fc", "Matek portfolio only exposes spec-sheet composite."],
  ["iflight-nazgul-eco5-frame", "Official listing is complete BNF aircraft."],
  ["impulserc-apexdc", "ImpulseRC closed; no product photo source."],
  ["impulserc-reverb5-frame", "ImpulseRC closed; no product photo source."],
  ["hglrc-zeus5-frame", "No Zeus5 frame SKU; substitute listing is different frame."],
  ["cnhl-4s-1500-freestyle", "Only multi-pack CNHL listing on official store."],
  ["ovonic-4s-1400-freestyle", "No exact Ovonic 4S 1400mAh listing on official store."],
  ["tattu-4s-1300-freestyle", "Genstattu Tattu 4S 1300mAh product page 404."],
  ["tattu-4s-1550", "Genstattu Tattu 4S 1550mAh product page 404."],
  ["tattu-rline-6s-1550", "Genstattu Tattu R-Line 6S 1550mAh product page 404."],
  ["lumenier-6s-1100", "Lumenier N2O 6S 1100mAh product page 404 on official store."],
  ["lumenier-6s-1250-freestyle", "Lumenier N2O 6S 1250mAh product page 404 on official store."],
  ["hqprop-t3x2-5x3-515", "HQProp T3x2.5x3 515 product page 404 on official store."],
  ["ethix-s3-5050", "No dedicated Ethix S3 product URL on official store."],
  ["gemfan-hurricane-mck-51433", "No MCK 51433 listing; substitute is wrong prop family."],
  ["walksnail-avatar-micro", "Avatar V2 page does not expose Micro SKU packshot."],
  ["jhemcu-ep28-elrs", "JHEMCU store homepage only; no stable EP28 product URL."],
  ["imm-rc-fusion-v2-elrs", "ImmersionRC page is not a verified V2 ELRS packshot."],
  ["cnhl-ministar-4s-900", "No CNHL Ministar 4S 900mAh listing on official store."],
  ["iflight-4s-1800-cine", "No iFlight 4S 1800mAh 120C battery on official store."],
  ["betafpv-2s-300-ph2", "Official BETAFPV 300mAh 2S is 45C XT30; catalog line is 75C PH2.0."],
  ["axisflying-2808-1150kv-lr", "No AxisFlying 2808 1150KV LR product page on axisflying.com."],
  ["brotherhobby-1507-3700kv", "No BrotherHobby 1507 3700KV product listing on brotherhobby.com."],
  ["emax-eco-2004-2550kv", "Official EMAX ECO II 2004 page lists 1700/2200/2400KV only; no 2550KV SKU."],
  ["emax-eco-ii-2806-1280kv", "Closest EMAX LR motor is ECO II 2807 1280KV; no verified 2806 packshot URL."],
  ["geprc-0901-11000kv", "No GEPRC 0901 11000KV motor product page on geprc.com."],
  ["geprc-2005-2200kv", "No GEPRC 2005 2200KV motor product page on geprc.com."],
  ["happymodel-cine-2004-2400kv", "No Happymodel Cine 2004 2400KV standalone motor product page."],
  ["iflight-xing2-1404-4600kv", "XING2 1404 page lists 4600KV but gallery packshots are 3800KV-labelled only."],
  ["iflight-xing2-1507-4600kv", "Legacy XING2 1507 product URL 404 on shop.iflight.com."],
  ["iflight-xing2-2203-2350kv", "Legacy XING2 2203 product URL 404 on shop.iflight.com."],
  ["iflight-xing2-2807-1280kv-lr", "Legacy XING2 2807 LR product URL 404; no 1280KV packshot on iFlight store."],
  ["newbee-0802-17500kv", "No NewBeeDrone 0802 17500KV product page on newbeedrone.com."],
  ["rcinpower-1404-3800kv", "SmooX 1404 page is spec-sheet composite; GTS V3 1404 page uses 1203 imagery."],
  ["rcinpower-2203-2300kv", "No RCinPower G-SERIES 2203 2300KV product page on rcinpower.com."],
  ["rcinpower-2807-1350kv-lr", "No RCinPower 2807 1350KV LR product page on rcinpower.com."],
  ["tmotor-2807-1300kv-lr", "No T-Motor FPV 2807 1300KV LR motor product page on store.tmotor.com."],
]);

export const CLASSIFICATION_LABELS = {
  fetchable_now: "Fetchable now",
  needs_better_official_url: "Needs better official URL",
  official_source_blocked: "Official source blocked",
  no_clean_packshot_found: "No clean packshot found",
  should_remain_svg_placeholder: "Should remain SVG placeholder",
  unsafe_likely_mismatch: "Unsafe — likely mismatch",
};

export function getQueueTier(entry) {
  if (entry.usedInPreset) {
    return 1;
  }

  if (entry.compatibleClasses?.includes("5-inch-freestyle")) {
    return 2;
  }

  if ((entry.compatibleClasses?.length ?? 0) > 1) {
    return 3;
  }

  if (EASY_MATCH_CATEGORIES.has(entry.categoryKey)) {
    return 4;
  }

  if (RECEIVER_VTX_CATEGORIES.has(entry.categoryKey)) {
    return 5;
  }

  if (entry.categoryKey === "frame") {
    return 6;
  }

  if (ELECTRONICS_CATEGORIES.has(entry.categoryKey)) {
    return 7;
  }

  return 7;
}

export function classifyMissingPart(entry, sourceEntry) {
  const partId = entry.partId;
  const notes = sourceEntry?.notes ?? "";
  const urlConfidence = sourceEntry?.urlConfidence ?? "unknown";
  const hasPreferredUrl = Boolean(sourceEntry?.preferredImageUrl);
  const hasOfficialUrl = Boolean(sourceEntry?.officialUrl);

  if (UNSAFE_LIKELY_MISMATCH_PART_IDS.has(partId)) {
    return {
      classification: "unsafe_likely_mismatch",
      reason: "Prior manual review flagged wrong product, variant, or composite image.",
    };
  }

  if (OFFICIAL_SOURCE_BLOCKED_PART_IDS.has(partId)) {
    return {
      classification: "official_source_blocked",
      reason: OFFICIAL_SOURCE_BLOCKED_PART_IDS.get(partId),
    };
  }

  if (STACK_ONLY_INDIVIDUAL_PART_IDS.has(partId)) {
    return {
      classification: "should_remain_svg_placeholder",
      reason: "Manufacturer page is a combined FC+ESC stack; catalog line is FC-only or ESC-only.",
    };
  }

  if (FULL_DRONE_FRAME_PART_IDS.has(partId)) {
    return {
      classification: "should_remain_svg_placeholder",
      reason: "Official listing is a complete aircraft, not an isolated frame-kit packshot.",
    };
  }

  if (NO_CLEAN_PACKSHOT_PART_IDS.has(partId)) {
    return {
      classification: "no_clean_packshot_found",
      reason: NO_CLEAN_PACKSHOT_PART_IDS.get(partId),
    };
  }

  if (
    hasPreferredUrl &&
    urlConfidence === "high" &&
    !UNSAFE_LIKELY_MISMATCH_PART_IDS.has(partId)
  ) {
    return {
      classification: "fetchable_now",
      reason: "Verified manufacturer preferredImageUrl with high URL confidence.",
    };
  }

  if (urlConfidence === "low" || notes.toLowerCase().includes("substitute")) {
    return {
      classification: "should_remain_svg_placeholder",
      reason: notes || "Low-confidence official source; substitute imagery risk is too high.",
    };
  }

  if (hasOfficialUrl && !hasPreferredUrl) {
    return {
      classification: "needs_better_official_url",
      reason:
        "Official product page exists but no verified direct packshot URL is on file yet.",
    };
  }

  if (!hasOfficialUrl) {
    return {
      classification: "needs_better_official_url",
      reason: "No official manufacturer product page recorded in image source files.",
    };
  }

  return {
    classification: "no_clean_packshot_found",
    reason: "Official source reviewed; no clean isolated packshot identified.",
  };
}
