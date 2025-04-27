import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifyRateLimit from "@fastify/rate-limit";
import fastifyHelmet from "@fastify/helmet";
import fastifyApiReference from "@scalar/fastify-api-reference";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";

const app = fastify({ logger: true });

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

await app.register(fastifyCors);
await app.register(fastifyHelmet), await app.register(fastifyRateLimit);

await app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "JBot",
      description: "Japanese language bot",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

await app.register(fastifyApiReference, {
  routePrefix: "/docs",
});

app.after(() => {
  const router = app.withTypeProvider<ZodTypeProvider>();

  router.get(
    "/",
    {
      schema: {
        response: {
          200: z.string(),
        },
      },
    },
    (_, res) => {
      res.send(2);
    },
  );
});

await app.ready();
await app.listen({ port: 4000 });
