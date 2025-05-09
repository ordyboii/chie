import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifyRateLimit from "@fastify/rate-limit";
// import fastifyOauth2 from "@fastify/oauth2";
import fastifyApiReference from "@scalar/fastify-api-reference";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import "@/env";
import routes from "@/routes";

const app = fastify({ logger: true });

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

await app.register(fastifyCors);
await app.register(fastifyRateLimit);

// await app.register(fastifyOauth2, {
//   name: "google",
//   scope: ["https://www.googleapis.com/auth/cloud-platform"],
//   credentials: {
//     client: {
//       id: process.env.GOOGLE_CLIENT_ID,
//       secret: process.env.GOOGLE_CLIENT_SECRET,
//     },
//     auth: fastifyOauth2.GOOGLE_CONFIGURATION,
//   },
//   startRedirectPath: "/auth/google",
//   callbackUri: "http://localhost:3000/auth/google/callback",
// });

await app.register(fastifySwagger, {
  openapi: {
    info: {
      version: "1.0.0",
      title: "jbot",
      description: "Japanese language bot",
    },
  },
  transform: jsonSchemaTransform,
});

await app.register(fastifyApiReference, {
  routePrefix: "/docs",
});

await app.register(routes);

await app.ready();
await app.listen({ port: 3000, host: "0.0.0.0" });
