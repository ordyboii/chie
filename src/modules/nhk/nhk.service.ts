import { getJBotPrompt, replicate, slack } from "@common/api";
import { NHK_TOP_NEWS_URL, REPLICATE_MODEL } from "@common/constants";
import { env } from "@common/env";
import { sleep } from "@common/utils";
import { type NHKNews, NHKNewsSchema } from "@modules/nhk/nhk.validation";
import type { MessageElement } from "@slack/web-api/dist/types/response/ConversationsHistoryResponse";
import { ZodError, z } from "zod";

export const NHKService = {
	async getAndSendPhraseToSlack() {
		let news: NHKNews[];
		try {
			const res = await fetch(NHK_TOP_NEWS_URL);
			const json = await res.json();
			news = NHKNewsSchema.array().parse(json);
		} catch (error) {
			if (error instanceof ZodError) {
				return error.flatten().fieldErrors;
			}
			return error;
		}

		await slack.chat.postMessage({
			channel: env.slackChannelId,
			text: `Phrase for today is ${news[0].title}`,
		});

		let message: MessageElement;
		while (true) {
			sleep(3000);

			const history = await slack.conversations.history({
				channel: env.slackChannelId,
			});

			if (!history.messages[0].bot_id) {
				message = history.messages[0];
				break;
			}
		}

		const input = getJBotPrompt({ phrase: news[0].title, input: message.text });
		const prediction = await replicate.run(REPLICATE_MODEL, {
			input,
		});

		const output = z
			.array(z.string())
			.transform(
				(data) =>
					JSON.parse(data.join("")) as { translation: string; score: number },
			)
			.parse(prediction);

		await slack.chat.postMessage({
			channel: env.slackChannelId,
			text: `The phrase actually says ${output.translation}. You scored ${output.score}/100`,
		});
	},
};
