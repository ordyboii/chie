import { doesNotThrow } from "node:assert";
import { describe, it } from "node:test";
import { NHKService } from "@/services/nhk-service";
import { z } from "zod";

describe("test NHK service", () => {
	it("should get a phrase from NHK", async () => {
		const phrase = await NHKService.getNHKPhrase();
		doesNotThrow(() => z.string().parse(phrase));
	});
});
