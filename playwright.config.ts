import { defineConfig, devices } from '@playwright/test';

const isCI = Boolean(process.env.CI);

// Same defaults and environment variables as apps/api and apps/web/vite.config.ts.
const apiPort = Number(process.env.API_PORT) || 3001;
const webPort = Number(process.env.WEB_PORT) || 5173;

// https://playwright.dev/docs/test-configuration
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: `http://localhost:${webPort}`,
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Playwright starts both apps before the tests and stops them afterwards.
  // Locally, servers that are already running (for example from `npm run dev`) are reused.
  webServer: [
    {
      command: 'npm run dev -w apps/api',
      url: `http://localhost:${apiPort}/api/version`,
      reuseExistingServer: !isCI,
    },
    {
      command: 'npm run dev -w apps/web',
      url: `http://localhost:${webPort}`,
      reuseExistingServer: !isCI,
    },
  ],
});
