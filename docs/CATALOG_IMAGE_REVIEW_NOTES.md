# Catalog image review notes

Structured research log for image-completion queue parts where official packshots are missing, blocked, mismatched, or where the catalog SKU may need future review.

**Rules applied:** official manufacturer pages only; no retailer images; no fetch/download during research passes.

**Last updated:** 2026-06-30 — public-beta consolidated image completion pass.

## Public-beta completion pass (2026-06-30)

| Metric | Value |
| --- | ---: |
| Catalog parts | 261 |
| Local images | **102 / 261** (39%) |
| Preset images | **40 / 48** |
| Researched (needs URL queue) | 47 |
| Images added (kept) | 7 |
| Images removed (safety review) | 16 |
| Fetchable remaining | 0 |

**Kept packshots:** `geprc-gep-cl35-v3-frame`, `geprc-speedx2-2105-5-2650kv`, `betafpv-pavo35-frame-kit`, `betafpv-x-knight-35-frame-kit`, `geprc-gep-st35-frame`, `iflight-aos-3-5-v5-1-frame`, `iflight-aos-cine35-v5-frame`.

**New mismatch holds:** `diatone-mamba-f722` (FC+O3 composite), `iflight-blitz-mini-e55s-4in1` (Mach-R5 drone scrape), `lumenier-6s-2200-lr-lipo` (wrong iFlight frame asset on battery page).

Full report: `docs/IMAGE_COMPLETION_FINAL_REPORT.md` · Machine research: `docs/image-research-results.json`

---

**Prior queue note:** ranks **51–199** (`docs/IMAGE_COMPLETION_QUEUE.md`). Queue has **159** missing entries after this pass.

## Summary (ranks 51–75)

| Metric | Count |
| --- | ---: |
| Parts researched | 25 |
| Exact official packshot found | 1 |
| New fetchable after source update | 1 (`hdzero-nano-90`) |
| Permanent SVG placeholders (this batch) | 24 |

## Summary (ranks 76–100)

| Metric | Count |
| --- | ---: |
| Parts researched | 25 |
| Exact official packshot found | 1 |
| New fetchable after source update | 1 (`betafpv-1s-300-hv-bt2`) |
| Permanent SVG placeholders (this batch) | 24 |

## Summary (ranks 101–125)

| Metric | Count |
| --- | ---: |
| Parts researched | 25 |
| Exact official packshot found | 1 |
| Acceptable family/variant packshot found | 2 |
| New fetchable after source update | 3 (`betafpv-0802-25000kv`, `happymodel-ex0802-19000kv`, `happymodel-se0802-22000kv`) |
| Permanent SVG placeholders (this batch) | 22 |

## Summary (ranks 126–150)

| Metric | Count |
| --- | ---: |
| Parts researched | 25 |
| Exact official packshot found | 0 |
| Acceptable family/variant packshot found | 0 |
| New fetchable after source update | 0 |
| Permanent SVG placeholders (this batch) | 25 |

## Summary (ranks 151–175)

| Metric | Count |
| --- | ---: |
| Parts researched | 25 |
| Exact official packshot found | 0 |
| Acceptable family/variant packshot found | 1 |
| New fetchable after source update | 1 (`rush-nano-ultimate-whoop-vtx`) |
| Permanent SVG placeholders (this batch) | 24 |

## Summary (ranks 176–200)

| Metric | Count |
| --- | ---: |
| Parts researched | 25 |
| Exact official packshot found | 1 |
| Acceptable family/variant packshot found | 0 |
| New fetchable after source update | 1 (`diatone-mamba-f405-mini`) |
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
| `fpvcycle-2207-1780kv`, `fpvcycle-2207-1960` | Catalog 2207 KV lines; manufacturer now sells 25mm 1870/2150Kv bell/stator parts only |
| `johnnyfpv-motor-v2-2207-1960kv` | V2 2207 discontinued; Lumenier only lists JohnnyFPV V3 2307/2807 |
| `hypetrain-acer-2306-1950kv`, `hypetrain-blaster-2450` | Hypetrain has no manufacturer store; Rotor Riot retailer-only |
| `lumenier-qav-s-johnnyfpv` | Official page is QAV-S 2 JohnnyFPV SE; catalog name omits "V2" |
| `cnhl-ministar-4s-900` | No 4S 900mAh Ministar SKU on CNHL official store |
| `cnhl-6s-1800-lr-lipo` | Catalog LR LiPo vs official Ministar 6S 1800mAh 120C high-C line |
| `betafpv-2s-300-ph2` | Official BETAFPV 300mAh 2S is 45C XT30, not 75C PH2.0 |
| `iflight-4s-1800-cine` | No matching iFlight 4S 1800mAh battery on official store |
| `gn-1s-550-bt2`, `gnb-4s-750-mini`, `gnb-4s-1100-park`, `gnb-4s-1300-cine`, `gnb-6s-2500-lr-lipo` | GNB/Gaoneng store blocks fetch; Genstattu product pages 404 |
| `betafpv-1404-4600kv` | Official BETAFPV 1404 is 4500KV; catalog 4600KV does not match manufacturer SKU |
| `brotherhobby-1507-3700kv` | No BrotherHobby 1507 listing on manufacturer store |
| `brotherhobby-2004-2600kv` | Legacy 2004 URL serves Avenger 0804 content |
| `brotherhobby-2806-1400kv-lr` | Official Avenger line is 2806.5 1300KV, not 2806 1400KV LR |
| `emax-eco-1404-4000kv` | Official EMAX ECO Micro 1404 lists 3700KV only |
| `emax-eco-2004-2550kv` | Official EMAX ECO II 2004 lists 1700/2200/2400KV; no 2550KV |
| `emax-eco-ii-2806-1280kv` | Official EMAX LR motor is ECO II 2807 1280KV, not 2806 |
| `geprc-0901-11000kv`, `geprc-2005-2200kv` | No matching GEPRC motor SKUs on geprc.com |
| `happymodel-cine-2004-2400kv` | No Cine 2004 motor page; Cine8 kit/frame listings only |
| `happymodel-se0802-22000kv` | SE0802 naming superseded by EX0802/RS0802 on Happymodel site |
| `iflight-xing-e-pro-2806-1300kv` | Closest official SKU is XING 2806.5 Cinelifter, not XING-E Pro 2806 |
| `iflight-xing2-1507-4600kv`, `iflight-xing2-2203-2350kv`, `iflight-xing2-2807-1280kv-lr` | Legacy iFlight product URLs 404; not on current motor category |
| `newbee-0802-17500kv` | No 17500KV SKU on NewBeeDrone store |
| `rcinpower-2203-2300kv`, `rcinpower-2807-1350kv-lr` | No matching RCinPower G-SERIES product pages |
| `tmotor-2807-1300kv-lr` | No T-Motor FPV 2807 LR listing on store.tmotor.com |
| `axisflying-2808-1150kv-lr` | No AxisFlying 2808 product page on axisflying.com |
| `radiomaster-er5-915-lr` | Radiomaster ER5 is 2.4GHz ELRS PWM only; no ER5 915 SKU — closest 915MHz ELRS is Bandit BR1 |
| `hdzero-cine-nano-vtx` | No Cine Nano VTX product page on hd-zero.com shop |
| `rush-mini-tank-cine-vtx` | No RushFPV Mini Tank Cine listing on rushfpv.net |
| `rush-nano-vtx-park` | Closest Tank Tiny VTX is 800mW max; catalog Nano VTX Park specifies 400mW |
| `betafpv-pavo3516-frame` | No Pavo3516 frame or kit on betafpv.com |
| `flywoo-explorer35-frame`, `flywoo-explorer35-cine-frame`, `flywoo-explorer7-lr-frame` | No Explorer 3.5/7 LR frame-kit pages on flywoo.net |
| `geprc-cinebee35-hd-frame`, `geprc-crocodile7-lr-frame`, `geprc-rocket-3-5-frame`, `geprc-rocket-lite-75-frame` | No matching GEPRC isolated frame-kit product pages |
| `hglrc-sector7-lr-frame` | No Sector7 LR frame; HGLRC Sector D5/X5 are 5-inch only |
| `iflight-chimera3-frame`, `iflight-chimera35-cine-frame`, `iflight-cidatel35-cine-frame` | Legacy iFlight 3.5-inch frame-kit URLs 404; Chimera7 kits are different product line |
| `diatone-taycan35-frame` | Diatone store has MXC Taycan accessories only, not a 3.5-inch frame kit |
| `betafpv-f411-1s-aio-fc` | Official BETAFPV listing is F4 1S 5A combined AIO, not F411 FC-only |
| `betafpv-brushless-1s-aio-esc`, `happymodel-happywhoop-aio-esc`, `happymodel-happywhoop-aio-fc` | Manufacturer sells combined AIO boards only; catalog splits FC/ESC halves |
| `geprc-gep-aio-1s-fc` | Official GEP-TAKER F411-12A-E is combined 1~2S AIO, not isolated 1S FC |
| `diatone-mamba-f35-cine-esc`, `diatone-mamba-f35-mini-esc` | No Mamba F35 ESC on diatone.us; F40 mini is closest but different amp/SKU |
| `hglrc-tekko32-f35-mini`, `tmotor-f35a-mini-4in1`, `tmotor-pacer-f35-cine-esc` | No matching official product pages on manufacturer stores |
| `geprc-gep35a-cine-esc` | GEPRC ESC category is Taker line only; no GEP35A Cine SKU |
| `iflight-succexd35-cine-esc`, `iflight-beast-h743-cine-fc`, `iflight-beast-h743-lr-fc` | Legacy Beast/SucceX-D35 URLs 404; BLITZ Wing H743 is different product |
| `geprc-f405-20x20-mini`, `geprc-f722-cine-mini-fc`, `geprc-f745-lr-fc` | GEPRC store has GEP-F405/F722 HD and TAKER H743 MINI; catalog SKUs do not match |
| `matek-f722-cine-mini-fc` | Matek F722-mini is EOL; no Cine Mini FC SKU |
| `aikon-65a-lr-esc` | Aikon store unreachable; no verified 65A LR ESC URL |
| `meps-konvex-55a-lr-esc` | MEPS store API returns no Konvex 55A LR product listing |
| `newbee-drone-75-pro-frame` | No Drone 75 Pro SKU; closest is Cockroach75 frame (different name) |
| `tbs-source-one7-lr-frame` | No Source One 7 repository; tbs-trappy/source_one is 5-inch only |
| `matek-h743-wing-lr-fc` | Closest H743-WLITE uses ICM42688; catalog specifies BMI270 |

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

---

## Rank 76 — `foxeer-reaper-f4-65a`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.foxeer.com/foxeer-reaper-f4-65a-4in1-esc-g-584 |
| **Notes** | Foxeer product pages share generic `/upload/ad/` marketing assets and support icons across FC/ESC SKUs; no isolated Reaper F4 65A ESC packshot. Prior manual reject retained. |

## Rank 77 — `foxeer-f722-v4`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.foxeer.com/foxeer-f722-v4-flight-controller-g-586 |
| **Notes** | Same Foxeer CDN pool as other products; scraped assets are generic icons, not F722 V4 FC packshots. |

## Rank 78 — `foxeer-h743-f722-fc`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.foxeer.com/foxeer-h743-f722-flight-controller-g-587 |
| **Notes** | Foxeer gallery images on H743 F722 page are VTX/heatsink modules, not the flight controller SKU. Prior manual reject retained. |

## Rank 79 — `armattan-badger5-frame`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://armattanquads.com/products/badger-1 |
| **Notes** | Armattan Shopify CDN primary image filename is `Badger_6_inch_frame`; not a verified Badger 5 frame-kit packshot. Prior manual reject retained. |

## Rank 80 — `geprc-mark4-frame`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://geprc.com/product/gep-mark4-frame/ |
| **Preferred image URL** | https://geprc.com/wp-content/uploads/2019/06/03-2845615995-1200x1200.jpg |
| **Notes** | Verified visually: gallery image is a partial build with motors and camera installed, not an isolated Mark4 frame kit. Prior manual reject retained. |

## Rank 81 — `lumenier-qav-s-johnnyfpv`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Possible wrong catalog entry |
| **Official URL** | https://www.lumenier.com/products/lumenier-qav-s-2-johnnyfpv-se-5-frame-kit |
| **Preferred image URL** | https://cdn.shopify.com/s/files/1/0698/9525/8342/files/lumenier-qav-s-2-johnnyfpv-se-5inch-frame-kit-_1.jpg?v=1734560533 |
| **Notes** | Official Lumenier page and images are QAV-S **2** JohnnyFPV SE; catalog entry name omits V2. Frame packshots look valid for the official SKU but catalog naming mismatch flagged. Prior manual reject retained. |

## Rank 82 — `fpvcycle-2207-1780kv`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Possible wrong catalog entry |
| **Official URL** | https://fpvcycle.com/products/fpvcycle-5-motor-choose-options |
| **Notes** | Official FPVCycle page is current 25mm motor sold as separate 1870/2150Kv bell/stator parts; no 2207 1780KV variant listed. |

## Rank 83 — `fpvcycle-2207-1960`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Possible wrong catalog entry |
| **Official URL** | https://fpvcycle.com/products/fpvcycle-5-motor-choose-options |
| **Notes** | Same as rank 82; catalog 2207 1960KV does not match current 25mm 1870/2150Kv manufacturer product line. |

## Rank 84 — `hypetrain-acer-2306-1950kv`

| Field | Value |
| --- | --- |
| **Image status** | Official source blocked |
| **Catalog status** | Discontinued but still common |
| **Official URL** | https://rotorriot.com/products/hypetrain-revo-5-2207-1860kv-motor (retailer; 404) |
| **Notes** | Hypetrain has no manufacturer-owned store. Rotor Riot is a retailer, not an acceptable official source per project rules. Acer listing unavailable. |

## Rank 85 — `hypetrain-blaster-2450`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Discontinued but still common |
| **Official URL** | https://rotorriot.com/products/hypetrain-blaster-2207-2450kv-motor (retailer) |
| **Notes** | Rotor Riot gallery image verified as a Gemfan propeller, not a Hypetrain Blaster motor. Retailer source rejected. Prior manual reject retained. |

## Rank 86 — `johnnyfpv-motor-v2-2207-1960kv`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Discontinued but still common |
| **Official URL** | https://www.lumenier.com/products/lumenier-2307-johnnyfpv-v3-pro-cinematic-motor |
| **Notes** | JohnnyFPV V2 2207 1960KV discontinued; Lumenier only lists JohnnyFPV V3 2307/2807 motors — wrong stator size and generation. |

## Rank 87 — `lumenier-2207-1800kv`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Discontinued but still common |
| **Official URL** | https://www.lumenier.com/collections/motors |
| **Notes** | Lumenier AX 2207 1800KV has no dedicated product page on lumenier.com; motors collection only. |

## Rank 88 — `ethix-p3-peanut-butter`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://hqprop.com/ethix-p3-peanut-butter-jelly-prop-2cw2ccw-poly-carbonate-p0276.html |
| **Notes** | HQProp official gallery (`ec35c7f631.jpg`) verified: prop packshot with large Ethix graffiti logo overlay — rejected per marketing-overlay rule. Prior manual reject retained. |

## Rank 89 — `ethix-s3-5050`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.hqprop.com/search/?Keyword=ethix+s3 |
| **Notes** | No dedicated Ethix S3 5x5x3 product URL on HQProp official store; search page only. |

## Rank 90 — `gemfan-hurricane-mck-51433`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.gemfanhobby.com/hurricane-51466-v2-pc-3-blade.html |
| **Notes** | Closest Gemfan listing is Hurricane **51466** V2, not MCK **51433** — wrong prop size/family. Prior manual reject retained. |

## Rank 91 — `betafpv-1s-300-hv-bt2`

| Field | Value |
| --- | --- |
| **Image status** | Exact official packshot found |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://betafpv.com/products/lava-1s-300mah-75c-battery-5pcs |
| **Preferred image URL** | https://betafpv.com/cdn/shop/files/300_4163113a-27e7-4975-b80c-7c359025ff08_1024x1024.jpg?v=1700569670 |
| **URL confidence** | high |
| **Notes** | BETAFPV LAVA 1S 300mAh LiHV 75C BT2.0 verified on pack label (5-pack listing). **Fetchable now** — run pipeline when ready. |

## Rank 92 — `betafpv-2s-300-ph2`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Possible wrong catalog entry |
| **Official URL** | https://betafpv.com/products/300mah-2s-lipo-battery-2pcs |
| **Notes** | Closest official BETAFPV 300mAh 2S listing is 45C with XT30; catalog specifies 75C PH2.0. Image shows XT30, not PH2.0. |

## Rank 93 — `cnhl-6s-1800-lr-lipo`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Should consider replacement/removal later |
| **Official URL** | https://chinahobbyline.com/products/cnhl-ministar-series-1800mah-22-2v-6s-120c-lipo-battery-with-xt60-plug |
| **Notes** | Official CNHL Ministar 6S 1800mAh **120C** exists; catalog LR LiPo line implies a lower-C long-range SKU not on manufacturer store. |

## Rank 94 — `cnhl-ministar-4s-900`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://chinahobbyline.com/ |
| **Notes** | No CNHL Ministar 4S 900mAh 100C XT30 listing found; official store has 850mAh 4S and 1300mAh+ 4S Ministar lines instead. |

## Rank 95 — `gn-1s-550-bt2`

| Field | Value |
| --- | --- |
| **Image status** | Official source blocked |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.gaoneng.shop/ |
| **Notes** | gaoneng.shop returns HTTP 403 to automated fetch; Genstattu GNB 1S 550mAh page 404. |

## Rank 96 — `gnb-4s-1100-park`

| Field | Value |
| --- | --- |
| **Image status** | Official source blocked |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.gaoneng.shop/ |
| **Notes** | GNB/Gaoneng store blocks automated fetch; no verified 4S 1100mAh packshot URL. |

## Rank 97 — `gnb-4s-1300-cine`

| Field | Value |
| --- | --- |
| **Image status** | Official source blocked |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.gaoneng.shop/ |
| **Notes** | GNB/Gaoneng store blocks automated fetch; Genstattu 4S 1300mAh page 404. |

## Rank 98 — `gnb-4s-750-mini`

| Field | Value |
| --- | --- |
| **Image status** | Official source blocked |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.gaoneng.shop/ |
| **Notes** | GNB/Gaoneng store blocks automated fetch; Genstattu 4S 750mAh page 404. |

## Rank 99 — `gnb-6s-2500-lr-lipo`

| Field | Value |
| --- | --- |
| **Image status** | Official source blocked |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.gaoneng.shop/ |
| **Notes** | GNB/Gaoneng store blocks automated fetch; Genstattu 6S 2500mAh page 404. |

## Rank 100 — `iflight-4s-1800-cine`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://shop.iflight.com/batteries-cat342 |
| **Notes** | No iFlight 4S 1800mAh 120C cinewhoop battery SKU found on official shop.iflight.com at research time. |

## Rank 101 — `axisflying-2808-1150kv-lr`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://www.axisflying.com/collections/motors |
| **Notes** | No AxisFlying 2808 1150KV LR product page found; motors collection only. |

## Rank 102 — `betafpv-0802-25000kv`

| Field | Value |
| --- | --- |
| **Image status** | Exact official packshot found |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://betafpv.com/products/0802-brushless-motors-2026 |
| **Preferred image URL** | https://betafpv.com/cdn/shop/files/0802_Brushless_Motors_2026_Racing_1024x1024.jpg?v=1769069910 |
| **URL confidence** | high |
| **Notes** | BETAFPV 0802 2026 Racing gallery packshot verified 25000KV on motor bell. **Fetchable now.** |

## Rank 103 — `betafpv-1404-4600kv`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Possible wrong catalog entry |
| **Official URL** | https://betafpv.com/products/1404-4500kv-brushless-motors |
| **Notes** | Closest official BETAFPV 1404 listing is 4500KV; packshot bell reads 4500KV, not catalog 4600KV. |

## Rank 104 — `brotherhobby-1507-3700kv`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://brotherhobby.com/ |
| **Notes** | No BrotherHobby 1507 3700KV product listing found on manufacturer store. |

## Rank 105 — `brotherhobby-2004-2600kv`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Possible wrong catalog entry |
| **Official URL** | https://brotherhobby.com/2004-motor-p00129p1.html |
| **Notes** | Legacy 2004 URL resolves but page content is Avenger 0804 motors, not 2004 2600KV. |

## Rank 106 — `brotherhobby-2806-1400kv-lr`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Should consider replacement/removal later |
| **Official URL** | https://brotherhobby.com/avenger-28065-motor-p00132p1.html |
| **Notes** | Official Avenger 2806.5 page packshot bell reads 1300KV; catalog line is 2806 1400KV LR. |

## Rank 107 — `emax-e1106-7200kv`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://emax-usa.com/products/emax-rs1106-micro-brushless-motor-1-pcs |
| **Notes** | EMAX RS1106 page lists 7200KV variant but primary packshot bell reads 7500KV. |

## Rank 108 — `emax-eco-1404-4000kv`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Possible wrong catalog entry |
| **Official URL** | https://emax-usa.com/products/eco-micro-1404-brushless-motor |
| **Notes** | Official EMAX ECO Micro 1404 lists 3700KV; no 4000KV variant on manufacturer store. |

## Rank 109 — `emax-eco-2004-2550kv`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://emax-usa.com/products/eco-ii-2004-brushless-motor |
| **Notes** | Official EMAX ECO II 2004 choose-KV page lists 1700/2200/2400KV only; catalog 2550KV not found. |

## Rank 110 — `emax-eco-ii-2806-1280kv`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Should consider replacement/removal later |
| **Official URL** | https://emax-usa.com/products/eco-ii-2807-long-range-brushless-motor |
| **Notes** | Closest official EMAX LR motor is ECO II 2807 1280KV; catalog stator 2806 does not match manufacturer 2807 SKU. |

## Rank 111 — `geprc-0901-11000kv`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://geprc.com/ |
| **Notes** | No GEPRC 0901 11000KV motor product page found on geprc.com. |

## Rank 112 — `geprc-2005-2200kv`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://geprc.com/ |
| **Notes** | No GEPRC 2005 2200KV motor product page found on geprc.com. |

## Rank 113 — `happymodel-cine-2004-2400kv`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://www.happymodel.cn/index.php/category/product/motor/ |
| **Notes** | No Happymodel Cine 2004 2400KV standalone motor page; Cine8 frame/kit listings only. |

## Rank 114 — `happymodel-ex0802-19000kv`

| Field | Value |
| --- | --- |
| **Image status** | Acceptable family/variant official packshot found |
| **Catalog status** | Discontinued but still common |
| **Official URL** | https://www.happymodel.cn/index.php/2020/05/29/happymodel-ex0802-new-series-brushless-motor-for-mobula6-mobula6-hd/ |
| **Preferred image URL** | https://www.happymodel.cn/wp-content/uploads/2020/07/11.jpg |
| **URL confidence** | high |
| **Notes** | Official EX0802 family page lists 19000KV; isolated packshot has no conflicting KV marking. **Fetchable now.** |

## Rank 115 — `happymodel-se0802-22000kv`

| Field | Value |
| --- | --- |
| **Image status** | Acceptable family/variant official packshot found |
| **Catalog status** | Discontinued but still common |
| **Official URL** | https://www.happymodel.cn/index.php/2020/05/29/happymodel-ex0802-new-series-brushless-motor-for-mobula6-mobula6-hd/ |
| **Preferred image URL** | https://www.happymodel.cn/wp-content/uploads/2020/07/11.jpg |
| **URL confidence** | high |
| **Notes** | SE0802 naming superseded by EX0802/RS0802; manufacturer page lists 22000KV variant. **Fetchable now.** |

## Rank 116 — `iflight-xing-e-pro-2806-1300kv`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Possible wrong catalog entry |
| **Official URL** | https://shop.iflight.com/xing-x2806-5-fpv-nextgen-motor-pro1001 |
| **Notes** | Closest official listing is XING 2806.5 Cinelifter; OSS asset labeled 1300KV shows 1500KV on bell. |

## Rank 117 — `iflight-xing2-1404-4600kv`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://shop.iflight.com/xing2-1404-toothpick-ultralight-build-unibell-pro1482 |
| **Notes** | Page lists 4600KV but gallery packshots are 3800KV-labelled; 4600KV OSS assets return 404. |

## Rank 118 — `iflight-xing2-1507-4600kv`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://shop.iflight.com/motor-cat341 |
| **Notes** | Legacy XING2 1507 product URL returns 404; not on current iFlight motor category. |

## Rank 119 — `iflight-xing2-2203-2350kv`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://shop.iflight.com/motor-cat341 |
| **Notes** | Legacy XING2 2203 product URL returns 404; not on current iFlight motor category. |

## Rank 120 — `iflight-xing2-2807-1280kv-lr`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Should consider replacement/removal later |
| **Official URL** | https://shop.iflight.com/motor-cat341 |
| **Notes** | Legacy XING2 2807 LR URL 404; closest iFlight LR motor is NIDICI 2807 1300KV, not 1280KV. |

## Rank 121 — `newbee-0802-17500kv`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://www.newbeedrone.com/collections/motors |
| **Notes** | No NewBeeDrone 0802 17500KV product page; store lists 13000/14000/19000/25000/30000KV instead. |

## Rank 122 — `rcinpower-1404-3800kv`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.rcinpower.com/SmooX/48.html |
| **Notes** | SmooX 1404 Plus page is tall spec-sheet composite only; GTS V3 1404 page embeds 1203 product images. |

## Rank 123 — `rcinpower-2203-2300kv`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://www.rcinpower.com/G-SERIES/ |
| **Notes** | No RCinPower G-SERIES 2203 2300KV product page found on rcinpower.com. |

## Rank 124 — `rcinpower-2807-1350kv-lr`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://www.rcinpower.com/G-SERIES/ |
| **Notes** | No RCinPower 2807 1350KV LR product page found on rcinpower.com. |

## Rank 125 — `tmotor-2807-1300kv-lr`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://store.tmotor.com/ |
| **Notes** | No T-Motor FPV 2807 1300KV LR motor product page found on store.tmotor.com. |

## Rank 126 — `gnb-4s-1100-park`

| Field | Value |
| --- | --- |
| **Image status** | Official source blocked |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.gaoneng.shop/ |
| **Notes** | gaoneng.shop returns HTTP 403; Genstattu GNB 4S 1100mAh product page 404. Re-confirmed in shifted queue. |

## Rank 127 — `gnb-4s-1300-cine`

| Field | Value |
| --- | --- |
| **Image status** | Official source blocked |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.gaoneng.shop/ |
| **Notes** | gaoneng.shop returns HTTP 403; Genstattu GNB 4S 1300mAh product page 404. Re-confirmed in shifted queue. |

## Rank 128 — `gnb-4s-750-mini`

| Field | Value |
| --- | --- |
| **Image status** | Official source blocked |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.gaoneng.shop/ |
| **Notes** | gaoneng.shop returns HTTP 403; Genstattu GNB 4S 750mAh product page 404. Re-confirmed in shifted queue. |

## Rank 129 — `gnb-6s-2500-lr-lipo`

| Field | Value |
| --- | --- |
| **Image status** | Official source blocked |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.gaoneng.shop/ |
| **Notes** | gaoneng.shop returns HTTP 403; Genstattu GNB 6S 2500mAh product page 404. Re-confirmed in shifted queue. |

## Rank 130 — `betafpv-2s-300-ph2`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Possible wrong catalog entry |
| **Official URL** | https://betafpv.com/products/300mah-2s-lipo-battery-2pcs |
| **Notes** | Closest official BETAFPV 300mAh 2S is 45C with XT30; no PH2.0 75C listing found. Re-confirmed in shifted queue. |

## Rank 131 — `cnhl-ministar-4s-900`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Possible wrong catalog entry |
| **Official URL** | https://chinahobbyline.com/products/cnhl-ministar-series-850mah-14-8v-4s-70c-lipo-battery-with-xt60-plug |
| **Notes** | No 4S 900mAh Ministar on CNHL store; official 900mAh Ministar is 2S PH2.0. Closest 4S is 850mAh 70C — not catalog 900mAh 100C. |

## Rank 132 — `iflight-4s-1800-cine`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://shop.iflight.com/batteries-cat342 |
| **Notes** | No iFlight 4S 1800mAh 120C cinewhoop battery on shop.iflight.com; Fullsend/Defender lines are other capacities. Re-confirmed. |

## Rank 133 — `axisflying-2808-1150kv-lr`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://www.axisflying.com/collections/motors |
| **Notes** | No AxisFlying 2808 1150KV LR product page on axisflying.com. Re-confirmed in shifted queue. |

## Rank 134 — `brotherhobby-1507-3700kv`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://brotherhobby.com/ |
| **Notes** | No BrotherHobby 1507 3700KV product listing on brotherhobby.com. Re-confirmed in shifted queue. |

## Rank 135 — `emax-eco-2004-2550kv`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://emax-usa.com/products/eco-ii-2004-brushless-motor |
| **Notes** | Official EMAX ECO II 2004 page lists 1700/2200/2400KV only; catalog 2550KV not found. Re-confirmed. |

## Rank 136 — `emax-eco-ii-2806-1280kv`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Should consider replacement/removal later |
| **Official URL** | https://emax-usa.com/products/eco-ii-2807-long-range-brushless-motor |
| **Notes** | Closest official EMAX LR motor is ECO II 2807 1280KV; catalog stator 2806 does not match. Re-confirmed. |

## Rank 137 — `geprc-0901-11000kv`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://geprc.com/ |
| **Notes** | No GEPRC 0901 11000KV motor product page on geprc.com. Re-confirmed. |

## Rank 138 — `geprc-2005-2200kv`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://geprc.com/ |
| **Notes** | No GEPRC 2005 2200KV motor product page on geprc.com. Re-confirmed. |

## Rank 139 — `happymodel-cine-2004-2400kv`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://www.happymodel.cn/index.php/category/product/motor/ |
| **Notes** | No Happymodel Cine 2004 2400KV standalone motor page; Cine8 kit/frame listings only. Re-confirmed. |

## Rank 140 — `iflight-xing2-1404-4600kv`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://shop.iflight.com/xing2-1404-toothpick-ultralight-build-unibell-pro1482 |
| **Notes** | Page lists 4600KV but gallery packshots are 3800KV-labelled; 4600KV OSS assets return 404. Re-confirmed. |

## Rank 141 — `iflight-xing2-1507-4600kv`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://shop.iflight.com/motor-cat341 |
| **Notes** | Legacy XING2 1507 product URL 404 on shop.iflight.com. Re-confirmed. |

## Rank 142 — `iflight-xing2-2203-2350kv`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://shop.iflight.com/motor-cat341 |
| **Notes** | Legacy XING2 2203 product URL 404 on shop.iflight.com. Re-confirmed. |

## Rank 143 — `iflight-xing2-2807-1280kv-lr`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Should consider replacement/removal later |
| **Official URL** | https://shop.iflight.com/motor-cat341 |
| **Notes** | Legacy XING2 2807 LR URL 404; closest iFlight LR motor is NIDICI 2807 1300KV. Re-confirmed. |

## Rank 144 — `newbee-0802-17500kv`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://www.newbeedrone.com/collections/motors |
| **Notes** | No NewBeeDrone 0802 17500KV product page; store lists 13000/14000/19000/25000/30000KV instead. Re-confirmed. |

## Rank 145 — `rcinpower-1404-3800kv`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.rcinpower.com/SmooX/48.html |
| **Notes** | SmooX 1404 Plus page is tall spec-sheet composite; GTS V3 1404 page embeds 1203 imagery. Re-confirmed. |

## Rank 146 — `rcinpower-2203-2300kv`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://www.rcinpower.com/G-SERIES/ |
| **Notes** | No RCinPower G-SERIES 2203 2300KV product page; GTS V2 2207 Plus exists instead. Re-confirmed. |

## Rank 147 — `rcinpower-2807-1350kv-lr`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://www.rcinpower.com/G-SERIES/ |
| **Notes** | No RCinPower 2807 1350KV LR product page on rcinpower.com. Re-confirmed. |

## Rank 148 — `tmotor-2807-1300kv-lr`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://store.tmotor.com/ |
| **Notes** | No T-Motor FPV 2807 1300KV LR motor product page on store.tmotor.com. Re-confirmed. |

## Rank 149 — `cnhl-6s-1800-lr-lipo`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Should consider replacement/removal later |
| **Official URL** | https://chinahobbyline.com/products/cnhl-ministar-series-1800mah-22-2v-6s-120c-lipo-battery-with-xt60-plug |
| **Notes** | Official CNHL Ministar 6S 1800mAh **120C** page and packshot exist; catalog LR LiPo line implies lower-C long-range SKU — 120C image rejected. Added to unsafe mismatch list. |

## Rank 150 — `betafpv-1404-4600kv`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Possible wrong catalog entry |
| **Official URL** | https://betafpv.com/products/1404-4500kv-brushless-motors |
| **Notes** | Closest official BETAFPV 1404 listing is 4500KV; packshot bell reads 4500KV, not catalog 4600KV. Re-confirmed in shifted queue. |

## Rank 151 — `brotherhobby-2004-2600kv`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Possible wrong catalog entry |
| **Official URL** | https://www.brotherhobby.com/goods-107.html |
| **Notes** | Legacy BrotherHobby 2004 URL serves Avenger 0804 content. Re-confirmed in shifted queue. |

## Rank 152 — `brotherhobby-2806-1400kv-lr`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Possible wrong catalog entry |
| **Official URL** | https://www.brotherhobby.com/goods-107.html |
| **Notes** | Official Avenger 2806.5 page packshot shows 1300KV, not catalog 2806 1400KV LR. Re-confirmed. |

## Rank 153 — `emax-e1106-7200kv`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://emaxmodel.com/collections/1106-motors |
| **Notes** | E1106 page lists 7200KV but manufacturer packshot bell reads 7500KV. Re-confirmed. |

## Rank 154 — `emax-eco-1404-4000kv`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Possible wrong catalog entry |
| **Official URL** | https://emaxmodel.com/products/emax-eco-micro-series-1404-3700kv-brushless-motor |
| **Notes** | Official EMAX ECO Micro 1404 is 3700KV only; no 4000KV SKU on manufacturer store. Re-confirmed. |

## Rank 155 — `iflight-xing-e-pro-2806-1300kv`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Should consider replacement/removal later |
| **Official URL** | https://shop.iflight.com/xing-2806-5-cinelifter-motor |
| **Notes** | Closest official SKU is XING 2806.5 Cinelifter; OSS asset labeled 1300KV shows 1500KV on bell. Re-confirmed. |

## Rank 156 — `radiomaster-er5-915-lr`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Possible wrong catalog entry |
| **Official URL** | https://www.radiomasterrc.com/products/bandit-br1-expresslrs-receiver |
| **Notes** | No Radiomaster ER5 915 SKU; ER5A/ER5C are 2.4GHz ELRS PWM. Closest 915MHz ELRS is Bandit BR1 — do not use BR1 packshot for ER5 catalog ID. |

## Rank 157 — `akk-a3-nano-vtx-park`

| Field | Value |
| --- | --- |
| **Image status** | Official source blocked |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.akktek.com/ |
| **Notes** | AKK official store (akktek.com) returns HTTP 403 to automated fetch; A3 Nano VTX product URLs blocked. |

## Rank 158 — `akk-a5-nano-vtx`

| Field | Value |
| --- | --- |
| **Image status** | Official source blocked |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.akktek.com/ |
| **Notes** | AKK official store (akktek.com) returns HTTP 403 to automated fetch; A5 Nano VTX product URLs blocked. |

## Rank 159 — `hdzero-cine-nano-vtx`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://www.hd-zero.com/shop |
| **Notes** | No HDZero Cine Nano VTX product page on hd-zero.com; shop lists Whoop Lite V2, Freestyle V2, and Race V3 lines instead. |

## Rank 160 — `rush-mini-tank-cine-vtx`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://rushfpv.net/collections/vtx |
| **Notes** | No RushFPV Mini Tank Cine VTX product listing on rushfpv.net; Tank Solo/Tiny/Ultimate Mini/III Ultimate/Race II lines only. |

## Rank 161 — `rush-nano-ultimate-whoop-vtx`

| Field | Value |
| --- | --- |
| **Image status** | Acceptable family/variant official packshot found |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://rushfpv.net/products/tank-ultimate-mini-vtx |
| **Preferred image URL** | https://rushfpv.net/cdn/shop/products/d60a4673-2782-4af7-9ac9-383088cf5367_1200x1200.jpg |
| **Notes** | Official RushFPV Tank Ultimate Mini VTX page; 25–500mW spec matches catalog. Catalog "Nano Ultimate Whoop" naming maps to Tank Ultimate Mini family line. |

## Rank 162 — `rush-nano-vtx-park`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Should consider replacement/removal later |
| **Official URL** | https://rushfpv.net/products/tank-tiny-vtx |
| **Notes** | Closest official listing is Tank Tiny VTX (800mW max); catalog Nano VTX Park specifies 25–400mW — power rating mismatch. |

## Rank 163 — `betafpv-pavo3516-frame`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://betafpv.com/collections/frames |
| **Notes** | No BETAFPV Pavo3516 frame or frame-kit product page; Pavo20/Pico/Femto whoops only. |

## Rank 164 — `diatone-taycan35-frame`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Discontinued but still common |
| **Official URL** | https://www.diatone.us/products/diatone-mxc-taycan-fpv-accessories |
| **Notes** | Diatone MXC Taycan accessories page only; no isolated 3.5-inch Taycan frame-kit listing. |

## Rank 165 — `flywoo-explorer35-cine-frame`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://flywoo.net/collections/frames |
| **Notes** | No Flywoo Explorer 3.5 Cine frame-kit product page on flywoo.net. |

## Rank 166 — `flywoo-explorer35-frame`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://flywoo.net/collections/frames |
| **Notes** | No Flywoo Explorer 3.5 frame-kit product page on flywoo.net. |

## Rank 167 — `flywoo-explorer7-lr-frame`

| Field | Value |
| --- | --- |
| **Image status** | Should remain SVG placeholder |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://flywoo.net/collections/frames |
| **Notes** | No Explorer 7 LR frame-kit; Explorer LR4 listings are complete aircraft, not isolated frame kits. |

## Rank 168 — `geprc-cinebee35-hd-frame`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://geprc.com/product-category/frame-kit/ |
| **Notes** | No GEPRC CineBee35 HD isolated frame-kit product page on geprc.com. |

## Rank 169 — `geprc-crocodile7-lr-frame`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://geprc.com/product-category/frame-kit/ |
| **Notes** | No GEPRC Crocodile7 LR frame product; Crocodile Baby 4 micro-LR drones only (wrong size). |

## Rank 170 — `geprc-rocket-3-5-frame`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://geprc.com/product-category/frame-kit/ |
| **Notes** | No GEPRC Rocket 3.5 frame-kit product page on geprc.com. |

## Rank 171 — `geprc-rocket-lite-75-frame`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://geprc.com/product-category/frame-kit/ |
| **Notes** | No GEPRC Rocket Lite 75 frame-kit product page on geprc.com. |

## Rank 172 — `hglrc-sector7-lr-frame`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Possible wrong catalog entry |
| **Official URL** | https://www.hglrc.com/collections/frames |
| **Notes** | No HGLRC Sector7 LR frame; Sector D5/X5 are 5-inch freestyle frames, not 7-inch LR. |

## Rank 173 — `iflight-chimera3-frame`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://shop.iflight.com/quad-parts-cat20/drone-frame-cat346 |
| **Notes** | Legacy iFlight Chimera3 3.5-inch frame-kit URL 404; current frame category lists Chimera7 kits only. |

## Rank 174 — `iflight-chimera35-cine-frame`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://shop.iflight.com/quad-parts-cat20/drone-frame-cat346 |
| **Notes** | Legacy iFlight Chimera35 Cine frame-kit URL 404 on shop.iflight.com. |

## Rank 175 — `iflight-cidatel35-cine-frame`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://shop.iflight.com/quad-parts-cat20/drone-frame-cat346 |
| **Notes** | Legacy iFlight Cidatel 3.5 Cine frame-kit URL 404 on shop.iflight.com. |

## Rank 176 — `iflight-chimera35-cine-frame`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://shop.iflight.com/quad-parts-cat20/drone-frame-cat346 |
| **Notes** | Legacy iFlight Chimera35 Cine frame-kit URL 404 on shop.iflight.com. Re-confirmed in shifted queue. |

## Rank 177 — `iflight-cidatel35-cine-frame`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://shop.iflight.com/quad-parts-cat20/drone-frame-cat346 |
| **Notes** | Legacy iFlight Cidatel 3.5 Cine frame-kit URL 404 on shop.iflight.com. Re-confirmed in shifted queue. |

## Rank 178 — `aikon-65a-lr-esc`

| Field | Value |
| --- | --- |
| **Image status** | Official source blocked |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://shop.aikon.com/ |
| **Notes** | Aikon official store (shop.aikon.com) unreachable from automated fetch; no verified 65A LR ESC product URL. |

## Rank 179 — `betafpv-brushless-1s-aio-esc`

| Field | Value |
| --- | --- |
| **Image status** | Should remain SVG placeholder |
| **Catalog status** | Should consider replacement/removal later |
| **Official URL** | https://betafpv.com/products/f4-1s-5a-aio-brushless-flight-controller |
| **Notes** | Official BETAFPV F4 1S 5A AIO is combined FC+ESC; catalog ESC-only half cannot use stack imagery. |

## Rank 180 — `diatone-mamba-f35-cine-esc`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://www.diatone.us/collections/esc |
| **Notes** | No Diatone Mamba F35 Cine ESC on diatone.us; F40 mini and F55 lines only. |

## Rank 181 — `diatone-mamba-f35-mini-esc`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Possible wrong catalog entry |
| **Official URL** | https://www.diatone.us/products/mb-f40_128k-bl32-mini-esc |
| **Notes** | No Mamba F35 Mini ESC; closest is Mamba F40_128K AM32 Mini 4-in-1 (40A, not 35A F35). |

## Rank 182 — `diatone-mamba-f55-lr-esc`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Discontinued but still common |
| **Official URL** | https://www.diatone.us/products/mamba-f55_bls-dshot600-4in1-esc-40a-6s-2 |
| **Notes** | Closest official SKU is Mamba F55_BLS 55A; no separate LR listing and Shopify image asset references F50_BLS. |

## Rank 183 — `geprc-gep35a-cine-esc`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://geprc.com/product-category/esc/ |
| **Notes** | No GEPRC GEP35A Cine ESC on geprc.com; Taker H/S ESC line only. |

## Rank 184 — `happymodel-happywhoop-aio-esc`

| Field | Value |
| --- | --- |
| **Image status** | Should remain SVG placeholder |
| **Catalog status** | Should consider replacement/removal later |
| **Official URL** | https://www.happymodel.cn/ |
| **Notes** | Happymodel sells combined Mobula7 AIO boards only; no isolated 5A ESC-half product page. |

## Rank 185 — `hglrc-tekko32-f35-mini`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://www.hglrc.com/collections/esc |
| **Notes** | No HGLRC Tekko32 F35 Mini product page on hglrc.com. |

## Rank 186 — `iflight-succexd35-cine-esc`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://shop.iflight.com/esc-cat343 |
| **Notes** | Legacy iFlight SucceX-D35 Cine ESC product URL 404 on shop.iflight.com. |

## Rank 187 — `meps-konvex-55a-lr-esc`

| Field | Value |
| --- | --- |
| **Image status** | Official source blocked |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.mepsking.com/ |
| **Notes** | MEPS Konvex 55A LR not on standalone product page; store API returns no listings. |

## Rank 188 — `tmotor-f35a-mini-4in1`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://store.tmotor.com/category/uav-esc-1.html |
| **Notes** | No T-Motor F35A Mini 4-in-1 ESC product page on store.tmotor.com. |

## Rank 189 — `tmotor-pacer-f35-cine-esc`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://store.tmotor.com/category/uav-esc-1.html |
| **Notes** | No T-Motor Pacer F35 Cine ESC product page on store.tmotor.com. |

## Rank 190 — `betafpv-f411-1s-aio-fc`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Possible wrong catalog entry |
| **Official URL** | https://betafpv.com/products/f4-1s-5a-aio-brushless-flight-controller |
| **Notes** | Official listing is F4 1S 5A combined AIO; catalog F411 FC-only line does not match manufacturer SKU. |

## Rank 191 — `diatone-mamba-f405-mini`

| Field | Value |
| --- | --- |
| **Image status** | Exact official packshot found |
| **Catalog status** | Current valid SKU |
| **Official URL** | https://www.diatone.us/products/mamba-mk4-f405mini-flight-control-20mm-m2 |
| **Preferred image URL** | https://cdn.shopify.com/s/files/1/0027/2708/4144/products/03_c983ba34-da59-4cb3-91c1-94e3868b767f.jpg?v=1677554263 |
| **Notes** | Official Diatone MAMBA MK4 F405MINI isolated flight controller page on diatone.us. |

## Rank 192 — `diatone-mamba-h743-lr-fc`

| Field | Value |
| --- | --- |
| **Image status** | Should remain SVG placeholder |
| **Catalog status** | Should consider replacement/removal later |
| **Official URL** | https://www.diatone.us/products/mb-mk4-h743-v2-fc |
| **Notes** | Official MK4 H743 V2 page is combined FC+ESC stack; catalog FC-only line cannot use stack packshot. |

## Rank 193 — `geprc-f405-20x20-mini`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Possible wrong catalog entry |
| **Official URL** | https://geprc.com/product/gep-f405-hd-v3-flight-controller/ |
| **Notes** | GEPRC store lists GEP-F405-HD V3 digital FC; catalog F405 20x20 Mini analog line does not match. |

## Rank 194 — `geprc-f722-cine-mini-fc`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://geprc.com/product/gep-f722-hd-flight-controller/ |
| **Notes** | GEPRC GEP-F722 HD line exists; no F722 Cine Mini FC product page. |

## Rank 195 — `geprc-f745-lr-fc`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Possible wrong catalog entry |
| **Official URL** | https://geprc.com/product/geprc-taker-h743-mini-flight-controller/ |
| **Notes** | No GEPRC F745 LR FC; closest is GEPRC TAKER H743 MINI (H743, not F745). |

## Rank 196 — `geprc-gep-aio-1s-fc`

| Field | Value |
| --- | --- |
| **Image status** | Should remain SVG placeholder |
| **Catalog status** | Should consider replacement/removal later |
| **Official URL** | https://geprc.com/product/gep-taker-f411-12a-e-12s-aio/ |
| **Notes** | Official GEP-TAKER F411-12A-E 1~2S AIO is combined board; catalog FC-only 1S line cannot use stack imagery. |

## Rank 197 — `happymodel-happywhoop-aio-fc`

| Field | Value |
| --- | --- |
| **Image status** | Should remain SVG placeholder |
| **Catalog status** | Should consider replacement/removal later |
| **Official URL** | https://www.happymodel.cn/ |
| **Notes** | Happymodel sells combined Mobula7 AIO boards only; no isolated FC-half product page. |

## Rank 198 — `iflight-beast-h743-cine-fc`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://shop.iflight.com/flight-controller-cat342 |
| **Notes** | No Beast H743 Cine FC on shop.iflight.com; BLITZ Wing H743 is a different wing FC line. |

## Rank 199 — `iflight-beast-h743-lr-fc`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://shop.iflight.com/flight-controller-cat342 |
| **Notes** | No Beast H743 LR FC on shop.iflight.com; BLITZ Wing H743 is a different wing FC line. |

## Rank 200 — `matek-f722-cine-mini-fc`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://www.mateksys.com/?portfolio=f722-mini |
| **Notes** | Matek F722-mini portfolio is EOL spec-sheet composite only; no F722 Cine Mini FC SKU. |

## Summary (ranks 151–199)

| Metric | Count |
| --- | ---: |
| Parts researched | 49 |
| Exact official packshot found | 0 |
| Acceptable family/variant packshot found | 0 |
| New fetchable after source update | 0 |
| Permanent SVG placeholders (this batch) | 49 |

**Note:** Requested ranks 201–250 are not present in the current queue (199 missing parts total after coverage recovery). This pass covers **current queue ranks 151–199**, which align with the former 201–249 tail after rank shifts from fetched images (`rush-nano-ultimate-whoop-vtx`, `diatone-mamba-f405-mini`).

### Re-confirmed under current queue order (no new fetchable)

Ranks **151–161** — motors, VTX, receiver (`brotherhobby-2004-2600kv` through `rush-nano-vtx-park`): classifications unchanged from prior passes; see entries above for `betafpv-1404-4600kv` (150) and ranks 151–162 in earlier sections (part IDs unchanged, queue ranks shifted).

Ranks **164–176** — frames (`betafpv-pavo3516-frame` through `iflight-cidatel35-cine-frame`): re-confirmed; no isolated official frame-kit packshots.

Ranks **178–199** — ESC/FC electronics (`aikon-65a-lr-esc` through `iflight-beast-h743-lr-fc`): source entries and rules from ranks 176–200 pass re-confirmed; no new `preferredImageUrl` candidates.

## Rank 162 — `newbee-drone-75-pro-frame`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Possible wrong catalog entry |
| **Official URL** | https://www.newbeedrone.com/products/newbeedrone-75mm-cockroach75-brushless-extreme-durable-frame |
| **Notes** | No NewBeeDrone Drone 75 Pro frame SKU; closest official listing is 75mm Cockroach75 extreme-durable frame (isolated frame packshot exists but product name does not match catalog). |

## Rank 163 — `tbs-source-one7-lr-frame`

| Field | Value |
| --- | --- |
| **Image status** | Official page found but no usable packshot |
| **Catalog status** | Likely outdated/deprecated |
| **Official URL** | https://github.com/tbs-trappy/source_one |
| **Notes** | No TBS Source One 7 open-source repository (`SourceOne7` 404); official `source_one` repo is 5-inch Source One only — same limitation as Source One V5/V6 GitHub OG cards. |

## Rank 177 — `matek-h743-wing-lr-fc`

| Field | Value |
| --- | --- |
| **Image status** | Mismatch risk |
| **Catalog status** | Possible wrong catalog entry |
| **Official URL** | https://www.mateksys.com/?portfolio=h743-wlite |
| **Notes** | Closest Matek SKU is EOL H743-WLITE wing FC (ICM42688, spec-sheet style gallery); catalog H743 Wing LR specifies BMI270 — gyro mismatch; do not substitute WLITE packshot. |
