# Catalog cleanup Batch 1D — deferred frames dry run

Impact report for proposed removal of **deferred frame cleanup candidates** in 7" long range, cinewhoop, and 3.5" freestyle build classes. **No catalog changes applied in this pass.**

**Generated:** 2026-06-27  
**Machine-readable report:** `docs/catalog-cleanup-batch-1d-frames-dry-run.json`  
**Prior batches:** 1A · 1B-core · 1C · R1 · R2  
**Current catalog:** 270 parts · 95 with local images · presets validate 0 issues

---

## Executive summary

| Metric | Value |
| --- | ---: |
| **Batch 1D frame candidates** | **12** |
| — 1D-LR (7" long range) | 3 |
| — 1D-Cine (cinewhoop) | 4 |
| — 1D-3.5 (3.5" freestyle) | 5 |
| Preset impact if any sub-batch applied | 0 |
| Removals with local images | 0 (all SVG placeholders) |

**Recommendation:** Apply **1D-LR first**, then **1D-Cine**. **Defer 1D-3.5** until additional verified 3.5" frame kits are added (or accept a 2-frame pool).

Do **not** apply all 12 removals as a single batch — combined 3.5" frames would drop **7 → 2**.

---

## Selection criteria

### Included when

- `category === frame`
- `recommendedAction === remove_from_catalog`
- `cleanupStatus !== applied`
- not used in any preset (live check against `presetBuilds`)
- build class is one of: `7-inch-long-range`, `cinewhoop`, `3.5-inch-freestyle`
- strong evidence: `full_drone_as_frame`, `discontinued_deprecated`, `wrong_sku`, manufacturer closed, or missing official frame-kit listing
- part still exists in catalog post-1C

### Excluded from Batch 1D scope

| Reason | Parts |
| --- | --- |
| Out of scope (5" / tiny whoop) | `hglrc-zeus5-frame`, `impulserc-apexdc`, `impulserc-reverb5-frame`, `geprc-rocket-lite-75-frame` |
| Already applied (1C) | `geprc-cinelog35-v2`, `iflight-xing-2005-2550`, `rekon7-pro-lr` |

All 12 candidates were tagged **1B-frames-deferred** in the Batch 1B dry run.

---

## Selector depth — before

| Build class | Frames (before) |
| --- | ---: |
| 7" Long Range | 6 |
| Cinewhoop | 8 |
| 3.5" Freestyle | 7 |

Thin threshold: ≤3 options per category. Depth target (replacement plan): ≥4 verified frame kits per class.

---

## Sub-batch impact

### 1D-LR — 7" Long Range (3 removals)

| Part ID | Name | Issue | Risk |
| --- | --- | --- | --- |
| `flywoo-explorer7-lr-frame` | Flywoo Explorer 7 LR Frame | `full_drone_as_frame` | high |
| `geprc-crocodile7-lr-frame` | GEPRC Crocodile7 LR Frame | `discontinued_deprecated` | medium |
| `hglrc-sector7-lr-frame` | HGLRC Sector7 LR Frame | `wrong_sku` | high |

| Metric | Before → After |
| --- | ---: |
| 7" LR frames | **6 → 3** |
| Catalog | 270 → 267 |
| Image coverage | 95/270 → 95/267 |

**Frames remaining after 1D-LR:**

- `rekon-hglrc-rekon7-pro-v2-frame` (R2 addition)
- `iflight-chimera7-lr-frame`
- `tbs-source-one7-lr-frame`

**Assessment:** Safe to apply now. All three removals are invalid SKUs (complete aircraft, phantom frame, wrong size). Depth lands at 3 — at thin threshold but acceptable given R2 preset already on `rekon-hglrc-rekon7-pro-v2-frame`.

---

### 1D-Cine — Cinewhoop (4 removals)

| Part ID | Name | Issue | Risk |
| --- | --- | --- | --- |
| `flywoo-explorer35-cine-frame` | Flywoo Explorer 3.5 Cine Frame | `discontinued_deprecated` | medium |
| `geprc-cinebee35-hd-frame` | GEPRC CineBee35 HD Frame | `discontinued_deprecated` | medium |
| `iflight-chimera35-cine-frame` | iFlight Chimera35 Cine Frame | `discontinued_deprecated` | medium |
| `iflight-cidatel35-cine-frame` | iFlight Cidatel 3.5 Cine Frame | `discontinued_deprecated` | medium |

| Metric | Before → After |
| --- | ---: |
| Cinewhoop frames | **8 → 4** |
| Catalog | 270 → 266 |
| Image coverage | 95/270 → 95/266 |

**Frames remaining after 1D-Cine:**

- `geprc-gep-cl35-v3-frame` (R2 addition)
- `betafpv-pavo25-frame`
- `betafpv-pavo35-frame-kit` (R1 addition)
- `betafpv-pavo30-cine-frame`

**Assessment:** Safe to apply after **1D-LR** (or in parallel). R1+R2 additions restore depth to exactly **4** — meets ≥4 target. All evidence is legacy 404 / missing frame-kit pages.

---

### 1D-3.5 — 3.5" Freestyle (5 removals)

| Part ID | Name | Issue | Risk |
| --- | --- | --- | --- |
| `betafpv-pavo3516-frame` | BETAFPV Pavo3516 Frame | `discontinued_deprecated` | medium |
| `diatone-taycan35-frame` | Diatone Taycan 3.5 Frame | `discontinued_deprecated` | medium |
| `flywoo-explorer35-frame` | Flywoo Explorer 3.5 Frame | `discontinued_deprecated` | medium |
| `geprc-rocket-3-5-frame` | GEPRC Rocket 3.5 Frame | `discontinued_deprecated` | medium |
| `iflight-chimera3-frame` | iFlight Chimera3 Frame | `discontinued_deprecated` | medium |

| Metric | Before → After |
| --- | ---: |
| 3.5" frames | **7 → 2** |
| Catalog | 270 → 265 |
| Image coverage | 95/270 → 95/265 |

**Frames remaining after 1D-3.5:**

- `aos-3-5-v5`
- `iflight-aos-3-5-v5-1-frame` (R1 addition)

**Assessment:** **Defer.** Despite R1 `iflight-aos-3-5-v5-1-frame`, pool drops below ≥4 target. `betafpv-pavo35-frame-kit` is tagged cinewhoop in catalog and does not backfill 3.5" freestyle depth. Add P2 frames (e.g. AOS Cine35 V5 as dual-class, or another verified 3.5" kit) before applying.

---

## Combined impact (all 12 removals)

| Build class | Frames before → after | Meets ≥4 target? | Thin (≤3)? |
| --- | ---: | --- | --- |
| 7" Long Range | 6 → **3** | No | Yes |
| Cinewhoop | 8 → **4** | Yes | No |
| 3.5" Freestyle | 7 → **2** | No | Yes |

| Metric | Value |
| --- | ---: |
| Catalog | 270 → **258** |
| Image coverage | 95/270 → **95/258** |
| Preset impact | 0 |

---

## Cumulative apply order

If sub-batches are applied in recommended order (1D-LR → 1D-Cine → 1D-3.5):

| After step | Removals | Catalog | 7" LR frames | Cinewhoop frames | 3.5" frames |
| --- | ---: | ---: | ---: | ---: | ---: |
| Start | 0 | 270 | 6 | 8 | 7 |
| through 1D-LR | 3 | 267 | **3** | 8 | 7 |
| through 1D-Cine | 7 | 263 | 3 | **4** | 7 |
| through 1D-3.5 | 12 | 258 | 3 | 4 | **2** |

---

## Recommendations

### Safe to apply now

1. **1D-LR** — highest-confidence invalid entries; no preset dependency; R2 Rekon V2 frame remains.
2. **1D-Cine** — apply after or with 1D-LR; R1 `betafpv-pavo35-frame-kit` + R2 `geprc-gep-cl35-v3-frame` maintain 4-frame pool.

### Wait for replacements

- **1D-3.5** — needs at least **2 more** verified 3.5" frame kits before removal (target ≥4). Consider `iflight-aos-cine35-v5-frame` or additional park/freestyle kits from `docs/CATALOG_REPLACEMENT_PLAN.md` P2.

### Out of scope (future batch)

- `geprc-rocket-lite-75-frame` (tiny whoop)
- `hglrc-zeus5-frame`, `impulserc-apexdc`, `impulserc-reverb5-frame` (5" freestyle)

---

## Next steps

1. Apply **Batch 1D-LR** (3 parts) when approved.
2. Apply **Batch 1D-Cine** (4 parts) when approved.
3. Add 3.5" frame replacements, then re-run this dry run before **1D-3.5**.
4. Re-run `npm run validate:stats` after each applied sub-batch.
