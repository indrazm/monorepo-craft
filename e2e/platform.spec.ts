import { expect, test } from '@playwright/test'

test('navigates between home and about', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Platform', exact: true })).toBeVisible()

  await page.getByRole('link', { name: 'About', exact: true }).click()
  await expect(page).toHaveURL('/about')
  await expect(page.getByRole('heading', { name: 'About', exact: true })).toBeVisible()

  await page.getByRole('link', { name: 'Home', exact: true }).click()
  await expect(page).toHaveURL('/')
  await expect(page.getByRole('heading', { name: 'Platform', exact: true })).toBeVisible()
})

test('loads a file-based route directly and after refresh', async ({ page }) => {
  await page.goto('/about')
  await expect(page.getByRole('heading', { name: 'About', exact: true })).toBeVisible()
  await page.reload()
  await expect(page.getByRole('heading', { name: 'About', exact: true })).toBeVisible()
})

test('opens API health from the platform', async ({ page }) => {
  await page.goto('/')
  const popupPromise = page.waitForEvent('popup')
  await page.getByRole('link', { name: 'Check API health' }).click()
  const popup = await popupPromise

  await expect(popup).toHaveURL('/api/health')
  await expect(popup.locator('body')).toContainText('"status":"ok"')
})

test('shows a not-found page for an unknown route', async ({ page }) => {
  await page.goto('/does-not-exist')
  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible()
})
