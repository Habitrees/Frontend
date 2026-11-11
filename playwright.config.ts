import { defineConfig, devices } from "@playwright/test";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

// Read only the two test-mode flags without importing Vite into the Playwright
// config. The Vite web server loads the full .env.local file itself.
const localEnvPath = resolve(process.cwd(), ".env.local");
if (existsSync(localEnvPath)) {
  const localEnv = readFileSync(localEnvPath, "utf8");
  for (const key of ["VITE_ENABLE_AUTH_REGISTRATION_MOCK", "VITE_ENABLE_AUTH_RECOVERY_MOCK"]) {
    const match = localEnv.match(new RegExp(`^\\s*${key}\\s*=\\s*([^\\r\\n#]*)`, "m"));
    if (match) process.env[key] = match[1].trim().replace(/^["']|["']$/g, "");
  }
}

export default defineConfig({
  testDir: "./e2e",
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],

  use: {
    baseURL: "http://127.0.0.1:5173",
    ...devices["Desktop Chrome"],
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },

  webServer: {
    command: "npm run dev -- --host 127.0.0.1",
    url: "http://127.0.0.1:5173",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
