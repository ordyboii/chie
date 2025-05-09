import { z } from "zod";
import { PROD } from "@/constants";

if (!PROD) {
  process.loadEnvFile("./.env");
}

// Temporary
export const Env = z.object({
  SLACK_TOKEN: z.string().min(1).optional(),
  SLACK_CHANNEL_ID: z.string().min(1).optional(),
  SLACK_TESTING_CHANNEL_ID: z.string().optional(),
  GOOGLE_APPLICATION_CREDENTIALS_BASE64: z.string().min(1).optional(),
});

export type Env = z.infer<typeof Env>;

const { data, error } = Env.safeParse(process.env);

if (error) {
  throw new Error(JSON.stringify(error.flatten().fieldErrors, null, 2));
}

export default data;
