import { writeFile } from "node:fs/promises";
import { bot, similarText, tClient } from "@utils";
import { NHK_TOP_NEWS_URL } from "@constants";
import { env } from "@env";
import { NHKSchema } from "@nhk/validation";

export async function sendPhraseToBot() {
  const res = await fetch(NHK_TOP_NEWS_URL).catch((error) => {
    throw new Error(`Failed to fetch NHK news: ${error}`);
  });
  const json = await res.json().catch((error) => {
    throw new Error(`Failed to parse JSON: ${error}`);
  });
  const news = await NHKSchema.array()
    .parseAsync(json)
    .catch((error) => {
      throw new Error(`Failed to validate NHK news: ${error}`);
    });

  const phrase = news[0].title;
  const message = `Phrase to translate is *${phrase}*.`;

  await writeFile(".cache", phrase).catch((error) => {
    throw new Error(`Failed to write to cache: ${error}`);
  });

  await bot.client.chat
    .postMessage({
      channel: env.SLACK_CHANNEL_ID,
      text: message,
      blocks: [
        {
          type: "divider",
        },
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "Japanese phrase translation",
            emoji: true,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: message,
          },
        },
        {
          type: "input",
          block_id: "japanese-phrase",
          element: {
            type: "plain_text_input",
            action_id: "japanese-phrase-input",
          },
          label: {
            type: "plain_text",
            text: "What is this phrase in English?",
            emoji: true,
          },
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Send",
                emoji: true,
              },
              value: "send",
              action_id: "japanese-phrase-translate",
            },
          ],
        },
      ],
    })
    .catch((error) => {
      throw new Error(`Failed to send message to Slack: ${error}`);
    });
}

type TranslateAndSendToBotArgs = {
  phrase: string;
  input: string;
};

export async function translateAndSendToBot(args: TranslateAndSendToBotArgs) {
  const [translation] = await tClient.translate(args.phrase, {
    from: "ja",
    to: "en-GB",
  });

  const similarity = similarText(args.input, translation);

  const message = `Translated *${translation}*. You scored *${similarity}/100*`;
  await bot.client.chat
    .postMessage({
      channel: env.SLACK_CHANNEL_ID,
      text: message,
      blocks: [
        {
          type: "divider",
        },
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "Your results",
            emoji: true,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: message,
          },
        },
      ],
    })
    .catch((error) => {
      throw new Error(`Failed to send message to Slack: ${error}`);
    });
}
