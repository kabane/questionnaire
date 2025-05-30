import { serve } from '@hono/node-server'
import routes from './routes'
import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';

const app = new OpenAPIHono();
app.route('/', routes)

app.doc('/openapi.json', {
  openapi: '3.0.0',
  info: {
    title: 'Hono API',
    version: '1.0.0',
  },
});
app.get('/docs', swaggerUI({ url: '/openapi.json' }));
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = parseInt(process.env.PORT || '3000')
console.log(`🚀 Server running http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
  hostname: '0.0.0.0'
})