# Preset image workflow

MaidenReady preset builds reference local JPG assets under `public/parts/`. When a file is missing, the app falls back to category SVG placeholders — that is expected until images are added safely.

## Folder setup

Create the standard asset folders:

```bash
npm run images:folders
```

This creates:

- `public/parts/batteries`
- `public/parts/cameras`
- `public/parts/escs`
- `public/parts/flight-controllers`
- `public/parts/frames`
- `public/parts/motors`
- `public/parts/props`
- `public/parts/receivers`
- `public/parts/vtx`

## Audit missing images

List which preset JPGs are still missing:

```bash
npm run audit:images
```

The script reads `PRESET_PART_IMAGE_TODO` from `src/data/presetPartImages.js` and checks each `expectedPath` under `public/`. It prints totals (total / found / missing) and missing paths grouped by category.

Exit code is `1` when any files are missing — useful locally, but **do not add `npm run audit:images` to the production Cloudflare build**, because the build would fail while images are still pending.

## Fetch manufacturer image candidates (developer only)

Attempt to download **manufacturer-page image candidates** for preset parts from URLs in `src/data/presetPartImageSources.js`:

```bash
npm run images:fetch-presets
```

Optional flags:

- `--include-low-confidence` — also process entries with `urlConfidence: "low"`
- `--force` — overwrite existing local JPG files

### Important warning

- This script downloads **manufacturer-source image candidates for local review only**.
- Images on manufacturer product pages are **not automatically free to use**.
- **Do not assume permission** to publish these files on MaidenReady.
- Keep `imageNeedsReview: true` and `imageLicense: "No verified license on file"` unless you have **verified permission or an explicit license** documented separately.
- Remove or replace any image if rights are unclear.
- **Prefer** your own photos, manufacturer media kits, or written permission over page scrapes.

The script:

- Reads `PRESET_PART_IMAGE_TODO` and matches `officialUrl` entries in `presetPartImageSources.js`
- Skips third-party retailers (Amazon, GetFPV, RaceDayQuads, AliExpress, etc.)
- Parses `og:image`, `twitter:image`, and `link rel="image_src"` from HTML
- Saves **JPEG only** to the expected `public/parts/.../<part-id>.jpg` paths (no image-processing dependencies)
- Prints a report: downloaded, skipped existing, skipped low-confidence, no official URL, no image found, unsupported format, failed download, and total found from `npm run audit:images`

Example workflow:

```bash
npm run images:fetch-presets
npm run audit:images
```

Manually review every downloaded file before treating it as production-ready.

After fetching or selecting candidates, review the generated report:

```bash
npm run images:report
```

Report output:

- `docs/PRESET_IMAGE_DOWNLOAD_REPORT.md` — human-readable review log (one section per candidate)
- `docs/preset-image-download-manifest.json` — machine-readable candidate metadata used to regenerate the report

The fetch script updates both files automatically at the end of `npm run images:fetch-presets`.

## Add images manually

1. Run `npm run audit:images` to see missing paths.
2. Add JPG files **exactly** at the listed paths, for example:
   - `public/parts/frames/tbs-source-one-v5.jpg`
   - `public/parts/motors/iflight-xing2-2207-1855.jpg`
3. Path names must match part IDs in `PRESET_PART_IMAGE_TODO` (`<part-id>.jpg`).

## Image rights (required)

- **Do not scrape** random store or marketplace images for public use.
- **Prefer** your own photos, manufacturer-approved assets, or properly licensed images.
- **Keep SVG placeholders** when rights are unclear — do not invent licenses.
- Update part metadata (`imageCredit`, `imageLicense`, `imageNeedsReview`) in `src/data/presetPartImages.js` or the catalog only after rights are verified.

## Verify

After adding files:

```bash
npm run audit:images
```

When all 49 preset images exist, the audit reports `Missing: 0` and exits successfully.

## Related files

| File | Purpose |
|------|---------|
| `src/data/presetPartImages.js` | Expected paths, credits, `PRESET_PART_IMAGE_TODO` |
| `scripts/auditPresetImages.js` | Checks files on disk |
| `scripts/fetchPresetImages.js` | Developer-only manufacturer-page candidate downloader |
| `scripts/presetImageDownloadReport.js` | Generates `docs/PRESET_IMAGE_DOWNLOAD_REPORT.md` |
| `scripts/createImageFolders.js` | Creates `public/parts/*` folders |
