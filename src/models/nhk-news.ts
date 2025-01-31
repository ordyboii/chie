import { z } from "zod";

export const NHKNewsSchema = z
	.object({
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
	})
	.transform((data) => ({
		topPriorityNumber: data.top_priority_number,
		newsId: data.news_id,
		topDisplayFlag: data.top_display_flag,
		newsPrearrangedTime: data.news_prearranged_time,
		title: data.title,
		titleWithRuby: data.title_with_ruby,
		outlineWithRuby: data.outline_with_ruby,
		newsFileVer: data.news_file_ver,
		newsPublicationStatus: data.news_publication_status,
		hasNewsWebImage: data.has_news_web_image,
		hasNewsWebMovie: data.has_news_web_movie,
		hasNewsEasyImage: data.has_news_easy_image,
		hasNewsEasyMovie: data.has_news_easy_movie,
		hasNewsEasyVoice: data.has_news_easy_voice,
		newsWebImageUri: data.news_web_image_uri,
		newsWebMovieUri: data.news_web_movie_uri,
		newsEasyImageUri: data.news_easy_image_uri,
		newsEasyMovieUri: data.news_easy_movie_uri,
		newsEasyVoiceUri: data.news_easy_voice_uri,
	}));

export type NHKNews = z.infer<typeof NHKNewsSchema>;
