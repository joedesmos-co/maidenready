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

test("unknown specs surface as unconfirmed, not compatible", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Presets" }).click();
  await page.getByRole("button", { name: "Cinewhoop", exact: true }).click();
  const card = page.locator(".preset-card").filter({ hasText: '2.5" Outdoor Whoop' }).first();
  await card.getByRole("button", { name: "Load build" }).click();
  await expect(page.locator(".summary-status")).toContainText("Check specs");
  await expect(page.getByText(/Check specifications/i).first()).toBeVisible();
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
