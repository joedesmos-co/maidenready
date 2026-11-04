import { test, expect } from "@playwright/test";

test("home loads and brand returns home", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Your quad\. Your build\./i })).toBeVisible();
  await page.getByRole("tab", { name: "Presets" }).click();
  await page.getByLabel("MaidenReady home").click();
  await expect(page.getByRole("heading", { name: /Your quad\. Your build\./i })).toBeVisible();
});

test("presets load a build", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Presets" }).click();
  const loadButton = page.getByRole("button", { name: "Load build" }).first();
  await loadButton.click();
  await expect(page.getByRole("heading", { name: /Build summary/i })).toBeVisible();
});

test("part picker search filters results", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Custom Build" }).click();
  await page.locator(".build-row-main").first().click();
  const search = page.getByPlaceholder(/Search 42 frame parts/i);
  await search.fill("TBS");
  await expect(page.locator(".picker-result").first()).toContainText("TBS");
  await expect(page.locator(".picker-count")).toContainText("of 42 parts shown");
});

test("shared url restores build class", async ({ page }) => {
  await page.goto("/?class=tiny-whoop&camera=betafpv-c03-camera");
  await expect(page.locator("#build-class-select")).toHaveValue("tiny-whoop");
});

test("legal pages open", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Privacy Policy" }).click();
  await expect(page.getByRole("heading", { name: "Privacy Policy" })).toBeVisible();
});

test("mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Your quad\. Your build\./i })).toBeVisible();
});