import fp from "fastify-plugin";

export default fp(async function (app) {
  app.get("/github/callback", {
    async handler(request, reply) {
      const { token } =
        await this.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(
          request
        );

      const jwt = app.jwt.sign({ accessToken: token.access_token });
      // const { token: newToken } = await this.getNewAccessTokenUsingRefreshToken(token)

      reply.send({ token });
    },
  });
});
