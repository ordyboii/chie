import { z } from "zod";
import { PROD } from "@constants";

if (!PROD) {
  process.loadEnvFile("./.env");
}

export const Env = z
  .object({
    SLACK_BOT_TOKEN: z.string().min(1),
    SLACK_APP_TOKEN: z.string().min(1),
    SLACK_SIGNING_SECRET: z.string().min(1),
    SLACK_CHANNEL_ID: z.string().min(1),
    SLACK_TESTING_CHANNEL_ID: z.string().optional(),
    GOOGLE_APPLICATION_CREDENTIALS_BASE64: z.string().min(1),
  })
  .transform((env) =>
    Object.assign(env, {
      GOOGLE_APPLICATION_CREDENTIALS: JSON.parse(
        Buffer.from(
          env.GOOGLE_APPLICATION_CREDENTIALS_BASE64,
          "base64",
        ).toString("utf-8"),
      ),
    }),
  );

export type Env = z.infer<typeof Env>;

const { data, error } = Env.safeParse(process.env);

if (error) {
  throw new Error(JSON.stringify(error.flatten().fieldErrors, null, 2));
}

export const env = data;
