import { describe, it } from "node:test";
import { doesNotThrow } from "node:assert";
import { z } from "zod";
import { NHKService } from "@/services/nhk-service";

describe("test NHK service", () => {
  it("should get a phrase from NHK", async () => {
    const phrase = await NHKService.getNHKPhrase();
    doesNotThrow(() => z.string().parse(phrase));
  });
});
