import { AuthService } from "@/services/auth-service";
import fp from "fastify-plugin";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

export default fp(async (fastify) => {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.route({
    url: "/v1/auth/google",
    method: "GET",
    handler(req, reply) {
      AuthService.createGoogleAuthUrl({ req, reply, app });
    },
  });

  app.route({
    url: "/v1/auth/google/callback",
    method: "GET",
    async handler(req, reply) {
      const jwt = AuthService.handleCallbackAndSignJWT({ req, reply, app });
      return jwt;
    },
  });
});
