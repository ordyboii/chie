import { env } from "@/config/env";
import { WebClient } from "@slack/web-api";

export const slack = new WebClient(env.SLACK_TOKEN);
