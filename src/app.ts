import { Queue, Worker } from "bullmq";
import fastify from "fastify";
import { env } from "#common/env";
import { NHKService } from "#features/nhk/nhk.service";
import { slackResponse } from "../.stub/slack-response";

const app = fastify({ logger: true });

app.post("/slack-data", (req, reply) => {
	// need to figure out how to send this data
	function formatSlackData(data: typeof slackResponse) {
		return {
			userPhrase: data.state.values.Zhjmd["plain_text_input-action"].value,
		};
	}

	const formatted = formatSlackData(slackResponse);
});

const queueName = "send-phrase-to-slack";
const queue = new Queue(queueName, { connection: env.redis });

// await queue.upsertJobScheduler("every-day", { pattern: "0 17 * * *" });
await queue.upsertJobScheduler("every-day", { every: 100000 });

const worker = new Worker(
	queueName,
	async (job) => {
		console.log(`Job started ${job.name}`);
		job.updateProgress(10);

		const [data, error] = await NHKService.sendPhraseToSlack();
		if (error) {
			console.log(`Job ${job.name} ${job.id} failed with error ${error}`);
			throw error;
		}

		job.updateProgress(100);
		console.log(`Job ended ${job.name} ${job.id}`);
	},
	{ connection: env.redis },
);

console.log(`Worker started ${worker.name}`);
app.listen({ port: 3000 });
