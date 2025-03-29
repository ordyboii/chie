import { describe, it } from "node:test";
import { ok, fail } from "node:assert";
import { Env } from "@env";
import { PROD } from "@constants";
import { replaceEscapedNewLines } from "@utils";

if (!PROD) {
  process.loadEnvFile("./.env");
}

describe("Test environment variables", () => {
  it("Must have all values", () => {
    const { data, error } = Env.safeParse(process.env);

    if (error) {
      fail("Environment variables are invalid");
    }

    if (data) {
      console.log(JSON.stringify(data, null, 2));
      ok(true);
    }
  });

  it("New lines escaped are working", () => {
    const example = "hello there \\n";
    const fixed = replaceEscapedNewLines(example);
    ok("hello there \n", fixed);
  });
});
