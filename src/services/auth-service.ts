import type { ServiceHandler } from "@/config/types";

export class AuthService {
	static createGoogleAuthUrl({ app, req, reply }: ServiceHandler) {
		app.googleOAuth2.generateAuthorizationUri(req, reply, (error, endpoint) => {
			if (error) console.error(error);
			reply.redirect(endpoint);
		});
	}

	static async handleCallbackAndSignJWT({ req, app }: ServiceHandler) {
		const { token } =
			await app.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);

		const jwt = app.jwt.sign(token);
		return jwt;
	}
}
