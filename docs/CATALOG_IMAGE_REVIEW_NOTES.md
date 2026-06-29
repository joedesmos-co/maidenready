# Catalog image review notes

Structured research log for image-completion queue parts where official packshots are missing, blocked, mismatched, or where the catalog SKU may need future review.

**Rules applied:** official manufacturer pages only; no retailer images; no fetch/download during research passes.

**Last updated:** 2026-06-29 — queue ranks **51–100** (`docs/IMAGE_COMPLETION_QUEUE.md`).

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
