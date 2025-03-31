export const NHK_NEWS_URL = "https://www3.nhk.or.jp/news/easy";

export const NHK_TOP_NEWS_URL =
  "https://www3.nhk.or.jp/news/easy/top-list.json";

export const PROD = process.env.NODE_ENV === "production";

export const cache = PROD ? "/app/cache/phrase.txt" : "./phrase.txt";
