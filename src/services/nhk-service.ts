import { promises as fs } from "node:fs";
import { z } from "zod";
import { NHK_TOP_NEWS_URL } from "@/config/constants";
import { createChatBot, createTranslateClient, similarText } from "@/utils";

const bot = createChatBot();
const tClient = createTranslateClient();

const NHKSchema = z.object({
  top_priority_number: z.number(),
  news_id: z.string(),
  top_display_flag: z.boolean(),
  news_prearranged_time: z.string(),
  title: z.string(),
  title_with_ruby: z.string(),
  outline_with_ruby: z.string(),
  news_file_ver: z.boolean(),
  news_publication_status: z.boolean(),
  has_news_web_image: z.boolean(),
  has_news_web_movie: z.boolean(),
  has_news_easy_image: z.boolean(),
  has_news_easy_movie: z.boolean(),
  has_news_easy_voice: z.boolean(),
  news_web_image_uri: z.string().optional(),
  news_web_movie_uri: z.string().optional(),
  news_easy_image_uri: z.string().optional(),
  news_easy_movie_uri: z.string().optional(),
  news_easy_voice_uri: z.string().optional(),
});

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

  await fs.writeFile("", phrase).catch((error) => {
    throw new Error(`Failed to write to cache: ${error}`);
  });

  const response = await bot.chat
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

  const response = await bot.chat
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
