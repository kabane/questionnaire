import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import routes from './routes'

const app = new Hono()
app.route('/', routes)

const port = parseInt(process.env.PORT || '3000')
console.log(`🚀 Server running at http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
  hostname: '0.0.0.0'
})