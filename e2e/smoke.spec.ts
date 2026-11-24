import { expect, test } from '@playwright/test';

test('the frontend loads and shows the version returned by the backend', async ({ page, request }) => {
  // Ask the API for its version through the Vite proxy, exactly like the browser does.
  const apiResponse = await request.get('/api/version');
  expect(apiResponse.ok()).toBe(true);
  const { name, version } = (await apiResponse.json()) as { name: string; version: string };

  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome');
  await expect(page.getByRole('status')).toHaveText(`Connected to ${name} v${version}`);
});
