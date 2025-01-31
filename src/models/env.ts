import { z } from "zod";

export const Env = z.object({
  SLACK_API_TOKEN: z.string().min(1),
  SLACK_CHANNEL_ID: z.string().min(1),
});

export type Env = z.infer<typeof Env>