import { expect, test } from '@playwright/test'

test('accepts valid input through the platform proxy', async ({ request }) => {
  const response = await request.post('/api/hello', { data: { name: ' World ' } })
  expect(response.status()).toBe(200)
  expect(await response.json()).toEqual({ message: 'Hello, World!' })
})

test('rejects invalid input through the platform proxy', async ({ request }) => {
  const response = await request.post('/api/hello', { data: { name: '' } })
  expect(response.status()).toBe(400)
  expect(await response.json()).toMatchObject({ success: false })
})
