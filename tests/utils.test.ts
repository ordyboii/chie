import { describe, it } from "node:test";
import { ok } from "node:assert";
import { replaceEscapedNewLines } from "@utils";

describe("test utility functions", () => {
  it("should replace escaped new lines", () => {
    const example = "test string \\n";
    const fixed = replaceEscapedNewLines(example);

    ok("test string \n", fixed);
  });
});
