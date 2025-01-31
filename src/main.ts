// import { styleText } from "node:util";
import {  NHK_NEWS_URL } from "@constants";
import { NHKNewsSchema } from "@models/nhk-news";
import { slack } from "@utils/slack";
import { env } from "@utils/env";
import tryCatch from "@utils/try-catch";

// const text = styleText(["underline", "bgGreen", "white"], "Hello world!");

const [news, error] = await tryCatch(
	fetch(NHK_NEWS_URL)
		.then((res) => res.json())
		.then((data) => NHKNewsSchema.array().parse(data)),
);

if (error) {
  throw new Error(error);
}

const message = await slack.chat.postMessage({
  channel: env.SLACK_CHANNEL_ID,
  text: JSON.stringify(news, null, 2)
});

console.log(message.ok);
