# Catalog cleanup Batch 1B — dry run

Impact report for proposed removal of discontinued/deprecated catalog entries. **No catalog changes applied in this pass.**

**Generated:** 2026-06-30  
**Machine-readable report:** `docs/catalog-cleanup-batch-1b-dry-run.json`

---

## Executive summary

| Metric | Value |
| --- | ---: |
| `remove_from_catalog` candidates (total) | 46 |
| **Proposed Batch 1B removals** | **43** |
| — 1B-core (motors, ESC, FC, VTX, battery, non-thinning) | 30 |
| — 1B-frames-deferred (frame removals that thin selectors) | 13 |
| Excluded from Batch 1B | 3 |
| Preset impact if full batch applied | 0 parts |

**Recommendation:** Do **not** apply Batch 1B as a single 43-part delete. Apply **1B-core (30 parts)** first, then revisit **1B-frames-deferred (13 parts)** after confirming replacement frame SKUs for 3.5" and cinewhoop builds.

---

## Selection criteria

### Included when

- recommendedAction === remove_from_catalog
- cleanupStatus !== applied
- not used in any preset
- strong evidence (discontinued, 404, closed vendor, nonexistent SKU, complete aircraft)
- high risk only when evidence is extremely clear

### Excluded when

- preset_usage
- needs_manual_fpv_review
- replacement_candidate_needed
- weak_evidence
- high_risk_not_clear

---

## Counts

### By category

| Category | Proposed removals |
| --- | ---: |
| frame | 16 |
| motors | 14 |
| esc | 6 |
| flightController | 4 |
| vtx | 2 |
| battery | 1 |

### By build class (part may appear in multiple classes)

| Build class | Proposed removals |
| --- | ---: |
| cinewhoop | 19 |
| 3.5 inch freestyle | 9 |
| 7 inch long range | 7 |
| 5 inch freestyle | 5 |
| tiny whoop | 3 |

### Excluded from Batch 1B

| Reason | Count |
| --- | ---: |
| `preset_usage` | 3 |

Parts held back because of preset usage:

- `geprc-cinelog35-v2` — GEPRC Cinelog35 V2 — used in: Cinewhoop Cruiser (frame)
- `iflight-xing-2005-2550` — iFlight XING 2005 2550KV — used in: Cinewhoop Cruiser (motors)
- `rekon7-pro-lr` — Rekon7 Pro Long Range — used in: 7" Long Range Explorer (frame)

---

## Preset impact

No proposed Batch 1B removal is referenced by any preset. Three `remove_from_catalog` candidates were excluded solely because they appear in presets:

- **`geprc-cinelog35-v2`** (GEPRC Cinelog35 V2)
- **`iflight-xing-2005-2550`** (iFlight XING 2005 2550KV)
- **`rekon7-pro-lr`** (Rekon7 Pro Long Range)

Applying Batch 1B-core or the full dry-run list would not require preset edits.

---

## Image coverage impact

| Scenario | With image | Total parts | Ratio |
| --- | ---: | ---: | --- |
| Current catalog | 95 | 294 | 95/294 |
| Full Batch 1B (43 removals) | 95 | 251 | 95/251 |
| 1B-core only (30 removals) | 95 | 264 | 95/264 |

- Removals with local images (full batch): **0**
- Removals placeholder-only (full batch): **43**

Most proposed removals are already SVG placeholders; catalog image coverage ratio improves slightly because removed parts disproportionately lack images.

---

## Selector coverage before / after

Counts are compatible parts per build step for each build class. **After** assumes the full 43-part Batch 1B dry run.

### Tiny Whoop

| Step | Before | After | Δ |
| --- | ---: | ---: | ---: |
| frame | 5 | 4 | -1 |
| motors | 7 | 5 | -2 |

### 3.5" Freestyle

| Step | Before | After | Δ |
| --- | ---: | ---: | ---: |
| frame | 6 | 1 | -5 |
| motors | 8 | 6 | -2 |
| esc | 5 | 3 | -2 |

### 5" Freestyle

| Step | Before | After | Δ |
| --- | ---: | ---: | ---: |
| frame | 18 | 15 | -3 |
| motors | 24 | 22 | -2 |

### Cinewhoop

| Step | Before | After | Δ |
| --- | ---: | ---: | ---: |
| frame | 7 | 3 | -4 |
| motors | 9 | 4 | -5 |
| esc | 7 | 3 | -4 |
| flightController | 7 | 4 | -3 |
| battery | 7 | 6 | -1 |
| vtx | 6 | 4 | -2 |

### 7" Long Range

| Step | Before | After | Δ |
| --- | ---: | ---: | ---: |
| frame | 6 | 3 | -3 |
| motors | 8 | 5 | -3 |
| flightController | 6 | 5 | -1 |

### Selectors that become thin (≤3 options after full batch)

| Build class | Category | Before | After |
| --- | --- | ---: | ---: |
| 3.5-inch-freestyle | frame | 6 | 1 |
| 3.5-inch-freestyle | esc | 5 | 3 |
| cinewhoop | frame | 7 | 3 |
| cinewhoop | esc | 7 | 3 |
| 7-inch-long-range | frame | 6 | 3 |

**Critical:** 3.5" Freestyle **frame** would drop from **6 → 1** (only `aos-3-5-v5` remains). Cinewhoop and 7" LR frames also thin materially.

---

## Top 10 manual review before applying

| # | Part ID | Risk | In batch? | Review note |
| ---: | --- | --- | --- | --- |
| 1 | `geprc-cinelog35-v2` | high | no | Excluded: preset_usage |
| 2 | `iflight-xing-2005-2550` | medium | no | Excluded: preset_usage |
| 3 | `rekon7-pro-lr` | high | no | Excluded: preset_usage |
| 4 | `brotherhobby-2004-2600kv` | high | yes | High risk in proposed batch |
| 5 | `flywoo-explorer7-lr-frame` | high | yes | High risk in proposed batch |
| 6 | `hglrc-sector7-lr-frame` | high | yes | High risk in proposed batch |
| 7 | `hglrc-zeus5-frame` | high | yes | High risk in proposed batch |
| 8 | `impulserc-apexdc` | high | yes | High risk in proposed batch |
| 9 | `impulserc-reverb5-frame` | high | yes | High risk in proposed batch |
| 10 | `betafpv-pavo3516-frame` | medium | yes | Frame removal — check selector depth |

---

## Proposed removals — per candidate

### `axisflying-2808-1150kv-lr`

| Field | Value |
| --- | --- |
| Name | AxisFlying 2808 1150KV LR |
| Category | motors |
| Build classes | 7-inch-long-range |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-core** |
| Evidence | No AxisFlying 2808 product page. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | None — category stays >3 options after full batch |

### `axisflying-ae2207-1960`

| Field | Value |
| --- | --- |
| Name | AxisFlying AE 2207 1960KV |
| Category | motors |
| Build classes | 5-inch-freestyle |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-core** |
| Evidence | AxisFlying AE 2207 product page 404. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | None — category stays >3 options after full batch |

### `axisflying-joker-2207-1920kv`

| Field | Value |
| --- | --- |
| Name | AxisFlying Joker 2207 1920KV |
| Category | motors |
| Build classes | 5-inch-freestyle |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-core** |
| Evidence | AxisFlying Joker 2207 product page 404. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | None — category stays >3 options after full batch |

### `betafpv-pavo3516-frame`

| Field | Value |
| --- | --- |
| Name | BETAFPV Pavo3516 Frame |
| Category | frame |
| Build classes | 3.5-inch-freestyle |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-frames-deferred** |
| Evidence | No Pavo3516 frame on betafpv.com. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | 3.5-inch-freestyle/frame: 6 → 1 after full batch |

### `brotherhobby-1507-3700kv`

| Field | Value |
| --- | --- |
| Name | BrotherHobby 1507 3700KV |
| Category | motors |
| Build classes | 3.5-inch-freestyle |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-core** |
| Evidence | No BrotherHobby 1507 listing on manufacturer store. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | None — category stays >3 options after full batch |

### `brotherhobby-2004-2600kv`

| Field | Value |
| --- | --- |
| Name | BrotherHobby 2004 2600KV |
| Category | motors |
| Build classes | cinewhoop |
| Issue type | `wrong_sku` |
| Risk level | high |
| Sub-batch | **1B-core** |
| Evidence | Legacy BrotherHobby 2004 URL serves Avenger 0804 content. |
| Why safe to remove | No verifiable official SKU matches this catalog entry. Not used in any preset build. High risk tier, but evidence is unambiguous (closed vendor, complete aircraft, or nonexistent SKU). |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | None — category stays >3 options after full batch |

### `diatone-mamba-f35-cine-esc`

| Field | Value |
| --- | --- |
| Name | Diatone Mamba F35 Cine ESC |
| Category | esc |
| Build classes | cinewhoop |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-core** |
| Evidence | No Mamba F35 Cine ESC on diatone.us. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | cinewhoop/esc: 7 → 3 after full batch |

### `diatone-taycan35-frame`

| Field | Value |
| --- | --- |
| Name | Diatone Taycan 3.5 Frame |
| Category | frame |
| Build classes | 3.5-inch-freestyle |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-frames-deferred** |
| Evidence | Diatone has Taycan accessories only, not 3.5 frame kit. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | 3.5-inch-freestyle/frame: 6 → 1 after full batch |

### `flywoo-explorer35-cine-frame`

| Field | Value |
| --- | --- |
| Name | Flywoo Explorer 3.5 Cine Frame |
| Category | frame |
| Build classes | cinewhoop |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-frames-deferred** |
| Evidence | No Explorer 3.5 Cine frame kit on flywoo.net. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | cinewhoop/frame: 7 → 3 after full batch |

### `flywoo-explorer35-frame`

| Field | Value |
| --- | --- |
| Name | Flywoo Explorer 3.5 Frame |
| Category | frame |
| Build classes | 3.5-inch-freestyle |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-frames-deferred** |
| Evidence | No Explorer 3.5 frame kit on flywoo.net. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | 3.5-inch-freestyle/frame: 6 → 1 after full batch |

### `flywoo-explorer7-lr-frame`

| Field | Value |
| --- | --- |
| Name | Flywoo Explorer 7 LR Frame |
| Category | frame |
| Build classes | 7-inch-long-range |
| Issue type | `full_drone_as_frame` |
| Risk level | high |
| Sub-batch | **1B-frames-deferred** |
| Evidence | Explorer LR4 listings are complete aircraft, not frame kits. |
| Why safe to remove | Represents a complete BNF/PNP aircraft rather than a frame kit or component SKU. Not used in any preset build. High risk tier, but evidence is unambiguous (closed vendor, complete aircraft, or nonexistent SKU). |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | 7-inch-long-range/frame: 6 → 3 after full batch |

### `geprc-0901-11000kv`

| Field | Value |
| --- | --- |
| Name | GEPRC 0901 11000KV |
| Category | motors |
| Build classes | tiny-whoop |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-core** |
| Evidence | No GEPRC 0901 motor SKU on geprc.com. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | None — category stays >3 options after full batch |

### `geprc-2005-2200kv`

| Field | Value |
| --- | --- |
| Name | GEPRC 2005 2200KV |
| Category | motors |
| Build classes | cinewhoop |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-core** |
| Evidence | No GEPRC 2005 2200KV motor on geprc.com. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | None — category stays >3 options after full batch |

### `geprc-cinebee35-hd-frame`

| Field | Value |
| --- | --- |
| Name | GEPRC CineBee35 HD Frame |
| Category | frame |
| Build classes | cinewhoop |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-frames-deferred** |
| Evidence | No GEPRC CineBee35 HD isolated frame-kit page. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | cinewhoop/frame: 7 → 3 after full batch |

### `geprc-crocodile7-lr-frame`

| Field | Value |
| --- | --- |
| Name | GEPRC Crocodile7 LR Frame |
| Category | frame |
| Build classes | 7-inch-long-range |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-frames-deferred** |
| Evidence | No Crocodile7 LR frame; Crocodile Baby 4 drones only. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | 7-inch-long-range/frame: 6 → 3 after full batch |

### `geprc-f722-cine-mini-fc`

| Field | Value |
| --- | --- |
| Name | GEPRC F722 Cine Mini FC |
| Category | flightController |
| Build classes | cinewhoop |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-core** |
| Evidence | No F722 Cine Mini; GEP-F722 HD line only. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | None — category stays >3 options after full batch |

### `geprc-gep35a-cine-esc`

| Field | Value |
| --- | --- |
| Name | GEPRC GEP35A Cine ESC |
| Category | esc |
| Build classes | cinewhoop |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-core** |
| Evidence | GEPRC ESC line is Taker only; no GEP35A Cine SKU. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | cinewhoop/esc: 7 → 3 after full batch |

### `geprc-rocket-3-5-frame`

| Field | Value |
| --- | --- |
| Name | GEPRC Rocket 3.5 Frame |
| Category | frame |
| Build classes | 3.5-inch-freestyle |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-frames-deferred** |
| Evidence | No GEPRC Rocket 3.5 frame kit on geprc.com. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | 3.5-inch-freestyle/frame: 6 → 1 after full batch |

### `geprc-rocket-lite-75-frame`

| Field | Value |
| --- | --- |
| Name | GEPRC Rocket Lite 75 Frame |
| Category | frame |
| Build classes | tiny-whoop |
| Issue type | `discontinued_deprecated` |
| Risk level | low |
| Sub-batch | **1B-frames-deferred** |
| Evidence | No GEPRC Rocket Lite 75 frame kit on geprc.com. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated low with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | None — category stays >3 options after full batch |

### `happymodel-cine-2004-2400kv`

| Field | Value |
| --- | --- |
| Name | Happymodel Cine 2004 2400KV |
| Category | motors |
| Build classes | cinewhoop |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-core** |
| Evidence | No standalone Cine 2004 motor; Cine8 kit listings only. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | None — category stays >3 options after full batch |

### `hdzero-cine-nano-vtx`

| Field | Value |
| --- | --- |
| Name | HDZero Cine Nano VTX |
| Category | vtx |
| Build classes | cinewhoop |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-core** |
| Evidence | No HDZero Cine Nano VTX on hd-zero.com shop. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | None — category stays >3 options after full batch |

### `hglrc-sector7-lr-frame`

| Field | Value |
| --- | --- |
| Name | HGLRC Sector7 LR Frame |
| Category | frame |
| Build classes | 7-inch-long-range |
| Issue type | `wrong_sku` |
| Risk level | high |
| Sub-batch | **1B-frames-deferred** |
| Evidence | No Sector7 LR; HGLRC Sector D5/X5 are 5-inch only. |
| Why safe to remove | No verifiable official SKU matches this catalog entry. Not used in any preset build. High risk tier, but evidence is unambiguous (closed vendor, complete aircraft, or nonexistent SKU). |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | 7-inch-long-range/frame: 6 → 3 after full batch |

### `hglrc-tekko32-f35-mini`

| Field | Value |
| --- | --- |
| Name | HGLRC Tekko32 F35 Mini 35A |
| Category | esc |
| Build classes | 3.5-inch-freestyle |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-core** |
| Evidence | No Tekko32 F35 Mini on hglrc.com. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | 3.5-inch-freestyle/esc: 5 → 3 after full batch |

### `hglrc-zeus5-frame`

| Field | Value |
| --- | --- |
| Name | HGLRC Zeus5 Frame |
| Category | frame |
| Build classes | 5-inch-freestyle |
| Issue type | `wrong_sku` |
| Risk level | high |
| Sub-batch | **1B-core** |
| Evidence | No Zeus5 frame SKU; substitute listing is different frame. |
| Why safe to remove | No verifiable official SKU matches this catalog entry. Not used in any preset build. High risk tier, but evidence is unambiguous (closed vendor, complete aircraft, or nonexistent SKU). |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | None — category stays >3 options after full batch |

### `iflight-4s-1800-cine`

| Field | Value |
| --- | --- |
| Name | iFlight 4S 1800mAh 120C Cine |
| Category | battery |
| Build classes | cinewhoop |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-core** |
| Evidence | No iFlight 4S 1800mAh battery on official store. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | None — category stays >3 options after full batch |

### `iflight-beast-h743-cine-fc`

| Field | Value |
| --- | --- |
| Name | iFlight Beast H743 Cine FC |
| Category | flightController |
| Build classes | cinewhoop |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-core** |
| Evidence | No Beast H743 Cine FC; BLITZ Wing H743 is different product. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | None — category stays >3 options after full batch |

### `iflight-beast-h743-lr-fc`

| Field | Value |
| --- | --- |
| Name | iFlight Beast H743 LR FC |
| Category | flightController |
| Build classes | 7-inch-long-range |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-core** |
| Evidence | No Beast H743 LR FC on shop.iflight.com. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | None — category stays >3 options after full batch |

### `iflight-chimera3-frame`

| Field | Value |
| --- | --- |
| Name | iFlight Chimera3 Frame |
| Category | frame |
| Build classes | 3.5-inch-freestyle |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-frames-deferred** |
| Evidence | Legacy Chimera3 frame-kit URL 404; Chimera7 is different line. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | 3.5-inch-freestyle/frame: 6 → 1 after full batch |

### `iflight-chimera35-cine-frame`

| Field | Value |
| --- | --- |
| Name | iFlight Chimera35 Cine Frame |
| Category | frame |
| Build classes | cinewhoop |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-frames-deferred** |
| Evidence | Legacy Chimera35 Cine frame-kit URL 404. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | cinewhoop/frame: 7 → 3 after full batch |

### `iflight-cidatel35-cine-frame`

| Field | Value |
| --- | --- |
| Name | iFlight Cidatel 3.5 Cine Frame |
| Category | frame |
| Build classes | cinewhoop |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-frames-deferred** |
| Evidence | Legacy Cidatel 3.5 Cine frame-kit URL 404. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | cinewhoop/frame: 7 → 3 after full batch |

### `iflight-succexd35-cine-esc`

| Field | Value |
| --- | --- |
| Name | iFlight SucceX-D35 Cine ESC |
| Category | esc |
| Build classes | cinewhoop |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-core** |
| Evidence | Legacy SucceX-D35 URL 404 on shop.iflight.com. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | cinewhoop/esc: 7 → 3 after full batch |

### `iflight-xing2-1507-4600kv`

| Field | Value |
| --- | --- |
| Name | iFlight XING2 1507 4600KV |
| Category | motors |
| Build classes | 3.5-inch-freestyle |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-core** |
| Evidence | Legacy XING2 1507 URL 404 on shop.iflight.com. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | None — category stays >3 options after full batch |

### `iflight-xing2-2203-2350kv`

| Field | Value |
| --- | --- |
| Name | iFlight XING2 2203 2350KV |
| Category | motors |
| Build classes | cinewhoop |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-core** |
| Evidence | Legacy XING2 2203 URL 404 on shop.iflight.com. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | None — category stays >3 options after full batch |

### `impulserc-apexdc`

| Field | Value |
| --- | --- |
| Name | ImpulseRC ApexDC 5-inch |
| Category | frame |
| Build classes | 5-inch-freestyle |
| Issue type | `discontinued_deprecated` |
| Risk level | high |
| Sub-batch | **1B-core** |
| Evidence | ImpulseRC closed; no product photo source. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. High risk tier, but evidence is unambiguous (closed vendor, complete aircraft, or nonexistent SKU). |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | None — category stays >3 options after full batch |

### `impulserc-reverb5-frame`

| Field | Value |
| --- | --- |
| Name | ImpulseRC Reverb 5 Frame |
| Category | frame |
| Build classes | 5-inch-freestyle |
| Issue type | `discontinued_deprecated` |
| Risk level | high |
| Sub-batch | **1B-core** |
| Evidence | ImpulseRC closed; no product photo source. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. High risk tier, but evidence is unambiguous (closed vendor, complete aircraft, or nonexistent SKU). |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | None — category stays >3 options after full batch |

### `matek-f722-cine-mini-fc`

| Field | Value |
| --- | --- |
| Name | Matek F722 Cine Mini FC |
| Category | flightController |
| Build classes | cinewhoop |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-core** |
| Evidence | Matek F722-mini EOL; no Cine Mini FC SKU. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | None — category stays >3 options after full batch |

### `newbee-0802-17500kv`

| Field | Value |
| --- | --- |
| Name | NewBeeDrone 0802 17500KV |
| Category | motors |
| Build classes | tiny-whoop |
| Issue type | `discontinued_deprecated` |
| Risk level | low |
| Sub-batch | **1B-core** |
| Evidence | No NewBeeDrone 0802 17500KV product page. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated low with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | None — category stays >3 options after full batch |

### `rcinpower-2203-2300kv`

| Field | Value |
| --- | --- |
| Name | RCinPower 2203 2300KV |
| Category | motors |
| Build classes | cinewhoop |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-core** |
| Evidence | No RCinPower G-SERIES 2203 2300KV page. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | None — category stays >3 options after full batch |

### `rcinpower-2807-1350kv-lr`

| Field | Value |
| --- | --- |
| Name | RCinPower 2807 1350KV LR |
| Category | motors |
| Build classes | 7-inch-long-range |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-core** |
| Evidence | No RCinPower 2807 1350KV LR page. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | None — category stays >3 options after full batch |

### `rush-mini-tank-cine-vtx`

| Field | Value |
| --- | --- |
| Name | RushFPV Mini Tank Cine VTX |
| Category | vtx |
| Build classes | cinewhoop |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-core** |
| Evidence | No RushFPV Mini Tank Cine listing on rushfpv.net. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | None — category stays >3 options after full batch |

### `tmotor-2807-1300kv-lr`

| Field | Value |
| --- | --- |
| Name | T-Motor 2807 1300KV LR |
| Category | motors |
| Build classes | 7-inch-long-range |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-core** |
| Evidence | No T-Motor FPV 2807 1300KV LR on store.tmotor.com. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | None — category stays >3 options after full batch |

### `tmotor-f35a-mini-4in1`

| Field | Value |
| --- | --- |
| Name | T-Motor F35A Mini 4-in-1 |
| Category | esc |
| Build classes | 3.5-inch-freestyle |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-core** |
| Evidence | No T-Motor F35A Mini ESC on store.tmotor.com. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | 3.5-inch-freestyle/esc: 5 → 3 after full batch |

### `tmotor-pacer-f35-cine-esc`

| Field | Value |
| --- | --- |
| Name | T-Motor Pacer F35 Cine ESC |
| Category | esc |
| Build classes | cinewhoop |
| Issue type | `discontinued_deprecated` |
| Risk level | medium |
| Sub-batch | **1B-core** |
| Evidence | No T-Motor Pacer F35 Cine ESC on store.tmotor.com. |
| Why safe to remove | Discontinued or delisted; official manufacturer page missing or product retired. Not used in any preset build. Risk rated medium with corroborated image-research evidence. |
| Image coverage effect | No image coverage change (SVG placeholder). |
| Thin selector warning | cinewhoop/esc: 7 → 3 after full batch |

---

## Excluded candidates (not in Batch 1B dry run)

- **`geprc-cinelog35-v2`** (GEPRC Cinelog35 V2) — preset_usage — Official listing is complete BNF cinewhoop aircraft.
- **`iflight-xing-2005-2550`** (iFlight XING 2005 2550KV) — preset_usage — No isolated 2005 motor packshot on iFlight store.
- **`rekon7-pro-lr`** (Rekon7 Pro Long Range) — preset_usage — Official listing is complete 7-inch LR aircraft.

---

## Suggested apply order

1. **Batch 1B-core (30 parts):** motors, ESCs, FCs, VTX, batteries with discontinued/404 evidence and no preset usage.
2. **Validate selectors** for 3.5" freestyle and cinewhoop frame pools.
3. **Batch 1B-frames-deferred (13 parts):** apply in smaller groups (e.g. 7" LR frames first, then cinewhoop, then 3.5" last).
4. **Hold preset-linked removals** (`geprc-cinelog35-v2`, `rekon7-pro-lr`, `iflight-xing-2005-2550`) for preset migration batches.
