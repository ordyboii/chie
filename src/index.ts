import { schedule } from "node-cron";
import { readFile } from "node:fs/promises";
import * as NHK from "@nhk/service";
import { bot } from "@utils";
import { env } from "@env";
import { cache } from "@constants";

schedule("0 17 * * *", async () => {
  console.log("⚡️Job started");
  await NHK.sendPhraseToBot(env.SLACK_CHANNEL_ID);
});

bot.action("japanese-phrase-translate", async (data) => {
  await data.ack();
  const input =
    data.body.state.values["japanese-phrase"]["japanese-phrase-input"].value;

  const phrase = await readFile(cache, {
    encoding: "utf8",
  }).catch((error) => {
    throw new Error(`Failed to read from cache: ${error}`);
  });

  await NHK.translateAndSendToBot({
    channelId: env.SLACK_CHANNEL_ID,
    phrase,
    input,
  });
});

await bot.start();
bot.logger.info("⚡️ Bolt app is running!");
