# 3.5" frame replacement plan (Batch R3)

Planning document for strengthening the **3.5" Freestyle** frame pool before applying deferred **Batch 1D-3.5** cleanup.

**Generated:** 2026-06-27  
**Machine-readable candidates:** `docs/three-five-frame-replacement-candidates.json`  
**Current catalog:** 266 parts · 10 × 3.5" frames · presets **6/6 OK**

### Batch R3 applied (2026-06-27)

Added **3** verified 3.5" frame kits to `src/data/parts.js` (`expansionParts`). No removals, preset edits, calculation changes, or image fetches.

| Part ID | Brand | Build class |
| --- | --- | --- |
| `geprc-gep-st35-frame` | GEPRC | 3.5" Freestyle |
| `betafpv-x-knight-35-frame-kit` | BETAFPV | 3.5" Freestyle |
| `iflight-aos-cine35-v5-frame` | iFlight | 3.5" Freestyle |

| Metric | Value |
| --- | ---: |
| Catalog before → after | 263 → **266** |
| 3.5" frames before → after | 7 → **10** |
| Image coverage | 95 / 263 → **95 / 266** |
| Preset impact | 0 |

**1D-3.5 status:** Safe to apply — projected depth after 5 removals is **5** (≥4 target).

---

## Why this plan exists

Batch **1D-3.5** would remove five deprecated 3.5" frame entries with strong evidence (404 / missing official frame-kit pages). Without replacements, selector depth drops **7 → 2**:

| Would remain | Would be removed (1D-3.5) |
| --- | --- |
| `aos-3-5-v5` | `betafpv-pavo3516-frame` |
| `iflight-aos-3-5-v5-1-frame` (R1) | `diatone-taycan35-frame` |
| | `flywoo-explorer35-frame` |
| | `geprc-rocket-3-5-frame` |
| | `iflight-chimera3-frame` |

`betafpv-pavo35-frame-kit` (R1) is in catalog but **cinewhoop-class only** — it does not count toward 3.5" freestyle depth today.

**Depth target:** ≥4 verified frame kits per class (replacement plan rule). Thin threshold: ≤3.

---

## Recommended additions (3)

All candidates are **official manufacturer frame-kit pages** — not complete BNF drones.

### P1 — GEPRC GEP-ST35 Frame

| Field | Value |
| --- | --- |
| Proposed ID | `geprc-gep-st35-frame` |
| URL | [geprc.com/product/gep-st35-frame/](https://geprc.com/product/gep-st35-frame/) |
| Type | Open 3.5" freestyle frame kit |
| Price | **$48.99** (manufacturer list) |
| Weight | **~48 g** (with 3D prints + reinforced arm) |
| Props | 3.5" |
| Stack | 20×20 / 26.5×26.5 mm |
| Camera | GP8 / Insta360 GO2 naked mount (included 3D print) |
| Official image | Likely yes |
| Stock | **Out of stock** on geprc.com (2026-06-27) |
| Risk | **medium** (stock) |

**Strengthens / replaces:** `geprc-rocket-3-5-frame` (no GEPRC Rocket 3.5 kit on official store).

---

### P1 — BETAFPV X-Knight 35 Frame Kit

| Field | Value |
| --- | --- |
| Proposed ID | `betafpv-x-knight-35-frame-kit` |
| URL | [betafpv.com/products/x-knight-35-frame-kit](https://betafpv.com/products/x-knight-35-frame-kit) |
| Type | Open carbon 3.5" freestyle / HD frame kit |
| Price | **$25.99** |
| Weight | **43.22 g** |
| Props | 3.5" (Gemfan/HQ 3520) |
| Stack | 20×20 / 26.5×26.5 mm |
| Camera | Forward-projecting mount (props out of lens view) |
| Official image | **Yes** (Shopify product gallery) |
| Stock | **Sold out** on betafpv.com (2026-06-27) |
| Risk | **medium** (stock) |

**Strengthens / replaces:** `betafpv-pavo3516-frame` (no Pavo3516 on betafpv.com); also backfills Chimera3-style open 3.5" park builds.

---

### P1 — iFlight AOS Cine35 V5 Frame Kit

| Field | Value |
| --- | --- |
| Proposed ID | `iflight-aos-cine35-v5-frame` |
| URL | [shop.iflight.com/AOS-Cine35-V5-Frame-Kit-Pro2297](https://shop.iflight.com/AOS-Cine35-V5-Frame-Kit-Pro2297) |
| Type | 3.5" cinematic / park frame kit (carbon prop guards) |
| Price | **$88.00** |
| Weight | **145 g** |
| Props | 3.5" |
| Stack | 20×20 / 25.5×25.5 mm |
| Camera | 7075 cage 19–20 mm; O3/O4 soft mount; GoPro forward/rear |
| Official image | Likely yes (gallery + assembly PDF) |
| Stock | **In stock** on shop.iflight.com |
| Risk | **low** |

**Strengthens / replaces:** diversity after removing `diatone-taycan35-frame`, `flywoo-explorer35-frame`, `iflight-chimera3-frame`. Heavier guarded kit — complements open AOS V5 / V5.1, not a duplicate.

---

## Selector depth projection

| Stage | 3.5" frames |
| --- | ---: |
| **Current** | 7 |
| After **1D-3.5** only | **2** ❌ |
| After **R3** (+3 candidates) | 10 |
| After **R3 + 1D-3.5** | **5** ✅ |
| After **R3 (+2 only) + 1D-3.5** | **4** ✅ (minimum) |

### Optional zero-add tweak

Re-tag `betafpv-pavo35-frame-kit` with `3.5-inch-freestyle` in `compatibleClasses` (already proposed dual-class in R1 docs). That adds **+1** to 3.5" depth without a new SKU — useful if only two R3 frames are added first.

---

## 1D-3.5 enablement map

| 1D-3.5 removal | Primary R3 backfill |
| --- | --- |
| `betafpv-pavo3516-frame` | `betafpv-x-knight-35-frame-kit` |
| `geprc-rocket-3-5-frame` | `geprc-gep-st35-frame` |
| `iflight-chimera3-frame` | `betafpv-x-knight-35-frame-kit` or `iflight-aos-cine35-v5-frame` |
| `diatone-taycan35-frame` | `iflight-aos-cine35-v5-frame` |
| `flywoo-explorer35-frame` | `geprc-gep-st35-frame` (ultralight open) or `iflight-aos-cine35-v5-frame` |

All five 1D-3.5 removals are coverable once **at least two** R3 frames are in catalog (prefer all three).

---

## Recommendation

### Keep **1D-3.5 deferred** until Batch R3 is applied

1. **Add** `iflight-aos-cine35-v5-frame` first (in stock, lowest risk).
2. **Add** `betafpv-x-knight-35-frame-kit` and `geprc-gep-st35-frame` when approved (accept placeholder if manufacturer stock is zero).
3. Optionally **dual-tag** `betafpv-pavo35-frame-kit` for 3.5" freestyle.
4. Re-run `validate:stats` after R3 catalog add batch.
5. Apply **1D-3.5** (5 removals) once depth ≥4.

### Apply order for R3 catalog batch

`iflight-aos-cine35-v5-frame` → `betafpv-x-knight-35-frame-kit` → `geprc-gep-st35-frame`

---

## Out of scope (this pass)

- No edits to `src/data/parts.js`
- No preset migrations
- No image fetches
- Cinewhoop-only frames (ProTek35, CL35 V3, Pavo35 ducted) — separate from open 3.5" park pool unless dual-tagged

**Related:** `docs/CATALOG_CLEANUP_BATCH_1D_FRAMES_DRY_RUN.md` · `docs/CATALOG_REPLACEMENT_PLAN.md`
