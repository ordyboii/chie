import { describe, it } from "node:test";
import { ok, doesNotThrow } from "node:assert";
import { createChatBot, createTranslateClient, similarText } from "@/utils";
import env from "@/config/env";
import { z } from "zod";

const bot = createChatBot();
const tClient = createTranslateClient();

describe("test bot", () => {
  it("should have a testing channel", () => {
    ok(env.SLACK_TESTING_CHANNEL_ID);
  });

  it("should connect", async () => {
    const test = await bot.auth.test();
    ok(test.ok);
  });

  it("can send a message in a channel", async () => {
    const message = await bot.chat.postMessage({
      channel: env.SLACK_TESTING_CHANNEL_ID,
      text: "Hello from testing!",
    });

    ok(message.ok);
  });
});

describe("test translate client", () => {
  it("should translate text correctly", async () => {
    const [translation] = await tClient.translate("Bonjour", {
      from: "fr",
      to: "en-GB",
    });

    doesNotThrow(() => z.string().parse(translation));
  });

  it("should compare text and return a percentage", () => {
    const first = "Hello world";
    const second = "Hello World";

    const similarity = similarText(first, second);
    doesNotThrow(() => z.number().int().nonnegative().parse(similarity));
  });
});
