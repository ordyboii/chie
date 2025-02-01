import { NHK_TOP_NEWS_URL, REPLICATE_MODEL } from "@constants";
import { NHKNewsSchema } from "@models/nhk-news";
import type { MessageElement } from "@slack/web-api/dist/types/response/ConversationsHistoryResponse";
import { env } from "@utils/env";
import { getJBotPrompt, replicate } from "@utils/replicate";
import { slack } from "@utils/slack";
import { sleep } from "@utils/sleep";
import { tryCatch } from "@utils/try-catch";
import { Queue, Worker } from "bullmq";
import { z } from "zod";

const [news] = await tryCatch(
	fetch(NHK_TOP_NEWS_URL)
		.then((res) => res.json())
		.then((data) => NHKNewsSchema.array().parse(data)),
);

await slack.chat.postMessage({
	channel: env.slackChannelId,
	text: `Phrase for today is ${news[0].title}`,
});

// TODO: refactor this
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

const connection = {
	host: "localhost",
	port: 6379,
};

// TODO: refactor this to run above code
const queueName = "send-phrase";
const queue = new Queue(queueName, { connection });

await queue.upsertJobScheduler(
	"every-day",
	{ pattern: "0 30 8 * * *" },
	{
		name: "every-job",
		data: {},
		opts: {},
	},
);

const worker = new Worker(
	queueName,
	async (job) => {
		return "";
	},
	{ connection },
);

// TODO: get full article by scraping

// const browser = await chromium.launch();
// const page = await browser.newPage();

// const url = `${NHK_NEWS_URL}/${news[0].newsId}/${news[0].newsId}.html`;
// await page.goto(url);
// await page.waitForLoadState("domcontentloaded");

// // const links = await page.$$eval('a', anchors => anchors.map(anchor => anchor.textContent.trim()));
// // console.log(links);
// const screenshot = await page.screenshot();
// await writeFile("screenshot.png", screenshot);

// await browser.close();
