# Image completion queue

Ranked workflow for missing catalog JPGs. Generated from `scripts/generateImageCompletionQueue.js`.

Generated: 2026-06-29T20:47:10.841Z

## Baseline coverage

| Metric | Count |
| --- | ---: |
| Total catalog parts | 294 |
| Found under public/ | 93 |
| Missing | 201 |
| Preset parts found | 38/48 |

## Classification summary

| Classification | Count |
| --- | ---: |
| Fetchable now | 1 |
| Needs better official URL | 72 |
| Official source blocked | 23 |
| No clean packshot found | 52 |
| Should remain SVG placeholder | 24 |
| Unsafe — likely mismatch | 29 |

**Should remain SVG placeholder (incl. unsafe / no packshot):** 105

## Queue tiers

| Tier | Scope | Missing |
| ---: | --- | ---: |
| 1 | Preset parts (remaining) | 10 |
| 2 | 5-inch freestyle catalog | 79 |
| 3 | Multi build-class catalog | 0 |
| 4 | Easy-match: props, batteries, cameras, motors | 66 |
| 5 | Receivers / VTX | 7 |
| 6 | Frames | 15 |
| 7 | Electronics: FC / ESC / stack / AIO | 24 |

## Fetchable now

- **Rush Nano Ultimate Whoop VTX** (`rush-nano-ultimate-whoop-vtx`) — /parts/vtx/rush-nano-ultimate-whoop.jpg
  - URL: https://rushfpv.net/cdn/shop/products/d60a4673-2782-4af7-9ac9-383088cf5367_1200x1200.jpg
  - Script: `images:fetch-receiver-vtx`

## Top 20 manual research targets

_High-value missing parts that need a better official direct packshot URL._

1. **Aikon AK32 50A 4-in-1** (`aikon-ak32-50a-4in1`) — tier 2, esc
   - Official: https://shop.aikon.com/products/ak32-50a-4-in-1-esc-v3
   - Official product page exists but no verified direct packshot URL is on file yet.

2. **HGLRC Tekko32 F55 Mini 55A 4-in-1** (`hglrc-tekko32-f55-mini-esc`) — tier 2, esc
   - Official: https://www.hglrc.com/products/hglrc-tekko32-f55-mini-55a-4in1-esc
   - Official product page exists but no verified direct packshot URL is on file yet.

3. **Hobbywing XRotor 60A 4-in-1** (`hobbywing-xrotor-60a`) — tier 2, esc
   - Official: https://www.hobbywing.com/en/products/xrotor-g2-60a-4in1-esc
   - Official product page exists but no verified direct packshot URL is on file yet.

4. **Hobbywing XRotor G2 50A 4-in-1** (`hobbywing-xrotor-g2-50a`) — tier 2, esc
   - Official: https://www.hobbywing.com/en/products/xrotor-g2-50a-4in1-esc
   - Official product page exists but no verified direct packshot URL is on file yet.

5. **T-Motor F55A Pro II 4-in-1** (`tmotor-f55a-pro-ii`) — tier 2, esc
   - Official: https://store.tmotor.com/product/f55a-pro-ii-4in1-esc.html
   - Official product page exists but no verified direct packshot URL is on file yet.

6. **T-Motor Velox 45A 4-in-1** (`tmotor-velox45a-4in1`) — tier 2, esc
   - Official: https://store.tmotor.com/product/velox-45a-4in1-esc.html
   - Official product page exists but no verified direct packshot URL is on file yet.

7. **AtomRC F405 FC** (`atomrc-f405-fc`) — tier 2, flightController
   - Official: https://www.atomrc.com/atomrc-f405-fc-p00136p1.html
   - Official product page exists but no verified direct packshot URL is on file yet.

8. **AxisFlying H743 Mini** (`axisflying-h743-mini`) — tier 2, flightController
   - Official: https://www.axisflying.com/products/axisflying-h743-mini-fc
   - Official product page exists but no verified direct packshot URL is on file yet.

9. **Diatone Mamba F722 MK4** (`diatone-mamba-f722`) — tier 2, flightController
   - Official: https://www.diatone.us/products/mamba-mk4-f722-app-flight-controller
   - Official product page exists but no verified direct packshot URL is on file yet.

10. **HGLRC F722 Silver FC** (`hglrc-f722-silver-fc`) — tier 2, flightController
   - Official: https://www.hglrc.com/products/hglrc-f722-silver-flight-controller
   - Official product page exists but no verified direct packshot URL is on file yet.

11. **iFlight Beast F722 FC** (`iflight-beast-f722-fc`) — tier 2, flightController
   - Official: https://shop.iflight.com/Beast-F722-Flight-Controller-Pro1430
   - Official product page exists but no verified direct packshot URL is on file yet.

## Full ranked queue

### 1. GNB 4S 1500mAh 120C (`gnb-4s-1500`)

- **Tier:** 1 — Preset parts (remaining)
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Battery (`battery`)
- **Preset part:** yes
- **Image path:** `public/parts/batteries/gnb-4s-1500.jpg`
- **Official URL:** https://www.gaoneng.shop/products/gaoneng-gnb-4s-14-8v-1850mah-100c-xt60-lipo-battery
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No exact 1500mAh official GNB/Gaoneng product page.

### 2. iFlight XING 2005 2550KV (`iflight-xing-2005-2550`)

- **Tier:** 1 — Preset parts (remaining)
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Motors (`motors`)
- **Preset part:** yes
- **Image path:** `public/parts/motors/iflight-xing-2005-2550.jpg`
- **Official URL:** https://shop.iflight.com/xing-2005-4-6s-fpv-motor-unibell-pro1381
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Official page lacks isolated 2005 motor packshot.

### 3. SpeedyBee BL32 50A 4-in-1 (`speedybee-bl32-50a`)

- **Tier:** 1 — Preset parts (remaining)
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** ESC (`esc`)
- **Preset part:** yes
- **Image path:** `public/parts/escs/speedybee-bl32-50a.jpg`
- **Official URL:** https://www.speedybee.com/speedybee-f7-v3-bl32-50a-30x30-stack/
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Manufacturer page is a combined FC+ESC stack; catalog line is FC-only or ESC-only.

### 4. SpeedyBee BLS 35A 4-in-1 (`speedybee-bls-35a-4in1`)

- **Tier:** 1 — Preset parts (remaining)
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** ESC (`esc`)
- **Preset part:** yes
- **Image path:** `public/parts/escs/speedybee-bls-35a-4in1.jpg`
- **Official URL:** https://www.speedybee.com/speedybee-f405-mini-bls-35a-20x20-stack/
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Manufacturer page is a combined FC+ESC stack; catalog line is FC-only or ESC-only.

### 5. SpeedyBee F405 Mini (`speedybee-f405-mini`)

- **Tier:** 1 — Preset parts (remaining)
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** yes
- **Image path:** `public/parts/flight-controllers/speedybee-f405-mini.jpg`
- **Official URL:** https://www.speedybee.com/speedybee-f405-mini-bls-35a-20x20-stack/
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Manufacturer page is a combined FC+ESC stack; catalog line is FC-only or ESC-only.

### 6. SpeedyBee F405 V4 (`speedybee-f405-v4`)

- **Tier:** 1 — Preset parts (remaining)
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** yes
- **Image path:** `public/parts/flight-controllers/speedybee-f405-v4.jpg`
- **Official URL:** https://www.speedybee.com/speedybee-f405-v4-bls-55a-30x30-fc-esc-stack/
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Manufacturer page is a combined FC+ESC stack; catalog line is FC-only or ESC-only.

### 7. GEPRC Cinelog35 V2 (`geprc-cinelog35-v2`)

- **Tier:** 1 — Preset parts (remaining)
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Frame (`frame`)
- **Preset part:** yes
- **Image path:** `public/parts/frames/geprc-cinelog35-v2.jpg`
- **Official URL:** https://geprc.com/product/geprc-cinelog35-v2-hd-o3-fpv-drone/
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official listing is a complete aircraft, not an isolated frame-kit packshot.

### 8. Rekon7 Pro Long Range (`rekon7-pro-lr`)

- **Tier:** 1 — Preset parts (remaining)
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Frame (`frame`)
- **Preset part:** yes
- **Image path:** `public/parts/frames/rekon7-pro-lr.jpg`
- **Official URL:** https://rekonfpv.com/products/rekon7-pro-long-range-fpv-racing-drone-6s-digital-version
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official listing is a complete aircraft, not an isolated frame-kit packshot.

### 9. TBS Source One V5 5-inch (`tbs-source-one-v5`)

- **Tier:** 1 — Preset parts (remaining)
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Frame (`frame`)
- **Preset part:** yes
- **Image path:** `public/parts/frames/tbs-source-one-v5.jpg`
- **Official URL:** https://github.com/tbs-trappy/source_one
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official listing is a complete aircraft, not an isolated frame-kit packshot.

### 10. Foxeer Reaper Nano V2 VTX (`foxeer-reaper-nano-v2-vtx`)

- **Tier:** 1 — Preset parts (remaining)
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** VTX (`vtx`)
- **Preset part:** yes
- **Image path:** `public/parts/vtx/foxeer-reaper-nano-v2-vtx.jpg`
- **Official URL:** https://www.foxeer.com/foxeer-reaper-nano-v2-vtx-5-8g-72ch-350mw-tramp-g-583
- **Preferred image URL:** https://inew.foxeer.com//upload/s/goods/2024-12-13/15-48-28-675be6ccb8c74.images.800x800.png
- **URL confidence:** high
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 11. Aikon AK32 50A 4-in-1 (`aikon-ak32-50a-4in1`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/aikon-ak32-50a-4in1.jpg`
- **Official URL:** https://shop.aikon.com/products/ak32-50a-4-in-1-esc-v3
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 12. HGLRC Tekko32 F55 Mini 55A 4-in-1 (`hglrc-tekko32-f55-mini-esc`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/hglrc-tekko32-f55-mini-esc.jpg`
- **Official URL:** https://www.hglrc.com/products/hglrc-tekko32-f55-mini-55a-4in1-esc
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 13. Hobbywing XRotor 60A 4-in-1 (`hobbywing-xrotor-60a`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/hobbywing-xrotor-60a.jpg`
- **Official URL:** https://www.hobbywing.com/en/products/xrotor-g2-60a-4in1-esc
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 14. Hobbywing XRotor G2 50A 4-in-1 (`hobbywing-xrotor-g2-50a`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/hobbywing-xrotor-g2-50a.jpg`
- **Official URL:** https://www.hobbywing.com/en/products/xrotor-g2-50a-4in1-esc
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 15. T-Motor F55A Pro II 4-in-1 (`tmotor-f55a-pro-ii`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/tmotor-f55a-pro-ii.jpg`
- **Official URL:** https://store.tmotor.com/product/f55a-pro-ii-4in1-esc.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 16. T-Motor Velox 45A 4-in-1 (`tmotor-velox45a-4in1`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/tmotor-velox45a-4in1.jpg`
- **Official URL:** https://store.tmotor.com/product/velox-45a-4in1-esc.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 17. AtomRC F405 FC (`atomrc-f405-fc`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/atomrc-f405-fc.jpg`
- **Official URL:** https://www.atomrc.com/atomrc-f405-fc-p00136p1.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 18. AxisFlying H743 Mini (`axisflying-h743-mini`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/axisflying-h743-mini.jpg`
- **Official URL:** https://www.axisflying.com/products/axisflying-h743-mini-fc
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 19. Diatone Mamba F722 MK4 (`diatone-mamba-f722`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/diatone-mamba-f722.jpg`
- **Official URL:** https://www.diatone.us/products/mamba-mk4-f722-app-flight-controller
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 20. HGLRC F722 Silver FC (`hglrc-f722-silver-fc`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/hglrc-f722-silver-fc.jpg`
- **Official URL:** https://www.hglrc.com/products/hglrc-f722-silver-flight-controller
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 21. iFlight Beast F722 FC (`iflight-beast-f722-fc`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/iflight-beast-f722-fc.jpg`
- **Official URL:** https://shop.iflight.com/Beast-F722-Flight-Controller-Pro1430
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 22. GNB 6S 1300mAh HV 120C (`gnb-6s-1300-hv`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/gnb-6s-1300-hv.jpg`
- **Official URL:** https://www.genstattu.com/gnb-6s-1300mah-120c-hv-lipo-battery-pack-with-xt60-plug.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Genstattu/GNB product page 404 or blocks automated fetch.

### 23. GNB 6S 1400mAh 120C (`gnb-6s-1400-freestyle`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/gnb-6s-1400-freestyle.jpg`
- **Official URL:** https://www.genstattu.com/gnb-6s-1400mah-120c-lipo-battery-pack-with-xt60-plug.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Genstattu/GNB product page 404 or blocks automated fetch.

### 24. Ethix Lithium5 Frame (`ethix-lithium5-frame`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/ethix-lithium5.jpg`
- **Official URL:** https://ethixrc.com/product/lithium-5-frame-kit/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Ethix official store intermittently unreachable.

### 25. Skystars KM2207 1910KV (`skystars-km2207-1910kv`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/skystars-km2207-1910kv.jpg`
- **Official URL:** https://skystars-rc.com/products/skystars-km2207-1910kv-motor
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Skystars store unreachable from automated fetch.

### 26. Skystars KM2306 1950KV (`skystars-km2306-1950kv`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/skystars-km2306-1950kv.jpg`
- **Official URL:** https://skystars-rc.com/products/skystars-km2306-1950kv-motor
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Skystars store unreachable from automated fetch.

### 27. T-Motor F40 Pro V 2207 1950KV (`tmotor-f40-pro-2207-1950kv`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/tmotor-f40-pro-2207-1950kv.jpg`
- **Official URL:** https://store.tmotor.com/product/f40pro-5-fpv-motor.html
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** T-Motor store blocks automated fetch.

### 28. T-Motor F60 Pro V 2207 1950KV (`tmotor-f60-pro-v-1950`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/tmotor-f60-pro-v.jpg`
- **Official URL:** https://store.tmotor.com/product/f60prov-fpv-motor.html
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** T-Motor store blocks automated fetch.

### 29. T-Motor Velox V3 2207 1750KV (`tmotor-velox-v3-1750`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/tmotor-velox-v3.jpg`
- **Official URL:** https://store.tmotor.com/product/v2207-v3-kv1750-fpv-motor.html
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** T-Motor store blocks automated fetch.

### 30. T-Motor Velox V3 2207 1950KV (`tmotor-velox-v3-2207-1950kv`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/tmotor-velox-v3-2207-1950kv.jpg`
- **Official URL:** https://store.tmotor.com/product/v2207-v3-kv1750-fpv-motor.html
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** T-Motor store blocks automated fetch.

### 31. Azure Power 5148 (`azure-5148`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/azure-5148.jpg`
- **Official URL:** https://www.azurepower.net/azure-power-5148-propeller-p00138p1.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Azure Power site unreachable from automated fetch.

### 32. Azure Power Vanover 5140 (`azure-vanover-5140`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/azure-vanover-5140.jpg`
- **Official URL:** https://www.azurepower.net/azure-power-vanover-5140-propeller-p00139p1.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Azure Power site unreachable from automated fetch.

### 33. DAL Cyclone T5046C (`dalprop-cyclone-5046`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/dalprop-cyclone-5046.jpg`
- **Official URL:** https://www.dalprop.com/dal-cyclone-t5046c-propeller-p00140p1.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** DAL prop site unreachable from automated fetch.

### 34. DAL Fold F5 5040 (`dalprop-fold-f5-5040`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/dalprop-fold-f5-5040.jpg`
- **Official URL:** https://www.dalprop.com/dal-fold-f5-5040-propeller-p00141p1.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** DAL prop site unreachable from automated fetch.

### 35. AKK X2 Ultimate VTX (`akk-x2-ultimate-vtx`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** VTX (`vtx`)
- **Preset part:** no
- **Image path:** `public/parts/vtx/akk-x2-ultimate-vtx.jpg`
- **Official URL:** https://www.akktek.com/akk-x2-ultimate-vtx.html
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** AKK official store blocks automated fetch.

### 36. Rush Tank II 5.8GHz VTX (`rush-tank-ii-vtx`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** VTX (`vtx`)
- **Preset part:** no
- **Image path:** `public/parts/vtx/rush-tank-ii-vtx.jpg`
- **Official URL:** https://www.rushfpv.com/rush-tank-ii-5-8ghz-vtx-g-591
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** RushFPV Tank II product page unreachable from automated fetch.

### 37. CNHL 4S 1500mAh 100C (`cnhl-4s-1500-freestyle`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/cnhl-4s-1500-freestyle.jpg`
- **Official URL:** https://chinahobbyline.com/products/cnhl-black-series-1500mah-14-8v-4s-100c-lipo-battery-with-xt60-plug
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Only multi-pack CNHL listing on official store.

### 38. Lumenier N2O 6S 1100mAh 120C (`lumenier-6s-1100`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/lumenier-n2o-6s-1100.jpg`
- **Official URL:** https://www.lumenier.com/products/lumenier-n2o-6s-1100mah-120c-lipo-battery
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Lumenier N2O 6S 1100mAh product page 404 on official store.

### 39. Lumenier N2O 6S 1250mAh 120C (`lumenier-6s-1250-freestyle`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/lumenier-6s-1250-freestyle.jpg`
- **Official URL:** https://www.lumenier.com/products/lumenier-n2o-6s-1250mah-120c-lipo-battery
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Lumenier N2O 6S 1250mAh product page 404 on official store.

### 40. Ovonic 4S 1400mAh 100C (`ovonic-4s-1400-freestyle`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/ovonic-4s-1400-freestyle.jpg`
- **Official URL:** https://ovonicshop.com/products/ovonic-4s-1400mah-100c-lipo-battery-pack-with-xt60-plug
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** No exact Ovonic 4S 1400mAh listing on official store.

### 41. Tattu 4S 1300mAh 95C (`tattu-4s-1300-freestyle`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/tattu-4s-1300-freestyle.jpg`
- **Official URL:** https://www.genstattu.com/tattu-4s-1300mah-14-8v-95c-lipo-battery-pack-with-xt60-plug.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Genstattu Tattu 4S 1300mAh product page 404.

### 42. Tattu 4S 1550mAh 95C (`tattu-4s-1550`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/tattu-4s-1550.jpg`
- **Official URL:** https://www.genstattu.com/tattu-4s-1550mah-14-8v-95c-lipo-battery-pack-with-xt60-plug.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Genstattu Tattu 4S 1550mAh product page 404.

### 43. Tattu R-Line 6S 1550mAh 130C (`tattu-rline-6s-1550`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/tattu-rline-6s-1550.jpg`
- **Official URL:** https://www.genstattu.com/tattu-r-line-1550mah-22-2v-6s-130c-lipo-battery-pack-with-xt60-plug.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Genstattu Tattu R-Line 6S 1550mAh product page 404.

### 44. Walksnail Avatar Micro (`walksnail-avatar-micro`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Camera (`camera`)
- **Preset part:** no
- **Image path:** `public/parts/cameras/walksnail-avatar-micro.jpg`
- **Official URL:** https://www.caddxfpv.com/products/walksnail-avatar-camera-v2
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Avatar V2 page does not expose Micro SKU packshot.

### 45. Matek F722 Mini (`matek-f722-mini`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/matek-f722-mini.jpg`
- **Official URL:** https://www.mateksys.com/?portfolio=f722-mini
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Matek portfolio only exposes spec-sheet composite.

### 46. Matek F722-STD FC (`matek-f722-std-fc`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/matek-f722-std-fc.jpg`
- **Official URL:** https://www.mateksys.com/?portfolio=f722-std
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Matek portfolio only exposes spec-sheet composite.

### 47. AOS 5 V5 (`aos-5-v5`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/aos-5-v5.jpg`
- **Official URL:** https://www.aos-rc.com/designs/aos-5-v5
- **Preferred image URL:** https://static.wixstatic.com/media/e57211_5a539ff67e794c83aa16d962133b02f6~mv2.png/v1/fill/w_1920,h_1200,al_c/AOS%205%20V5.774.png
- **URL confidence:** high
- **Reason:** Official AOS design page has lifestyle hero, not isolated frame packshot.

### 48. HGLRC Zeus5 Frame (`hglrc-zeus5-frame`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/hglrc-zeus5-frame.jpg`
- **Official URL:** https://www.hglrc.com/products/hglrc-sector-x5-fr-5-inch-freestyle-fpv-frame
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No Zeus5 frame SKU; substitute listing is different frame.

### 49. ImpulseRC ApexDC 5-inch (`impulserc-apexdc`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/impulserc-apexdc.jpg`
- **Official URL:** https://apex-docs.impulserc.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** ImpulseRC closed; no product photo source.

### 50. ImpulseRC Reverb 5 Frame (`impulserc-reverb5-frame`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/impulserc-reverb5-frame.jpg`
- **Official URL:** https://impulserc.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** ImpulseRC closed; no product photo source.

### 51. HQProp T3x2.5x3 515 (`hqprop-t3x2-5x3-515`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/hqprop-t3x2-5x3-515.jpg`
- **Official URL:** https://www.hqprop.com/hqprop-t3x2-5x3-515-p00147p1.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** HQProp T3x2.5x3 515 product page 404 on official store.

### 52. ImmersionRC Fusion V2 ELRS (`imm-rc-fusion-v2-elrs`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Receiver (`receiver`)
- **Preset part:** no
- **Image path:** `public/parts/receivers/imm-rc-fusion-v2-elrs.jpg`
- **Official URL:** https://www.immersionrc.com/fusion/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** ImmersionRC page is not a verified V2 ELRS packshot.

### 53. JHEMCU EP28 2.4GHz ELRS (`jhemcu-ep28-elrs`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Receiver (`receiver`)
- **Preset part:** no
- **Image path:** `public/parts/receivers/jhemcu-ep28-elrs.jpg`
- **Official URL:** https://www.jhemcu.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** JHEMCU store homepage only; no stable EP28 product URL.

### 54. Aikon F7 Mini 35A 4-in-1 (`aikon-f7-mini-35a`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/aikon-f7-mini-35a.jpg`
- **Official URL:** https://shop.aikon.com/products/f7-mini-35a-4-in-1-esc-v3
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Manufacturer page is a combined FC+ESC stack; catalog line is FC-only or ESC-only.

### 55. iFlight SucceX-E F4 50A 4-in-1 (`iflight-succex-e-f4-50a`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/iflight-succex-e-f4-50a.jpg`
- **Official URL:** https://shop.iflight.com/SucceX-E-F4-50A-4-in-1-ESC-Pro1420
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Manufacturer page is a combined FC+ESC stack; catalog line is FC-only or ESC-only.

### 56. MEPS Konvex F55 55A 4-in-1 (`meps-konvex-f55-55a-4in1`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/meps-konvex-f55-55a-4in1.jpg`
- **Official URL:** https://www.mepsking.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** MEPS Konvex F55 not on standalone product page; official MEPS manufacturer store homepage.

### 57. MEPS Konvex G2 50A 4-in-1 (`meps-konvex-g2-50a`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/meps-konvex-g2-50a.jpg`
- **Official URL:** https://www.mepsking.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** MEPS Konvex G2 not on standalone product page; official MEPS manufacturer store homepage.

### 58. Rush Blade F7 60A 4-in-1 (`rush-blade-f7-60a-4in1`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/rush-blade-f7-60a-4in1.jpg`
- **Official URL:** https://www.rushfpv.com/rush-blade-f7-60a-4in1-esc-g-585
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Manufacturer page is a combined FC+ESC stack; catalog line is FC-only or ESC-only.

### 59. SpeedyBee BL32 55A 4-in-1 (`speedybee-bl32-55a-4in1`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/speedybee-bl32-55a-4in1.jpg`
- **Official URL:** https://www.speedybee.com/speedybee-f405-v4-bls-55a-30x30-fc-esc-stack/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Manufacturer page is a combined FC+ESC stack; catalog line is FC-only or ESC-only.

### 60. Diatone Mamba F722 S FC (`diatone-mamba-f722-s-fc`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/diatone-mamba-f722-s-fc.jpg`
- **Official URL:** https://www.diatone.us/products/mb-mk4-f722-app-fc
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Manufacturer page is a combined FC+ESC stack; catalog line is FC-only or ESC-only.

### 61. JHEMCU G743 Pro FC (`jhemcu-g743-pro-fc`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/jhemcu-g743-pro-fc.jpg`
- **Official URL:** https://www.jhemcu.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Official JHEMCU store homepage; G743 Pro FC has no stable direct product URL.

### 62. Matek H743 Slate Freestyle (`matek-h743-slate-freestyle`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/matek-h743-slate-freestyle.jpg`
- **Official URL:** https://www.mateksys.com/?portfolio=h743-slim-v4
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No H743 Slate SKU on Matek; H743-SLIM-V4 is closest official H743 freestyle board.

### 63. SpeedyBee F7 V3 FC (`speedybee-f7-v3-fc`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/speedybee-f7-v3-fc.jpg`
- **Official URL:** https://www.speedybee.com/speedybee-f7-v3-bl32-50a-30x30-stack/
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Manufacturer page is a combined FC+ESC stack; catalog line is FC-only or ESC-only.

### 64. Flywoo Explorer 5 Frame (`flywoo-explorer5-frame`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/flywoo-explorer5-frame.jpg`
- **Official URL:** https://flywoo.net/products/explorer-lr4-o3-5-long-range-freestyle-frame
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Official Flywoo Explorer long-range 5-inch frame family page; closest manufacturer listing.

### 65. iFlight Nazgul Eco5 Frame (`iflight-nazgul-eco5-frame`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/iflight-nazgul-eco5.jpg`
- **Official URL:** https://shop.iflight.com/Nazgul-XL5-ECO-6S-Pro2193
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Official listing is a complete aircraft, not an isolated frame-kit packshot.

### 66. iFlight XL5 V6 5-inch (`iflight-xl5-v6`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/iflight-xl5-v6.jpg`
- **Official URL:** https://shop.iflight.com/replacement-parts-for-xl5-v5-frame-pro1303
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** XL5 V6 frame discontinued; manufacturer replacement-parts page covers XL5/Nazgul5 V3 frame family.

### 67. TBS Source One V6 Frame (`tbs-source-one-v6-frame`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/tbs-source-one-v6-frame.jpg`
- **Official URL:** https://github.com/tbs-trappy/source_one
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official listing is a complete aircraft, not an isolated frame-kit packshot.

### 68. AxisFlying AE 2207 1960KV (`axisflying-ae2207-1960`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/axisflying-ae2207.jpg`
- **Official URL:** https://www.axisflying.com/products/axisflying-ae-series-2207-motor
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Official AxisFlying AE 2207 motor family page; 1960KV is a listed variant.

### 69. AxisFlying Joker 2207 1920KV (`axisflying-joker-2207-1920kv`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/axisflying-joker-2207-1920kv.jpg`
- **Official URL:** https://www.axisflying.com/products/axisflying-joker-2207-motor
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Official AxisFlying Joker 2207 motor family page; 1920KV is a listed variant.

### 70. Samguk Series V 2207 1960KV (`samguk-v-2207-1960kv`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/samguk-v-2207-1960kv.jpg`
- **Official URL:** https://www.samgukmotors.com/samguk-series-v-2207-motor-p00130p1.html
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Official Samguk Series V 2207 motor family page on manufacturer store.

### 71. CNHL Black Series 6S 1500mAh 100C (`cnhl-6s-1500-freestyle`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/cnhl-6s-1500-freestyle.jpg`
- **Official URL:** https://chinahobbyline.com/products/cnhl-black-series-1500mah-22-2v-6s-100c-lipo-battery-with-xt60-plug
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 72. Foxeer Falkor 2 (`foxeer-falkor-2`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Camera (`camera`)
- **Preset part:** no
- **Image path:** `public/parts/cameras/foxeer-falkor-2.jpg`
- **Official URL:** https://www.foxeer.com/foxeer-falkor-2-fpv-camera-g-588
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 73. Foxeer Predator V5 (`foxeer-predator-v5`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Camera (`camera`)
- **Preset part:** no
- **Image path:** `public/parts/cameras/foxeer-predator-v5.jpg`
- **Official URL:** https://www.foxeer.com/foxeer-predator-v5-fpv-camera-g-589
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 74. Foxeer Toothless 2 (`foxeer-toothless-2`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Camera (`camera`)
- **Preset part:** no
- **Image path:** `public/parts/cameras/foxeer-toothless-2.jpg`
- **Official URL:** https://www.foxeer.com/foxeer-toothless-2-fpv-camera-g-590
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 75. Foxeer Reaper F4 65A 4-in-1 (`foxeer-reaper-f4-65a`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/foxeer-reaper-f4-65a.jpg`
- **Official URL:** https://www.foxeer.com/foxeer-reaper-f4-65a-4in1-esc-g-584
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 76. Foxeer F722 V4 (`foxeer-f722-v4`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/foxeer-f722-v4.jpg`
- **Official URL:** https://www.foxeer.com/foxeer-f722-v4-flight-controller-g-586
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 77. Foxeer H743 F722 FC (`foxeer-h743-f722-fc`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/foxeer-h743-f722-fc.jpg`
- **Official URL:** https://www.foxeer.com/foxeer-h743-f722-flight-controller-g-587
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 78. Armattan Badger 5 Frame (`armattan-badger5-frame`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/armattan-badger5-frame.jpg`
- **Official URL:** https://armattanquads.com/products/badger-1
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 79. GEPRC Mark4 Frame (`geprc-mark4-frame`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/geprc-mark4-frame.jpg`
- **Official URL:** https://geprc.com/product/gep-mark4-frame/
- **Preferred image URL:** https://geprc.com/wp-content/uploads/2019/06/03-2845615995-1200x1200.jpg
- **URL confidence:** high
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 80. Lumenier QAV-S JohnnyFPV SE (`lumenier-qav-s-johnnyfpv`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/qav-s-johnnyfpv-se.jpg`
- **Official URL:** https://www.lumenier.com/products/lumenier-qav-s-2-johnnyfpv-se-5-frame-kit
- **Preferred image URL:** https://cdn.shopify.com/s/files/1/0698/9525/8342/files/lumenier-qav-s-2-johnnyfpv-se-5inch-frame-kit-_1.jpg?v=1734560533
- **URL confidence:** high
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 81. FPVCycle 2207 1780KV (`fpvcycle-2207-1780kv`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/fpvcycle-2207-1780kv.jpg`
- **Official URL:** https://fpvcycle.com/products/fpvcycle-5-motor-choose-options
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 82. FPVCycle Motor 2207 1960KV (`fpvcycle-2207-1960`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/fpvcycle-2207.jpg`
- **Official URL:** https://fpvcycle.com/products/fpvcycle-5-motor-choose-options
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 83. Hypetrain Acer 2306 1950KV (`hypetrain-acer-2306-1950kv`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/hypetrain-acer-2306-1950kv.jpg`
- **Official URL:** https://rotorriot.com/products/hypetrain-revo-5-2207-1860kv-motor
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 84. Hypetrain Blaster 2207 2450KV (`hypetrain-blaster-2450`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/hypetrain-blaster-2207.jpg`
- **Official URL:** https://rotorriot.com/products/hypetrain-blaster-2207-2450kv-motor
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 85. JohnnyFPV V2 2207 1960KV (`johnnyfpv-motor-v2-2207-1960kv`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/johnnyfpv-motor-v2-2207.jpg`
- **Official URL:** https://www.lumenier.com/products/lumenier-2307-johnnyfpv-v3-pro-cinematic-motor
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 86. Lumenier AX 2207 1800KV (`lumenier-2207-1800kv`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/lumenier-2207-1800kv.jpg`
- **Official URL:** https://www.lumenier.com/collections/motors
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 87. HQProp Ethix P3 5x3x3 (`ethix-p3-peanut-butter`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/ethix-p3-peanut-butter.jpg`
- **Official URL:** https://hqprop.com/ethix-p3-peanut-butter-jelly-prop-2cw2ccw-poly-carbonate-p0276.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 88. HQProp Ethix S3 5x5x3 (`ethix-s3-5050`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/ethix-s3-5050.jpg`
- **Official URL:** https://www.hqprop.com/search/?Keyword=ethix+s3
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 89. Gemfan Hurricane MCK 51433 (`gemfan-hurricane-mck-51433`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/gemfan-hurricane-mck-51433.jpg`
- **Official URL:** https://www.gemfanhobby.com/hurricane-51466-v2-pc-3-blade.html
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 90. Lumenier 6S 2200mAh LR LiPo (`lumenier-6s-2200-lr-lipo`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/lumenier-6s-2200-lr-lipo.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 91. Molicel 6S 4000mAh Li-ion (`molicel-6s-4000-liion`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/molicel-6s-4000-liion.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 92. Ovonic 6S 3000mAh LR LiPo (`ovonic-6s-3000-lr-lipo`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/ovonic-6s-3000-lr-lipo.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 93. Sanyo 6S 3500mAh Li-ion (`sanyo-6s-3500-liion`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/sanyo-6s-3500-liion.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 94. Tattu 1S 300mAh HV 75C (`tattu-1s-300-hv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/tattu-1s-300-hv.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 95. Tattu 4S 1300mAh 95C Cine (`tattu-4s-1300-cine`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/tattu-4s-1300-cine.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 96. Tattu 6S 2800mAh LR LiPo (`tattu-6s-2800-lr-lipo`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/tattu-6s-2800-lr-lipo.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 97. Tattu R-Line 4S 650mAh 95C (`tattu-rline-4s-650`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/tattu-rline-4s-650.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 98. Caddx ProView Cine Digital (`caddx-proview-cine-digital`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Camera (`camera`)
- **Preset part:** no
- **Image path:** `public/parts/cameras/caddx-proview-cine-digital.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 99. Caddx Ratel Lucky Whoop (`caddx-ratel-lucky-whoop`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Camera (`camera`)
- **Preset part:** no
- **Image path:** `public/parts/cameras/caddx-ratel-lucky-whoop.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 100. Foxeer Pico R Whoop (`foxeer-pico-r-whoop`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Camera (`camera`)
- **Preset part:** no
- **Image path:** `public/parts/cameras/foxeer-pico-r-whoop.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 101. T-Motor F1404 3800KV (`tmotor-f1404-3800kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/tmotor-f1404-3800kv.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 102. T-Motor MN2004 2550KV (`tmotor-mn2004-2550kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/tmotor-mn2004-2550kv.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 103. APC 7x4x2 LR (`apc-7x4-2-lr`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/apc-7x4-2-lr.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 104. EMAX Avan 3.5x4.0 Cinewhoop D5 (`avan-3540-cine-d5`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/avan-3540-cine-d5.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 105. EMAX Avan Rush 3.5x2.8 (`avan-rush-3528`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/avan-rush-3528.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 106. BETAFPV 40mm 4-Blade 1.5x3.5 (`betafpv-40mm-4blade-1535`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/betafpv-40mm-1535.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 107. DAL 3.5x4.35 Cinewhoop D5 (`dal-35435-cine-d5`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/dal-35435-cine-d5.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 108. DAL Prop 3.5x3.0 Cyclone (`dal-prop-3530-cyclone`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/dal-prop-3530-cyclone.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 109. EMAX Avan 40mm Whoop (`emax-avan-40mm-whoop`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/emax-avan-40mm-whoop.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 110. Gemfan 31mm 4-Blade Whoop (`gemfan-31mm-4blade-whoop`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/gemfan-31mm-whoop.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 111. Gemfan Hurricane 3.5x2.2 (`gemfan-3522-hurricane`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/gemfan-3522-hurricane.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 112. Gemfan 3.5x2.8 Cinewhoop D5 (`gemfan-3528-cine-d5`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/gemfan-3528-cine-d5.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 113. Gemfan 3.5x2.8 Freestyle (`gemfan-3528-freestyle`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/gemfan-3528-freestyle.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 114. Gemfan 7x3.5x2 LR (`gemfan-7035-2-lr`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/gemfan-7035-2-lr.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 115. Gemfan 7x3.6x3 LR (`gemfan-7036-3-lr`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/gemfan-7036-3-lr.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 116. Gemfan FloppyPop3 3.5x1.8 (`gemfan-floppypop3-3518`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/gemfan-floppypop3-3518.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 117. GEPRC 7x3.8x2 LR (`geprc-7038-2-lr`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/geprc-7038-2-lr.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 118. HQProp 3.5x2.5x3 PC (`hqprop-3525-pc`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/hqprop-3525-pc.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 119. HQProp 3.5x3.5x3 PC (`hqprop-3535-pc`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/hqprop-3535-pc.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 120. HQProp 3.5x3.6 Cinewhoop D5 (`hqprop-3536-cine-d5`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/hqprop-3536-cine-d5.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 121. HQProp 7x3.0x3 LR (`hqprop-7030-3-lr`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/hqprop-7030-3-lr.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 122. HQProp 7x3.5x2 LR (`hqprop-7035-2-lr`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/hqprop-7035-2-lr.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 123. HQProp Durable 3.5x3.0 Cine (`hqprop-durable-3530-cine`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/hqprop-durable-3530-cine.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 124. HQProp T65x30 Whoop (`hqprop-t65x30-whoop`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/hqprop-t65x30-whoop.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 125. GNB 1S 550mAh HV BT2.0 (`gn-1s-550-bt2`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/gnb-1s-550-bt2.jpg`
- **Official URL:** https://www.gaoneng.shop/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** GNB/Gaoneng official store blocks automated fetch; no verified 1S 550mAh BT2.0 URL.

### 126. GNB 4S 1100mAh 120C Park (`gnb-4s-1100-park`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/gnb-4s-1100-park.jpg`
- **Official URL:** https://www.gaoneng.shop/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** GNB/Gaoneng store blocks fetch; Genstattu 4S 1100mAh page 404.

### 127. GNB 4S 1300mAh 120C Cine (`gnb-4s-1300-cine`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/gnb-4s-1300-cine.jpg`
- **Official URL:** https://www.gaoneng.shop/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** GNB/Gaoneng store blocks fetch; Genstattu 4S 1300mAh page 404.

### 128. GNB 4S 750mAh 120C Mini (`gnb-4s-750-mini`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/gnb-4s-750-mini.jpg`
- **Official URL:** https://www.gaoneng.shop/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** GNB/Gaoneng store blocks fetch; Genstattu 4S 750mAh page 404.

### 129. GNB 6S 2500mAh LR LiPo (`gnb-6s-2500-lr-lipo`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/gnb-6s-2500-lr-lipo.jpg`
- **Official URL:** https://www.gaoneng.shop/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** GNB/Gaoneng store blocks fetch; Genstattu 6S 2500mAh page 404.

### 130. BETAFPV 2S 300mAh PH2.0 (`betafpv-2s-300-ph2`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/betafpv-2s-300-ph2.jpg`
- **Official URL:** https://betafpv.com/products/300mah-2s-lipo-battery-2pcs
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Official BETAFPV 300mAh 2S is 45C XT30; catalog line is 75C PH2.0.

### 131. CNHL Ministar 4S 900mAh 100C (`cnhl-ministar-4s-900`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/cnhl-ministar-4s-900.jpg`
- **Official URL:** https://chinahobbyline.com/products/cnhl-ministar-series-850mah-14-8v-4s-70c-lipo-battery-with-xt60-plug
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No CNHL Ministar 4S 900mAh listing; official 900mAh is 2S only; closest 4S is 850mAh.

### 132. iFlight 4S 1800mAh 120C Cine (`iflight-4s-1800-cine`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/iflight-4s-1800-cine.jpg`
- **Official URL:** https://shop.iflight.com/batteries-cat342
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No iFlight 4S 1800mAh 120C battery on official store.

### 133. AxisFlying 2808 1150KV LR (`axisflying-2808-1150kv-lr`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/axisflying-2808-1150kv-lr.jpg`
- **Official URL:** https://www.axisflying.com/collections/motors
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No AxisFlying 2808 1150KV LR product page on axisflying.com.

### 134. BrotherHobby 1507 3700KV (`brotherhobby-1507-3700kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/brotherhobby-1507-3700kv.jpg`
- **Official URL:** https://brotherhobby.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No BrotherHobby 1507 3700KV product listing on brotherhobby.com.

### 135. EMAX ECO 2004 2550KV (`emax-eco-2004-2550kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/emax-eco-2004-2550kv.jpg`
- **Official URL:** https://emax-usa.com/products/eco-ii-2004-brushless-motor
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Official EMAX ECO II 2004 page lists 1700/2200/2400KV only; no 2550KV SKU.

### 136. EMAX ECO II 2806 1280KV (`emax-eco-ii-2806-1280kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/emax-eco-ii-2806-1280kv.jpg`
- **Official URL:** https://emax-usa.com/products/eco-ii-2807-long-range-brushless-motor
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Closest EMAX LR motor is ECO II 2807 1280KV; no verified 2806 packshot URL.

### 137. GEPRC 0901 11000KV (`geprc-0901-11000kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/geprc-0901-11000kv.jpg`
- **Official URL:** https://geprc.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No GEPRC 0901 11000KV motor product page on geprc.com.

### 138. GEPRC 2005 2200KV (`geprc-2005-2200kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/geprc-2005-2200kv.jpg`
- **Official URL:** https://geprc.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No GEPRC 2005 2200KV motor product page on geprc.com.

### 139. Happymodel Cine 2004 2400KV (`happymodel-cine-2004-2400kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/happymodel-cine-2004-2400kv.jpg`
- **Official URL:** https://www.happymodel.cn/index.php/category/product/motor/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No Happymodel Cine 2004 2400KV standalone motor product page.

### 140. iFlight XING2 1404 4600KV (`iflight-xing2-1404-4600kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/iflight-xing2-1404-4600kv.jpg`
- **Official URL:** https://shop.iflight.com/xing2-1404-toothpick-ultralight-build-unibell-pro1482
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** XING2 1404 page lists 4600KV but gallery packshots are 3800KV-labelled only.

### 141. iFlight XING2 1507 4600KV (`iflight-xing2-1507-4600kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/iflight-xing2-1507-4600kv.jpg`
- **Official URL:** https://shop.iflight.com/motor-cat341
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Legacy XING2 1507 product URL 404 on shop.iflight.com.

### 142. iFlight XING2 2203 2350KV (`iflight-xing2-2203-2350kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/iflight-xing2-2203-2350kv.jpg`
- **Official URL:** https://shop.iflight.com/motor-cat341
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Legacy XING2 2203 product URL 404 on shop.iflight.com.

### 143. iFlight XING2 2807 1280KV LR (`iflight-xing2-2807-1280kv-lr`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/iflight-xing2-2807-1280kv-lr.jpg`
- **Official URL:** https://shop.iflight.com/motor-cat341
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Legacy XING2 2807 LR product URL 404; no 1280KV packshot on iFlight store.

### 144. NewBeeDrone 0802 17500KV (`newbee-0802-17500kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/newbee-0802-17500kv.jpg`
- **Official URL:** https://www.newbeedrone.com/collections/motors
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No NewBeeDrone 0802 17500KV product page on newbeedrone.com.

### 145. RCinPower 1404 3800KV (`rcinpower-1404-3800kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/rcinpower-1404-3800kv.jpg`
- **Official URL:** https://www.rcinpower.com/SmooX/48.html
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** SmooX 1404 page is spec-sheet composite; GTS V3 1404 page uses 1203 imagery.

### 146. RCinPower 2203 2300KV (`rcinpower-2203-2300kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/rcinpower-2203-2300kv.jpg`
- **Official URL:** https://www.rcinpower.com/G-SERIES/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No RCinPower G-SERIES 2203 2300KV product page on rcinpower.com.

### 147. RCinPower 2807 1350KV LR (`rcinpower-2807-1350kv-lr`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/rcinpower-2807-1350kv-lr.jpg`
- **Official URL:** https://www.rcinpower.com/G-SERIES/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No RCinPower 2807 1350KV LR product page on rcinpower.com.

### 148. T-Motor 2807 1300KV LR (`tmotor-2807-1300kv-lr`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/tmotor-2807-1300kv-lr.jpg`
- **Official URL:** https://store.tmotor.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No T-Motor FPV 2807 1300KV LR motor product page on store.tmotor.com.

### 149. CNHL 6S 1800mAh LR LiPo (`cnhl-6s-1800-lr-lipo`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/cnhl-6s-1800-lr-lipo.jpg`
- **Official URL:** https://chinahobbyline.com/products/cnhl-ministar-series-1800mah-22-2v-6s-120c-lipo-battery-with-xt60-plug
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 150. BETAFPV 1404 4600KV (`betafpv-1404-4600kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/betafpv-1404-4600kv.jpg`
- **Official URL:** https://betafpv.com/products/1404-4500kv-brushless-motors
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 151. BrotherHobby 2004 2600KV (`brotherhobby-2004-2600kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/brotherhobby-2004-2600kv.jpg`
- **Official URL:** https://brotherhobby.com/2004-motor-p00129p1.html
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 152. BrotherHobby 2806 1400KV LR (`brotherhobby-2806-1400kv-lr`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/brotherhobby-2806-1400kv-lr.jpg`
- **Official URL:** https://brotherhobby.com/avenger-28065-motor-p00132p1.html
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 153. EMAX E1106 7200KV (`emax-e1106-7200kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/emax-e1106-7200kv.jpg`
- **Official URL:** https://emax-usa.com/products/emax-rs1106-micro-brushless-motor-1-pcs
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 154. EMAX ECO 1404 4000KV (`emax-eco-1404-4000kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/emax-eco-1404-4000kv.jpg`
- **Official URL:** https://emax-usa.com/products/eco-micro-1404-brushless-motor
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 155. iFlight XING-E Pro 2806 1300KV (`iflight-xing-e-pro-2806-1300kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/iflight-xing-e-pro-2806-1300kv.jpg`
- **Official URL:** https://shop.iflight.com/xing-x2806-5-fpv-nextgen-motor-pro1001
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 156. Rush Nano Ultimate Whoop VTX (`rush-nano-ultimate-whoop-vtx`)

- **Tier:** 5 — Receivers / VTX
- **Classification:** Fetchable now (`fetchable_now`)
- **Category:** VTX (`vtx`)
- **Preset part:** no
- **Image path:** `public/parts/vtx/rush-nano-ultimate-whoop.jpg`
- **Official URL:** https://rushfpv.net/products/tank-ultimate-mini-vtx
- **Preferred image URL:** https://rushfpv.net/cdn/shop/products/d60a4673-2782-4af7-9ac9-383088cf5367_1200x1200.jpg
- **URL confidence:** high
- **Reason:** Verified manufacturer preferredImageUrl with high URL confidence.

### 157. AKK A3 Nano VTX Park (`akk-a3-nano-vtx-park`)

- **Tier:** 5 — Receivers / VTX
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** VTX (`vtx`)
- **Preset part:** no
- **Image path:** `public/parts/vtx/akk-a3-nano-vtx-park.jpg`
- **Official URL:** https://www.akktek.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** AKK official store (akktek.com) blocks automated fetch.

### 158. AKK A5 Nano VTX (`akk-a5-nano-vtx`)

- **Tier:** 5 — Receivers / VTX
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** VTX (`vtx`)
- **Preset part:** no
- **Image path:** `public/parts/vtx/akk-a5-nano-vtx.jpg`
- **Official URL:** https://www.akktek.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** AKK official store (akktek.com) blocks automated fetch.

### 159. HDZero Cine Nano VTX (`hdzero-cine-nano-vtx`)

- **Tier:** 5 — Receivers / VTX
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** VTX (`vtx`)
- **Preset part:** no
- **Image path:** `public/parts/vtx/hdzero-cine-nano-vtx.jpg`
- **Official URL:** https://www.hd-zero.com/shop
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No HDZero Cine Nano VTX product page on hd-zero.com shop.

### 160. RushFPV Mini Tank Cine VTX (`rush-mini-tank-cine-vtx`)

- **Tier:** 5 — Receivers / VTX
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** VTX (`vtx`)
- **Preset part:** no
- **Image path:** `public/parts/vtx/rush-mini-tank-cine-vtx.jpg`
- **Official URL:** https://rushfpv.net/collections/vtx
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No RushFPV Mini Tank Cine VTX product page on rushfpv.net.

### 161. Radiomaster ER5 915 LR (`radiomaster-er5-915-lr`)

- **Tier:** 5 — Receivers / VTX
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Receiver (`receiver`)
- **Preset part:** no
- **Image path:** `public/parts/receivers/radiomaster-er5-915-lr.jpg`
- **Official URL:** https://www.radiomasterrc.com/products/bandit-br1-expresslrs-receiver
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 162. RushFPV Nano VTX Park (`rush-nano-vtx-park`)

- **Tier:** 5 — Receivers / VTX
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** VTX (`vtx`)
- **Preset part:** no
- **Image path:** `public/parts/vtx/rush-nano-vtx-park.jpg`
- **Official URL:** https://rushfpv.net/products/tank-tiny-vtx
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 163. NewBeeDrone 75 Pro Frame (`newbee-drone-75-pro-frame`)

- **Tier:** 6 — Frames
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/newbee-drone-75-pro.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 164. TBS Source One 7 LR Frame (`tbs-source-one7-lr-frame`)

- **Tier:** 6 — Frames
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/tbs-source-one7-lr.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 165. BETAFPV Pavo3516 Frame (`betafpv-pavo3516-frame`)

- **Tier:** 6 — Frames
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/betafpv-pavo3516.jpg`
- **Official URL:** https://betafpv.com/collections/frames
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No BETAFPV Pavo3516 frame or kit listing on betafpv.com.

### 166. Diatone Taycan 3.5 Frame (`diatone-taycan35-frame`)

- **Tier:** 6 — Frames
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/diatone-taycan35.jpg`
- **Official URL:** https://www.diatone.us/products/diatone-mxc-taycan-fpv-accessories
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Diatone store has Taycan accessories only; no 3.5-inch frame kit page.

### 167. Flywoo Explorer 3.5 Cine Frame (`flywoo-explorer35-cine-frame`)

- **Tier:** 6 — Frames
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/flywoo-explorer35-cine.jpg`
- **Official URL:** https://flywoo.net/collections/frames
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No Flywoo Explorer 3.5 Cine frame kit on flywoo.net.

### 168. Flywoo Explorer 3.5 Frame (`flywoo-explorer35-frame`)

- **Tier:** 6 — Frames
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/flywoo-explorer35.jpg`
- **Official URL:** https://flywoo.net/collections/frames
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No Flywoo Explorer 3.5 frame kit on flywoo.net.

### 169. Flywoo Explorer 7 LR Frame (`flywoo-explorer7-lr-frame`)

- **Tier:** 6 — Frames
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/flywoo-explorer7-lr.jpg`
- **Official URL:** https://flywoo.net/collections/frames
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No Flywoo Explorer 7 LR frame kit on flywoo.net.

### 170. GEPRC CineBee35 HD Frame (`geprc-cinebee35-hd-frame`)

- **Tier:** 6 — Frames
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/geprc-cinebee35-hd.jpg`
- **Official URL:** https://geprc.com/product-category/frame-kit/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No GEPRC CineBee35 HD isolated frame-kit page on geprc.com.

### 171. GEPRC Crocodile7 LR Frame (`geprc-crocodile7-lr-frame`)

- **Tier:** 6 — Frames
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/geprc-crocodile7-lr.jpg`
- **Official URL:** https://geprc.com/product-category/frame-kit/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No GEPRC Crocodile7 LR frame product on geprc.com.

### 172. GEPRC Rocket 3.5 Frame (`geprc-rocket-3-5-frame`)

- **Tier:** 6 — Frames
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/geprc-rocket-3-5.jpg`
- **Official URL:** https://geprc.com/product-category/frame-kit/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No GEPRC Rocket 3.5 frame kit product page on geprc.com.

### 173. GEPRC Rocket Lite 75 Frame (`geprc-rocket-lite-75-frame`)

- **Tier:** 6 — Frames
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/geprc-rocket-lite-75.jpg`
- **Official URL:** https://geprc.com/product-category/frame-kit/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No GEPRC Rocket Lite 75 frame kit product page on geprc.com.

### 174. HGLRC Sector7 LR Frame (`hglrc-sector7-lr-frame`)

- **Tier:** 6 — Frames
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/hglrc-sector7-lr.jpg`
- **Official URL:** https://www.hglrc.com/collections/frames
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No HGLRC Sector7 LR frame on hglrc.com; Sector D5/X5 are 5-inch only.

### 175. iFlight Chimera3 Frame (`iflight-chimera3-frame`)

- **Tier:** 6 — Frames
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/iflight-chimera3.jpg`
- **Official URL:** https://shop.iflight.com/quad-parts-cat20/drone-frame-cat346
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Legacy iFlight Chimera3 frame-kit URL 404; Chimera7 kits are different product.

### 176. iFlight Chimera35 Cine Frame (`iflight-chimera35-cine-frame`)

- **Tier:** 6 — Frames
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/iflight-chimera35-cine.jpg`
- **Official URL:** https://shop.iflight.com/quad-parts-cat20/drone-frame-cat346
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Legacy iFlight Chimera35 Cine frame-kit URL 404 on shop.iflight.com.

### 177. iFlight Cidatel 3.5 Cine Frame (`iflight-cidatel35-cine-frame`)

- **Tier:** 6 — Frames
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/iflight-cidatel35-cine.jpg`
- **Official URL:** https://shop.iflight.com/quad-parts-cat20/drone-frame-cat346
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Legacy iFlight Cidatel 3.5 Cine frame-kit URL 404 on shop.iflight.com.

### 178. Aikon 65A LR ESC (`aikon-65a-lr-esc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/aikon-65a-lr-esc.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 179. BETAFPV Brushless 1S AIO ESC (`betafpv-brushless-1s-aio-esc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/betafpv-brushless-1s-aio-esc.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 180. Diatone Mamba F35 Cine ESC (`diatone-mamba-f35-cine-esc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/diatone-mamba-f35-cine-esc.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 181. Diatone Mamba F35 Mini 35A (`diatone-mamba-f35-mini-esc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/diatone-mamba-f35-mini.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 182. Diatone Mamba F55 LR ESC (`diatone-mamba-f55-lr-esc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/diatone-mamba-f55-lr-esc.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 183. GEPRC GEP35A Cine ESC (`geprc-gep35a-cine-esc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/geprc-gep35a-cine-esc.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 184. Happymodel HappyWhoop AIO ESC (`happymodel-happywhoop-aio-esc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/happymodel-happywhoop-aio-esc.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 185. HGLRC Tekko32 F35 Mini 35A (`hglrc-tekko32-f35-mini`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/hglrc-tekko32-f35-mini.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 186. iFlight SucceX-D35 Cine ESC (`iflight-succexd35-cine-esc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/iflight-succexd35-cine-esc.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 187. MEPS Konvex 55A LR ESC (`meps-konvex-55a-lr-esc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/meps-konvex-55a-lr-esc.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 188. T-Motor F35A Mini 4-in-1 (`tmotor-f35a-mini-4in1`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/tmotor-f35a-mini-4in1.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 189. T-Motor Pacer F35 Cine ESC (`tmotor-pacer-f35-cine-esc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/tmotor-pacer-f35-cine-esc.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 190. BETAFPV F411 1S AIO FC (`betafpv-f411-1s-aio-fc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/betafpv-f411-1s-aio-fc.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 191. Diatone Mamba F405 Mini (`diatone-mamba-f405-mini`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/diatone-mamba-f405-mini.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 192. Diatone Mamba H743 LR FC (`diatone-mamba-h743-lr-fc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/diatone-mamba-h743-lr-fc.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 193. GEPRC F405 20x20 Mini (`geprc-f405-20x20-mini`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/geprc-f405-20x20-mini.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 194. GEPRC F722 Cine Mini FC (`geprc-f722-cine-mini-fc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/geprc-f722-cine-mini-fc.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 195. GEPRC F745 LR FC (`geprc-f745-lr-fc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/geprc-f745-lr-fc.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 196. GEPRC GEP AIO 1S FC (`geprc-gep-aio-1s-fc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/geprc-gep-aio-1s-fc.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 197. Happymodel HappyWhoop AIO FC (`happymodel-happywhoop-aio-fc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/happymodel-happywhoop-aio-fc.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 198. iFlight Beast H743 Cine FC (`iflight-beast-h743-cine-fc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/iflight-beast-h743-cine-fc.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 199. iFlight Beast H743 LR FC (`iflight-beast-h743-lr-fc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/iflight-beast-h743-lr-fc.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 200. Matek F722 Cine Mini FC (`matek-f722-cine-mini-fc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/matek-f722-cine-mini-fc.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.

### 201. Matek H743 Wing LR FC (`matek-h743-wing-lr-fc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/matek-h743-wing-lr-fc.jpg`
- **Official URL:** —
- **Preferred image URL:** —
- **URL confidence:** —
- **Reason:** No official manufacturer product page recorded in image source files.
