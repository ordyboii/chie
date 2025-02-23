import { z } from "zod";
import { replicate, slack } from "#common/api";
import { NHK_TOP_NEWS_URL, REPLICATE_MODEL } from "#common/constants";
import { env } from "#common/env";
import { translatePhraseAndScorePrompt } from "#common/prompts";
import { redis } from "#common/redis";
import { NHKSchema } from "#features/nhk/nhk.validation";

export const NHKService = {
  async sendPhraseToSlack() {
    const res = await fetch(NHK_TOP_NEWS_URL).catch((error) => {
      throw new Error(`Failed to fetch NHK news: ${error}`);
    });
    const json = await res.json().catch((error) => {
      throw new Error(`NHK news JSON parsing failed: ${error}`);
    });
    const news = await NHKSchema.array()
      .parseAsync(json)
      .catch((error) => {
        throw new Error(`Failed to validate NHK news: ${error}`);
      });

    const phrase = news[0].title;
    const message = `Phrase to translate iS *${phrase}*.`;

    await slack.client.chat
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

    redis.set("japanese-phrase", phrase);
  },
  async translatePhraseAndSendToSlack(args: { phrase: string; input: string }) {
    const input = translatePhraseAndScorePrompt({
      phrase: args.phrase,
      input: args.input,
    });

    const prediction = await replicate
      .run(REPLICATE_MODEL, {
        input,
      })
      .catch((error) => {
        throw new Error(`Failed to get prediction from Replicate: ${error}`);
      });

    const output = z
      .array(z.string())
      .transform(
        (data) =>
          JSON.parse(data.join("")) as { translation: string; score: number },
      )
      .parse(prediction);

    const message = `The phrase actually says *${output.translation}*. You scored *${output.score}/100*`;
    await slack.client.chat
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
  },
};
