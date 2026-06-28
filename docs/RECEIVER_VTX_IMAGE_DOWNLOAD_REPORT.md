# Receiver and VTX image download report

Developer-only review log for **receiver and VTX** manufacturer-source image **candidates**.

> **Not approved for public use.** Keep `imageNeedsReview: true` and
> `imageLicense: "No verified license on file"` until permission is verified.

Last updated: 2026-06-28T14:00:00.000Z

Last visual audit: 2026-06-28 — reviewed **22** retained JPG(s); **13** kept; **9** removed after visual audit.

## Summary

- Local JPG candidates after visual audit: **13**
- Removed after visual audit: **9**
- Skipped before download (unchanged): **4**

## Visual audit decisions

Each image was reviewed against catalog part ID, name, brand, and manufacturer source URL.

| Part ID | Brand | Final decision | Rationale |
| --- | --- | --- | --- |
| `betafpv-elrs-nano` | BETAFPV | **keep for beta** | Clear ELRS 2.4G receiver PCB; matches BETAFPV Nano receiver family. |
| `betafpv-m03-vtx` | BETAFPV | **keep for beta** | RTC6705 analog VTX PCB consistent with M03 listing; no watermark or retailer branding. |
| `dji-o3-air-unit` | DJI | **keep for beta** | Official DJI O3 Air Unit kit render (VTX module + camera + antenna); matches air-unit catalog SKU. |
| `happymodel-cine-ep2-elrs` | Happymodel | **keep with family/variant note** | Official Happymodel EP2-family PCB photo; Cine EP2 shares same hardware render as EP2 variants. |
| `happymodel-ep2-5inch-elrs` | Happymodel | **keep with family/variant note** | Same official EP1/EP2 family product photo; 5-inch catalog line maps to EP2 hardware. |
| `happymodel-ep2-elrs` | Happymodel | **keep with family/variant note** | Official EP2-family PCB with SX1280 ceramic antenna; matches preset EP2 receiver. |
| `radiomaster-er6-elrs` | RadioMaster | **keep for beta** | ER6 HV PWM receiver product shot with RadioMaster branding; exact family match. |
| `radiomaster-rp1-elrs` | RadioMaster | **keep for beta** | RP1 V1.2 nano receiver with T-antenna; exact SKU/family match. |
| `tbs-unify-pro32-hv` | TBS | **keep for beta** | TBS Unify Pro32 HV VTX with clear TBS silkscreen; exact product match. |
| `tbs-unify-pro32-nano-vtx` | TBS | **keep for beta** | Compact TBS Unify Pro32 Nano VTX PCB from official gallery; no receiver bind button present. |
| `walksnail-avatar-gt-vtx` | Walksnail | **keep for beta** | Walksnail Avatar GT VTX module side render from Caddx store; digital VTX pinout visible. |
| `walksnail-avatar-hd-v2` | Walksnail | **keep for beta** | Avatar HD V2 VTX module render; finned digital VTX form matches official listing. |
| `hdzero-freestyle-vtx` | HDZero | **keep with family/variant note** | Red finned HDZero Freestyle V2 VTX module; catalog Freestyle VTX maps to current V2 listing. |
| `frsky-r-xsr` | FrSky | **remove** | Graphic/diagram placeholder with ACCESS banner — not a product photo of R-XSR hardware. |
| `frsky-xsr-sbus` | FrSky | **remove** | Stylized XSR icon graphic — not a product photo of XSR SBUS hardware. |
| `happymodel-ep1-dual-elrs` | Happymodel | **remove** | Family photo shows single-ceramic-antenna EP2 PCB, not EP1 Dual dual-antenna hardware. |
| `tbs-crossfire-micro-v2` | TBS | **remove** | Lifestyle promo photo (person holding part + TEAM BLACKSHEEP wall banner), not isolated PCB packshot. |
| `tbs-crossfire-micro-lr` | TBS | **remove** | Same lifestyle TBS promo image as Micro V2; not an isolated Crossfire Micro LR packshot. |
| `tbs-crossfire-nano` | TBS | **remove** | Unbranded generic nano RX PCB; cannot verify Crossfire Nano RX family from visible markings. |
| `foxeer-reaper-nano-v2-vtx` | Foxeer | **remove** | Wrong product type — image is an ELRS receiver PCB (bind button, 8 MHz crystal), not a Reaper Nano V2 VTX. |
| `hdzero-race-vtx` | HDZero | **remove** | Lifestyle installed-on-quad build photo on cutting mat; not an isolated Race VTX product shot. |
| `rush-tank-solo` | RushFPV | **remove** | Promotional close-up with airflow arrows and blurred corner watermark area; not a clean manufacturer packshot. |

## Downloaded candidates kept on disk (13)

### 1. BETAFPV ELRS Lite 2.4GHz (`betafpv-elrs-nano`)

- **Category:** Receiver
- **Manufacturer/source page URL:** https://betafpv.com/products/elrs-nano-receiver
- **Local file path:** public/parts/receivers/betafpv-elrs-nano.jpg
- **Visual audit:** keep for beta
- **imageNeedsReview:** true
- **imageLicense:** No verified license on file

### 2. Happymodel EP2 ELRS (`happymodel-ep2-elrs`)

- **Category:** Receiver
- **Manufacturer/source page URL:** https://www.happymodel.cn/index.php/2022/11/07/2-4g-elrs-ep1-ep2-ep1dual-tcxo-receiver/
- **Exact image URL downloaded:** https://www.happymodel.cn/wp-content/uploads/2022/11/5.jpg
- **Local file path:** public/parts/receivers/happymodel-ep2-elrs.jpg
- **Visual audit:** keep with family/variant note
- **Family variant note:** Official Happymodel EP1/EP2 family product photo; EP2 preset SKU shares this render.
- **imageNeedsReview:** true
- **imageLicense:** No verified license on file

### 3. Happymodel EP2 2.4GHz ELRS (`happymodel-ep2-5inch-elrs`)

- **Category:** Receiver
- **Manufacturer/source page URL:** https://www.happymodel.cn/index.php/2022/11/07/2-4g-elrs-ep1-ep2-ep1dual-tcxo-receiver/
- **Exact image URL downloaded:** https://www.happymodel.cn/wp-content/uploads/2022/11/5.jpg
- **Local file path:** public/parts/receivers/happymodel-ep2-5inch-elrs.jpg
- **Visual audit:** keep with family/variant note
- **Family variant note:** Same official EP2-family PCB photo as other Happymodel EP2 catalog lines.
- **imageNeedsReview:** true
- **imageLicense:** No verified license on file

### 4. Happymodel EP2 Cine ELRS (`happymodel-cine-ep2-elrs`)

- **Category:** Receiver
- **Manufacturer/source page URL:** https://www.happymodel.cn/index.php/2022/11/07/2-4g-elrs-ep1-ep2-ep1dual-tcxo-receiver/
- **Exact image URL downloaded:** https://www.happymodel.cn/wp-content/uploads/2022/11/5.jpg
- **Local file path:** public/parts/receivers/happymodel-cine-ep2-elrs.jpg
- **Visual audit:** keep with family/variant note
- **Family variant note:** Cine EP2 uses same EP2-family hardware render from manufacturer page.
- **imageNeedsReview:** true
- **imageLicense:** No verified license on file

### 5. RadioMaster ER6 2.4GHz ELRS (`radiomaster-er6-elrs`)

- **Category:** Receiver
- **Manufacturer/source page URL:** https://radiomasterrc.com/products/er6-2-4ghz-elrs-pwm-receiver
- **Local file path:** public/parts/receivers/radiomaster-er6-elrs.jpg
- **Visual audit:** keep for beta
- **imageNeedsReview:** true
- **imageLicense:** No verified license on file

### 6. RadioMaster RP1 ELRS Nano (`radiomaster-rp1-elrs`)

- **Category:** Receiver
- **Manufacturer/source page URL:** https://radiomasterrc.com/products/rp1-expresslrs-2-4ghz-nano-receiver
- **Local file path:** public/parts/receivers/radiomaster-rp1-elrs.jpg
- **Visual audit:** keep for beta
- **imageNeedsReview:** true
- **imageLicense:** No verified license on file

### 7. BETAFPV M03 5.8GHz VTX (`betafpv-m03-vtx`)

- **Category:** VTX
- **Manufacturer/source page URL:** https://betafpv.com/products/m03-25-350mw-5-8g-vtx
- **Local file path:** public/parts/vtx/betafpv-m03-vtx.jpg
- **Visual audit:** keep for beta
- **imageNeedsReview:** true
- **imageLicense:** No verified license on file

### 8. DJI O3 Air Unit (`dji-o3-air-unit`)

- **Category:** VTX
- **Manufacturer/source page URL:** https://store.dji.com/product/dji-o3-air-unit
- **Exact image URL downloaded:** https://se-cdn.djiits.com/tpc/uploads/spu/cover/ab3dc2b84c1fc9f7542f21030d7b5c17@origin.png
- **Local file path:** public/parts/vtx/dji-o3-air-unit.jpg
- **Visual audit:** keep for beta
- **imageNeedsReview:** true
- **imageLicense:** No verified license on file

### 9. HDZero Freestyle VTX (`hdzero-freestyle-vtx`)

- **Category:** VTX
- **Manufacturer/source page URL:** https://www.hd-zero.com/product-page/freestyle-v2-vtx
- **Exact image URL downloaded:** https://static.wixstatic.com/media/967e02_09f09568327c4fb69c875cc0042046fd~mv2.png/v1/fit/w_500,h_500,q_90/file.png
- **Local file path:** public/parts/vtx/hdzero-freestyle-vtx.jpg
- **Visual audit:** keep with family/variant note
- **Family variant note:** Catalog Freestyle VTX maps to HDZero Freestyle V2 listing on manufacturer store.
- **imageNeedsReview:** true
- **imageLicense:** No verified license on file

### 10. TBS Unify Pro32 HV (`tbs-unify-pro32-hv`)

- **Category:** VTX
- **Manufacturer/source page URL:** https://www.team-blacksheep.com/products/prod:unifypro32_hv
- **Local file path:** public/parts/vtx/tbs-unify-pro32-hv.jpg
- **Visual audit:** keep for beta
- **imageNeedsReview:** true
- **imageLicense:** No verified license on file

### 11. TBS Unify Pro32 Nano VTX (`tbs-unify-pro32-nano-vtx`)

- **Category:** VTX
- **Manufacturer/source page URL:** https://www.team-blacksheep.com/products/prod:unifypro32_nano
- **Exact image URL downloaded:** https://www.team-blacksheep.com/img/gallery/DSC01594-ga.jpg
- **Local file path:** public/parts/vtx/tbs-unify-pro32-nano-vtx.jpg
- **Visual audit:** keep for beta
- **imageNeedsReview:** true
- **imageLicense:** No verified license on file

### 12. Walksnail Avatar GT VTX (`walksnail-avatar-gt-vtx`)

- **Category:** VTX
- **Manufacturer/source page URL:** https://www.caddxfpv.com/products/walksnail-avatar-gt-vtx
- **Exact image URL downloaded:** https://www.caddxfpv.com/cdn/shop/files/VTX_3c4773f1-1c89-4573-bc4a-97da242d676c.jpg?v=1776417772
- **Local file path:** public/parts/vtx/walksnail-avatar-gt-vtx.jpg
- **Visual audit:** keep for beta
- **imageNeedsReview:** true
- **imageLicense:** No verified license on file

### 13. Walksnail Avatar HD V2 VTX (`walksnail-avatar-hd-v2`)

- **Category:** VTX
- **Manufacturer/source page URL:** https://www.caddxfpv.com/products/walksnail-avatar-hd-vtx-v2-only
- **Local file path:** public/parts/vtx/walksnail-avatar-hd-v2.jpg
- **Visual audit:** keep for beta
- **imageNeedsReview:** true
- **imageLicense:** No verified license on file

## Removed after visual audit (9)

### 1. FrSky R-XSR (`frsky-r-xsr`)

- **Visual audit:** remove
- **Reason:** ACCESS-compatible receiver diagram graphic, not R-XSR hardware photo.

### 2. FrSky XSR SBUS (`frsky-xsr-sbus`)

- **Visual audit:** remove
- **Reason:** Stylized XSR icon graphic, not XSR SBUS hardware photo.

### 3. Happymodel EP1 Dual ELRS (`happymodel-ep1-dual-elrs`)

- **Visual audit:** remove
- **Reason:** Image shows EP2 single-ceramic-antenna PCB; does not represent EP1 Dual dual-antenna hardware.

### 4. TBS Crossfire Micro V2 (`tbs-crossfire-micro-v2`)

- **Visual audit:** remove
- **Reason:** Lifestyle TEAM BLACKSHEEP promo photo; not isolated Micro RX V2 packshot.

### 5. TBS Crossfire Micro LR (`tbs-crossfire-micro-lr`)

- **Visual audit:** remove
- **Reason:** Same lifestyle promo image as Micro V2; not SKU-specific packshot.

### 6. TBS Crossfire Nano RX (`tbs-crossfire-nano`)

- **Visual audit:** remove
- **Reason:** Unbranded generic nano RX PCB; Crossfire Nano family not verifiable from markings.

### 7. Foxeer Reaper Nano V2 VTX (`foxeer-reaper-nano-v2-vtx`)

- **Visual audit:** remove
- **Reason:** Wrong product type — ELRS receiver PCB (bind button), not Reaper Nano V2 VTX.

### 8. HDZero Race VTX (`hdzero-race-vtx`)

- **Visual audit:** remove
- **Reason:** Lifestyle quad build/install photo; not isolated Race VTX product image.

### 9. Rush Tank Solo 5.8GHz (`rush-tank-solo`)

- **Visual audit:** remove
- **Reason:** Promotional close-up with airflow arrows and blurred watermark corner.

## Rejected, skipped, or failed (unchanged)

### 1. AKK X2 Ultimate VTX (`akk-x2-ultimate-vtx`)

- **Status:** skipped
- **Reason:** AKK official store blocks automated fetch; no verified direct packshot URL.

### 2. ImmersionRC Fusion V2 ELRS (`imm-rc-fusion-v2-elrs`)

- **Status:** skipped
- **Reason:** Fusion family page is not a verified V2 ELRS receiver packshot.

### 3. JHEMCU EP28 2.4GHz ELRS (`jhemcu-ep28-elrs`)

- **Status:** skipped
- **Reason:** JHEMCU homepage only; no stable EP28 ELRS product URL or packshot.

### 4. Rush Tank II 5.8GHz VTX (`rush-tank-ii-vtx`)

- **Status:** skipped
- **Reason:** RushFPV Tank II product page unreachable from automated fetch.
