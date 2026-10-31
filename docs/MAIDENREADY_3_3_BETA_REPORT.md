# MaidenReady 3.3 — Limited Beta Release Candidate Report

**Date:** 2026-10-31  
**Branch:** `overhaul/main`  
**Production:** untouched  
**Design:** Graphite Works preserved; no redesign

---

## 1. Real products vs virtual components

| Metric | Count |
|---|---:|
| Total catalog records | **333** |
| Real, independently purchasable products | **324** |
| Virtual integrated components | **9** |

### Virtual components

**5 receiver/VTX placeholders**

- `betafpv-f4-1s-aio-elrs`
- `betafpv-matrix-5in1-elrs`
- `betafpv-matrix-3in1-elrs`
- `betafpv-f4-12a-aio-elrs`
- `betafpv-matrix-5in1-vtx`

**4 integrated ESC sections**

- `betafpv-1s-5a-aio-esc`
- `betafpv-brushless-1s-aio-esc`
- `happymodel-happywhoop-aio-esc`
- `geprc-gep-f411-35a-aio-esc`

Virtual components:

- have `isVirtual: true`,
- never appear as ordinary standalone products in the picker unless their host AIO is selected,
- contribute $0 and 0 g,
- are replaced or invalidated when the host AIO changes,
- keep stable IDs so saved builds and share URLs remain valid,
- are counted separately from real products in catalog validation.

`npm run validate:catalog` now prints:

```
Real purchasable products: 324
Virtual integrated components: 9
```

---

## 2. Quantity, pricing and weight reliability

### Corrected in 3.3

- **BETAFPV LAVA II battery packs** now use official pack prices and quantities:
  - 1S 280/320 mAh: 5-pack
  - 1S 480/580/680 mAh: 4-pack
  - 2S 580 mAh: 2-pack
  - 4S 580 mAh: 2-pack
  - 1S 450/550 mAh: 4-pack
  - 1S 300 mAh: 5-pack
  - 2S 450 mAh: 2-pack
- **2.5" preset** now pays for a 2-pack of LAVA II 4S 580 packs: $29.99 instead of $14.99.
- **AIO boards** are priced once at full board price:
  - BETAFPV F4 1S AIO: $39.99 / 3.64 g
  - GEPRC GEP-F411-35A AIO: $74.99 / 8.8 g
- **Integrated ESC sections** are $0 / 0 g and marked not sold separately.
- **Pavo25** is the complete Frame Kit: $31.99 / 68 g / SKU `01090010`, out of stock.
- **Gemfan 2218** no longer has an invented pitch; top speed is `N/A` where pitch is unknown.

### Transparency

The cost & mass breakdown now shows:

- installed quantity,
- package size,
- packages needed,
- purchase cost,
- installed mass,
- integrated components,
- integration notes,
- accounting warnings for unverified pack basis or prices.

A persistent note states:

> Prices are estimated purchase prices. Shipping, taxes, and retailer markups are excluded. Package quantity determines minimum purchase cost; installed mass counts only what is installed.

The summary also states that transmitter, goggles, charger, tools, shipping, taxes, and spare props/batteries are excluded.

### Known pricing limitations

- Tattu, CNHL, and GNB preset battery pack quantities are **not verified**; price is treated as one pack and a visible warning is shown.
- BETAFPV F411 1S AIO and Happymodel HappyWhoop AIO host prices remain unconfirmed and are flagged in accounting when used.
- No shipping, tax, or retailer markup modeling.
- Nine prop entries still have no documented weight. When selected, the UI now shows **Weight unknown** and marks total mass as partial instead of silently treating the part as 0 g.

---

## 3. Image rights and public visibility

| Image state | Count |
|---|---:|
| Publicly visible real product photos | **0** |
| Rights-cleared photos | **0** |
| Private photo candidates | **99** |
| Generated technical illustrations | **333** |
| Visual coverage | **333/333** |
| Preset real-photo coverage | **0/49** |

All 99 candidate JPGs were moved out of `public/` into:

`private/photo-candidates/parts/...`

The directory is ignored by Git. Public and production `dist/` contain **zero** JPG/PNG/WebP product candidates. A browser test verifies that a former candidate path does not return an image content type.

`PartImage` now displays a photo only when explicit license metadata is approved (`isPartPhotoApproved`). All unresolved candidates fall back to generated technical illustrations. Illustrations are labeled as illustrations, not product photography.

The interface remains premium through the class-aware SVG drone visualization and Graphite Works styling.

---

## 4. Status of all six starter builds

| Preset | Price | Est. mass | Flight | T:W | Top speed | Hard conflicts |
|---|---:|---:|---:|---:|---:|---:|
| Tiny Whoop Beginner | $143.40 | ~42 g | 2–3 min | 4.86:1 | 24–30 mph | 0 |
| 2.5" Outdoor Whoop | $263.39 | ~203 g | 3–4 min | 10.55:1 | N/A | 0 |
| 3.5" Park Freestyle | $319.08 | ~254 g | 3–4 min | 9.44:1 | 50–56 mph | 0 |
| Standard 5" Freestyle | $359.38 | ~584 g | 3–4 min | 12.57:1 | 77–97 mph | 0 |
| Cinewhoop Cruiser | $632.90 | ~498 g | 3–4 min | 6.29:1 | 26–32 mph | 0 |
| 7" Long Range Explorer | $535.80 | ~1008 g | 6–9 min | 9.00:1 | 45–50 mph | 0 |

All six:

- resolve every category,
- have finite price, mass, thrust, T:W, and flight estimates,
- have no hard compatibility warnings,
- remain labeled as starter part lists, not physically tested kits.

The 2.5" top speed is intentionally `N/A` because the propeller pitch is not documented.

---

## 5. UI, compatibility, and beginner clarity fixes

- Virtual integrated components are filtered out of pickers unless their host AIO is selected.
- Changing the AIO automatically fills integrated receiver/ESC roles.
- Changing to a standalone FC replaces orphaned virtual roles with real parts.
- Orphaned virtual parts in share URLs fall back safely.
- AIO + separate ESC/receiver/VTX produces a redundancy caution.
- An integrated component selected without its host produces an orphan warning.
- Compatibility labels remain **No known conflicts**, **Check specs**, **Incompatible**, and **No known conflicts · unverified**.
- Unverified rows remain amber.
- Added “Radio compatibility is not checked” note with the selected protocol.
- Added estimated-price inclusion/exclusion note.
- Cost & mass breakdown is available on desktop and mobile.
- Saved-build migration updates stale totals while preserving part IDs.
- No horizontal overflow or blocked touch targets at 390/600/900/1280.
- Keyboard picker open/close and focus behavior tested.
- Motor mount descriptions such as `4xM3 16mm` now match `16x16` frame patterns instead of creating a false incompatibility.
- A full beta smoke journey test covers preset load, four component changes, visualization, compatibility, breakdown, save, reload, share URL, and mobile summary.
- Photo candidates no longer publicly served.

No redesign was performed.

---

## 6. Preview deployment status

**Existing preview URL:** `https://overhaul-main.maidenready.pages.dev/`

Status: **live but stale and unprotected.**

- It returns HTTP 200 without authentication.
- It serves an older build: 327 catalog parts, no Beta feedback button, assets
  `index-CbI3A6k9.js` / `index-PgPbJUtg.css`.
- Production hosts `maidenready.com` and `maidenready.pages.dev`; the branch
  hostname confirms a Git-integrated Cloudflare Pages project.
- No Cloudflare credentials or authenticated `wrangler` session are available in
  this environment, so the preview cannot be updated here.

### Safe steps requiring approval

1. Commit the current work and push `overhaul/main` (or use Direct Upload with
   `wrangler pages deploy dist --branch overhaul-main`).
2. Confirm Cloudflare Pages settings:
   - Production branch: `main`
   - Build command: `npm run build`
   - Output directory: `dist`
   - `NODE_VERSION=22`
   - Preview deployments enabled for `overhaul/main`
3. Wait for the preview deployment and verify the new 333-record build.
4. Protect `overhaul-main.maidenready.pages.dev` with Cloudflare Access and an
   email allowlist.

See `docs/CLOUDFLARE_PREVIEW_ACCESS.md` for exact dashboard steps.

Local production preview was tested successfully at `http://localhost:4173/`.

---

## 7. Test results

Node: **v22.23.4**

| Check | Result |
|---|---|
| `npm test` | **67/67 pass** |
| `npm run validate:catalog` | **333 records; 324 real / 9 virtual; 0 required-field errors** |
| `npm run validate:stats` | **6 presets, 0 issues** |
| `npm run audit:all-images` | **333/333 illustrations; 0 public photos; 99 private candidates** |
| `npm run build` | **pass** |
| `npm run test:e2e` | **36/36 pass** |
| Production preview | **no console errors; share URL restores class; AIO totals correct** |

Production build:

| Asset | Size | Gzip |
|---|---:|---:|
| Main JS | ~350 kB | ~81 kB |
| React vendor | 189.63 kB | 59.65 kB |
| Runtime | 0.56 kB | 0.36 kB |
| CSS | ~49 kB | ~9 kB |

---

## 8. Remaining beta blockers

1. **244 catalog products remain unverified; 89 partial; 0 fully verified.**
2. **Battery pack quantity/pricing remains unverified for five preset batteries** (Tattu/CNHL/GNB). The UI warns.
3. **Some AIO host prices remain unverified** (BETAFPV F411 1S, Happymodel HappyWhoop).
4. **No rights-cleared product photos.** 99 candidates are private; 333 illustrations are public.
5. **Radio compatibility is not modeled.**
6. **2.5" preset top speed is N/A.**
7. **Cloudflare preview is not deployed**; dashboard/credential access is required.
8. **No stock/availability tracking** beyond the Pavo25 out-of-stock note.

---

## 9. Recommendation

**GO for a small, invited beta** of FPV enthusiasts.

The configurator is internally consistent, AIO/quantity accounting is now explainable, no unlicensed photos are publicly served, starter builds are coherent, and the remaining uncertainty is visibly labeled.

**NO-GO for public production launch** until catalog verification, battery pack pricing, AIO pricing, radio compatibility, and photo-rights review are complete.

A local checkpoint commit is prepared. It has **not** been pushed or deployed because Cloudflare Access protection is not confirmed.
