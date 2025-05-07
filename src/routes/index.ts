import { Hono } from 'hono'

const routes = new Hono()

routes.get('/', (c) => c.text('Hello from Hono + Prisma!'))

export default routes