// import { styleText } from "node:util";
import { writeFile } from 'node:fs/promises';
import { NHK_TOP_NEWS_URL, NHK_NEWS_URL } from "@constants";
import { NHKNewsSchema } from "@models/nhk-news";
// import { slack } from "@utils/slack";
// import { env } from "@utils/env";
import { tryCatch } from "@utils/try-catch";
import { chromium } from 'playwright';

// const text = styleText(["underline", "bgGreen", "white"], "Hello world!");

const [news] = await tryCatch(
	fetch(NHK_TOP_NEWS_URL)
		.then((res) => res.json())
		.then((data) => NHKNewsSchema.array().parse(data)),
);

// const message = await slack.chat.postMessage({
//   channel: env.SLACK_CHANNEL_ID,
//   text: JSON.stringify(news, null, 2)
// });

// console.log(message.ok);

const browser = await chromium.launch();
const page = await browser.newPage();

const url = `${NHK_NEWS_URL}/${news[0].newsId}/${news[0].newsId}.html`;
await page.goto(url);
await page.waitForLoadState("domcontentloaded");

// const links = await page.$$eval('a', anchors => anchors.map(anchor => anchor.textContent.trim()));
// console.log(links);
const screenshot = await page.screenshot();
await writeFile('screenshot.png', screenshot);

await browser.close();

