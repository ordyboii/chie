import { ZodError, type inferFlattenedErrors, z } from "zod";
import { replicate, slack } from "#common/api";
import { NHK_TOP_NEWS_URL, REPLICATE_MODEL } from "#common/constants";
import { env } from "#common/env";
import { Prompts } from "#common/prompts";
import { NHKSchema } from "#features/nhk/nhk";

export const NHKService = {
	async sendPhraseToSlack() {
		let data: string;
		let error: inferFlattenedErrors<typeof NHKSchema> | Error;

		try {
			const res = await fetch(NHK_TOP_NEWS_URL);
			const json = await res.json();
			const news = NHKSchema.array().parse(json);
			const phrase = news[0].title;

			await slack.chat.postMessage({
				channel: env.slackChannelId,
				text: `Phrase to translate iS *${phrase}*.`,
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
							text: `Phrase to translate iS *${news[0].title}*.`,
						},
					},
					{
						type: "input",
						element: {
							type: "plain_text_input",
							action_id: "plain_text_input-action",
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
								action_id: "send-action",
							},
						],
					},
				],
			});

			data = phrase;
		} catch (err) {
			if (err instanceof ZodError) {
				error = err.flatten();
			}
			error = err;
		}

		return [data, error];
	},
	async translatePhraseAndSendToSlack(args: { phrase: string; input: string }) {
		const input = Prompts.translatePhraseAndScore({
			phrase: args.phrase,
			input: args.input,
		});

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
