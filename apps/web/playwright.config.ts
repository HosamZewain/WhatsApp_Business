import { defineConfig, devices } from '@playwright/test';

const isCi = process.env.CI === 'true';

export default defineConfig({
  testDir: './tests',
  webServer: {
    command: 'npm run dev -- --strictPort',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !isCi,
  },
  use: { baseURL: 'http://127.0.0.1:5173', ...devices['Desktop Chrome'] },
});
