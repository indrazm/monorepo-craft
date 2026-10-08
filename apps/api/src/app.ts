import { zValidator } from '@hono/zod-validator'
import { createLogger } from '@repo/logger'
import { Hono } from 'hono'
import { logger as requestLogger } from 'hono/logger'
import { z } from 'zod'

const log = createLogger('api')
const app = new Hono()

app.use(
  '*',
  requestLogger((message) => log.info(message)),
)

app.get('/api/health', (c) => c.json({ status: 'ok' }))

app.post(
  '/api/hello',
  zValidator('json', z.object({ name: z.string().trim().min(1).max(100) })),
  (c) => {
    const { name } = c.req.valid('json')
    return c.json({ message: `Hello, ${name}!` })
  },
)

app.onError((error, c) => {
  log.error('Request failed', error)
  return c.json({ error: 'Internal server error' }, 500)
})

export default app
