import bolt from "@slack/bolt";
import Replicate from "replicate";
import { env } from "#common/env";

const { App } = bolt;

export const replicate = new Replicate({
  auth: env.REPLICATE_API_TOKEN,
});

export const slack = new App({
  token: env.SLACK_BOT_TOKEN,
  appToken: env.SLACK_APP_TOKEN,
  socketMode: true,
  signingSecret: env.SLACK_SIGNING_SECRET,
  port: 3000,
});
