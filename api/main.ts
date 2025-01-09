import { fileURLToPath } from "node:url";
import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import fastifyJwt from "@fastify/jwt";
import * as fastifyOauth2 from "@fastify/oauth2";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import * as fastifyZod from "fastify-type-provider-zod";
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

const root = fileURLToPath(new URL("../", import.meta.url));
process.loadEnvFile(`${root}/.env`);

declare module "fastify" {
  interface FastifyInstance {
    githubOAuth2: fastifyOauth2.OAuth2Namespace;
    db: BetterSQLite3Database<Record<string, never>> & {
      $client: Database.Database;
    };
  }
}

const app = fastify({ logger: true });

app.setValidatorCompiler(fastifyZod.validatorCompiler);
app.setSerializerCompiler(fastifyZod.serializerCompiler);

await app.register(fastifyHelmet);
await app.register(fastifyCors);

await app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Miroish Api",
      description: "Backend for Miroish apps",
      version: "1.0.0",
    },
  },
  transform: fastifyZod.jsonSchemaTransform,
});

await app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

await app.register(fastifyOauth2.fastifyOauth2, {
  name: "githubOAuth2",
  credentials: {
    client: {
      id: "",
      secret: "",
    },
    auth: fastifyOauth2.fastifyOauth2.GITHUB_CONFIGURATION,
  },
  startRedirectPath: "/auth/github",
  callbackUri: "http://localhost:3001/auth/github/callback",
});

await app.register(fastifyJwt, {
  secret: "supersecret",
});

await app.register(import("./plugins/db.ts"));

app.after(() => {
  app.withTypeProvider<fastifyZod.ZodTypeProvider>();

  // Add routes here
  app.register(import("./routes/auth.ts"), {
    prefix: "/auth",
  });

  app.register(import("./routes/users.ts"), {
    prefix: "/users",
  });
});

await app.ready();
await app.listen({ port: 3000 });
