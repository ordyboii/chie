import { describe, it } from "node:test";
import { ok, doesNotThrow } from "node:assert";
import * as NHK from "@/nhk";
import env from "@/env";
import { z } from "zod";

describe("test NHK service", () => {
  it("should get a phrase from NHK", async () => {
    const phrase = await NHK.getNHKPhrase();
    doesNotThrow(() => z.string().parse(phrase));
  });

  it("should get a phrase and send it", async () => {
    const message = await NHK.sendPhraseToBot(env.SLACK_TESTING_CHANNEL_ID);
    ok(message.ok);
  });

  it("should get a translation and compare them", async () => {
    const phrase = await NHK.getNHKPhrase();

    const message = await NHK.translateAndSendToBot({
      channelId: env.SLACK_TESTING_CHANNEL_ID,
      phrase,
      input: "hello world",
    });

    ok(message.ok);
  });
});
