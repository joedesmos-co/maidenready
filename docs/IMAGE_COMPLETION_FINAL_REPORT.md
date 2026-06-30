# Image completion — final report

**Generated:** 2026-06-30  
**Pass:** Public-beta consolidated image completion

## Catalog

| Metric | Before | After |
| --- | ---: | ---: |
| Parts | 261 | **261** |
| Local images | 95 | **102** |
| Coverage | 95/261 (36%) | **102/261 (39%)** |

## Preset images

| | Before | After |
| --- | ---: | ---: |
| Covered | 38/48 | **40/48** |

## This pass

| | Count |
| --- | ---: |
| Parts removed (catalog) | **0** |
| Images added (kept) | **7** |
| Images removed (bad/mismatch) | **16** |
| Official URLs researched | 47 |
| Source files patched | 9 |
| Permanently SVG placeholder | ~97 |
| Still fetchable | **0** |
| Official source blocked | 25 |
| Mismatch risk (held) | 36 |

### Images added (clean official packshots)

- `geprc-gep-cl35-v3-frame` — Cinewhoop Cruiser preset frame
- `geprc-speedx2-2105-5-2650kv` — Cinewhoop Cruiser preset motors
- `betafpv-pavo35-frame-kit`
- `betafpv-x-knight-35-frame-kit`
- `geprc-gep-st35-frame`
- `iflight-aos-3-5-v5-1-frame`
- `iflight-aos-cine35-v5-frame`

### Images removed after review

Wrong product type, stack/composite, marketing assets, or mismatch-risk downloads including Foxeer camera/FC lines, 6-inch Badger frame, CNHL multi-pack overlay, Mach-R5 drone image for BLITZ ESC, AOS lifestyle hero, and Lumenier battery with iFlight frame scrape.

## Why 159 images remain missing

- Manufacturer sites block automated fetch or return 403/404 (Gemfan, Genstattu/Tattu, T-Motor, Aikon, GNB/Gaoneng, DAL, Azure, Skystars).
- FC+ESC stack pages for individual FC/ESC catalog entries (SpeedyBee, many AIO splits).
- Full-aircraft or GitHub-only frame listings without isolated packshots.
- Prior manual mismatch flags (Foxeer, Hypetrain substitutes, watermark motors).
- Discontinued SKUs with no verified official imagery.

## Selector depth (none below minimum)

| Build class | Frames | ESC | Motors |
| --- | ---: | ---: | ---: |
| Tiny Whoop | 5 | 3 | 5 |
| 3.5" Freestyle | 5 | 4 | 6 |
| 5" Freestyle | 18 | 16 | 22 |
| Cinewhoop | 4 | 4 | 4 |
| 7" Long Range | 3 | 6 | 5 |

## Beta readiness

**Safe to ship public beta.** Catalog cleanup batches through 1D-3.5 are complete. Image quality rules enforced — no retailer, watermark, stack-combo, or wrong-SKU product photos retained.

## Visual coverage (generated illustrations pass)

| Visual type | Count |
| --- | ---: |
| Real product JPGs | **102** |
| Generated illustrations | **159** |
| Fallback placeholder only | **0** |
| **Total visual coverage** | **261 / 261** |

Generated illustrations live under `public/parts/illustrations/`. They are labeled **Illustration** in the UI and are not manufacturer product photos. Real JPG candidates still use `imageNeedsReview` / `No verified license on file` where applicable.

Machine-readable: `docs/image-completion-final-report.json` · Illustrations: `docs/part-illustrations-manifest.json`
