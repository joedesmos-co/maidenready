# Catalog image review notes

Structured research log for image-completion queue parts where official packshots are missing, blocked, mismatched, or where the catalog SKU may need future review.

**Rules applied:** official manufacturer pages only; no retailer images; no fetch/download during research passes.

**Last updated:** 2026-06-29 — queue ranks **51–75** (`docs/IMAGE_COMPLETION_QUEUE.md`).

## Summary (ranks 51–75)

| Metric | Count |
| --- | ---: |
| Parts researched | 25 |
| Exact official packshot found | 1 |
| New fetchable after source update | 1 (`hdzero-nano-90`) |
| Permanent SVG placeholders (this batch) | 24 |

## Catalog review candidates

Parts that may need replacement, rename, or removal in a future catalog cleanup pass:

| Part ID | Issue |
| --- | --- |
| `matek-h743-slate-freestyle` | No Matek "Slate Freestyle" SKU; closest official board is H743-SLIM-V4 |
| `iflight-xl5-v6` | XL5 V6 frame discontinued; manufacturer only lists XL5 V5 / Nazgul5 V3 replacement parts |
| `hqprop-t3x2-5x3-515` | T515 prop SKU 404 on HQProp official store — may be retired or renamed |
| `imm-rc-fusion-v2-elrs` | Fusion V2 ELRS receiver unclear vs legacy Fusion page; site often unreachable |
| `jhemcu-ep28-elrs` | No stable EP28 product URL on JHEMCU store |
| `iflight-nazgul-eco5-frame` | Official URL points at complete Nazgul XL5 ECO drone, not an Eco5 frame kit |
| `flywoo-explorer5-frame` | Explorer LR4/O3 long-range listing; "Explorer 5" naming may not match current Flywoo SKU |
| `axisflying-ae2207-1960` | Product page 404 at time of research; family listing only |
| `axisflying-joker-2207-1920kv` | Product page 404 at time of research; family listing only |

---

## Rank 51 — `hqprop-t3x2-5x3-515`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://www.hqprop.com/hqprop-t3x2-5x3-515-p00147p1.html |
| **Notes** | HQProp T3x2.5x3 515 product page returns 404. No alternate official T515 listing found on hqprop.com. Consider removing or remapping to a current T3x2.5x3 SKU if one exists. |

## Rank 52 — `imm-rc-fusion-v2-elrs`

| Field | Value |
| --- | --- |
| **Image status** | Official source blocked |
| **Catalog status** | Should consider replacement/removal later |
| **Official URL** | https://www.immersionrc.com/fusion/ |
| **Notes** | immersionrc.com returned HTTP 503 during research. Fusion landing page is not a verified V2 ELRS receiver product page with an isolated packshot. |

## Rank 53 — `jhemcu-ep28-elrs`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Should consider replacement/removal later |
| **Official URL** | https://www.jhemcu.com/ |
| **Notes** | JHEMCU store homepage only; no stable EP28 2.4GHz ELRS product URL or gallery asset located. |

## Rank 54 — `aikon-f7-mini-35a`

| Field | Value |
| --- | --- |
| **Image status** | Should remain SVG placeholder |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://shop.aikon.com/products/f7-mini-35a-4-in-1-esc-v3 |
| **Notes** | Official Aikon listing is an F7 Mini FC + 35A 4-in-1 ESC stack. Catalog line is ESC-only; stack imagery rejected per FC/ESC split rules. |

## Rank 55 — `iflight-succex-e-f4-50a`

| Field | Value |
| --- | --- |
| **Image status** | Should remain SVG placeholder |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://shop.iflight.com/SucceX-E-F4-50A-4-in-1-ESC-Pro1420 |
| **Notes** | iFlight product page shows combined FC+ESC stack, not an isolated 4-in-1 ESC packshot. |

## Rank 56 — `meps-konvex-f55-55a-4in1`

| Field | Value |
| --- | --- |
| **Image status** | Should remain SVG placeholder |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.mepsking.com/ |
| **Notes** | MEPS Konvex F55 55A has no standalone product page on mepsking.com; homepage/store navigation only. |

## Rank 57 — `meps-konvex-g2-50a`

| Field | Value |
| --- | --- |
| **Image status** | Should remain SVG placeholder |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.mepsking.com/ |
| **Notes** | MEPS Konvex G2 50A has no standalone product page on mepsking.com. |

## Rank 58 — `rush-blade-f7-60a-4in1`

| Field | Value |
| --- | --- |
| **Image status** | Should remain SVG placeholder |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.rushfpv.com/rush-blade-f7-60a-4in1-esc-g-585 |
| **Notes** | Rush Blade F7 60A official page (rushfpv.net) shows FC+ESC stack imagery. rushfpv.com alternate URL 404. Stack rejected for individual ESC catalog entry. |

## Rank 59 — `speedybee-bl32-55a-4in1`

| Field | Value |
| --- | --- |
| **Image status** | Should remain SVG placeholder |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.speedybee.com/speedybee-f405-v4-bls-55a-30x30-fc-esc-stack/ |
| **Notes** | SpeedyBee BL32 55A sold only as F405 V4 + BL32 55A stack on official site. No isolated ESC packshot. |

## Rank 60 — `diatone-mamba-f722-s-fc`

| Field | Value |
| --- | --- |
| **Image status** | Should remain SVG placeholder |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.diatone.us/products/mb-mk4-f722-app-fc |
| **Notes** | Diatone Mamba F722 S FC official listing is stack/combo imagery with ESC; no isolated FC packshot suitable for FC-only entry. |

## Rank 61 — `jhemcu-g743-pro-fc`

| Field | Value |
| --- | --- |
| **Image status** | Should remain SVG placeholder |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.jhemcu.com/ |
| **Notes** | JHEMCU G743 Pro FC has no stable direct product URL on the official store; homepage only. |

## Rank 62 — `matek-h743-slate-freestyle`

| Field | Value |
| --- | --- |
| **Image status** | Should remain SVG placeholder |
| **Catalog status** | Possible wrong catalog entry |
| **Official URL** | https://www.mateksys.com/?portfolio=h743-slim-v4 |
| **Notes** | No Matek "H743 Slate Freestyle" SKU. Closest official H743 freestyle board is H743-SLIM-V4; Matek gallery images are spec-sheet composites, not isolated FC packshots. Prior manual reject for wrong variant. **Catalog review:** rename/remap to H743-SLIM-V4 or remove. |

## Rank 63 — `speedybee-f7-v3-fc`

| Field | Value |
| --- | --- |
| **Image status** | Should remain SVG placeholder |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.speedybee.com/speedybee-f7-v3-bl32-50a-30x30-stack/ |
| **Notes** | SpeedyBee F7 V3 FC sold only as F7 V3 + BL32 50A stack on official site. |

## Rank 64 — `flywoo-explorer5-frame`

| Field | Value |
| --- | --- |
| **Image status** | Official source blocked |
| **Catalog status** | Should consider replacement/removal later |
| **Official URL** | https://flywoo.net/products/explorer-lr4-o3-5-long-range-freestyle-frame |
| **Notes** | flywoo.net returned HTTP 403 to automated fetch. Closest official listing is Explorer LR4/O3 5" long-range frame family. No verified isolated frame-kit packshot. **Catalog review:** confirm Explorer 5 vs LR4/O3 naming. |

## Rank 65 — `iflight-nazgul-eco5-frame`

| Field | Value |
| --- | --- |
| **Image status** | Should remain SVG placeholder |
| **Catalog status** | Should consider replacement/removal later |
| **Official URL** | https://shop.iflight.com/Nazgul-XL5-ECO-6S-Pro2193 |
| **Notes** | Official iFlight listing is a complete Nazgul XL5 ECO aircraft, not an isolated Eco5 frame kit. Full-drone imagery rejected for frame-only entry. |

## Rank 66 — `iflight-xl5-v6`

| Field | Value |
| --- | --- |
| **Image status** | Should remain SVG placeholder |
| **Catalog status** | Discontinued but still common |
| **Official URL** | https://shop.iflight.com/replacement-parts-for-xl5-v5-frame-pro1303 |
| **Notes** | XL5 V6 frame discontinued. Manufacturer replacement-parts page covers XL5 / Nazgul5 V3 frame family only — no V6 frame-kit packshot. **Catalog review:** consider replacing with current Nazgul5 / XL5 ECO frame SKU. |

## Rank 67 — `tbs-source-one-v6-frame`

| Field | Value |
| --- | --- |
| **Image status** | Should remain SVG placeholder |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://github.com/tbs-trappy/source_one |
| **Notes** | TBS Source One is open-source; GitHub repo has CAD/render assets but no isolated retail frame-kit product photo. Same policy as Source One V5 preset. |

## Rank 68 — `axisflying-ae2207-1960`

| Field | Value |
| --- | --- |
| **Image status** | Acceptable family/variant official packshot found (not added — no isolated 1960KV packshot) |
| **Catalog status** | Should consider replacement/removal later |
| **Official URL** | https://www.axisflying.com/products/axisflying-ae-series-2207-motor |
| **Notes** | AxisFlying AE 2207 motor family page lists 1960KV variant but direct product URL was 404 during research. Family page imagery is multi-KV marketing, not a verified 1960KV-isolated packshot. |

## Rank 69 — `axisflying-joker-2207-1920kv`

| Field | Value |
| --- | --- |
| **Image status** | Acceptable family/variant official packshot found (not added — no isolated 1920KV packshot) |
| **Catalog status** | Should consider replacement/removal later |
| **Official URL** | https://www.axisflying.com/products/axisflying-joker-2207-motor |
| **Notes** | AxisFlying Joker 2207 family page; 1920KV is a listed variant. Product URL unreachable/404 during research. No KV-specific isolated packshot verified. |

## Rank 70 — `samguk-v-2207-1960kv`

| Field | Value |
| --- | --- |
| **Image status** | Acceptable family/variant official packshot found (not added — family page only) |
| **Catalog status** | Discontinued but still common |
| **Official URL** | https://www.samgukmotors.com/samguk-series-v-2207-motor-p00130p1.html |
| **Notes** | Official Samguk Series V 2207 motor family page on manufacturer store. Gallery shows family lineup, not an isolated 1960KV packshot suitable for exact-SKU fetch. |

## Rank 71 — `cnhl-6s-1500-freestyle`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://chinahobbyline.com/products/cnhl-black-series-1500mah-22-2v-6s-100c-lipo-battery-with-xt60-plug |
| **Notes** | CNHL official CDN asset includes X2 multi-pack overlay and 130C label; catalog line is single 6S 1500mAh 100C. Prior manual reject retained. |

## Rank 72 — `foxeer-falkor-2`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.foxeer.com/foxeer-falkor-2-fpv-camera-g-588 |
| **Notes** | Foxeer official page CDN images are VTX/heatsink modules, not Falkor 2 camera packshots. Prior manual reject retained. |

## Rank 73 — `foxeer-predator-v5`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.foxeer.com/foxeer-predator-v5-fpv-camera-g-589 |
| **Notes** | Foxeer official page images show VS1011 video-switch PCB / accessory boards, not Predator V5 camera packshots. |

## Rank 74 — `foxeer-toothless-2`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.foxeer.com/foxeer-toothless-2-fpv-camera-g-590 |
| **Notes** | Foxeer official page only exposes `/upload/ad/` marketing assets and generic icons — no isolated Toothless 2 camera product photo. |

## Rank 75 — `hdzero-nano-90`

| Field | Value |
| --- | --- |
| **Image status** | Exact official packshot found |
| **Catalog status** | Current valid SKU (Nano 90 V2 supersedes original Nano 90) |
| **Official URL** | https://www.hd-zero.com/product-page/hdzero-nano-90-v2 |
| **Preferred image URL** | https://static.wixstatic.com/media/967e02_0728e46bd18842b6b0523962ec7841f4~mv2.png/v1/fill/w_1000,h_1000,al_c,usm_0.66_1.00_0.01/967e02_0728e46bd18842b6b0523962ec7841f4~mv2.png |
| **URL confidence** | high |
| **Notes** | HDZero Nano 90 V2 Wix gallery asset verified visually: isolated RunCam HDZero Nano 90 camera on black (HDZERO / Nano 90 silkscreen). Prior reject (logo-only) was incorrect. Source updated in `fiveInchPartImageSources.js`; removed from unsafe/blocked skip lists. **Fetchable now** — run pipeline when ready. |
