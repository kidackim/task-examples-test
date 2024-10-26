import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 120000,
  expect: { timeout: 2000 },
  retries: 0,

  reporter: [['html', { open: 'never' }], ['list']],

  testDir: 'tests',
  workers: 10,
  fullyParallel: true,
  use: {
    actionTimeout: 30 * 1000,
    headless: true,
    baseURL: 'http://localhost:8082',
    locale: 'en-uk',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
};
export default config;
