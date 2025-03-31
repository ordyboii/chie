import bolt from "@slack/bolt";
import { v2 } from "@google-cloud/translate";
import { env } from "@env";

const { App } = bolt;

export function createTranslateClient() {
  return new v2.Translate({
    credentials: env.GOOGLE_APPLICATION_CREDENTIALS,
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
