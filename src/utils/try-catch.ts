import { ZodError } from "zod";

export async function tryCatch<T>(
	promise: Promise<T>,
): Promise<[T | null, any]> {
	try {
		const data = await promise;
		return [data, null];
	} catch (error) {
		if (error instanceof ZodError) {
			const err = error.flatten().fieldErrors;
			return [null, err];
		}
		return [null, error];
	}
}
