import fp from "fastify-plugin";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { NHKService } from "@/services/nhk-service";

export default fp((fastify) => {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.route({
    url: "/phrase",
    method: "GET",
    schema: {
      response: {
        200: z.string(),
      },
    },
    handler() {
      return NHKService.getNHKPhrase();
    },
  });
});
