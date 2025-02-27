import { z } from "zod";
import { PROD } from "@common/constants";

if (!PROD) {
  process.loadEnvFile("./.env");
}

const Env = z.object({
  SLACK_BOT_TOKEN: z.string().min(1),
  SLACK_APP_TOKEN: z.string().min(1),
  SLACK_SIGNING_SECRET: z.string().min(1),
  SLACK_CHANNEL_ID: z.string().min(1),
  REPLICATE_API_TOKEN: z.string().min(1),
  REDIS_HOST: z.string().min(1),
  REDIS_PORT: z.coerce.number().min(1),
  REDIS_PASSWORD: z.string().min(1),
});

export type Env = z.infer<typeof Env>;

const { data, error } = Env.safeParse(process.env);

if (error) {
  throw new Error(JSON.stringify(error.flatten().fieldErrors, null, 2));
}

export const env = data;
