import { z } from "zod";

process.loadEnvFile("./.env");

const Env = z
	.object({
		SLACK_API_TOKEN: z.string().min(1),
		SLACK_CHANNEL_ID: z.string().min(1),
		REPLICATE_API_TOKEN: z.string().min(1),
	})
	.transform((data) => ({
		slackApiToken: data.SLACK_API_TOKEN,
		slackChannelId: data.SLACK_CHANNEL_ID,
		replicateApiToken: data.REPLICATE_API_TOKEN,
	}));

export type Env = z.infer<typeof Env>;

const { data, error } = Env.safeParse(process.env);

if (error) {
	throw new Error(JSON.stringify(error.flatten().fieldErrors, null, 2));
}

export const env = data;
