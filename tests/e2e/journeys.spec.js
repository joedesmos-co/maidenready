import { test, expect } from "@playwright/test";

const clearStorage = async (page) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
};

test("save, load, and delete a build", async ({ page }) => {
  await clearStorage(page);
  await page.getByRole("tab", { name: "Saved Builds" }).click();
  await page.getByLabel("Build name").fill("E2E Test Build");
  await page.getByRole("button", { name: "Save build" }).click();
  await expect(page.getByText("E2E Test Build")).toBeVisible();
  await page.getByRole("button", { name: "Load", exact: true }).first().click();
  await expect(page.getByRole("heading", { name: /Build summary/i })).toBeVisible();
  await page.getByRole("tab", { name: "Saved Builds" }).click();
  await page.getByRole("button", { name: "Delete", exact: true }).first().click();
  await expect(page.getByText("No saved builds yet")).toBeVisible();
});

test("compare two saved builds", async ({ page }) => {
  await clearStorage(page);
  await page.getByRole("tab", { name: "Saved Builds" }).click();
  await page.getByLabel("Build name").fill("Build A");
  await page.getByRole("button", { name: "Save build" }).click();
  await page.getByLabel("Build name").fill("Build B");
  await page.getByRole("button", { name: "Save build" }).click();
  await page.getByRole("tab", { name: "Compare" }).click();
  await expect(page.getByText("Build A", { exact: true })).toBeVisible();
  await expect(page.getByText("Build B", { exact: true })).toBeVisible();
  await expect(page.locator(".comparison-table")).toBeVisible();
});

test("part details drawer opens and closes", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Custom Build" }).click();
  await page.locator(".build-row-details").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.locator(".drawer-close").click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("390px mobile layout has no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("tab", { name: "Custom Build" }).click();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test("invalid shared part id falls back without crashing", async ({ page }) => {
  await page.goto("/?class=5-inch-freestyle&frame=does-not-exist");
  await expect(page.getByRole("heading", { name: /Your quad\. Your build\./i })).toBeVisible();
});

test("build class switch updates stats", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Custom Build" }).click();
  await page.locator("#build-class-select").selectOption("tiny-whoop");
  await expect(page.locator("#build-class-select")).toHaveValue("tiny-whoop");
  await expect(page.locator(".build-row-main").first()).toContainText("Meteor");
});

test("responsive breakpoints have no horizontal overflow", async ({ page }) => {
  for (const width of [390, 600, 900, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.getByRole("tab", { name: "Custom Build" }).click();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(1);
  }
});


test("part picker selects and switches parts while open", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Custom Build" }).click();
  await page.locator(".build-row-main").first().click();
  await page.getByPlaceholder(/Search 42 frame parts/i).fill("AOS 5 V5");
  const aos = page.locator(".picker-result").filter({ hasText: "AOS 5 V5" }).first();
  await aos.getByRole("button", { name: "Select", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Frame" })).toBeVisible();
  await expect(page.locator(".picker-result.selected")).toContainText("AOS 5 V5");

  await page.getByPlaceholder(/Search 42 frame parts/i).fill("ImpulseRC ApexDC");
  const apex = page.locator(".picker-result").filter({ hasText: "ImpulseRC ApexDC" }).first();
  await apex.getByRole("button", { name: "Select", exact: true }).click();
  await expect(page.locator(".picker-result.selected")).toContainText("ImpulseRC ApexDC");

  await page.getByRole("button", { name: "Close", exact: true }).click();
  await expect(page.locator(".build-row-main").first()).toContainText("ImpulseRC ApexDC");
});

test("picker shows class-incompatible parts with a reason", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Custom Build" }).click();
  await page.locator("#build-class-select").selectOption("tiny-whoop");
  await page.locator(".build-row-main").first().click();
  await page.getByPlaceholder(/Search 42 frame parts/i).fill("AOS 5 V5");
  const result = page.locator(".picker-result").filter({ hasText: "AOS 5 V5" }).first();
  await expect(result).toContainText("Not compatible with Tiny Whoop");
  await expect(result.getByRole("button", { name: "Select", exact: true })).toBeDisabled();
});

test("mobile sticky summary opens and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("tab", { name: "Custom Build" }).click();
  await expect(page.locator(".mobile-summary-bar")).toBeVisible();
  await page.getByRole("button", { name: "View summary" }).click();
  await expect(page.getByRole("dialog", { name: "Build summary" })).toBeVisible();
  await page.locator(".mobile-summary-head .drawer-close").click();
  await expect(page.getByRole("dialog", { name: "Build summary" })).toHaveCount(0);
});

test("picker locks body scroll and restores it", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Custom Build" }).click();
  await page.locator(".build-row-main").first().click();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");
  await page.keyboard.press("Escape");
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});

test("advanced summary sections expand", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Custom Build" }).click();
  await page.getByText("Performance details").click();
  await expect(page.getByText("Est. thrust")).toBeVisible();
  await page.getByText("Build assessment").click();
  await expect(page.getByText("Build personality")).toBeVisible();
});

test("details opened from picker closes back to picker", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Custom Build" }).click();
  await page.locator(".build-row-main").first().click();
  await page.locator(".picker-result").first().getByRole("button", { name: "Details" }).click();
  await expect(page.locator(".part-info-drawer")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Frame" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Frame" })).toHaveCount(0);
});

test("unverified catalog data is labeled instead of confirmed", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Custom Build" }).click();
  await expect(page.locator(".summary-status")).toContainText("unverified");
  await expect(page.locator(".compat-banner")).toContainText("unverified");
});

test("hard battery voltage mismatch is labeled and explained", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Custom Build" }).click();
  await page.locator(".build-row-main").nth(5).click();
  await page.getByPlaceholder(/Search \d+ battery parts/i).fill("GNB 4S 1500");
  const result = page.locator(".picker-result").filter({ hasText: "GNB 4S 1500mAh 120C" }).first();
  await expect(result).toContainText("Incompatible");
  await result.getByRole("button", { name: "Select", exact: true }).click();
  await expect(page.locator(".summary-status")).toContainText("Incompatible");
  await expect(page.getByText(/Motor and battery cell count do not match/i)).toBeVisible();
});

test("home class card opens presets for that class", async ({ page }) => {
  await page.goto("/");
  await page.locator(".home-class-card").filter({ hasText: "Tiny Whoop" }).click();
  await expect(page.getByRole("button", { name: "Tiny Whoop", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("heading", { name: /Starter builds/i })).toBeVisible();
});

test("class switching changes the drone silhouette", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Custom Build" }).click();
  await expect(page.locator(".drone-layout-5-inch-freestyle")).toBeVisible();
  await page.locator("#build-class-select").selectOption("tiny-whoop");
  await expect(page.locator(".drone-layout-tiny-whoop")).toBeVisible();
  await page.locator("#build-class-select").selectOption("7-inch-long-range");
  await expect(page.locator(".drone-layout-7-inch-long-range")).toBeVisible();
});

test("mobile picker filters expand and reset", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("tab", { name: "Custom Build" }).click();
  await page.locator(".config-nav-item").nth(1).click();
  await page.getByRole("button", { name: /^Filters/ }).click();
  await expect(page.getByLabel("Filter by brand")).toBeVisible();
  await page.getByLabel("Filter by brand").selectOption("T-Motor");
  await expect(page.getByRole("button", { name: /Filters \(1\)/ })).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.getByRole("button", { name: /^Filters$/ })).toBeVisible();
});

test("selected component name appears in the stage", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Custom Build" }).click();
  await page.locator(".config-nav-item").nth(1).click();
  await expect(page.locator(".config-stage-top h2")).toContainText("Motor");
  await page.keyboard.press("Escape");
  await page.locator(".config-nav-item").nth(5).click();
  await expect(page.locator(".config-stage-top h2")).toContainText("CNHL");
});

test("all six starter builds load without hard incompatibility", async ({ page }) => {
  const names = [
    "Tiny Whoop Beginner",
    '2.5" Outdoor Whoop',
    '3.5" Park Freestyle',
    'Standard 5" Freestyle',
    "Cinewhoop Cruiser",
    '7" Long Range Explorer',
  ];

  for (const name of names) {
    await page.goto("/");
    await page.getByRole("tab", { name: "Presets" }).click();
    const card = page.locator(".preset-card").filter({ hasText: name }).first();
    await card.getByRole("button", { name: "Load build" }).click();
    await expect(page.locator(".summary-status")).not.toHaveText(/Incompatible/);
  }
});

test("drone hotspot opens the matching part category", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Custom Build" }).click();
  await page.getByRole("button", { name: "Choose Battery" }).click();
  await expect(page.getByRole("dialog", { name: "Battery" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Battery" })).toHaveCount(0);
});

test("AIO build shows ESC and receiver as included, not double-charged", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Presets" }).click();
  const card = page.locator(".preset-card").filter({ hasText: "Tiny Whoop Beginner" }).first();
  await card.getByRole("button", { name: "Load build" }).click();
  await expect(page.locator(".summary-total strong")).toHaveText("$143");
  await page.getByText("Cost & mass breakdown").click();
  const escRow = page.locator(".breakdown-row").filter({ hasText: "BETAFPV 1S 5A AIO ESC" });
  const receiverRow = page.locator(".breakdown-row").filter({ hasText: "Integrated ELRS" });
  await expect(escRow).toContainText("Included");
  await expect(escRow).toContainText("—");
  await expect(receiverRow).toContainText("Included");
  await expect(page.locator(".integration-notes")).toContainText("counted once");
});

test("legacy saved AIO build totals are migrated on load", async ({ page }) => {
  const selectedIds = {
    frame: "betafpv-meteor75-pro-frame",
    motors: "betafpv-0802se-19500kv",
    esc: "betafpv-1s-5a-aio-esc",
    flightController: "betafpv-f4-1s-aio-fc",
    props: "gemfan-45mm-3",
    battery: "tattu-1s-450-hv",
    receiver: "betafpv-f4-1s-aio-elrs",
    camera: "caddx-ant-nano",
    vtx: "betafpv-m03-vtx",
  };

  await page.addInitScript((ids) => {
    localStorage.setItem(
      "maidenready.savedBuilds.v1",
      JSON.stringify([
        {
          id: "legacy-aio",
          name: "Legacy AIO Build",
          createdAt: new Date().toISOString(),
          buildClass: "tiny-whoop",
          selectedIds: ids,
          totalPrice: 999,
          totalWeightG: 999,
          thrustToWeight: 1,
          flightTimeMinutes: 1,
          topSpeedMph: 1,
          overallGrade: "F",
        },
      ]),
    );
  }, selectedIds);
  await page.goto("/");
  await page.getByRole("tab", { name: "Saved Builds" }).click();
  const row = page.locator(".saved-row").filter({ hasText: "Legacy AIO Build" });
  await expect(row).toContainText("$143");
  await expect(row).toContainText("42 g");
});

test("GEPRC AIO 2.5-inch build counts the AIO once at full price", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Presets" }).click();
  const card = page.locator(".preset-card").filter({ hasText: '2.5" Outdoor Whoop' }).first();
  await card.getByRole("button", { name: "Load build" }).click();
  await expect(page.locator(".summary-total strong")).toHaveText("$263");
  await expect(page.locator(".summary-kpis")).toContainText("~203 g");
  await page.getByText("Cost & mass breakdown").click();
  const escRow = page.locator(".breakdown-row").filter({ hasText: "GEPRC GEP-F411-35A AIO ESC" });
  const fcRow = page.locator(".breakdown-row").filter({ hasText: "GEPRC GEP-F411-35A AIO FC" });
  await expect(escRow).toContainText("Included");
  await expect(fcRow).toContainText("$74.99");
});

test("integrated receiver is visible only with its AIO host", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Presets" }).click();
  await page.locator(".preset-card").filter({ hasText: "Tiny Whoop Beginner" }).first().getByRole("button", { name: "Load build" }).click();
  await page.locator(".config-nav-item").nth(6).click();
  await expect(page.getByPlaceholder(/Search \d+ receiver parts/i)).toBeVisible();
  await expect(page.locator(".picker-result").filter({ hasText: "Integrated ELRS" })).toBeVisible();
  await page.keyboard.press("Escape");

  await page.getByRole("tab", { name: "Custom Build" }).click();
  await page.locator("#build-class-select").selectOption("5-inch-freestyle");
  await page.locator(".config-nav-item").nth(6).click();
  await expect(page.getByPlaceholder(/Search \d+ receiver parts/i)).toBeVisible();
  await expect(page.locator(".picker-result").filter({ hasText: "Integrated ELRS" })).toHaveCount(0);
});

test("orphaned integrated receiver in a share URL falls back safely", async ({ page }) => {
  await page.goto("/?class=5-inch-freestyle&receiver=betafpv-f4-1s-aio-elrs");
  await page.getByRole("tab", { name: "Custom Build" }).click();
  await expect(page.locator(".build-row-main").nth(6)).not.toContainText("Integrated ELRS");
  await expect(page.locator(".summary-status")).not.toContainText("Incompatible");
});

test("picker is keyboard reachable and returns focus safely", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Custom Build" }).click();
  await page.locator(".build-row-main").first().focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: "Frame" })).toBeVisible();
  await expect(page.locator(".picker-header .drawer-close")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Frame" })).toHaveCount(0);
});

test("unapproved photo candidates are not publicly served", async ({ page }) => {
  await page.goto("/");
  const response = await page.request.get("/parts/frames/geprc-gep-cl35-v3-frame.jpg");
  const contentType = response.headers()["content-type"] ?? "";
  expect(contentType).not.toContain("image");
});

test("beta feedback panel opens from the footer", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Beta feedback" }).click();
  await expect(page.getByRole("dialog", { name: "Send feedback" })).toBeVisible();
  await expect(page.getByLabel("Build class")).toBeVisible();
  await expect(page.getByLabel("Device")).toBeVisible();
  await page.getByLabel("What happened?").fill("The compatibility note was clear.");
  await page.locator(".feedback-panel .drawer-close").click();
  await expect(page.getByRole("dialog", { name: "Send feedback" })).toHaveCount(0);
});

test("beta smoke journey: configure, save, reload, share, mobile", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Your quad\. Your build\./i })).toBeVisible();

  await page.getByRole("tab", { name: "Presets" }).click();
  await page.locator(".preset-card").filter({ hasText: 'Standard 5" Freestyle' }).first().getByRole("button", { name: "Load build" }).click();
  await expect(page.locator(".config-stage-top h2")).toContainText("TBS Source One");

  const changePart = async (navIndex, search, resultText) => {
    await page.locator(".config-nav-item").nth(navIndex).click();
    const dialog = page.getByRole("dialog");
    await dialog.getByPlaceholder(/Search \d+ .* parts/i).fill(search);
    const result = dialog.locator(".picker-result").filter({ hasText: resultText }).first();
    await result.locator(".picker-select").click();
    await page.waitForTimeout(150);
    await page.keyboard.press("Escape");
  };

  await changePart(0, "AOS 5 V5", "AOS 5 V5");
  await expect(page.locator(".config-stage-top h2")).toContainText("AOS 5 V5");
  await changePart(1, "Snow 2306 1860", "Snow 2306 1860KV");
  await changePart(4, "Gemfan Hurricane 51466", "Gemfan Hurricane 51466");
  await changePart(5, "Tattu R-Line 6S 1400", "Tattu R-Line 6S 1400mAh 130C");

  await expect(page.locator(".drone-layout-5-inch-freestyle")).toBeVisible();
  await expect(page.locator(".compat-banner")).toBeVisible();
  await page.getByText("Cost & mass breakdown").click();
  await expect(page.locator(".integration-notes")).toContainText("Four physical motors are counted");

  await page.getByRole("tab", { name: "Saved Builds" }).click();
  await page.getByLabel("Build name").fill("Beta Smoke Build");
  await page.getByRole("button", { name: "Save build" }).click();
  await expect(page.locator(".saved-row").filter({ hasText: "Beta Smoke Build" })).toBeVisible();

  await page.reload();
  await page.getByRole("tab", { name: "Saved Builds" }).click();
  await page.locator(".saved-row").filter({ hasText: "Beta Smoke Build" }).getByRole("button", { name: "Load", exact: true }).click();
  await expect(page.locator(".config-stage-top h2")).toContainText("AOS 5 V5");

  const shareUrl = page.url();
  expect(shareUrl).toContain("frame=aos-5-v5");
  const secondPage = await page.context().newPage();
  await secondPage.goto(shareUrl);
  await expect(secondPage.locator("#build-class-select")).toHaveValue("5-inch-freestyle");
  await expect(secondPage.locator(".config-stage-top h2")).toContainText("AOS 5 V5");
  await secondPage.close();

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(shareUrl);
  await expect(page.locator(".mobile-summary-bar")).toBeVisible();
  await page.getByRole("button", { name: "View summary" }).click();
  await expect(page.getByRole("dialog", { name: "Build summary" })).toBeVisible();
});
