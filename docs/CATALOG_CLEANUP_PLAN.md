# Catalog cleanup plan

Planning document derived from `docs/CATALOG_IMAGE_REVIEW_NOTES.md` and the exhausted image-research queue. **This pass creates the plan only** — no catalog edits, preset changes, image fetches, or deletions.

**Generated:** 2026-06-30  
**Machine-readable candidates:** `docs/catalog-cleanup-candidates.json`  
**Current image coverage:** 95 / 294 catalog · 38 / 48 presets · fetchable queue 0

### Batch 1A applied (2026-06-27)

Rename-only catalog display fixes in `src/data/parts.js` — part IDs, `imagePath`, weights, and prices unchanged. No preset or calculation edits.

| Part ID | Previous name | New name |
| --- | --- | --- |
| `lumenier-qav-s-johnnyfpv` | Lumenier QAV-S JohnnyFPV SE | Lumenier QAV-S 2 JohnnyFPV SE |
| `happymodel-se0802-22000kv` | Happymodel SE0802 22000KV | Happymodel EX0802 22000KV |

`flywoo-explorer5-frame` remains deferred pending manual SKU confirmation.

---

## Scope and constraints

| Do in this pass | Do not in this pass |
| --- | --- |
| Audit and classify cleanup candidates | Remove or rename parts |
| Document evidence and recommended actions | Change presets |
| Prioritize batches by risk | Fetch images |
| | Change weight/calculation logic |

Image research is effectively exhausted. Most remaining missing images trace to catalog data problems (wrong SKU, discontinued listings, stack splits, full-drone-as-frame entries), not missing download URLs.

---

## Candidate totals

| Metric | Count |
| --- | ---: |
| **Total cleanup candidates** | **110** |
| Used in at least one preset | 8 |
| High risk | 29 |
| Medium risk | 68 |
| Low risk | 13 |

### By issue type

| Issue type | Count | Typical fix |
| --- | ---: | --- |
| `discontinued_deprecated` | 47 | Remove from catalog or replace with successor SKU |
| `wrong_sku` | 25 | Replace with current SKU or remove |
| `stack_aio_split` | 16 | Merge FC/ESC halves or keep with SVG placeholder |
| `unverifiable_official_source` | 14 | Manual FPV review or keep with SVG |
| `full_drone_as_frame` | 6 | Remove or replace with frame-kit SKU |
| `renamed` | 2 | Rename only |

### By recommended action

| Action | Count |
| --- | ---: |
| `remove_from_catalog` | 46 |
| `replace_with_current_sku` | 24 |
| `needs_manual_fpv_review` | 16 |
| `merge_aio_stack_entries` | 13 |
| `keep_as_is` | 9 |
| `rename_only` | 2 |

---

## Highest-risk catalog issues

These 29 high-risk entries can mislead builders (wrong KV, wrong gyro, nonexistent SKU, or preset impact). Address before broad deprecated-part sweeps.

### Wrong SKU — spec mismatch (replace or remove)

| Part ID | Issue | Evidence summary |
| --- | --- | --- |
| `betafpv-1404-4600kv` | KV mismatch | Official 1404 is 4500KV; packshot bell reads 4500KV |
| `brotherhobby-2806-1400kv-lr` | Wrong motor family | Official Avenger 2806.5 is 1300KV, not 2806 1400KV LR |
| `cnhl-ministar-4s-900` | Wrong cell count | No 4S 900mAh; official 900mAh is 2S only |
| `emax-eco-1404-4000kv` | KV mismatch | Official ECO Micro 1404 is 3700KV only |
| `fpvcycle-2207-1780kv` / `fpvcycle-2207-1960` | Nonexistent SKU | FPVCycle sells 25mm 1870/2150Kv; no 2207 variants |
| `geprc-f745-lr-fc` | Wrong MCU | No F745 LR; closest is TAKER H743 MINI |
| `iflight-xing-e-pro-2806-1300kv` | KV / naming | Closest XING 2806.5 shows 1500KV on OSS asset |
| `matek-h743-slate-freestyle` | Phantom SKU | No Slate Freestyle; closest is H743-SLIM-V4 |
| `matek-h743-wing-lr-fc` | Gyro mismatch | H743-WLITE uses ICM42688; catalog specifies BMI270 |
| `radiomaster-er5-915-lr` | Wrong product | ER5 is 2.4GHz PWM; no ER5 915 SKU |
| `brotherhobby-2004-2600kv` | URL serves wrong product | Legacy URL serves Avenger 0804 content |
| `hglrc-sector7-lr-frame` / `hglrc-zeus5-frame` | Nonexistent frame SKUs | Sector D5/X5 are 5-inch only; Zeus5 substitute is different frame |

### Stack / AIO incorrectly split (merge)

| Part ID pair | Issue |
| --- | --- |
| `betafpv-brushless-1s-aio-esc` + `betafpv-f411-1s-aio-fc` | Official F4 1S 5A AIO is one board |
| `happymodel-happywhoop-aio-esc` + `happymodel-happywhoop-aio-fc` | Mobula7 AIO sold combined only |

### Full drone listed as frame (remove or replace)

| Part ID | Preset? | Issue |
| --- | --- | --- |
| `geprc-cinelog35-v2` | **Yes** — Cinewhoop Cruiser `frame` | Complete BNF aircraft, not frame kit |
| `rekon7-pro-lr` | **Yes** — 7" LR Explorer `frame` | Complete 7" LR aircraft |
| `flywoo-explorer7-lr-frame` | No | Explorer LR4 is complete aircraft |
| `iflight-nazgul-eco5-frame` | No | Complete Nazgul XL5 ECO aircraft |

### Unverifiable or defunct manufacturer sources

| Part ID | Issue |
| --- | --- |
| `hypetrain-acer-2306-1950kv` / `hypetrain-blaster-2450` | No manufacturer store; Rotor Riot retailer-only |
| `imm-rc-fusion-v2-elrs` | ImmersionRC site blocked |
| `impulserc-apexdc` / `impulserc-reverb5-frame` | ImpulseRC closed |
| `tbs-source-one7-lr-frame` | No Source One 7 repo; source_one is 5-inch only |
| `geprc-mark4-frame` | Mark4 page mismatch — needs human verification |

---

## Easy rename-only fixes

Low effort, low regression risk. No preset references.

| Part ID | Current name | Recommended name / note |
| --- | --- | --- |
| `lumenier-qav-s-johnnyfpv` | Lumenier QAV-S JohnnyFPV SE | **QAV-S 2 JohnnyFPV SE** — official page uses V2/SE naming |
| `flywoo-explorer5-frame` | Flywoo Explorer 5 Frame | Align with Flywoo Explorer LR4/O3 SKU naming after manual SKU check |

Also flagged as `renamed` with replace action (still straightforward):

| Part ID | Note |
| --- | --- |
| `happymodel-se0802-22000kv` | Official Happymodel SE0802 naming/KV variant — update catalog label to match current listing |

---

## Keep as-is — valid parts, SVG placeholders OK

These nine entries are structurally acceptable for the builder catalog but will not get clean individual packshots from official sources. **Do not delete**; accept SVG placeholders until a stack-level image or manual asset is added.

| Part ID | Why keep |
| --- | --- |
| `aikon-f7-mini-35a` | Valid stack ESC half; official imagery is FC+ESC combo |
| `iflight-succex-e-f4-50a` | Valid stack ESC half |
| `rush-blade-f7-60a-4in1` | Valid stack ESC half |
| `matek-f722-mini` / `matek-f722-std-fc` | Discontinued but historically accurate; no successor mapping required for archival builds |
| `skystars-km2207-1910kv` / `skystars-km2306-1950kv` | Official Skystars store blocked; motors remain valid choices |
| `tbs-source-one-v5` | **In Standard 5" Freestyle preset** — frame kit exists; listing confusion is naming/photo, not invalid part |
| `tbs-source-one-v6-frame` | Same as V5; keep for builder parity |

Additional parts outside the nine `keep_as_is` candidates should also remain with SVG placeholders when research notes mark them as `NO_CLEAN_PACKSHOT` or stack-only imagery — see `STACK_ONLY_INDIVIDUAL_PART_IDS` in `scripts/imageCompletionRules.js` and per-rank notes in `docs/CATALOG_IMAGE_REVIEW_NOTES.md`.

---

## Preset-affected parts (defer or plan carefully)

Eight candidate part IDs appear in presets. **Do not remove or merge in batch 1** without preset migration.

| Part ID | Preset(s) | Slot | Recommended direction |
| --- | --- | --- | --- |
| `tbs-source-one-v5` | Standard 5" Freestyle | frame | Keep; optional rename/clarify frame-kit vs PnP |
| `speedybee-f405-v4` | Standard 5" Freestyle | flightController | Merge with stack ESC or keep + SVG |
| `speedybee-bl32-50a` | Standard 5" Freestyle | esc | Pair with F405 V4 stack merge |
| `speedybee-f405-mini` | 3.5" Park Freestyle, Cinewhoop Cruiser | flightController | Stack merge candidate |
| `speedybee-bls-35a-4in1` | 3.5" Park Freestyle, Cinewhoop Cruiser | esc | Stack merge candidate |
| `iflight-xing-2005-2550` | Cinewhoop Cruiser | motors | Verify SKU vs official 2005 listing |
| `geprc-cinelog35-v2` | Cinewhoop Cruiser | frame | **High** — replace with frame-kit SKU or different cinewhoop frame |
| `rekon7-pro-lr` | 7" Long Range Explorer | frame | **High** — replace with Rekon frame kit or successor |

---

## Recommended first cleanup batch

**Goal:** Reduce catalog noise with minimal preset and calculation impact.

### Batch 1A — Rename only (same part IDs, display fixes)

1. `lumenier-qav-s-johnnyfpv` → QAV-S 2 JohnnyFPV SE  
2. `happymodel-se0802-22000kv` → align name to official SE0802 listing  

Defer `flywoo-explorer5-frame` until Flywoo SKU is confirmed manually.

### Batch 1B — Remove discontinued, non-preset entries (~43 parts)

Remove catalog lines with **no preset usage**, `recommendedAction: remove_from_catalog`, and clear 404 / discontinued evidence. Examples:

- `axisflying-2808-1150kv-lr`, `axisflying-ae2207-1960`, `axisflying-joker-2207-1920kv`
- `betafpv-pavo3516-frame`, `brotherhobby-1507-3700kv`
- `diatone-mamba-f35-cine-esc`, `diatone-taycan35-frame`
- `flywoo-explorer35-cine-frame`, `flywoo-explorer35-frame`
- `geprc-0901-11000kv`, `geprc-2005-2200kv`, `geprc-cinebee35-hd-frame`, `geprc-crocodile7-lr-frame`
- `geprc-f722-cine-mini-fc`, `geprc-gep35a-cine-esc`, `geprc-rocket-lite-75-frame`
- `newbee-0802-17500kv`, `impulserc-apexdc`, `impulserc-reverb5-frame`
- Full list: filter `catalog-cleanup-candidates.json` where `usedInPreset === false` and `recommendedAction === "remove_from_catalog"`

**Estimated count:** ~43 parts · **Risk:** medium (orphaned build selections only)

### Batch 1C — Wrong-SKU replacements, non-preset (~15 parts)

Swap part metadata to verified successor SKUs without deleting the slot category:

- `betafpv-1404-4600kv` → 4500KV variant  
- `emax-eco-1404-4000kv` → 3700KV  
- `cnhl-ministar-4s-900` → correct cell/SKU  
- `brotherhobby-2806-1400kv-lr` → Avenger 2806.5 1300KV  
- `fpvcycle-2207-*` → FPVCycle 25mm motor SKUs  
- `geprc-f745-lr-fc`, `matek-h743-slate-freestyle`, `matek-h743-wing-lr-fc`, `radiomaster-er5-915-lr`

**Risk:** high per part, but isolated from presets if batch filter excludes `usedInPreset`.

### Deferred to batch 2+

- Stack/AIO merges (SpeedyBee, BETAFPV, Happymodel) — requires FC+ESC slot modeling or preset updates  
- Preset frame swaps (`geprc-cinelog35-v2`, `rekon7-pro-lr`)  
- Manual FPV review queue (16 parts) — Hypetrain, ImmersionRC, Aikon blocked store, GEPRC Mark4, Source One 7 LR  

---

## Execution checklist (future passes)

1. **Rename batch** — update `parts.js` names only; run build; no preset changes.  
2. **Deprecated removal batch** — remove from `parts.js`; grep presets and saved builds; run build.  
3. **SKU replacement batch** — update part IDs or specs; add migration map if IDs change.  
4. **Stack merge batch** — design single stack part or linked FC/ESC entries; update presets last.  
5. **Manual review queue** — human verifies blocked/manufacturer-less brands before any deletion.

After each batch: `npm run images:completion-queue`, `npm run build`, update this plan’s summary counts.

---

## References

- Image research log: `docs/CATALOG_IMAGE_REVIEW_NOTES.md`
- Completion queue: `docs/IMAGE_COMPLETION_QUEUE.md`
- Classification rules: `scripts/imageCompletionRules.js`
- Image source metadata: `src/data/fiveInchPartImageSources.js`
- Candidate export: `docs/catalog-cleanup-candidates.json`
