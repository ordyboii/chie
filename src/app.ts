import { connection } from "@common/redis";
import { NHKService } from "@modules/nhk/nhk.service";
import { type Job, Queue, Worker } from "bullmq";

const queueName = "send-phrase";
const queue = new Queue(queueName, { connection });

await queue.upsertJobScheduler(
	"every-day",
	{ pattern: "0 12 * * *" },
	{
		name: "every-job",
		data: {},
		opts: {},
	},
);

new Worker(
	queueName,
	async (job: Job) => {
		const error = await NHKService.getAndSendPhraseToSlack();
		if (error) throw new Error(error);
	},
	{ connection },
);
