import { Queue, Worker } from "bullmq";
import { slack } from "#common/api";
import { connection, redis } from "#common/redis";
import { NHKService } from "#features/nhk/nhk.service";

const queueName = "send-phrase-to-slack";
const queue = new Queue(queueName, { connection });

// await queue.upsertJobScheduler("every-day", { pattern: "0 17 * * *" });
await queue.upsertJobScheduler("every-day", { every: 1000000 });

const worker = new Worker(
	queueName,
	async (job) => {
		console.log(`Job started ${job.name}`);
		job.updateProgress(10);

		await NHKService.sendPhraseToSlack();

		job.updateProgress(100);
		console.log(`Job ended ${job.name} ${job.id}`);
	},
	{ connection },
);

slack.action("japanese-phrase-translate", async (data) => {
	await data.ack();
	const input =
		data.body.state.values["japanese-phrase"]["japanese-phrase-input"].value;

	const phrase = await redis.get("japanese-phrase");
	await NHKService.translatePhraseAndSendToSlack({ phrase, input });
});

console.log(`Worker started ${worker.name}`);

await slack.start();
slack.logger.info("⚡️ Bolt app is running!");
