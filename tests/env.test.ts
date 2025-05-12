import { describe, it } from "node:test";
import { doesNotThrow } from "node:assert";
import { Env } from "@/config/env";

describe("test environment variables", () => {
  it("should have all the correct values", () => {
    doesNotThrow(() => Env.parse(process.env));
  });
});
