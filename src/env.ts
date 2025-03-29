import { z } from "zod";
import { PROD } from "@constants";

if (!PROD) {
  process.loadEnvFile("./.env");
}

export const Env = z.object({
  SLACK_BOT_TOKEN: z.string().min(1),
  SLACK_APP_TOKEN: z.string().min(1),
  SLACK_SIGNING_SECRET: z.string().min(1),
  SLACK_CHANNEL_ID: z.string().min(1),
  GOOGLE_API_TYPE: z.string().min(1),
  GOOGLE_API_PROJECT_ID: z.string().min(1),
  GOOGLE_API_PRIVATE_KEY_ID: z.string().min(1),
  GOOGLE_API_PRIVATE_KEY: z.string().min(1),
  GOOGLE_API_CLIENT_EMAIL: z.string().min(1),
  GOOGLE_API_CLIENT_ID: z.string().min(1),
  GOOGLE_API_UNIVERSE_DOMAIN: z.string().min(1),
});

export type Env = z.infer<typeof Env>;

const { data, error } = Env.safeParse(process.env);

if (error) {
  throw new Error(JSON.stringify(error.flatten().fieldErrors, null, 2));
}

export const env = data;
