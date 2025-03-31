import { writeFile } from "node:fs/promises";
import { bot, similarText, tClient } from "@utils";
import { cache, NHK_TOP_NEWS_URL } from "@constants";
import { NHKSchema } from "@nhk/validation";

export async function getNHKPhrase() {
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

  return news[0].title;
}

export async function sendPhraseToBot(channelId: string) {
  const phrase = await getNHKPhrase();
  const message = `Phrase to translate is *${phrase}*.`;

  await writeFile(cache, phrase).catch((error) => {
    throw new Error(`Failed to write to cache: ${error}`);
  });

  const response = await bot.client.chat
    .postMessage({
      channel: channelId,
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

  return response;
}

type TranslateAndSendToBotArgs = {
  phrase: string;
  input: string;
  channelId: string;
};

export async function translateAndSendToBot(args: TranslateAndSendToBotArgs) {
  const [translation] = await tClient.translate(args.phrase, {
    from: "ja",
    to: "en-GB",
  });

  const similarity = similarText(args.input, translation);
  const message = `Translated *${translation}*. You scored *${similarity}/100*`;

  const response = await bot.client.chat
    .postMessage({
      channel: args.channelId,
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

  return response;
}
