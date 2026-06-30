# Image completion queue

Ranked workflow for missing catalog JPGs. Generated from `scripts/generateImageCompletionQueue.js`.

Generated: 2026-06-30T15:09:24.651Z

## Baseline coverage

| Metric | Count |
| --- | ---: |
| Total catalog parts | 261 |
| Found under public/ | 102 |
| Missing | 159 |
| Preset parts found | 40/48 |

## Classification summary

| Classification | Count |
| --- | ---: |
| Fetchable now | 0 |
| Needs better official URL | 38 |
| Official source blocked | 25 |
| No clean packshot found | 28 |
| Should remain SVG placeholder | 32 |
| Unsafe — likely mismatch | 36 |

**Should remain SVG placeholder (incl. unsafe / no packshot):** 96

## Queue tiers

| Tier | Scope | Missing |
| ---: | --- | ---: |
| 1 | Preset parts (remaining) | 8 |
| 2 | 5-inch freestyle catalog | 77 |
| 3 | Multi build-class catalog | 1 |
| 4 | Easy-match: props, batteries, cameras, motors | 53 |
| 5 | Receivers / VTX | 4 |
| 6 | Frames | 3 |
| 7 | Electronics: FC / ESC / stack / AIO | 13 |

## Fetchable now

_None at generation time._

## Top 20 manual research targets

_High-value missing parts that need a better official direct packshot URL._

1. **HGLRC Rekon7 PRO V2 7-inch LR Frame** (`rekon-hglrc-rekon7-pro-v2-frame`) — tier 1, frame
   - Official: https://rekonfpv.com/products/rekon7-pro-v2-7-inch-long-range-drone-kit
   - Official product page exists but no verified direct packshot URL is on file yet.

2. **Aikon AK32 50A 4-in-1** (`aikon-ak32-50a-4in1`) — tier 2, esc
   - Official: https://shop.aikon.com/products/ak32-50a-4-in-1-esc-v3
   - Official product page exists but no verified direct packshot URL is on file yet.

3. **HGLRC Tekko32 F55 Mini 55A 4-in-1** (`hglrc-tekko32-f55-mini-esc`) — tier 2, esc
   - Official: https://www.hglrc.com/products/hglrc-tekko32-f55-mini-55a-4in1-esc
   - Official product page exists but no verified direct packshot URL is on file yet.

4. **Hobbywing XRotor 60A 4-in-1** (`hobbywing-xrotor-60a`) — tier 2, esc
   - Official: https://www.hobbywing.com/en/products/xrotor-g2-60a-4in1-esc
   - Official product page exists but no verified direct packshot URL is on file yet.

5. **Hobbywing XRotor G2 50A 4-in-1** (`hobbywing-xrotor-g2-50a`) — tier 2, esc
   - Official: https://www.hobbywing.com/en/products/xrotor-g2-50a-4in1-esc
   - Official product page exists but no verified direct packshot URL is on file yet.

6. **T-Motor F55A Pro II 4-in-1** (`tmotor-f55a-pro-ii`) — tier 2, esc
   - Official: https://store.tmotor.com/product/f55a-pro-ii-4in1-esc.html
   - Official product page exists but no verified direct packshot URL is on file yet.

7. **T-Motor Velox 45A 4-in-1** (`tmotor-velox45a-4in1`) — tier 2, esc
   - Official: https://store.tmotor.com/product/velox-45a-4in1-esc.html
   - Official product page exists but no verified direct packshot URL is on file yet.

8. **AtomRC F405 FC** (`atomrc-f405-fc`) — tier 2, flightController
   - Official: https://www.atomrc.com/atomrc-f405-fc-p00136p1.html
   - Official product page exists but no verified direct packshot URL is on file yet.

9. **AxisFlying H743 Mini** (`axisflying-h743-mini`) — tier 2, flightController
   - Official: https://www.axisflying.com/products/axisflying-h743-mini-fc
   - Official product page exists but no verified direct packshot URL is on file yet.

10. **HGLRC F722 Silver FC** (`hglrc-f722-silver-fc`) — tier 2, flightController
   - Official: https://www.hglrc.com/products/hglrc-f722-silver-flight-controller
   - Official product page exists but no verified direct packshot URL is on file yet.

11. **iFlight Beast F722 FC** (`iflight-beast-f722-fc`) — tier 2, flightController
   - Official: https://shop.iflight.com/Beast-F722-Flight-Controller-Pro1430
   - Official product page exists but no verified direct packshot URL is on file yet.

## Full ranked queue

### 1. HGLRC Rekon7 PRO V2 7-inch LR Frame (`rekon-hglrc-rekon7-pro-v2-frame`)

- **Tier:** 1 — Preset parts (remaining)
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Frame (`frame`)
- **Preset part:** yes
- **Image path:** `public/parts/frames/rekon-hglrc-rekon7-pro-v2-frame.jpg`
- **Official URL:** https://rekonfpv.com/products/rekon7-pro-v2-7-inch-long-range-drone-kit
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 2. GNB 4S 1500mAh 120C (`gnb-4s-1500`)

- **Tier:** 1 — Preset parts (remaining)
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Battery (`battery`)
- **Preset part:** yes
- **Image path:** `public/parts/batteries/gnb-4s-1500.jpg`
- **Official URL:** https://www.gaoneng.shop/products/gaoneng-gnb-4s-14-8v-1850mah-100c-xt60-lipo-battery
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No exact 1500mAh official GNB/Gaoneng product page.

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

### 7. TBS Source One V5 5-inch (`tbs-source-one-v5`)

- **Tier:** 1 — Preset parts (remaining)
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Frame (`frame`)
- **Preset part:** yes
- **Image path:** `public/parts/frames/tbs-source-one-v5.jpg`
- **Official URL:** https://github.com/tbs-trappy/source_one
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official listing is a complete aircraft, not an isolated frame-kit packshot.

### 8. Foxeer Reaper Nano V2 VTX (`foxeer-reaper-nano-v2-vtx`)

- **Tier:** 1 — Preset parts (remaining)
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** VTX (`vtx`)
- **Preset part:** yes
- **Image path:** `public/parts/vtx/foxeer-reaper-nano-v2-vtx.jpg`
- **Official URL:** https://www.foxeer.com/foxeer-reaper-nano-v2-vtx-5-8g-72ch-350mw-tramp-g-583
- **Preferred image URL:** https://inew.foxeer.com//upload/s/goods/2024-12-13/15-48-28-675be6ccb8c74.images.800x800.png
- **URL confidence:** high
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 9. Aikon AK32 50A 4-in-1 (`aikon-ak32-50a-4in1`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/aikon-ak32-50a-4in1.jpg`
- **Official URL:** https://shop.aikon.com/products/ak32-50a-4-in-1-esc-v3
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 10. HGLRC Tekko32 F55 Mini 55A 4-in-1 (`hglrc-tekko32-f55-mini-esc`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/hglrc-tekko32-f55-mini-esc.jpg`
- **Official URL:** https://www.hglrc.com/products/hglrc-tekko32-f55-mini-55a-4in1-esc
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 11. Hobbywing XRotor 60A 4-in-1 (`hobbywing-xrotor-60a`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/hobbywing-xrotor-60a.jpg`
- **Official URL:** https://www.hobbywing.com/en/products/xrotor-g2-60a-4in1-esc
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 12. Hobbywing XRotor G2 50A 4-in-1 (`hobbywing-xrotor-g2-50a`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/hobbywing-xrotor-g2-50a.jpg`
- **Official URL:** https://www.hobbywing.com/en/products/xrotor-g2-50a-4in1-esc
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 13. T-Motor F55A Pro II 4-in-1 (`tmotor-f55a-pro-ii`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/tmotor-f55a-pro-ii.jpg`
- **Official URL:** https://store.tmotor.com/product/f55a-pro-ii-4in1-esc.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 14. T-Motor Velox 45A 4-in-1 (`tmotor-velox45a-4in1`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/tmotor-velox45a-4in1.jpg`
- **Official URL:** https://store.tmotor.com/product/velox-45a-4in1-esc.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 15. AtomRC F405 FC (`atomrc-f405-fc`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/atomrc-f405-fc.jpg`
- **Official URL:** https://www.atomrc.com/atomrc-f405-fc-p00136p1.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 16. AxisFlying H743 Mini (`axisflying-h743-mini`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/axisflying-h743-mini.jpg`
- **Official URL:** https://www.axisflying.com/products/axisflying-h743-mini-fc
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 17. HGLRC F722 Silver FC (`hglrc-f722-silver-fc`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/hglrc-f722-silver-fc.jpg`
- **Official URL:** https://www.hglrc.com/products/hglrc-f722-silver-flight-controller
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 18. iFlight Beast F722 FC (`iflight-beast-f722-fc`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/iflight-beast-f722-fc.jpg`
- **Official URL:** https://shop.iflight.com/Beast-F722-Flight-Controller-Pro1430
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 19. GNB 6S 1300mAh HV 120C (`gnb-6s-1300-hv`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/gnb-6s-1300-hv.jpg`
- **Official URL:** https://www.genstattu.com/gnb-6s-1300mah-120c-hv-lipo-battery-pack-with-xt60-plug.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Genstattu/GNB product page 404 or blocks automated fetch.

### 20. GNB 6S 1400mAh 120C (`gnb-6s-1400-freestyle`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/gnb-6s-1400-freestyle.jpg`
- **Official URL:** https://www.genstattu.com/gnb-6s-1400mah-120c-lipo-battery-pack-with-xt60-plug.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Genstattu/GNB product page 404 or blocks automated fetch.

### 21. Ethix Lithium5 Frame (`ethix-lithium5-frame`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/ethix-lithium5.jpg`
- **Official URL:** https://ethixrc.com/product/lithium-5-frame-kit/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Ethix official store intermittently unreachable.

### 22. Skystars KM2207 1910KV (`skystars-km2207-1910kv`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/skystars-km2207-1910kv.jpg`
- **Official URL:** https://skystars-rc.com/products/skystars-km2207-1910kv-motor
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Skystars store unreachable from automated fetch.

### 23. Skystars KM2306 1950KV (`skystars-km2306-1950kv`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/skystars-km2306-1950kv.jpg`
- **Official URL:** https://skystars-rc.com/products/skystars-km2306-1950kv-motor
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Skystars store unreachable from automated fetch.

### 24. T-Motor F40 Pro V 2207 1950KV (`tmotor-f40-pro-2207-1950kv`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/tmotor-f40-pro-2207-1950kv.jpg`
- **Official URL:** https://store.tmotor.com/product/f40pro-5-fpv-motor.html
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** T-Motor store blocks automated fetch.

### 25. T-Motor F60 Pro V 2207 1950KV (`tmotor-f60-pro-v-1950`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/tmotor-f60-pro-v.jpg`
- **Official URL:** https://store.tmotor.com/product/f60prov-fpv-motor.html
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** T-Motor store blocks automated fetch.

### 26. T-Motor Velox V3 2207 1750KV (`tmotor-velox-v3-1750`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/tmotor-velox-v3.jpg`
- **Official URL:** https://store.tmotor.com/product/v2207-v3-kv1750-fpv-motor.html
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** T-Motor store blocks automated fetch.

### 27. T-Motor Velox V3 2207 1950KV (`tmotor-velox-v3-2207-1950kv`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/tmotor-velox-v3-2207-1950kv.jpg`
- **Official URL:** https://store.tmotor.com/product/v2207-v3-kv1750-fpv-motor.html
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** T-Motor store blocks automated fetch.

### 28. Azure Power 5148 (`azure-5148`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/azure-5148.jpg`
- **Official URL:** https://www.azurepower.net/azure-power-5148-propeller-p00138p1.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Azure Power site unreachable from automated fetch.

### 29. Azure Power Vanover 5140 (`azure-vanover-5140`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/azure-vanover-5140.jpg`
- **Official URL:** https://www.azurepower.net/azure-power-vanover-5140-propeller-p00139p1.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Azure Power site unreachable from automated fetch.

### 30. DAL Cyclone T5046C (`dalprop-cyclone-5046`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/dalprop-cyclone-5046.jpg`
- **Official URL:** https://www.dalprop.com/dal-cyclone-t5046c-propeller-p00140p1.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** DAL prop site unreachable from automated fetch.

### 31. DAL Fold F5 5040 (`dalprop-fold-f5-5040`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/dalprop-fold-f5-5040.jpg`
- **Official URL:** https://www.dalprop.com/dal-fold-f5-5040-propeller-p00141p1.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** DAL prop site unreachable from automated fetch.

### 32. AKK X2 Ultimate VTX (`akk-x2-ultimate-vtx`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** VTX (`vtx`)
- **Preset part:** no
- **Image path:** `public/parts/vtx/akk-x2-ultimate-vtx.jpg`
- **Official URL:** https://www.akktek.com/akk-x2-ultimate-vtx.html
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** AKK official store blocks automated fetch.

### 33. Rush Tank II 5.8GHz VTX (`rush-tank-ii-vtx`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** VTX (`vtx`)
- **Preset part:** no
- **Image path:** `public/parts/vtx/rush-tank-ii-vtx.jpg`
- **Official URL:** https://www.rushfpv.com/rush-tank-ii-5-8ghz-vtx-g-591
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** RushFPV Tank II product page unreachable from automated fetch.

### 34. CNHL 4S 1500mAh 100C (`cnhl-4s-1500-freestyle`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/cnhl-4s-1500-freestyle.jpg`
- **Official URL:** https://chinahobbyline.com/products/cnhl-black-series-1500mah-14-8v-4s-100c-lipo-battery-with-xt60-plug
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Only multi-pack CNHL listing on official store.

### 35. Lumenier N2O 6S 1100mAh 120C (`lumenier-6s-1100`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/lumenier-n2o-6s-1100.jpg`
- **Official URL:** https://www.lumenier.com/products/lumenier-n2o-6s-1100mah-120c-lipo-battery
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Lumenier N2O 6S 1100mAh product page 404 on official store.

### 36. Lumenier N2O 6S 1250mAh 120C (`lumenier-6s-1250-freestyle`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/lumenier-6s-1250-freestyle.jpg`
- **Official URL:** https://www.lumenier.com/products/lumenier-n2o-6s-1250mah-120c-lipo-battery
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Lumenier N2O 6S 1250mAh product page 404 on official store.

### 37. Ovonic 4S 1400mAh 100C (`ovonic-4s-1400-freestyle`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/ovonic-4s-1400-freestyle.jpg`
- **Official URL:** https://ovonicshop.com/products/ovonic-4s-1400mah-100c-lipo-battery-pack-with-xt60-plug
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** No exact Ovonic 4S 1400mAh listing on official store.

### 38. Tattu 4S 1300mAh 95C (`tattu-4s-1300-freestyle`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/tattu-4s-1300-freestyle.jpg`
- **Official URL:** https://www.genstattu.com/tattu-4s-1300mah-14-8v-95c-lipo-battery-pack-with-xt60-plug.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Genstattu Tattu 4S 1300mAh product page 404.

### 39. Tattu 4S 1550mAh 95C (`tattu-4s-1550`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/tattu-4s-1550.jpg`
- **Official URL:** https://www.genstattu.com/tattu-4s-1550mah-14-8v-95c-lipo-battery-pack-with-xt60-plug.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Genstattu Tattu 4S 1550mAh product page 404.

### 40. Tattu R-Line 6S 1550mAh 130C (`tattu-rline-6s-1550`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/tattu-rline-6s-1550.jpg`
- **Official URL:** https://www.genstattu.com/tattu-r-line-1550mah-22-2v-6s-130c-lipo-battery-pack-with-xt60-plug.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Genstattu Tattu R-Line 6S 1550mAh product page 404.

### 41. Walksnail Avatar Micro (`walksnail-avatar-micro`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Camera (`camera`)
- **Preset part:** no
- **Image path:** `public/parts/cameras/walksnail-avatar-micro.jpg`
- **Official URL:** https://www.caddxfpv.com/products/walksnail-avatar-camera-v2
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Avatar V2 page does not expose Micro SKU packshot.

### 42. Matek F722 Mini (`matek-f722-mini`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/matek-f722-mini.jpg`
- **Official URL:** https://www.mateksys.com/?portfolio=f722-mini
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Matek portfolio only exposes spec-sheet composite.

### 43. Matek F722-STD FC (`matek-f722-std-fc`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/matek-f722-std-fc.jpg`
- **Official URL:** https://www.mateksys.com/?portfolio=f722-std
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Matek portfolio only exposes spec-sheet composite.

### 44. AOS 5 V5 (`aos-5-v5`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/aos-5-v5.jpg`
- **Official URL:** https://www.aos-rc.com/designs/aos-5-v5
- **Preferred image URL:** https://static.wixstatic.com/media/e57211_5a539ff67e794c83aa16d962133b02f6~mv2.png/v1/fill/w_1920,h_1200,al_c/AOS%205%20V5.774.png
- **URL confidence:** high
- **Reason:** Official AOS design page has lifestyle hero, not isolated frame packshot.

### 45. HGLRC Zeus5 Frame (`hglrc-zeus5-frame`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/hglrc-zeus5-frame.jpg`
- **Official URL:** https://www.hglrc.com/products/hglrc-sector-x5-fr-5-inch-freestyle-fpv-frame
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No Zeus5 frame SKU; substitute listing is different frame.

### 46. ImpulseRC ApexDC 5-inch (`impulserc-apexdc`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/impulserc-apexdc.jpg`
- **Official URL:** https://apex-docs.impulserc.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** ImpulseRC closed; no product photo source.

### 47. ImpulseRC Reverb 5 Frame (`impulserc-reverb5-frame`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/impulserc-reverb5-frame.jpg`
- **Official URL:** https://impulserc.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** ImpulseRC closed; no product photo source.

### 48. HQProp T3x2.5x3 515 (`hqprop-t3x2-5x3-515`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/hqprop-t3x2-5x3-515.jpg`
- **Official URL:** https://www.hqprop.com/hqprop-t3x2-5x3-515-p00147p1.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** HQProp T3x2.5x3 515 product page 404 on official store.

### 49. ImmersionRC Fusion V2 ELRS (`imm-rc-fusion-v2-elrs`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Receiver (`receiver`)
- **Preset part:** no
- **Image path:** `public/parts/receivers/imm-rc-fusion-v2-elrs.jpg`
- **Official URL:** https://www.immersionrc.com/fusion/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** ImmersionRC page is not a verified V2 ELRS packshot.

### 50. JHEMCU EP28 2.4GHz ELRS (`jhemcu-ep28-elrs`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Receiver (`receiver`)
- **Preset part:** no
- **Image path:** `public/parts/receivers/jhemcu-ep28-elrs.jpg`
- **Official URL:** https://www.jhemcu.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** JHEMCU store homepage only; no stable EP28 product URL.

### 51. Aikon F7 Mini 35A 4-in-1 (`aikon-f7-mini-35a`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/aikon-f7-mini-35a.jpg`
- **Official URL:** https://shop.aikon.com/products/f7-mini-35a-4-in-1-esc-v3
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Manufacturer page is a combined FC+ESC stack; catalog line is FC-only or ESC-only.

### 52. iFlight SucceX-E F4 50A 4-in-1 (`iflight-succex-e-f4-50a`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/iflight-succex-e-f4-50a.jpg`
- **Official URL:** https://shop.iflight.com/SucceX-E-F4-50A-4-in-1-ESC-Pro1420
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Manufacturer page is a combined FC+ESC stack; catalog line is FC-only or ESC-only.

### 53. MEPS Konvex F55 55A 4-in-1 (`meps-konvex-f55-55a-4in1`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/meps-konvex-f55-55a-4in1.jpg`
- **Official URL:** https://www.mepsking.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** MEPS Konvex F55 not on standalone product page; official MEPS manufacturer store homepage.

### 54. MEPS Konvex G2 50A 4-in-1 (`meps-konvex-g2-50a`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/meps-konvex-g2-50a.jpg`
- **Official URL:** https://www.mepsking.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** MEPS Konvex G2 not on standalone product page; official MEPS manufacturer store homepage.

### 55. Rush Blade F7 60A 4-in-1 (`rush-blade-f7-60a-4in1`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/rush-blade-f7-60a-4in1.jpg`
- **Official URL:** https://www.rushfpv.com/rush-blade-f7-60a-4in1-esc-g-585
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Manufacturer page is a combined FC+ESC stack; catalog line is FC-only or ESC-only.

### 56. SpeedyBee BL32 55A 4-in-1 (`speedybee-bl32-55a-4in1`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/speedybee-bl32-55a-4in1.jpg`
- **Official URL:** https://www.speedybee.com/speedybee-f405-v4-bls-55a-30x30-fc-esc-stack/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Manufacturer page is a combined FC+ESC stack; catalog line is FC-only or ESC-only.

### 57. Diatone Mamba F722 S FC (`diatone-mamba-f722-s-fc`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/diatone-mamba-f722-s-fc.jpg`
- **Official URL:** https://www.diatone.us/products/mb-mk4-f722-app-fc
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Manufacturer page is a combined FC+ESC stack; catalog line is FC-only or ESC-only.

### 58. JHEMCU G743 Pro FC (`jhemcu-g743-pro-fc`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/jhemcu-g743-pro-fc.jpg`
- **Official URL:** https://www.jhemcu.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Official JHEMCU store homepage; G743 Pro FC has no stable direct product URL.

### 59. Matek H743 Slate Freestyle (`matek-h743-slate-freestyle`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/matek-h743-slate-freestyle.jpg`
- **Official URL:** https://www.mateksys.com/?portfolio=h743-slim-v4
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No H743 Slate SKU on Matek; H743-SLIM-V4 is closest official H743 freestyle board.

### 60. SpeedyBee F7 V3 FC (`speedybee-f7-v3-fc`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/speedybee-f7-v3-fc.jpg`
- **Official URL:** https://www.speedybee.com/speedybee-f7-v3-bl32-50a-30x30-stack/
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Manufacturer page is a combined FC+ESC stack; catalog line is FC-only or ESC-only.

### 61. Flywoo Explorer 5 Frame (`flywoo-explorer5-frame`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/flywoo-explorer5-frame.jpg`
- **Official URL:** https://flywoo.net/products/explorer-lr4-o3-5-long-range-freestyle-frame
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Official Flywoo Explorer long-range 5-inch frame family page; closest manufacturer listing.

### 62. iFlight Nazgul Eco5 Frame (`iflight-nazgul-eco5-frame`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/iflight-nazgul-eco5.jpg`
- **Official URL:** https://shop.iflight.com/Nazgul-XL5-ECO-6S-Pro2193
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Official listing is a complete aircraft, not an isolated frame-kit packshot.

### 63. iFlight XL5 V6 5-inch (`iflight-xl5-v6`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/iflight-xl5-v6.jpg`
- **Official URL:** https://shop.iflight.com/replacement-parts-for-xl5-v5-frame-pro1303
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** XL5 V6 frame discontinued; manufacturer replacement-parts page covers XL5/Nazgul5 V3 frame family.

### 64. TBS Source One V6 Frame (`tbs-source-one-v6-frame`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/tbs-source-one-v6-frame.jpg`
- **Official URL:** https://github.com/tbs-trappy/source_one
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Official listing is a complete aircraft, not an isolated frame-kit packshot.

### 65. Samguk Series V 2207 1960KV (`samguk-v-2207-1960kv`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/samguk-v-2207-1960kv.jpg`
- **Official URL:** https://www.samgukmotors.com/samguk-series-v-2207-motor-p00130p1.html
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Official Samguk Series V 2207 motor family page on manufacturer store.

### 66. CNHL Black Series 6S 1500mAh 100C (`cnhl-6s-1500-freestyle`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/cnhl-6s-1500-freestyle.jpg`
- **Official URL:** https://chinahobbyline.com/products/cnhl-black-series-1500mah-22-2v-6s-100c-lipo-battery-with-xt60-plug
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 67. Foxeer Falkor 2 (`foxeer-falkor-2`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Camera (`camera`)
- **Preset part:** no
- **Image path:** `public/parts/cameras/foxeer-falkor-2.jpg`
- **Official URL:** https://www.foxeer.com/foxeer-falkor-2-fpv-camera-g-588
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 68. Foxeer Predator V5 (`foxeer-predator-v5`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Camera (`camera`)
- **Preset part:** no
- **Image path:** `public/parts/cameras/foxeer-predator-v5.jpg`
- **Official URL:** https://www.foxeer.com/foxeer-predator-v5-fpv-camera-g-589
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 69. Foxeer Toothless 2 (`foxeer-toothless-2`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Camera (`camera`)
- **Preset part:** no
- **Image path:** `public/parts/cameras/foxeer-toothless-2.jpg`
- **Official URL:** https://www.foxeer.com/foxeer-toothless-2-fpv-camera-g-590
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 70. Foxeer Reaper F4 65A 4-in-1 (`foxeer-reaper-f4-65a`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/foxeer-reaper-f4-65a.jpg`
- **Official URL:** https://www.foxeer.com/foxeer-reaper-f4-65a-4in1-esc-g-584
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 71. Diatone Mamba F722 MK4 (`diatone-mamba-f722`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/diatone-mamba-f722.jpg`
- **Official URL:** https://www.diatone.us/products/mamba-mk4-f722-app-flight-controller
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 72. Foxeer F722 V4 (`foxeer-f722-v4`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/foxeer-f722-v4.jpg`
- **Official URL:** https://www.foxeer.com/foxeer-f722-v4-flight-controller-g-586
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 73. Foxeer H743 F722 FC (`foxeer-h743-f722-fc`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/foxeer-h743-f722-fc.jpg`
- **Official URL:** https://www.foxeer.com/foxeer-h743-f722-flight-controller-g-587
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 74. Armattan Badger 5 Frame (`armattan-badger5-frame`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/armattan-badger5-frame.jpg`
- **Official URL:** https://armattanquads.com/products/badger-1
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 75. GEPRC Mark4 Frame (`geprc-mark4-frame`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/geprc-mark4-frame.jpg`
- **Official URL:** https://geprc.com/product/gep-mark4-frame/
- **Preferred image URL:** https://geprc.com/wp-content/uploads/2019/06/03-2845615995-1200x1200.jpg
- **URL confidence:** high
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 76. Lumenier QAV-S 2 JohnnyFPV SE (`lumenier-qav-s-johnnyfpv`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/qav-s-johnnyfpv-se.jpg`
- **Official URL:** https://www.lumenier.com/products/lumenier-qav-s-2-johnnyfpv-se-5-frame-kit
- **Preferred image URL:** https://cdn.shopify.com/s/files/1/0698/9525/8342/files/lumenier-qav-s-2-johnnyfpv-se-5inch-frame-kit-_1.jpg?v=1734560533
- **URL confidence:** high
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 77. FPVCycle 2207 1780KV (`fpvcycle-2207-1780kv`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/fpvcycle-2207-1780kv.jpg`
- **Official URL:** https://fpvcycle.com/products/fpvcycle-5-motor-choose-options
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 78. FPVCycle Motor 2207 1960KV (`fpvcycle-2207-1960`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/fpvcycle-2207.jpg`
- **Official URL:** https://fpvcycle.com/products/fpvcycle-5-motor-choose-options
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 79. Hypetrain Acer 2306 1950KV (`hypetrain-acer-2306-1950kv`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/hypetrain-acer-2306-1950kv.jpg`
- **Official URL:** https://rotorriot.com/products/hypetrain-revo-5-2207-1860kv-motor
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 80. Hypetrain Blaster 2207 2450KV (`hypetrain-blaster-2450`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/hypetrain-blaster-2207.jpg`
- **Official URL:** https://rotorriot.com/products/hypetrain-blaster-2207-2450kv-motor
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 81. JohnnyFPV V2 2207 1960KV (`johnnyfpv-motor-v2-2207-1960kv`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/johnnyfpv-motor-v2-2207.jpg`
- **Official URL:** https://www.lumenier.com/products/lumenier-2307-johnnyfpv-v3-pro-cinematic-motor
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 82. Lumenier AX 2207 1800KV (`lumenier-2207-1800kv`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/lumenier-2207-1800kv.jpg`
- **Official URL:** https://www.lumenier.com/collections/motors
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 83. HQProp Ethix P3 5x3x3 (`ethix-p3-peanut-butter`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/ethix-p3-peanut-butter.jpg`
- **Official URL:** https://hqprop.com/ethix-p3-peanut-butter-jelly-prop-2cw2ccw-poly-carbonate-p0276.html
- **Preferred image URL:** —
- **URL confidence:** high
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 84. HQProp Ethix S3 5x5x3 (`ethix-s3-5050`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/ethix-s3-5050.jpg`
- **Official URL:** https://www.hqprop.com/search/?Keyword=ethix+s3
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 85. Gemfan Hurricane MCK 51433 (`gemfan-hurricane-mck-51433`)

- **Tier:** 2 — 5-inch freestyle catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/gemfan-hurricane-mck-51433.jpg`
- **Official URL:** https://www.gemfanhobby.com/hurricane-51466-v2-pc-3-blade.html
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 86. iFlight BLITZ Mini E55S 4-in-1 ESC (`iflight-blitz-mini-e55s-4in1`)

- **Tier:** 3 — Multi build-class catalog
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/iflight-blitz-mini-e55s-4in1.jpg`
- **Official URL:** https://shop.iflight.com/BLITZ-Mini-E55S-4-IN-1-ESC-Pro2062
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 87. Tattu 1S 300mAh HV 75C (`tattu-1s-300-hv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/tattu-1s-300-hv.jpg`
- **Official URL:** https://www.genstattu.com/product/tattu-1s-300mah-75c-hv-lipo-battery.html
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 88. Tattu R-Line 4S 650mAh 95C (`tattu-rline-4s-650`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/tattu-rline-4s-650.jpg`
- **Official URL:** https://www.genstattu.com/product/tattu-r-line-4s-650mah-95c-lipo-battery.html
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 89. Caddx ProView Cine Digital (`caddx-proview-cine-digital`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Camera (`camera`)
- **Preset part:** no
- **Image path:** `public/parts/cameras/caddx-proview-cine-digital.jpg`
- **Official URL:** https://www.caddxfpv.com/proview-cine-digital-system/
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 90. Caddx Ratel Lucky Whoop (`caddx-ratel-lucky-whoop`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Camera (`camera`)
- **Preset part:** no
- **Image path:** `public/parts/cameras/caddx-ratel-lucky-whoop.jpg`
- **Official URL:** https://www.caddxfpv.com/ratel-lucky-whoop/
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 91. Foxeer Pico R Whoop (`foxeer-pico-r-whoop`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Camera (`camera`)
- **Preset part:** no
- **Image path:** `public/parts/cameras/foxeer-pico-r-whoop.jpg`
- **Official URL:** https://www.foxeer.com/pico-r-whoop-camera/
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 92. T-Motor F1404 3800KV (`tmotor-f1404-3800kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/tmotor-f1404-3800kv.jpg`
- **Official URL:** https://store.tmotor.com/product/f1404-motor-kv3800-kv4600.html
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 93. T-Motor MN2004 2550KV (`tmotor-mn2004-2550kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/tmotor-mn2004-2550kv.jpg`
- **Official URL:** https://store.tmotor.com/product/mn2004-motor-kv2550.html
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 94. APC 7x4x2 LR (`apc-7x4-2-lr`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/apc-7x4-2-lr.jpg`
- **Official URL:** https://www.apcprop.com/product/7x4-e/
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 95. EMAX Avan 3.5x4.0 Cinewhoop D5 (`avan-3540-cine-d5`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/avan-3540-cine-d5.jpg`
- **Official URL:** https://emaxmodel.com/products/emax-avan-3-5x4-0-prop-4pcs
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 96. EMAX Avan Rush 3.5x2.8 (`avan-rush-3528`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/avan-rush-3528.jpg`
- **Official URL:** https://emaxmodel.com/products/emax-avan-rush-3-5x2-8-prop-4pcs
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 97. BETAFPV 40mm 4-Blade 1.5x3.5 (`betafpv-40mm-4blade-1535`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/betafpv-40mm-1535.jpg`
- **Official URL:** https://betafpv.com/products/40mm-4-blade-propeller
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 98. EMAX Avan 40mm Whoop (`emax-avan-40mm-whoop`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/emax-avan-40mm-whoop.jpg`
- **Official URL:** https://emaxmodel.com/products/emax-avan-40mm-prop-4pcs
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 99. Gemfan 31mm 4-Blade Whoop (`gemfan-31mm-4blade-whoop`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/gemfan-31mm-whoop.jpg`
- **Official URL:** https://www.gemfanhobby.com/products/gemfan-31mm-4-blade-propeller
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 100. Gemfan Hurricane 3.5x2.2 (`gemfan-3522-hurricane`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/gemfan-3522-hurricane.jpg`
- **Official URL:** https://www.gemfanhobby.com/products/gemfan-hurricane-3522-3-blade-propeller
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 101. Gemfan 3.5x2.8 Cinewhoop D5 (`gemfan-3528-cine-d5`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/gemfan-3528-cine-d5.jpg`
- **Official URL:** https://www.gemfanhobby.com/products/gemfan-3528-3-blade-propeller
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 102. Gemfan 3.5x2.8 Freestyle (`gemfan-3528-freestyle`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/gemfan-3528-freestyle.jpg`
- **Official URL:** https://www.gemfanhobby.com/products/gemfan-3528-3-blade-propeller
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 103. Gemfan 7x3.5x2 LR (`gemfan-7035-2-lr`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/gemfan-7035-2-lr.jpg`
- **Official URL:** https://www.gemfanhobby.com/products/gemfan-7035-2-blade-propeller
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 104. Gemfan 7x3.6x3 LR (`gemfan-7036-3-lr`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/gemfan-7036-3-lr.jpg`
- **Official URL:** https://www.gemfanhobby.com/products/gemfan-7036-3-blade-propeller
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 105. Gemfan FloppyPop3 3.5x1.8 (`gemfan-floppypop3-3518`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/gemfan-floppypop3-3518.jpg`
- **Official URL:** https://www.gemfanhobby.com/products/gemfan-floppypop3-3518-3-blade-propeller
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 106. GEPRC 7x3.8x2 LR (`geprc-7038-2-lr`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/geprc-7038-2-lr.jpg`
- **Official URL:** https://geprc.com/product/geprc-7-inch-propeller/
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 107. HQProp 3.5x2.5x3 PC (`hqprop-3525-pc`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/hqprop-3525-pc.jpg`
- **Official URL:** https://www.hqprop.com/product/hq-3-5x2-5x3/
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 108. HQProp 3.5x3.5x3 PC (`hqprop-3535-pc`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/hqprop-3535-pc.jpg`
- **Official URL:** https://www.hqprop.com/product/hq-3-5x3-5x3/
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 109. HQProp 3.5x3.6 Cinewhoop D5 (`hqprop-3536-cine-d5`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/hqprop-3536-cine-d5.jpg`
- **Official URL:** https://www.hqprop.com/product/hq-3-5x3-6x3/
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 110. HQProp 7x3.0x3 LR (`hqprop-7030-3-lr`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/hqprop-7030-3-lr.jpg`
- **Official URL:** https://www.hqprop.com/product/hq-7x3x3/
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 111. HQProp 7x3.5x2 LR (`hqprop-7035-2-lr`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/hqprop-7035-2-lr.jpg`
- **Official URL:** https://www.hqprop.com/product/hq-7x3-5x2/
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 112. HQProp Durable 3.5x3.0 Cine (`hqprop-durable-3530-cine`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/hqprop-durable-3530-cine.jpg`
- **Official URL:** https://www.hqprop.com/product/hq-3-5x3x3/
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 113. HQProp T65x30 Whoop (`hqprop-t65x30-whoop`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Needs better official URL (`needs_better_official_url`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/hqprop-t65x30-whoop.jpg`
- **Official URL:** https://www.hqprop.com/product/t65x30/
- **Preferred image URL:** —
- **URL confidence:** medium
- **Reason:** Official product page exists but no verified direct packshot URL is on file yet.

### 114. GNB 1S 550mAh HV BT2.0 (`gn-1s-550-bt2`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/gnb-1s-550-bt2.jpg`
- **Official URL:** https://www.gaoneng.shop/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** GNB/Gaoneng official store blocks automated fetch; no verified 1S 550mAh BT2.0 URL.

### 115. GNB 4S 1100mAh 120C Park (`gnb-4s-1100-park`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/gnb-4s-1100-park.jpg`
- **Official URL:** https://www.gaoneng.shop/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** GNB/Gaoneng store blocks fetch; Genstattu 4S 1100mAh page 404.

### 116. GNB 4S 1300mAh 120C Cine (`gnb-4s-1300-cine`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/gnb-4s-1300-cine.jpg`
- **Official URL:** https://www.gaoneng.shop/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** GNB/Gaoneng store blocks fetch; Genstattu 4S 1300mAh page 404.

### 117. GNB 4S 750mAh 120C Mini (`gnb-4s-750-mini`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/gnb-4s-750-mini.jpg`
- **Official URL:** https://www.gaoneng.shop/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** GNB/Gaoneng store blocks fetch; Genstattu 4S 750mAh page 404.

### 118. GNB 6S 2500mAh LR LiPo (`gnb-6s-2500-lr-lipo`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/gnb-6s-2500-lr-lipo.jpg`
- **Official URL:** https://www.gaoneng.shop/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** GNB/Gaoneng store blocks fetch; Genstattu 6S 2500mAh page 404.

### 119. BETAFPV 2S 300mAh PH2.0 (`betafpv-2s-300-ph2`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/betafpv-2s-300-ph2.jpg`
- **Official URL:** https://betafpv.com/products/300mah-2s-lipo-battery-2pcs
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Official BETAFPV 300mAh 2S is 45C XT30; catalog line is 75C PH2.0.

### 120. CNHL Ministar 4S 900mAh 100C (`cnhl-ministar-4s-900`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/cnhl-ministar-4s-900.jpg`
- **Official URL:** https://chinahobbyline.com/products/cnhl-ministar-series-850mah-14-8v-4s-70c-lipo-battery-with-xt60-plug
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No CNHL Ministar 4S 900mAh listing; official 900mAh is 2S only; closest 4S is 850mAh.

### 121. EMAX ECO 2004 2550KV (`emax-eco-2004-2550kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/emax-eco-2004-2550kv.jpg`
- **Official URL:** https://emax-usa.com/products/eco-ii-2004-brushless-motor
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Official EMAX ECO II 2004 page lists 1700/2200/2400KV only; no 2550KV SKU.

### 122. EMAX ECO II 2806 1280KV (`emax-eco-ii-2806-1280kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/emax-eco-ii-2806-1280kv.jpg`
- **Official URL:** https://emax-usa.com/products/eco-ii-2807-long-range-brushless-motor
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Closest EMAX LR motor is ECO II 2807 1280KV; no verified 2806 packshot URL.

### 123. iFlight XING2 1404 4600KV (`iflight-xing2-1404-4600kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/iflight-xing2-1404-4600kv.jpg`
- **Official URL:** https://shop.iflight.com/xing2-1404-toothpick-ultralight-build-unibell-pro1482
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** XING2 1404 page lists 4600KV but gallery packshots are 3800KV-labelled only.

### 124. iFlight XING2 2807 1280KV LR (`iflight-xing2-2807-1280kv-lr`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/iflight-xing2-2807-1280kv-lr.jpg`
- **Official URL:** https://shop.iflight.com/motor-cat341
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Legacy XING2 2807 LR product URL 404; no 1280KV packshot on iFlight store.

### 125. RCinPower 1404 3800KV (`rcinpower-1404-3800kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/rcinpower-1404-3800kv.jpg`
- **Official URL:** https://www.rcinpower.com/SmooX/48.html
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** SmooX 1404 page is spec-sheet composite; GTS V3 1404 page uses 1203 imagery.

### 126. Molicel 6S 4000mAh Li-ion (`molicel-6s-4000-liion`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/molicel-6s-4000-liion.jpg`
- **Official URL:** https://www.molicel.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Molicel sells cells not assembled packs; no verified 6S 4000mAh pack product page.

### 127. Ovonic 6S 3000mAh LR LiPo (`ovonic-6s-3000-lr-lipo`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/ovonic-6s-3000-lr-lipo.jpg`
- **Official URL:** https://www.ovonicshop.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Ovonic official store; verify exact 6S 3000mAh LR pack SKU before fetch.

### 128. Sanyo 6S 3500mAh Li-ion (`sanyo-6s-3500-liion`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/sanyo-6s-3500-liion.jpg`
- **Official URL:** https://www.molicel.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Catalog uses Sanyo NCR18650GA cells; no official assembled 6S pack listing.

### 129. Tattu 4S 1300mAh 95C Cine (`tattu-4s-1300-cine`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/tattu-4s-1300-cine.jpg`
- **Official URL:** https://www.genstattu.com/product/tattu-4s-1300mah-95c-lipo-battery.html
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Genstattu 4S 1300mAh page may 404; verify before fetch.

### 130. Tattu 6S 2800mAh LR LiPo (`tattu-6s-2800-lr-lipo`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/tattu-6s-2800-lr-lipo.jpg`
- **Official URL:** https://www.genstattu.com/product/tattu-6s-2800mah-75c-lipo-battery.html
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Verify Genstattu 6S 2800mAh LR SKU availability.

### 131. DAL 3.5x4.35 Cinewhoop D5 (`dal-35435-cine-d5`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/dal-35435-cine-d5.jpg`
- **Official URL:** https://dalprop.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** DAL prop site often blocks fetch; verify exact 3.5x4.35 SKU URL.

### 132. DAL Prop 3.5x3.0 Cyclone (`dal-prop-3530-cyclone`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Props (`props`)
- **Preset part:** no
- **Image path:** `public/parts/props/dal-prop-3530-cyclone.jpg`
- **Official URL:** https://dalprop.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** DAL prop site often blocks fetch; Cyclone 3.5-inch SKU unverified.

### 133. CNHL 6S 1800mAh LR LiPo (`cnhl-6s-1800-lr-lipo`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/cnhl-6s-1800-lr-lipo.jpg`
- **Official URL:** https://chinahobbyline.com/products/cnhl-ministar-series-1800mah-22-2v-6s-120c-lipo-battery-with-xt60-plug
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 134. Lumenier 6S 2200mAh LR LiPo (`lumenier-6s-2200-lr-lipo`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Battery (`battery`)
- **Preset part:** no
- **Image path:** `public/parts/batteries/lumenier-6s-2200-lr-lipo.jpg`
- **Official URL:** https://www.lumenier.com/products/lumenier-6s-2200mah-35c-lipo-battery
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 135. BETAFPV 1404 4600KV (`betafpv-1404-4600kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/betafpv-1404-4600kv.jpg`
- **Official URL:** https://betafpv.com/products/1404-4500kv-brushless-motors
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 136. BrotherHobby 2806 1400KV LR (`brotherhobby-2806-1400kv-lr`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/brotherhobby-2806-1400kv-lr.jpg`
- **Official URL:** https://brotherhobby.com/avenger-28065-motor-p00132p1.html
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 137. EMAX E1106 7200KV (`emax-e1106-7200kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/emax-e1106-7200kv.jpg`
- **Official URL:** https://emax-usa.com/products/emax-rs1106-micro-brushless-motor-1-pcs
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 138. EMAX ECO 1404 4000KV (`emax-eco-1404-4000kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/emax-eco-1404-4000kv.jpg`
- **Official URL:** https://emax-usa.com/products/eco-micro-1404-brushless-motor
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 139. iFlight XING-E Pro 2806 1300KV (`iflight-xing-e-pro-2806-1300kv`)

- **Tier:** 4 — Easy-match: props, batteries, cameras, motors
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Motors (`motors`)
- **Preset part:** no
- **Image path:** `public/parts/motors/iflight-xing-e-pro-2806-1300kv.jpg`
- **Official URL:** https://shop.iflight.com/xing-x2806-5-fpv-nextgen-motor-pro1001
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 140. AKK A3 Nano VTX Park (`akk-a3-nano-vtx-park`)

- **Tier:** 5 — Receivers / VTX
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** VTX (`vtx`)
- **Preset part:** no
- **Image path:** `public/parts/vtx/akk-a3-nano-vtx-park.jpg`
- **Official URL:** https://www.akktek.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** AKK official store (akktek.com) blocks automated fetch.

### 141. AKK A5 Nano VTX (`akk-a5-nano-vtx`)

- **Tier:** 5 — Receivers / VTX
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** VTX (`vtx`)
- **Preset part:** no
- **Image path:** `public/parts/vtx/akk-a5-nano-vtx.jpg`
- **Official URL:** https://www.akktek.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** AKK official store (akktek.com) blocks automated fetch.

### 142. Radiomaster ER5 915 LR (`radiomaster-er5-915-lr`)

- **Tier:** 5 — Receivers / VTX
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Receiver (`receiver`)
- **Preset part:** no
- **Image path:** `public/parts/receivers/radiomaster-er5-915-lr.jpg`
- **Official URL:** https://www.radiomasterrc.com/products/bandit-br1-expresslrs-receiver
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 143. RushFPV Nano VTX Park (`rush-nano-vtx-park`)

- **Tier:** 5 — Receivers / VTX
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** VTX (`vtx`)
- **Preset part:** no
- **Image path:** `public/parts/vtx/rush-nano-vtx-park.jpg`
- **Official URL:** https://rushfpv.net/products/tank-tiny-vtx
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 144. GEPRC Rocket Lite 75 Frame (`geprc-rocket-lite-75-frame`)

- **Tier:** 6 — Frames
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/geprc-rocket-lite-75.jpg`
- **Official URL:** https://geprc.com/product-category/frame-kit/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No GEPRC Rocket Lite 75 frame kit product page on geprc.com.

### 145. TBS Source One 7 LR Frame (`tbs-source-one7-lr-frame`)

- **Tier:** 6 — Frames
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/tbs-source-one7-lr.jpg`
- **Official URL:** https://github.com/tbs-trappy/source_one
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** No TBS Source One 7 open-source repository or product page with isolated frame packshot.

### 146. NewBeeDrone 75 Pro Frame (`newbee-drone-75-pro-frame`)

- **Tier:** 6 — Frames
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Frame (`frame`)
- **Preset part:** no
- **Image path:** `public/parts/frames/newbee-drone-75-pro.jpg`
- **Official URL:** https://www.newbeedrone.com/products/newbeedrone-75mm-cockroach75-brushless-extreme-durable-frame
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 147. Aikon 65A LR ESC (`aikon-65a-lr-esc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/aikon-65a-lr-esc.jpg`
- **Official URL:** https://shop.aikon.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Aikon official store (shop.aikon.com) unreachable from automated fetch.

### 148. MEPS Konvex 55A LR ESC (`meps-konvex-55a-lr-esc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Official source blocked (`official_source_blocked`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/meps-konvex-55a-lr-esc.jpg`
- **Official URL:** https://www.mepsking.com/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** MEPS official store API returns no products; no verified Konvex 55A LR URL.

### 149. Diatone Mamba F55 LR ESC (`diatone-mamba-f55-lr-esc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/diatone-mamba-f55-lr-esc.jpg`
- **Official URL:** https://www.diatone.us/products/mamba-f55_bls-dshot600-4in1-esc-40a-6s-2
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Diatone F55_BLS page packshot filename references F50; LR suffix not a separate SKU.

### 150. GEPRC F405 20x20 Mini (`geprc-f405-20x20-mini`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** No clean packshot found (`no_clean_packshot_found`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/geprc-f405-20x20-mini.jpg`
- **Official URL:** https://geprc.com/product/gep-f405-hd-v3-flight-controller/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** GEPRC store lists GEP-F405-HD variants only; no F405 20x20 Mini SKU.

### 151. BETAFPV Brushless 1S AIO ESC (`betafpv-brushless-1s-aio-esc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/betafpv-brushless-1s-aio-esc.jpg`
- **Official URL:** https://betafpv.com/products/f4-1s-5a-aio-brushless-flight-controller
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Manufacturer page is a combined FC+ESC stack; catalog line is FC-only or ESC-only.

### 152. Happymodel HappyWhoop AIO ESC (`happymodel-happywhoop-aio-esc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/happymodel-happywhoop-aio-esc.jpg`
- **Official URL:** https://www.happymodel.cn/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Manufacturer page is a combined FC+ESC stack; catalog line is FC-only or ESC-only.

### 153. Diatone Mamba H743 LR FC (`diatone-mamba-h743-lr-fc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/diatone-mamba-h743-lr-fc.jpg`
- **Official URL:** https://www.diatone.us/products/mb-mk4-h743-v2-fc
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Manufacturer page is a combined FC+ESC stack; catalog line is FC-only or ESC-only.

### 154. GEPRC GEP AIO 1S FC (`geprc-gep-aio-1s-fc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/geprc-gep-aio-1s-fc.jpg`
- **Official URL:** https://geprc.com/product/gep-taker-f411-12a-e-12s-aio/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Manufacturer page is a combined FC+ESC stack; catalog line is FC-only or ESC-only.

### 155. Happymodel HappyWhoop AIO FC (`happymodel-happywhoop-aio-fc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Should remain SVG placeholder (`should_remain_svg_placeholder`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/happymodel-happywhoop-aio-fc.jpg`
- **Official URL:** https://www.happymodel.cn/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Manufacturer page is a combined FC+ESC stack; catalog line is FC-only or ESC-only.

### 156. Diatone Mamba F35 Mini 35A (`diatone-mamba-f35-mini-esc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** ESC (`esc`)
- **Preset part:** no
- **Image path:** `public/parts/escs/diatone-mamba-f35-mini.jpg`
- **Official URL:** https://www.diatone.us/products/mb-f40_128k-bl32-mini-esc
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 157. BETAFPV F411 1S AIO FC (`betafpv-f411-1s-aio-fc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/betafpv-f411-1s-aio-fc.jpg`
- **Official URL:** https://betafpv.com/products/f4-1s-5a-aio-brushless-flight-controller
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 158. GEPRC F745 LR FC (`geprc-f745-lr-fc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/geprc-f745-lr-fc.jpg`
- **Official URL:** https://geprc.com/product/geprc-taker-h743-mini-flight-controller/
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.

### 159. Matek H743 Wing LR FC (`matek-h743-wing-lr-fc`)

- **Tier:** 7 — Electronics: FC / ESC / stack / AIO
- **Classification:** Unsafe — likely mismatch (`unsafe_likely_mismatch`)
- **Category:** Flight controller (`flightController`)
- **Preset part:** no
- **Image path:** `public/parts/flight-controllers/matek-h743-wing-lr-fc.jpg`
- **Official URL:** https://www.mateksys.com/?portfolio=h743-wlite
- **Preferred image URL:** —
- **URL confidence:** low
- **Reason:** Prior manual review flagged wrong product, variant, or composite image.
