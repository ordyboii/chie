import { z } from "zod";

export const NHKSchema = z.object({
	top_priority_number: z.number(),
	news_id: z.string(),
	top_display_flag: z.boolean(),
	news_prearranged_time: z.string(),
	title: z.string(),
	title_with_ruby: z.string(),
	outline_with_ruby: z.string(),
	news_file_ver: z.boolean(),
	news_publication_status: z.boolean(),
	has_news_web_image: z.boolean(),
	has_news_web_movie: z.boolean(),
	has_news_easy_image: z.boolean(),
	has_news_easy_movie: z.boolean(),
	has_news_easy_voice: z.boolean(),
	news_web_image_uri: z.string().optional(),
	news_web_movie_uri: z.string().optional(),
	news_easy_image_uri: z.string().optional(),
	news_easy_movie_uri: z.string().optional(),
	news_easy_voice_uri: z.string().optional(),
});

export type NHK = z.infer<typeof NHKSchema>;
