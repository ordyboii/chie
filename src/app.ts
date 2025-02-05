import { env } from "@common/env";
import { NHKService } from "@modules/nhk/nhk.service";
import { Queue, Worker } from "bullmq";

const queueName = "send-phrase-to-slack";
const queue = new Queue(queueName, { connection: env.redis });

await queue.upsertJobScheduler("every-day", { pattern: "0 15 * * *" });

const worker = new Worker(
	queueName,
	async (job) => {
		console.log(`Job started ${job.name}`);
		job.updateProgress(10);

		const error = await NHKService.getAndSendPhraseToSlack();
		if (error) throw new Error(error);

		job.updateProgress(100);
		console.log(`Job ended ${job.name}`);
	},
	{ connection: env.redis },
);

console.log(`Worker started ${worker.name}`);
