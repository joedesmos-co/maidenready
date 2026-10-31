# MaidenReady 3.2.1 — Build Calculation Integrity Report

> **Superseded for beta release:** MaidenReady 3.3 adds verified BETAFPV battery pack quantities and removes all uncleared photo candidates from public display. See `docs/MAIDENREADY_3_3_BETA_REPORT.md` for the current release candidate values.

**Date:** 2026-10-31  
**Branch:** `overhaul/main`  
**Scope:** AIO accounting, quantity/package accounting, Pavo25 variant correction, preset recalculation, regression tests  
**Production:** untouched

---

## Catalog impact

| Metric | Before 3.2.1 | After 3.2.1 |
|---|---:|---:|
| Catalog products | 328 | **333** |
| Fully verified | 0 | **0** |
| Partially verified | 84 | **89** |
| Unverified | 244 | **244** |

Five zero-purchase-cost integrated-component placeholders were added so AIO receiver/VTX roles can be represented without creating fake purchases:

- `betafpv-f4-1s-aio-elrs`
- `betafpv-matrix-5in1-elrs`
- `betafpv-matrix-3in1-elrs`
- `betafpv-f4-12a-aio-elrs`
- `betafpv-matrix-5in1-vtx`

---

## 1. Root causes found

### AIO double-counting

The builder has nine required categories, including separate FC and ESC roles. AIO boards were represented once in `flightController` and again in `esc`. The old calculation summed every category with static multipliers, so the same physical AIO board was charged and weighed twice.

There was also no distinction between:

- a standalone FC,
- a standalone 4-in-1 ESC,
- an AIO FC with an integrated ESC,
- an AIO with an integrated receiver,
- an AIO with an integrated VTX,
- an incomplete replacement board versus a complete purchasable board.

### Quantity/package conflation

`categoryMeta.priceMultiplier` and `weightMultiplier` were doing two different jobs: installed quantity and package quantity. That works for motors and simple props but cannot correctly represent:

- a prop set sold as one package of four,
- individually sold props,
- a 4-in-1 ESC as one board,
- an individual ESC needing four units,
- an AIO counted once,
- an integrated receiver/VTX with zero separate purchase cost.

### Pavo25 variant mixing

The catalog combined:

- **$2.99** — Frame without carbon fiber
- **68 g** — complete Frame Kit

The official Shopify variant data confirms:

| Variant | Price | Weight | SKU | Availability |
|---|---:|---:|---|---|
| Frame without carbon fiber | $2.99 | 31.5 g | `01090012_*` | Sold out |
| Complete Frame Kit | $31.99 | 68 g | `01090010` | Sold out |

The catalog now represents the **complete Frame Kit** only, because the incomplete replacement frame is not suitable as a complete build frame.

### Invented prop pitch

`gemfan-2218-3` had `pitch: 1.8`, which was not present in the official source. It also had no verified weight. Official data lists:

- 55.9 mm diameter
- 3 blades
- 2.32 g per set (0.58 g per prop)
- no published pitch

Pitch is now `null`, weight is verified, and top speed is shown as `N/A` instead of inventing a number.

---

## 2. Files and logic changed

| File | Change |
|---|---|
| `src/data/parts.js` | Added quantity/package metadata to `categoryMeta`; added AIO roles and `integratedInto` links; corrected Pavo25 complete kit; corrected AIO ESC prices/weights |
| `src/data/catalogSprint.js` | Added integrated ELRS/VTX placeholder parts; corrected Gemfan 2218 weight/pitch; added AIO integration metadata |
| `src/data/presets.js` | Tiny Whoop receiver now uses the integrated ELRS role; preset components recalculated |
| `src/utils/buildCalculations.js` | Added `getPartAccounting`; rewrote build totals to use installed quantity, package quantity, price basis, weight basis, integrated-host detection; added `partBreakdown`, `integrationNotes`, `accountingWarnings`, `topSpeedKnown` |
| `src/utils/savedBuilds.js` | Added `recalculateSavedBuildSnapshot` migration |
| `src/utils/compatibility.js` | Added AIO redundancy and orphaned-integrated-part warnings |
| `src/utils/grades.js` | Fixed Node ESM import extensions |
| `src/App.jsx` | Added saved-build migration; cost/mass breakdown UI; integrated price/weight labels; deduplicated row metadata |
| `src/App.css` | Added breakdown table and integration note styles |
| `tests/buildAccounting.test.js` | New unit tests for AIO, quantities, packages, variants, migration |
| `tests/presets.test.js` | All-six preset integrity and no-hard-conflict tests |
| `tests/e2e/journeys.spec.js` | AIO browser tests, GEPRC AIO total test, legacy saved-build migration test |
| `docs/MAIDENREADY_3_2_1_INTEGRITY_REPORT.md` | This report |

---

## 3. Exact preset cost and mass changes

| Preset | Before 3.2.1 | After 3.2.1 | Reason |
|---|---:|---:|---|
| Tiny Whoop Beginner | $172.38 / 44 g | **$143.40 / 42 g** | Integrated ESC and integrated ELRS no longer charged/weighed separately |
| 2.5" Outdoor Whoop | $202.38 / 201 g | **$248.39 / 203 g** | AIO full board price/weight counted once; complete Pavo25 Frame Kit; verified prop weight |
| 3.5" Park Freestyle | $319.08 / 254 g | **$319.08 / 254 g** | Separate FC/ESC, no AIO change |
| Standard 5" Freestyle | $359.38 / 584 g | **$359.38 / 584 g** | Separate FC/ESC, no AIO change |
| Cinewhoop Cruiser | $632.90 / 498 g | **$632.90 / 498 g** | Separate FC/ESC, no AIO change |
| 7" Long Range Explorer | $535.80 / 1008 g | **$535.80 / 1008 g** | Separate FC/ESC, no AIO change |

### Integrated hardware notes

- **BETAFPV F4 1S AIO:** $39.99 and 3.64 g counted once. Integrated 5A ESC and ELRS receiver are $0 / 0 g.
- **GEPRC GEP-F411-35A AIO:** $74.99 and 8.8 g counted once. Integrated 35A ESC is $0 / 0 g.
- **Matrix 5IN1:** integrated receiver and VTX placeholders are $0 / 0 g when the host AIO is selected.
- A separate receiver or ESC selected with an AIO now produces a visible redundancy caution.
- An integrated placeholder selected without its host AIO produces an orphan warning.

---

## 4. Quantity and package accounting results

The new accounting model separates:

1. **Installed quantity** — how many physical units the build uses.
2. **Package quantity** — how many units are included in one purchase.
3. **Packages needed** — `ceil(installed / package)`.
4. **Installed weight** — weight of all installed units.
5. **Purchase cost** — cost of the minimum packages needed.

Verified examples:

| Case | Installed | Package | Cost result | Mass result |
|---|---:|---:|---:|---:|
| Motors | 4 | 1 per motor | 4 × unit price | 4 × unit weight |
| Prop set of 4 | 4 | 4 | 1 × set price | 4 × prop weight |
| Individually sold props | 4 | 1 | 4 × unit price | 4 × prop weight |
| 4-in-1 ESC | 1 | 1 | 1 × board price | 1 × board weight |
| Individual ESC | 4 | 1 | 4 × unit price | 4 × unit weight |
| AIO board | 1 | 1 | 1 × full board price | 1 × full board weight |
| Integrated ESC/receiver | 1 | — | $0 | 0 g |
| Battery | 1 pack | 1 | 1 × pack price | 1 × pack weight |
| Frame | 1 complete kit | 1 | 1 × kit price | 1 × kit weight |

The browser now exposes a **Cost & mass breakdown** expander with per-category installed quantities, package counts, cost, mass, and integration notes.

---

## 5. Variant corrections

### BETAFPV Pavo25

- Catalog entry renamed **BETAFPV Pavo25 Frame Kit**.
- Price corrected to **$31.99**.
- Weight retained at **68 g** because it is the complete kit weight.
- SKU recorded as **01090010**.
- Availability recorded as **out_of_stock**.
- The $2.99 / 31.5 g replacement frame is **not** represented as a buildable frame.

### Gemfan 2218

- Removed invented 1.8" pitch.
- Weight corrected to **0.58 g per prop / 2.32 g set** from official source.
- Top speed for the 2.5" preset is now honestly **N/A**.
- Source and partial verification recorded.

No other variant mismatch was corrected without direct evidence.

---

## 6. Compatibility results

All six presets:

- resolve every category,
- have finite price, mass, thrust, T:W, flight-time estimates,
- have **zero hard compatibility warnings**.

2.5" preset top speed is **N/A** because pitch is not documented. This is intentional, not a regression.

Warnings now cover:

- AIO already includes an ESC,
- AIO already includes a receiver,
- AIO already includes a VTX,
- integrated ESC/receiver/VTX selected without its host AIO.

Compatibility still does not claim physical proof. Unverified catalog data remains visibly labeled.

---

## 7. Saved builds and share links

- Stable part IDs were preserved.
- Existing saved-build snapshots are migrated on load through `recalculateSavedBuildSnapshot`.
- Saved selected IDs are not removed.
- Share URL format is unchanged.
- A legacy AIO saved build with stale `$999 / 999 g` totals migrates to `$143 / 42 g` in the browser test.

---

## 8. Test results

Node **v22.23.4**.

| Check | Result |
|---|---|
| `npm test` | **59/59 pass** |
| `npm run validate:catalog` | **333 parts, 0 required-field errors** |
| `npm run validate:stats` | **6 presets, 0 issues** |
| `npm run audit:all-images` | **333/333 visual coverage** |
| `npm run build` | **pass** |
| `npm run test:e2e` | **30/30 pass** |

Production build:

| Asset | Size | Gzip |
|---|---:|---:|
| Main app JS | 347.61 kB | 80.43 kB |
| React vendor | 189.63 kB | 59.65 kB |
| Runtime | 0.56 kB | 0.36 kB |
| CSS | 48.82 kB | 9.05 kB |

New tests prove:

- AIO price counted once.
- AIO weight counted once.
- Integrated receiver not double-counted.
- Separate FC/ESC counted correctly.
- Individual ESC quantity is four.
- Motor quantity is four.
- Prop package cost and installed weight are correct.
- Pavo25 price and weight cannot mix variants.
- All presets calculate consistently.
- Saved build migration preserves IDs and updates totals.
- AIO redundancy and orphan integration warnings work.
- Matrix 5IN1 integrated receiver/VTX are zero-cost when hosted.

---

## 9. Remaining unreliable calculations / limitations

1. **244 catalog products remain unverified; 89 partially verified; 0 fully verified.**
2. **Battery package basis is still assumed as one pack per listing** for most battery SKUs. Multi-pack pricing has not been verified for every battery.
3. **Some AIO host prices remain unverified** (BETAFPV F411 1S, Happymodel HappyWhoop). The GEPRC and BETAFPV F4 AIO prices are source-backed.
4. **Integrated VTX/receiver placeholders exist only for documented AIOs**; other AIOs may still need placeholder coverage.
5. **Radio/transmitter compatibility is not modeled.**
6. **2.5" preset top speed is N/A** because prop pitch is not documented.
7. **Photo rights:** 99 real-photo candidates, 234 illustrations, 0 rights-cleared photos, 35/49 preset coverage.
8. **Cloudflare preview was not available** to inspect; no deployment configuration changed.

---

## 10. Beta GO / NO-GO

**NO-GO for full public launch.**

The core accounting architecture is now sound for AIO, 4-in-1 ESC, motor, prop-package, battery, and frame-kit quantities. All automated tests pass and the six presets are internally consistent.

However, the catalog still contains 244 unverified products, battery package pricing is not fully verified, some AIO host prices remain unconfirmed, and no product photography is rights-cleared. A full public launch would still overstate catalog trust.

**GO for limited beta / review deployment** with the uncertainty and photo-rights caveats visible.

No commit, push, merge, or deployment was performed.
