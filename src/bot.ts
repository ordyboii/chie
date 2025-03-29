import { schedule } from "node-cron";
import { readFile } from "node:fs/promises";
import { sendPhraseToBot, translateAndSendToBot } from "@nhk/service";
import { bot } from "@utils";

schedule("* * * * *", async () => {
  console.log("⚡️Job started");
  await sendPhraseToBot();
});

bot.action("japanese-phrase-translate", async (data) => {
  await data.ack();
  const input =
    data.body.state.values["japanese-phrase"]["japanese-phrase-input"].value;

  const phrase = await readFile(".cache", {
    encoding: "utf8",
  });

  await translateAndSendToBot({ phrase, input });
});

await bot.start();
bot.logger.info("⚡️ Bolt app is running!");
