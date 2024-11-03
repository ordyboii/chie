import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./app/_server/database/migrations",
  schema: "./app/_server/database/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "file:app/_server/database/data.db",
  },
});
