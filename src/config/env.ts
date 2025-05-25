import { constants } from "@/config/constants";
import { z } from "zod";

if (!constants.PROD) {
	process.loadEnvFile("./.env");
}

export const envSchema = z
	.object({
		JWT_SECRET: z.string().min(1),
		GOOGLE_CLIENT_ID: z.string().min(1),
		GOOGLE_CLIENT_SECRET: z.string().min(1),
		GOOGLE_APPLICATION_CREDENTIALS_BASE64: z.string().min(1),
	})
	.transform((data) => {
		return Object.assign(data, {
			GOOGLE_APPLICATION_CREDENTIALS: JSON.parse(
				Buffer.from(
					data.GOOGLE_APPLICATION_CREDENTIALS_BASE64,
					"base64",
				).toString("utf-8"),
			),
		});
	});

export type EnvSchema = z.infer<typeof envSchema>;

const { data, error } = envSchema.safeParse(process.env);

if (error) {
	const errorFormat = JSON.stringify(error.flatten().fieldErrors, null, 2);
	throw new Error(`Error getting environment variables: ${errorFormat}`);
}

export const env = data;
