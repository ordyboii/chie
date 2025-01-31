import { Env } from "@models/env";

process.loadEnvFile("./.env");

const { data, error } = Env.safeParse(process.env);

if (error) {
	throw new Error(JSON.stringify(error.flatten().fieldErrors, null, 2));
}

export const env = data;
