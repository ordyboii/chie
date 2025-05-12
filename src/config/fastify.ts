import fp from "fastify-plugin";
import fastifyCors from "@fastify/cors";
import fastifyRateLimit from "@fastify/rate-limit";
import fastifySwagger from "@fastify/swagger";
import fastifyOauth2 from "@fastify/oauth2";
import fastifyApiReference from "@scalar/fastify-api-reference";
import fastifyZod from "fastify-type-provider-zod";

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
    credentials: {
      client: {
        id: "<CLIENT_ID>",
        secret: "<CLIENT_SECRET>",
      },
      auth: fastifyOauth2.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: "/auth/google", // register a fastify url to start the redirect flow to the service provider's OAuth2 login
    callbackUri: (req) =>
      `${req.protocol}://${req.hostname}/auth/google/callback`, // service provider redirects here after user login
  });
});
