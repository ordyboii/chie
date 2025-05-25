import "@/config/env";
import fastify from "fastify";
import fastifyConfig from "@/config/fastify";
import fastifyZod from "fastify-type-provider-zod";
import nhkRoutes from "@/routes/nhk-routes";
import authRoutes from "@/routes/auth-routes";

const app = new Hono();

app.setSerializerCompiler(fastifyZod.serializerCompiler);
app.setValidatorCompiler(fastifyZod.validatorCompiler);

await app.register(fastifyConfig);
await app.register(nhkRoutes, {
  prefix: "/v1/nhk",
});
await app.register(authRoutes, {
  prefix: "/v1/auth",
});

await app.ready();
await app.listen({ port: 3000, host: "0.0.0.0" });
