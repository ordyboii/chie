import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
});

const { success, error, data } = envSchema.safeParse(process.env);

if (!success) {
  throw new Error(JSON.stringify(error.flatten()));
}

export const env = data;
