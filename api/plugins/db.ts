import fp from "fastify-plugin";
import { drizzle } from "drizzle-orm/better-sqlite3";

export default fp(
  (app) => {
    const db = drizzle(process.env.DATABASE_URL!);
    app.decorate("db", db);
  },
  {
    name: "fastify-drizzle",
  }
);
