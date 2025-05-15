import fp from "fastify-plugin";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { NHKService } from "@/services/nhk-service";

export default fp((fastify) => {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.route({
    url: "/v1/nhk/phrase",
    method: "GET",
    onRequest: [app.authenticate],
    schema: {
      response: {
        200: z.string(),
      },
    },
    async handler() {
      const phrase = await NHKService.getNHKPhrase();
      return phrase;
    },
  });
});
