# Catalog replacement plan

Planning document for strengthening thin build-class selectors and migrating preset-linked cleanup candidates **after Batch 1B-core**. No catalog edits, preset changes, or image fetches in this pass.

**Generated:** 2026-06-27  
**Machine-readable candidates:** `docs/catalog-replacement-candidates.json`  
**Catalog state:** 273 parts · 95 / 273 images · 81 open cleanup candidates

### Batch R1 applied (2026-06-27)

Added **3** non-preset strengthening parts in `src/data/parts.js`. No removals, preset edits, or image fetches.

| Part ID | Category | Build class(es) |
| --- | --- | --- |
| `iflight-blitz-mini-e55s-4in1` | ESC | 3.5" Freestyle, Cinewhoop |
| `iflight-aos-3-5-v5-1-frame` | frame | 3.5" Freestyle |
| `betafpv-pavo35-frame-kit` | frame | Cinewhoop |

Selector depth after R1: 3.5" ESC **4** · cinewhoop ESC **4** · 3.5" frames **7** · cinewhoop frames **8**.

### Batch R2 applied (2026-06-27)

Preset migrations only — **3 parts added**, **3 preset slots updated**. Old catalog entries retained.

| Preset | Slot | From | To |
| --- | --- | --- | --- |
| Cinewhoop Cruiser | frame | `geprc-cinelog35-v2` | `geprc-gep-cl35-v3-frame` |
| Cinewhoop Cruiser | motors | `iflight-xing-2005-2550` | `geprc-speedx2-2105-5-2650kv` |
| 7" Long Range Explorer | frame | `rekon7-pro-lr` | `rekon-hglrc-rekon7-pro-v2-frame` |

**Catalog:** 270 → **273** parts · presets **6/6 OK**

**Preset stat deltas (flagged):**

| Preset | Mass | T:W | Flight time | Flags |
| --- | --- | --- | --- | --- |
| Cinewhoop Cruiser | 488g → 498g (+2%) | 5.9 → 6.29 (+6.6%) | 3–4 min (unchanged) | None |
| 7" LR Explorer | 767g → **1008g (+31%)** | 11.83 → **9.0 (−24%)** | **8–11 → 6–9 min (−21%)** | Weight, T:W, flight time |

7" LR shift reflects correcting frame mass to official Rekon7 PRO V2 bare-kit weight (383g vs legacy 142g complete-aircraft listing). No new compatibility warnings.

**Ready for removal batch (not removed yet):** `geprc-cinelog35-v2`, `iflight-xing-2005-2550`, `rekon7-pro-lr`

---

## Why this plan exists

Batch 1B-core removed 27 discontinued placeholder-only parts. That was safe for presets but left two ESC pools at the minimum useful depth:

| Build class | Category | Options now |
| --- | --- | ---: |
| 3.5" Freestyle | ESC | **3** |
| Cinewhoop | ESC | **3** |

Three preset parts remain flagged for cleanup (`geprc-cinelog35-v2`, `iflight-xing-2005-2550`, `rekon7-pro-lr`) but cannot be removed until verified frame-kit / motor replacements exist. **Batch 1B-frames-deferred** (16 frame removals) must not run until 3.5" and cinewhoop frame pools are replenished.

---

## Priority overview

| Priority | Focus | Count |
| --- | --- | ---: |
| **P1** | ESC depth + preset migrations + critical 3.5" frames | 6 |
| **P2** | Secondary ESC/frame adds + LR fallback frame | 5 |
| **P3** | Manual-review resolutions (non-blocking) | 1 add candidate |

**Rule:** Official manufacturer URLs only — no retailer source-of-truth.

---

## 1. Thin ESC categories — proposed additions

Current 3.5" / cinewhoop ESC pool (shared across both classes):

- `aikon-f7-mini-35a` (stack-only imagery)
- `speedybee-bls-35a-4in1` (preset; stack imagery)
- `diatone-mamba-f35-mini-esc` / `geprc-gep-f411-35a-aio-esc` (cinewhoop only for GEPRC half)

### P1 — iFlight BLITZ Mini E55S 4-in-1 ESC

| Field | Value |
| --- | --- |
| Proposed ID | `iflight-blitz-mini-e55s-4in1` |
| Build classes | 3.5" Freestyle, Cinewhoop |
| Official URL | [shop.iflight.com BLITZ Mini E55S](https://shop.iflight.com/BLITZ-Mini-E55S-4-IN-1-ESC-Pro2062) |
| Specs (manufacturer) | 55A cont / 65A burst · 2–6S · 20×20 · 11.3g · ~$45.99 |
| Clean official image | Likely yes (product gallery) |
| Preset impact | None |
| Strengthens | Brings ESC pool from 3 → 4+ before any further removals |

### P2 — iFlight BLITZ Mini E55 4-in-1 ESC (BLHeli32)

| Field | Value |
| --- | --- |
| Proposed ID | `iflight-blitz-mini-e55-4in1` |
| Official URL | [shop.iflight.com BLITZ Mini E55](https://shop.iflight.com/BLITZ-Mini-E55-4-IN-1-2-6S-ESC-Pro1663) |
| Specs | 55A · BLHeli32 · 20×20 · 2–6S |
| Preset impact | None |

### P2 — GEPRC GEP-F722-45A AIO V2

| Field | Value |
| --- | --- |
| Proposed ID | `geprc-gep-f722-45a-aio` |
| Build class | Cinewhoop |
| Official URL | [geprc.com GEP-F722-45A AIO V2](https://geprc.com/product/geprc-gep-f722-45a-aio/) |
| Specs | 45A · 25.5 AIO · 8.8g · F722 · 2–6S |
| Note | Combined FC+ESC; model as AIO pair or stack entry when added |
| Used on | Official CineLog35 V3 platform |

### P3 — BETAFPV F4/F722 35A AIO (ESC half)

| Field | Value |
| --- | --- |
| Proposed ID | `betafpv-f4-35a-aio-esc-half` |
| Official URL | [betafpv.com F722 35A AIO](https://betafpv.com/products/f722-aio-35a-brushless-flight-controller) |
| Note | Combined AIO board; follow existing GEPRC AIO-half catalog pattern |

**Target after P1+P2 adds:** ≥5 ESC options per thin build class before further catalog pruning.

---

## 2. 3.5" Freestyle frames — add before frame removals

Applying **Batch 1B-frames-deferred** today would leave 3.5" Freestyle frames at **6 → 1** (`aos-3-5-v5` only). Add verified frame kits first:

### P1 — iFlight AOS 3.5 V5.1 Frame Kit

| Field | Value |
| --- | --- |
| Proposed ID | `iflight-aos-3-5-v5-1-frame` |
| Replaces / strengthens | Successor to in-catalog `aos-3-5-v5`; safety net before removing Chimera3, Taycan35, Explorer35, Pavo3516, Rocket 3.5 |
| Official URL | [shop.iflight.com AOS 3.5 V5.1](https://shop.iflight.com/AOS-3.5-V5-FPV-Frame-Kit-Pro2126) |
| Specs | 62g · 9×9 / 12×12 motors · 20×20 / 25.5 stacks · O4 compatible |
| Clean official image | Likely yes |

### P1 — BETAFPV Pavo35 Brushless Whoop Frame

| Field | Value |
| --- | --- |
| Proposed ID | `betafpv-pavo35-frame-kit` |
| Replaces / strengthens | Official replacement path for deprecated `betafpv-pavo3516-frame` |
| Official URL | [betafpv.com Pavo35 frame](https://betafpv.com/products/pavo35-brushless-whoop-frame) |
| Build classes | 3.5" Freestyle, Cinewhoop (ducted) |

### P2 — iFlight ProTek35 V1.4 / AOS Cine35 V5

| Frame | Official URL | Role |
| --- | --- | --- |
| ProTek35 V1.4 | [shop.iflight.com ProTek35](https://shop.iflight.com/ProTek35-V1.4-CineWhoop-Frame-Kit-Pro2006) | Cinewhoop ducted option before Chimera35/CineBee removals |
| AOS Cine35 V5 | [shop.iflight.com AOS Cine35 V5](https://shop.iflight.com/AOS-Cine35-V5-Frame-Kit-Pro2297) | Cinematic ducted 3.5" alternative |

**Minimum frame depth target:** ≥4 verified frame kits per class before Batch 1B-frames sub-batches.

---

## 3. Preset-linked cleanup — migration plan (later pass)

Do **not** remove these until replacement parts are in catalog and `validate:stats` is re-run.

### Cinewhoop Cruiser — frame

| Current (remove candidate) | Proposed replacement |
| --- | --- |
| `geprc-cinelog35-v2` — complete BNF aircraft | `geprc-gep-cl35-v3-frame` — [GEP-CL35 V3 frame kit](https://geprc.com/product/gep-cl35-v3-frame/) |

- **Risk:** medium — preset weight/stack mounts should remain compatible (142mm ducted 3.5")
- **Priority:** P1
- **Image:** GEPRC frame kit page has product imagery

### Cinewhoop Cruiser — motors

| Current | Proposed replacement |
| --- | --- |
| `iflight-xing-2005-2550` — legacy XING 2005, weak packshot | `geprc-speedx2-2105-5-2650kv` — [SPEEDX2 2105.5 2650KV](https://geprc.com/product/geprc-speedx2-2105-5-2450kv-2650kv-3450kv-motor/) |

- **Rationale:** Official motor on current GEPRC CineLog35 V2/V3 aircraft (2650KV variant)
- **Risk:** medium — KV/cell recommendation shifts; re-validate preset stats after migration
- **Priority:** P1

### 7" Long Range Explorer — frame

| Current | Proposed replacement |
| --- | --- |
| `rekon7-pro-lr` — complete aircraft | `rekon-hglrc-rekon7-pro-v2-frame` — [Rekon FPV 7" frame kit collection](https://rekonfpv.com/collections/7-inch-frame-kit) |

- **Fallback:** `iflight-chimera7-pro-v2-o4-frame` — [Chimera7 Pro V2 O4 kit](https://shop.iflight.com/Chimera7-O4-Frame-Kit-Pro2286) if Rekon packshot/spec verification fails
- **Risk:** high — verify isolated frame-kit imagery on Rekon FPV store before preset swap
- **Priority:** P1

---

## 4. Manual FPV review queue (16 candidates)

| Part ID | Category | Recommended resolution | Priority |
| --- | --- | --- | --- |
| `geprc-mark4-frame` | frame | Manual SKU verify before any Mark4 action | P1 |
| `aikon-65a-lr-esc` | esc | Keep SVG until Aikon store reachable | P3 |
| `ethix-lithium5-frame` | frame | Retry Ethix official store | P3 |
| `gn-1s-550-bt2` | battery | Map to verified GNB 1S 550 BT2.0 | P2 |
| `gnb-4s-1100-park` | battery | Replace with verified GNB 4S or remove | P2 |
| `gnb-4s-1300-cine` | battery | Replace with verified GNB/Tattu cinewhoop pack | P2 |
| `gnb-4s-750-mini` | battery | Replace or remove (404) | P3 |
| `gnb-6s-2500-lr-lipo` | battery | Replace or remove | P2 |
| `hqprop-t3x2-5x3-515` | props | Map to current HQProp 5" SKU | P3 |
| `hypetrain-acer-2306-1950kv` | motors | Remove — no OEM store | P2 |
| `hypetrain-blaster-2450` | motors | Remove — no OEM store | P2 |
| `imm-rc-fusion-v2-elrs` | receiver | Keep SVG until ImmersionRC accessible | P3 |
| `jhemcu-ep28-elrs` | receiver | Fix JHEMCU URL or remove | P3 |
| `meps-konvex-55a-lr-esc` | esc | Verify MEPS Konvex listing or remove | P2 |
| `tbs-source-one7-lr-frame` | frame | Remove or replace with validated 7" frame | P2 |
| `walksnail-avatar-micro` | camera | Confirm Walksnail Micro official SKU/page | P2 |

---

## 5. Batch 1B-frames — remain deferred

**Recommendation: yes — keep Batch 1B-frames deferred.**

| Reason | Detail |
| --- | --- |
| 3.5" frame cliff | Full batch → 6 frames down to 1 |
| Cinewhoop frames | 7 → 3 after full batch |
| 7" LR frames | 6 → 3 after full batch |
| Prerequisite | Add P1 frame kits + run preset migrations first |

Suggested apply order after replacements:

1. **1B-frames / 7" LR** — remove `flywoo-explorer7-lr-frame`, `geprc-crocodile7-lr-frame` (non-preset, clear evidence)
2. **1B-frames / cinewhoop** — remove legacy Chimera35/CineBee/Explorer cine frames after ProTek35 + CL35 V3 added
3. **1B-frames / 3.5" park last** — only after AOS V5.1 + Pavo35 in catalog

---

## 6. Recommended execution batches

### Batch R1 — Strengthen selectors (no preset edits)

1. Add `iflight-blitz-mini-e55s-4in1` (ESC)
2. Add `iflight-aos-3-5-v5-1-frame` + `betafpv-pavo35-frame-kit` (frames)
3. Re-run `validate:stats` · `images:completion-queue` · `audit:all-images`

### Batch R2 — Preset migrations

1. Add `geprc-gep-cl35-v3-frame` + `geprc-speedx2-2105-5-2650kv`
2. Update Cinewhoop Cruiser preset frame + motors
3. Add Rekon7 PRO V2 frame · migrate 7" LR Explorer preset
4. Remove old preset-linked catalog entries (`geprc-cinelog35-v2`, `iflight-xing-2005-2550`, `rekon7-pro-lr`)

### Batch R3 — Secondary adds + manual review

1. BLITZ E55 BLHeli32 · GEP F722 AIO · ProTek35 / AOS Cine35 frames
2. Resolve P2 manual-review items (GNB batteries, Hypetrain motors, MEPS ESC)
3. Re-evaluate Batch 1B-frames sub-batches

---

## References

- Cleanup candidates: `docs/catalog-cleanup-candidates.json`
- Batch 1B dry run: `docs/CATALOG_CLEANUP_BATCH_1B_DRY_RUN.md`
- Image research: `docs/CATALOG_IMAGE_REVIEW_NOTES.md`
- Preset sources: `docs/PRESET_IMAGE_SOURCE_RESEARCH.md`
- Replacement JSON: `docs/catalog-replacement-candidates.json`
