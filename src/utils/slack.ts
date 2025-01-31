import { WebClient } from "@slack/web-api";
import { env } from "@utils/env";

export const slack = new WebClient(env.slackApiToken);

export async function slackHealthCheck() {
	return slack.api.test();
}
