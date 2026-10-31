# MaidenReady 3.2 — Production Readiness Release Report

**Date:** 2026-10-31  
**Branch:** `overhaul/main`  
**Checkpoint before sprint:** `04dda14`  
**Production branch:** `main` (untouched)

---

## 1. Catalog count before and after

| Metric | Before | After |
|---|---:|---:|
| Catalog products | 327 | **328** |
| Fully verified | 0 | **0** |
| Partially verified | 79 | **84** |
| Unverified | 248 | **244** |
| Deprecated | 0 | 0 |
| Rejected | 0 | 0 |

The one new product is `gemfan-45mm-3`, added from the official BETAFPV/Gemfan 45mm propeller listing:

- 45 mm diameter
- 1.5-inch pitch
- 3 blades
- 1.5 mm shaft
- 1.69 g per 4-piece set (0.42 g per prop)
- $2.49 per set
- Source: `https://betafpv.com/products/gemfan-45mm-2-blade-3-blade-propellers-1-5mm-shaft-4pcs`

No filler products were added.

---

## 2. Specifications corrected

### BETAFPV Meteor75 Pro Whoop Frame — `betafpv-meteor75-pro-frame`

Official source: `https://betafpv.com/products/meteor75-pro-brushless-whoop-frame`

| Field | Before | After |
|---|---|---|
| Price | $7.99 | **$4.99** |
| Weight | 6.2 g | **7.73 g** |
| Size | 75 mm whoop | **80.8 mm whoop** |
| Max prop | 1.6 in | **1.8 in / 45 mm** |
| Stack mount | 25.5×25.5 | **26×26** |
| Key specs | 75 mm, 1.6" | **80.8 mm, 45 mm props, 26×26 AIO** |

### BETAFPV F4 1S 5A AIO FC — `betafpv-f4-1s-aio-fc`

Official source: `https://betafpv.com/products/f4-1s-5a-aio-brushless-flight-controller-elrs-2-4g`

| Field | Before | After |
|---|---|---|
| Price | $44.99 | **$39.99** |
| Weight | 3.2 g | **3.64 g** |
| Mount | 25.5×25.5 | **26×26** |
| Description/key specs | separate FC wording | **integrated 5A ESC, ELRS, 26×26 AIO** |

### BETAFPV 1S 5A AIO ESC — `betafpv-1s-5a-aio-esc`

| Field | Before | After |
|---|---|---|
| Mount | 25.5×25.5 | **26×26** |
| Key specs | 25.5 AIO | **26×26 AIO** |
| Source metadata | partial | confirmed official source |

### BETAFPV Pavo25 Frame — `betafpv-pavo25-frame`

Official source: `https://betafpv.com/products/pavo25-frame-kit`

| Field | Before | After |
|---|---|---|
| Price | $14.99 | **$2.99** |
| Weight | 12.5 g | **68 g frame kit** |
| Motor mount | 3-hole whoop | **9×9** |
| Description | 2S outdoor whoop | **108 mm, 2.5-inch pusher cinewhoop** |
| Key specs | 2.5" ducted, 2S ready | **108 mm, 2.5" props, 68 g, 25.5 stack** |

### GEPRC GEP-F411-35A AIO — FC and ESC entries

Official source: `https://geprc.com/product/gep-f411-35a-aio-f411-fc-35a-2-6s-8bits-bls-esc-25-5mm/`

Added official source URL, `partially-verified` status, and **XT30 battery connector** metadata to the FC entry. Confirmed 35A continuous / 40A burst, 2–6S, 25.5×25.5 mount, 8.8 g total.

### AOS 3.5 V5 frame — `aos-3-5-v5`

Added official source: `https://www.aos-rc.com/designs/aos-3.5-v5`  
Marked `partially-verified`. No speculative dimensions were added.

### HGLRC Rekon7 PRO V2 frame — `rekon-hglrc-rekon7-pro-v2-frame`

Added official source: `https://www.hglrc.com/products/hglrc-rekon7-pro-v2-7-inch-long-range-frame-compatible-with-o4`  
Confirmed 383 g bare frame, 324 mm wheelbase, 19×19 motor mount, 20/30.5 FC mount. Marked `partially-verified`.

---

## 3. Parts removed or replaced

No catalog product was removed in this sprint.

The following preset selections were replaced because the previous combinations were contradicted by official manufacturer documentation:

### Tiny Whoop Beginner

| Category | Before | After |
|---|---|---|
| Frame | Meteor75 Pro frame (wrong 40 mm props / 25.5 mount) | Meteor75 Pro frame with **45 mm, 26×26** specs |
| Props | `gemfan-40mm-4blade-whoop` | **`gemfan-45mm-3`** |
| Description | 40 mm props | **45 mm props** |

### 2.5" Outdoor Whoop

The previous preset paired a 2.5-inch Pavo25 frame with 35 mm props, 1102 2S motors, and a 2S 450 mAh battery. Official Pavo25 documentation specifies 2.5-inch props, 1404-class motors, and 4S 750–850 mAh packs.

| Category | Before | After |
|---|---|---|
| Motors | `betafpv-1102-18000kv` | **`iflight-xing2-1404-4600kv`** |
| Props | `gemfan-35mm-3blade-whoop` | **`gemfan-2218-3` (2.2")** |
| Battery | `betafpv-2s-450-xt30` | **`betafpv-lava-ii-4s-580`** |
| Description | 2S Pavo25 | **4S 2.5-inch ducted cinewhoop** |

The `iflight-xing2-1404-4600kv` motor was added to the `cinewhoop` compatible class because 1404 motors are the documented Pavo25 class.

---

## 4. Starter builds verified

All six starter builds now resolve completely, have finite statistics, and produce **zero hard compatibility warnings**.

| Preset | Price | Est. mass | Flight | Hard warnings |
|---|---:|---:|---:|---:|
| Tiny Whoop Beginner | $172.38 | ~44 g | 2–3 min | 0 |
| 2.5" Outdoor Whoop | $202.38 | ~201 g | 3–4 min | 0 |
| 3.5" Park Freestyle | $319.08 | ~254 g | 3–4 min | 0 |
| Standard 5" Freestyle | $359.38 | ~584 g | 3–4 min | 0 |
| Cinewhoop Cruiser | $632.90 | ~498 g | 3–4 min | 0 |
| 7" Long Range Explorer | $535.80 | ~1008 g | 6–9 min | 0 |

Affected preset estimate changes:

- **Tiny Whoop:** $180.88 → $172.38; mass ~42 g → ~44 g.
- **2.5" Outdoor Whoop:** $199.68 → $202.38; mass ~96 g → ~201 g.

The 2.5-inch mass increase is expected because the corrected build uses a 68 g frame and a 4S pack instead of a 12.5 g frame and 2S pack.

No preset is described as physically tested or proven.

---

## 5. Real product photo coverage and rights status

| Metric | Before | After |
|---|---:|---:|
| Real-photo candidates | 101 | **99** |
| Rights-cleared photos | 0 | **0** |
| Generated illustrations | 226 | **229** |
| Fallback-only | 0 | 0 |
| Visual coverage | 328/328 | **328/328** |
| Preset real-photo coverage | 39/48 | **35/48** |

The decrease is intentional and accuracy-driven:

- The corrected Tiny Whoop preset now uses a 45 mm propeller without a vetted photo.
- The corrected 2.5-inch preset now uses accurate 1404 motors, 2.2-inch props, and a 4S pack that currently have illustrations.
- The previously downloaded `aos-3-5-v5.jpg` was an iFlight logo, not an AOS frame. It remains rejected and replaced by a generated technical illustration.

No unlicensed manufacturer image was published as rights-cleared.

---

## 6. Compatibility issues found and fixed

- Tiny Whoop frame stack and prop limits were wrong, causing the official 45 mm setup to be rejected.
- F4 1S AIO FC/ESC mount pattern was wrong (25.5 vs actual 26×26).
- 2.5-inch preset used 35 mm props on a 2.5-inch ducted frame.
- 2.5-inch preset used 2S 1102 motors on a frame documented for 4S 1404-class motors.
- GEPRC AIO battery connector was unknown; official page confirms XT30.
- All six presets now pass with no hard compatibility warnings.

Compatibility formulas were not changed in this sprint.

---

## 7. UI and functional bugs fixed

- Fixed preset browsing: all six starter builds now show by default with a class filter.
- Mobile part picker: search visible immediately, filters collapsed behind one control, active-filter count, reset action, higher result placement.
- Class-aware drone visualization: tiny whoop, 3.5", 5", cinewhoop, and 7" now have distinct silhouettes.
- Selected component names and update notices appear in the configurator stage.
- Compatibility language now uses **No known conflicts**, **Check specs**, **Incompatible**, and **No known conflicts · unverified**.
- Unverified selected parts now show an amber **Unverified** row state instead of green “No known conflicts.”
- Safe-area insets and scroll margins protect the mobile sticky summary bar.
- SEO metadata updated with current title, description, Twitter metadata, robots, and theme color.
- Sitemap last-modified date updated.

### Cloudflare / static hosting review

- No `wrangler.toml`, `_headers`, or `_redirects` configuration exists.
- The project builds to standard `dist/` output, which is compatible with the existing Cloudflare Pages setup.
- `robots.txt`, `sitemap.xml`, and `ads.txt` are present.
- Canonical URL is `https://maidenready.com/`.
- Legal pages are in-app modal routes, so one sitemap URL is correct.
- No Cloudflare preview deployment was available to inspect; production was not touched.

---

## 8. Test results

Node: **v22.23.4**

| Check | Result |
|---|---|
| `npm test` | **44/44 pass** |
| `npm run validate:catalog` | **328 parts, 0 required-field errors** |
| `npm run validate:stats` | **6 presets, 0 issues** |
| `npm run audit:all-images` | **328/328 visual coverage** |
| `npm run build` | **pass** |
| `npm run test:e2e` | **27/27 pass** |

Production build smoke check:

- Desktop builder loaded without console errors.
- Shared URL `?class=tiny-whoop&camera=betafpv-c03-camera` restored `tiny-whoop`.
- Mobile 390 px production build rendered without errors.

New tests added:

- All six starter builds resolve every category.
- All six starter builds have finite stats and zero hard warnings.
- All six starter builds load through the UI without hard incompatibility.
- Drone hotspot opens the matching category.
- Mobile picker filters expand, show active count, and reset.
- Class-aware silhouettes change with build class.
- Malformed local storage is ignored.

---

## 9. Remaining risks and launch blockers

1. **244 products remain unverified; 84 partially verified; 0 fully verified.** The catalog is not yet reliable enough to claim every spec is manufacturer-confirmed.
2. **No rights-cleared product photos.** 99 candidates and 229 illustrations remain. Preset photo coverage fell to 35/48 because inaccurate photo-backed parts were replaced with accurate illustrated parts.
3. **AIO double-counting remains a model limitation.** AIO boards are represented in both FC and ESC categories, so price and weight can be counted twice in AIO-based builds. This affects the Tiny Whoop and 2.5-inch presets.
4. **Availability/stock is not tracked.** Some verified products are sold out or discontinued; MaidenReady does not show retailer stock.
5. **Radio compatibility is not modeled.** Receiver protocol is shown, but transmitter/goggle compatibility cannot be verified.
6. **Cloudflare preview was unavailable.** Deployment settings were reviewed but not tested against a live preview.

---

## 10. GO / NO-GO

**NO-GO for full public launch.**

The app is technically stable, the six starter builds are now coherent and free of hard conflicts, and all automated checks pass. However, 244 unverified catalog entries, zero rights-cleared photos, the AIO double-counting limitation, and missing stock/radio compatibility make a “fully trustworthy production catalog” claim premature.

**GO for limited beta / review deployment** with the current caveats clearly displayed.

Do not merge to `main`, push, or deploy without explicit approval.
