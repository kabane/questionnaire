import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { z } from 'zod';

const routes = new OpenAPIHono();

// Define the User schema using Zod to match the Prisma User model
const UserSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  email: z.string().email(),
});

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