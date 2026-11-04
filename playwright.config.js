import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60000,
  workers: 1,
  use: {
    baseURL: "http://localhost:5180",
    viewport: { width: 1280, height: 800 },
  },
  webServer: {
    command: "npm run dev -- --port 5180 --strictPort",
    url: "http://localhost:5180",
    reuseExistingServer: false,
    timeout: 120000,
  },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
  ],
});