import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifyRateLimit from "@fastify/rate-limit";
import fastifyApiReference from "@scalar/fastify-api-reference";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import "@/env";
import routes from "@/routes";
import { PROD } from "@/constants";

const app = fastify({ logger: true });

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

await app.register(fastifyCors);
await app.register(fastifyRateLimit);
await app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "JBot",
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
await app.listen({ port: 8080, host: "0.0.0.0" });
