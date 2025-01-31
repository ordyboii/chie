import { WebClient } from "@slack/web-api";
import { env } from "@utils/env";

export const slack = new WebClient(env.SLACK_API_TOKEN);

export async function slackHealthCheck() {
	return slack.api.test();
}
