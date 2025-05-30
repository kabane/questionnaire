import { OpenAPIHono, createRoute } from '@hono/zod-openapi';

const routes = new OpenAPIHono();


routes.get('/', (c) => c.text('Hello from Hono + Prisma!'))

routes.openapi(
  createRoute({
    method: 'get',
    path: '/',
    responses: {
      200: {
        description: 'Hello World response',
        content: {
          'application/json': {
            schema: UserSchema,
          },
        },
      },
    },
  }),
  (c) => {
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
    };
    return c.json(user);
  }
);

export default routes;