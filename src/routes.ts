import fp from "fastify-plugin";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export default fp((fastify) => {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.post(
    "/",
    {
      schema: {
        response: {
          200: z.string(),
        },
      },
    },
    (_, res) => {
      res.send("awd");
    },
  );
});
