import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: { timeout: 7_000 },
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:3110',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    launchOptions: { executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] },
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: 'npm run serve:e2e',
    url: 'http://127.0.0.1:3110',
    env: { ...process.env, ADMIN_PASSWORD: 'systempath-e2e-admin-password', ADMIN_SESSION_SECRET: 'systempath-e2e-session-secret-32-chars', ANALYTICS_DB_PATH: '/tmp/systempath-e2e.sqlite' },
    reuseExistingServer: false,
    timeout: 120_000,
  },
})
