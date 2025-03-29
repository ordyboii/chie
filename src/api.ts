import bolt from "@slack/bolt";
import { env } from "@env";
import { v2 } from "@google-cloud/translate";
import { replaceEscapedNewLines } from "@utils";

const { App } = bolt;

export function createTranslateClient() {
  return new v2.Translate({
    credentials: {
      type: env.GOOGLE_API_TYPE,
      project_id: env.GOOGLE_API_PROJECT_ID,
      universe_domain: env.GOOGLE_API_UNIVERSE_DOMAIN,
      client_id: env.GOOGLE_API_CLIENT_ID,
      client_email: env.GOOGLE_API_CLIENT_EMAIL,
      private_key_id: env.GOOGLE_API_PRIVATE_KEY_ID,
      private_key: replaceEscapedNewLines(env.GOOGLE_API_PRIVATE_KEY),
    },
  });
}

export function createBot() {
  return new App({
    token: env.SLACK_BOT_TOKEN,
    appToken: env.SLACK_APP_TOKEN,
    socketMode: true,
    signingSecret: env.SLACK_SIGNING_SECRET,
    port: 3000,
  });
}
