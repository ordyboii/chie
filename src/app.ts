import { schedule } from "node-cron";
import { readFile } from "fs/promises";
import { slack } from "@api";
import * as NHK from "@nhk/service";

schedule("* * * * *", async () => {
  console.log("Job started");
  await NHK.sendPhraseToSlack();
  console.log("Job ended");
});

slack.action("japanese-phrase-translate", async (data) => {
  await data.ack();
  const input =
    data.body.state.values["japanese-phrase"]["japanese-phrase-input"].value;

  const phrase = await readFile(".cache/japanese-phrase.txt", {
    encoding: "utf8",
  });

  await NHK.translatePhraseAndSendToSlack({ phrase, input });
});

await slack.start();
slack.logger.info("⚡️ Bolt app is running!");
