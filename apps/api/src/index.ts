import { serve } from '@hono/node-server'
import { createLogger } from '@repo/logger'
import { z } from 'zod'
import app from './app.js'

const log = createLogger('api')
const port = z.coerce.number().int().min(1).max(65535).parse(process.env.PORT ?? 3000)

const server = serve({ fetch: app.fetch, port }, (info) => {
  log.info(`Listening on http://localhost:${info.port}`)
})

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.once(signal, () => server.close())
}
