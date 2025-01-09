import fp from "fastify-plugin";
import { users } from "../db/schema.ts";

export default fp((app) => {
  app.get("/all", {
    async handler(req, reply) {
      const all = app.db.select().from(users);
      return all;
    },
  });
});
