import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';


dotenv.config();

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'reports/junit-results.xml' }],
  ],

  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL || 'https://fakestoreapi.com',

     // Capture screenshot only on failure
    screenshot: 'only-on-failure',

    // Record video only on first retry
    video: 'retain-on-failure',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    // How long to wait for actions like click, fill
    actionTimeout: 10_000,

    // How long to wait for page navigation
    navigationTimeout: 30_000,
  },

  // ── Global test timeout
  timeout: 30_000,

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

     {
      name: 'API',
      testDir: './tests/api',
      use: {
        baseURL: 'https://fakestoreapi.com',
      },
    },

  ],

  // ── Output folder for test artifacts
  outputDir: 'test-results/',
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
