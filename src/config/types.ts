import type {
  onRequestHookHandler,
  FastifyRequest,
  FastifyReply,
  FastifyInstance,
} from "fastify";
import type { OAuth2Namespace } from "@fastify/oauth2";

declare module "fastify" {
  interface FastifyInstance {
    googleOAuth2: OAuth2Namespace;
    authenticate: onRequestHookHandler;
  }
}

export interface ServiceHandler {
  req: FastifyRequest;
  reply: FastifyReply;
  app?: FastifyInstance;
}
