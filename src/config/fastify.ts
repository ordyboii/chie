import fp from "fastify-plugin";
import fastifyCors from "@fastify/cors";
import fastifyRateLimit from "@fastify/rate-limit";
import fastifySwagger from "@fastify/swagger";
import fastifyOauth2 from "@fastify/oauth2";
import fastifyJwt from "@fastify/jwt";
import fastifyApiReference from "@scalar/fastify-api-reference";
import fastifyZod from "fastify-type-provider-zod";
import { env } from "@/config/env";

export default fp(async (fastify) => {
  await fastify.register(fastifyCors);
  await fastify.register(fastifyRateLimit);

  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        version: "1.0.0",
        title: "jbot",
        description: "Japanese language bot",
      },
    },
    transform: fastifyZod.jsonSchemaTransform,
  });

  await fastify.register(fastifyApiReference, {
    routePrefix: "/docs",
  });

  await fastify.register(fastifyOauth2, {
    name: "googleOAuth2",
    scope: ["profile", "email"],
    credentials: {
      client: {
        id: env.GOOGLE_CLIENT_ID,
        secret: env.GOOGLE_CLIENT_SECRET,
      },
      auth: fastifyOauth2.GOOGLE_CONFIGURATION,
    },
    callbackUri: `http://localhost:3000/v1/auth/google/callback`,
  });

  await fastify.register(fastifyJwt, {
    secret: env.JWT_SECRET,
  });

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});
