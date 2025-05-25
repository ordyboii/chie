import type { OAuth2Namespace } from "@fastify/oauth2";
import type {
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
	onRequestHookHandler,
} from "fastify";

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
