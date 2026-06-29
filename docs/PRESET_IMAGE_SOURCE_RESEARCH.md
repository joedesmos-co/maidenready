# Preset Part Image Source Research

Research checklist for all **48** preset parts in `PRESET_PART_IMAGE_TODO`.

> **Disclaimer:** This document lists official manufacturer product pages for reference only. It does **not** approve image rights for use in MaidenReady. All preset parts remain `imageNeedsReview: true` until verified licensed local JPG assets exist.

Structured data: [`src/data/presetPartImageSources.js`](../src/data/presetPartImageSources.js)

## Catalog realism cleanup (2026-06-27)

Preset parts with missing or low-confidence official pages were renamed or replaced with verified manufacturer products. Unique preset part count is now **48** (M03 VTX shared across two whoop presets).

## Targeted official-source image pass (2026-06-29)

Coverage **76 → 80** catalog images; preset parts **33 → 37/48**.

**Newly fetched (official source, `imageNeedsReview: true`):**

| Part ID | Source |
| --- | --- |
| `betafpv-2s-450-xt30` | BETAFPV Shopify CDN product photo |
| `cnhl-black-6s-1300` | CNHL official gallery (single-pack style) |
| `matek-h743-mini-lr` | Matek `H743-MINI_2.jpg` isolated board |
| `dji-o3-air-unit`, `dji-o3-camera` | DJI store CDN (`djiits.com` cover assets) |
| `happymodel-ep2-elrs` | Happymodel `wp-content/uploads/2022/11/5.jpg` |
| `aos-3-5-v5` | AOS Wix frame CAD render |
| `brotherhobby-avenger-2806-5-1300` | BrotherHobby official product CDN |

**5-inch RX/VTX additions (same review status):** FrSky R-XSR, FrSky XSR SBUS, TBS Crossfire Micro V2/LR, Happymodel EP1 Dual / EP2 5-inch / Cine EP2.

**Still missing — no clean official packshot (do not substitute):**

- `gnb-4s-1500` — no exact 1500mAh manufacturer SKU page
- `skystars-km55a-4in1` — official page TLS-blocked; CDN URL not yet verified
- SpeedyBee stack parts (`speedybee-bl32-50a`, `speedybee-bls-35a-4in1`, `speedybee-f405-mini`, `speedybee-f405-v4`) — stack-only imagery
- `geprc-cinelog35-v2`, `rekon7-pro-lr`, `tbs-source-one-v5` — full drone / GitHub OG only
- `iflight-xing-2005-2550` — no isolated 2005 motor packshot on official page
- `foxeer-reaper-nano-v2-vtx` — prior manual reject (wrong product type in official gallery)

## Summary

| Metric | Count |
| --- | ---: |
| Total preset parts | 48 |
| Official URL found | 48 |
| URL confidence: high | 46 |
| URL confidence: low | 2 |
| Image status (all) | needs review |

## Frame

| Part ID | Name | Brand | Official URL | URL confidence | Image status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `aos-3-5-v5` | AOS 3.5 V5 | AOS | [link](https://www.aos-rc.com/designs/aos-3.5-v5) | high | needs review | Official AOS RC design page; Wix hero render is an isolated frame CAD packshot. |
| `betafpv-meteor75-pro-frame` | BETAFPV Meteor75 Pro Whoop Frame | BETAFPV | [link](https://betafpv.com/products/meteor75-pro-brushless-whoop-frame) | high | needs review | Official Meteor75 Pro whoop frame product page. |
| `betafpv-pavo25-frame` | BETAFPV Pavo25 Frame | BETAFPV | [link](https://betafpv.com/products/pavo25-frame-kit) | high | needs review | Official Pavo25 frame kit page. |
| `geprc-cinelog35-v2` | GEPRC Cinelog35 V2 | GEPRC | [link](https://geprc.com/product/geprc-cinelog35-v2-hd-o3-fpv-drone/) | high | needs review | Official full-drone listing; frame-only SKU not clearly separated. |
| `rekon7-pro-lr` | Rekon7 Pro Long Range | RekonFPV | [link](https://rekonfpv.com/products/rekon7-pro-long-range-fpv-racing-drone-6s-digital-version) | high | needs review | Official complete drone page for Rekon7 Pro long range. |
| `tbs-source-one-v5` | TBS Source One V5 5-inch | TBS | [link](https://github.com/tbs-trappy/source_one) | high | needs review | Official open-source Source One project repo (V5 files). |

## Motors

| Part ID | Name | Brand | Official URL | URL confidence | Image status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `betafpv-0802se-19500kv` | BETAFPV 0802SE 19500KV | BETAFPV | [link](https://betafpv.com/products/0802se-22000kv-brushless-motors) | high | needs review | Official BETAFPV 0802SE motor page; 19500KV is a listed variant. |
| `betafpv-1102-18000kv` | BETAFPV 1102 18000KV | BETAFPV | [link](https://betafpv.com/products/1102-13500kv-brushless-motors) | high | needs review | Renamed from 11500KV to match official BETAFPV 1102 motor listing (18000KV variant). |
| `brotherhobby-avenger-2806-5-1300` | BrotherHobby Avenger 2806.5 1300KV | BrotherHobby | [link](https://brotherhobby.com/avenger-28065-motor-p00132p1.html) | high | needs review | Official Avenger 2806.5 motor family page; KV variants share one URL. |
| `iflight-xing-2005-2550` | iFlight XING 2005 2550KV | iFlight | [link](https://shop.iflight.com/xing-2005-4-6s-fpv-motor-unibell-pro1381) | low | needs review | Official page lists 2550KV but lacks isolated 2005 motor packshot. |
| `iflight-xing2-1404-3800` | iFlight XING2 1404 3800KV | iFlight | [link](https://shop.iflight.com/xing2-1404-toothpick-ultralight-build-unibell-pro1482) | high | needs review | Official iFlight XING2 1404 motor page with 3800KV option. |
| `iflight-xing2-2207-1855` | iFlight XING2 2207 1855KV | iFlight | [link](https://shop.iflight.com/XING2-2207-4S-6S-FPV-Motor-Unibell-Black-for-Nazgul-Evoque-F5-pro1610) | high | needs review | Official iFlight XING2 2207 motor page; 1855KV is a selectable variant. |

## ESC

| Part ID | Name | Brand | Official URL | URL confidence | Image status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `betafpv-1s-5a-aio-esc` | BETAFPV 1S 5A AIO ESC | BETAFPV | [link](https://betafpv.com/products/f4-1s-5a-aio-brushless-flight-controller-elrs-2-4g) | high | needs review | 5A ESC integrated into F4 1S 5A AIO FC; not sold standalone. |
| `geprc-gep-f411-35a-aio-esc` | GEPRC GEP-F411-35A AIO ESC | GEPRC | [link](https://geprc.com/product/gep-f411-35a-aio-f411-fc-35a-2-6s-8bits-bls-esc-25-5mm/) | high | needs review | Official GEP-F411-35A combined AIO; ESC/FC catalog entries represent the same board. |
| `skystars-km55a-4in1` | Skystars KM55A 4-in-1 | Skystars | [link](https://skystars-rc.com/product/skystars-am32-km55a-32bit-3-6s-20x20-4in1-esc/) | high | needs review | Official Skystars KM55A 4-in-1 ESC product page. |
| `speedybee-bl32-50a` | SpeedyBee BL32 50A 4-in-1 | SpeedyBee | [link](https://www.speedybee.com/speedybee-f7-v3-bl32-50a-30x30-stack/) | high | needs review | Official SpeedyBee F7 V3 + BL32 50A ESC stack page. |
| `speedybee-bls-35a-4in1` | SpeedyBee BLS 35A 4-in-1 | SpeedyBee | [link](https://www.speedybee.com/speedybee-f405-mini-bls-35a-20x20-stack/) | high | needs review | Renamed from Mini BL32 35A; official SpeedyBee F405 Mini + BLS 35A stack page. |

## Flight Controller

| Part ID | Name | Brand | Official URL | URL confidence | Image status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `betafpv-f4-1s-aio-fc` | BETAFPV F4 1S AIO FC | BETAFPV | [link](https://betafpv.com/products/f4-1s-aio-brushless-flight-controller) | high | needs review | Official F4 1S AIO brushless flight controller product page. |
| `geprc-gep-f411-35a-aio-fc` | GEPRC GEP-F411-35A AIO FC | GEPRC | [link](https://geprc.com/product/gep-f411-35a-aio-f411-fc-35a-2-6s-8bits-bls-esc-25-5mm/) | high | needs review | Official GEP-F411-35A combined AIO; ESC/FC catalog entries represent the same board. |
| `matek-h743-mini-lr` | Matek H743 Mini LR | Matek | [link](https://www.mateksys.com/?portfolio=h743-mini) | high | needs review | Official Matek H743-MINI portfolio page. |
| `speedybee-f405-mini` | SpeedyBee F405 Mini | SpeedyBee | [link](https://www.speedybee.com/speedybee-f405-mini-bls-35a-20x20-stack/) | high | needs review | Official F405 Mini + BLS 35A 20x20 stack page. |
| `speedybee-f405-v4` | SpeedyBee F405 V4 | SpeedyBee | [link](https://www.speedybee.com/speedybee-f405-v4-bls-55a-30x30-fc-esc-stack/) | high | needs review | Official F405 V4 stack page. |

## Props

| Part ID | Name | Brand | Official URL | URL confidence | Image status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `gemfan-35mm-3blade-whoop` | Gemfan 35mm 3-Blade Whoop | Gemfan | [link](https://www.gemfanhobby.com/35mm-pc-3-blade.html) | high | needs review | Official Gemfan 35mm 3-blade whoop prop page. |
| `gemfan-40mm-4blade-whoop` | Gemfan 40mm 4-Blade Whoop | Gemfan | [link](https://www.gemfanhobby.com/40mm-1613-pc-4-blade.html) | high | needs review | Official Gemfan 40mm 4-blade whoop prop page. |
| `gemfan-51466` | Gemfan Hurricane 51466 | Gemfan | [link](https://www.gemfanhobby.com/51466-hurricane-pc-3-blade.html) | high | needs review | Replaced DAL Cyclone T5046C; official Gemfan Hurricane 51466 page. |
| `gemfan-hurricane-3520` | Gemfan Hurricane 3520 | Gemfan | [link](https://www.gemfanhobby.com/3520-hurricane-pc-3-blade-t-mount.html) | high | needs review | Official Gemfan Hurricane 3520 3-blade prop page. |
| `hqprop-7x3-5x3` | HQProp 7x3.5x3 | HQProp | [link](https://www.hqprop.com/hq-durable-prop-7x35x3v1s-2cw2ccw-poly-carbonate-p0132.html) | high | needs review | Official HQProp 7x3.5x3 prop page. |
| `hqprop-duct-t90-3` | HQProp Duct T90 3-Blade | HQProp | [link](https://hqprop.com/hqprop-duct-t90mmx3-for-cinewhoop-grey-2cw2ccw-poly-carbonate-p0351.html) | high | needs review | Renamed from Duct-T90 3.5x2.8x5 to match official HQProp Duct T90 3-blade page. |

## Battery

| Part ID | Name | Brand | Official URL | URL confidence | Image status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `betafpv-2s-450-xt30` | BETAFPV 450mAh 2S 45C XT30 | BETAFPV | [link](https://betafpv.com/products/450mah-2s-45c-lipo-battery-2pcs) | high | needs review | Replaced Happymodel-branded pack; official BETAFPV 450mAh 2S 45C XT30 page. |
| `cnhl-black-6s-1300` | CNHL Black Series 6S 1300mAh 100C | CNHL | [link](https://chinahobbyline.com/products/2-packs-cnhl-black-series-v2-0-1300mah-22-2v-6s-130c-lipo-battery-with-xt60-plug) | high | needs review | Official CNHL store Black Series V2.0 6S 1300mAh listing. |
| `gnb-4s-1500` | GNB 4S 1500mAh 120C | GNB | [link](https://www.gaoneng.shop/products/gaoneng-gnb-4s-14-8v-1850mah-100c-xt60-lipo-battery) | low | needs review | Replaced gnb-4s-1500-cine duplicate; no exact 1500mAh page on gaoneng.shop — closest official GNB 4S listing is 1850mAh. |
| `tattu-1s-450-hv` | Tattu 1S 450mAh HV 75C | Tattu | [link](https://genstattu.com/tattu-450mah-3.8v-high-voltage-75c-1s1p-lipo-battery-pack-with-bt-2.0-plug-5pcs/) | high | needs review | Official Tattu/Grepow 1S 450mAh HV BT2.0 page. |
| `tattu-rline-4s-850` | Tattu R-Line 4S 850mAh 95C | Tattu | [link](https://genstattu.com/tattu-r-line-850mah-14-8v-95c-4s1p-lipo-battery-pack-with-xt30-plug.html) | high | needs review | Official Tattu R-Line 4S 850mAh page. |
| `tattu-rline-6s-2200` | Tattu R-Line 6S 2200mAh 95C | Tattu | [link](https://genstattu.com/tattu-2200mah-6s-95c-22-2v-r-line-lipo-battery-with-xt60-plug-for-7-quad/) | high | needs review | Replaced Molicel custom Li-ion pack; official Tattu R-Line 6S 2200mAh for 7-inch page. |

## Receiver

| Part ID | Name | Brand | Official URL | URL confidence | Image status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `betafpv-elrs-nano` | BETAFPV ELRS Lite 2.4GHz | BETAFPV | [link](https://betafpv.com/products/elrs-nano-receiver) | high | needs review | Replaced Super Nano naming; official BETAFPV ELRS Nano Receiver page. |
| `happymodel-ep2-elrs` | Happymodel EP2 ELRS | Happymodel | [link](https://www.happymodel.cn/index.php/2022/11/07/2-4g-elrs-ep1-ep2-ep1dual-tcxo-receiver/) | high | needs review | Official Happymodel EP2 ELRS receiver product page. |
| `radiomaster-er6-elrs` | RadioMaster ER6 2.4GHz ELRS | RadioMaster | [link](https://radiomasterrc.com/products/er6-2-4ghz-elrs-pwm-receiver) | high | needs review | Official RadioMaster ER6 ELRS receiver product page. |
| `radiomaster-rp1-elrs` | RadioMaster RP1 ELRS Nano | RadioMaster | [link](https://radiomasterrc.com/products/rp1-expresslrs-2-4ghz-nano-receiver) | high | needs review | Official RadioMaster RP1 V2 ELRS nano receiver page. |
| `tbs-crossfire-nano` | TBS Crossfire Nano RX | TBS | [link](https://www.team-blacksheep.com/products/prod:crossfire_nano_rx) | high | needs review | Official Team BlackSheep Crossfire Nano RX store page. |

## Camera

| Part ID | Name | Brand | Official URL | URL confidence | Image status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `caddx-ant-nano` | Caddx Ant Nano | Caddx | [link](https://www.caddxfpv.com/products/caddx-ant-analog-camera) | high | needs review | Official Caddx Ant analog camera page. |
| `dji-o3-camera` | DJI O3 Camera | DJI | [link](https://store.dji.com/sg/product/dji-o3-air-unit-camera-module) | high | needs review | Official DJI store O3 camera module page. |
| `runcam-nano-4-whoop` | RunCam Nano 4 Whoop | RunCam | [link](https://shop.runcam.com/runcam-nano-4-ntsc-only/) | high | needs review | Official RunCam store Nano 4 whoop camera page. |
| `runcam-phoenix-2` | RunCam Phoenix 2 | RunCam | [link](https://shop.runcam.com/runcam-phoenix-2/) | high | needs review | Official RunCam store Phoenix 2 camera page. |

## VTX

| Part ID | Name | Brand | Official URL | URL confidence | Image status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `betafpv-m03-vtx` | BETAFPV M03 5.8GHz VTX | BETAFPV | [link](https://betafpv.com/products/m03-25-350mw-5-8g-vtx) | high | needs review | Replaced fictitious N03 VTX; official BETAFPV M03 5.8GHz analog VTX page. |
| `dji-o3-air-unit` | DJI O3 Air Unit | DJI | [link](https://store.dji.com/product/dji-o3-air-unit) | high | needs review | Official DJI store O3 Air Unit kit page. |
| `foxeer-reaper-nano-v2-vtx` | Foxeer Reaper Nano V2 VTX | Foxeer | [link](https://www.foxeer.com/foxeer-reaper-nano-v2-vtx-5-8g-72ch-350mw-tramp-g-583) | high | needs review | Renamed from Reaper Nano V1 to match official Foxeer Reaper Nano V2 page. |
| `rush-tank-solo` | Rush Tank Solo 5.8GHz | RushFPV | [link](https://rushfpv.net/products/tank-solo-vtx) | high | needs review | Official RushFPV Tank Solo VTX product page. |
| `tbs-unify-pro32-hv` | TBS Unify Pro32 HV | TBS | [link](https://www.team-blacksheep.com/products/prod:unifypro32_hv) | high | needs review | Official Team BlackSheep Unify Pro32 HV VTX store page. |

## Low-confidence matches (verify SKU)

- **`brotherhobby-avenger-2806-5-1300`** — Official Avenger 2806.5 motor family page; KV variants share one URL.
- **`gnb-4s-1500`** — Replaced gnb-4s-1500-cine duplicate; no exact 1500mAh page on gaoneng.shop — closest official GNB 4S listing is 1850mAh.
