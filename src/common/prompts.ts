export const Prompts = {
	translatePhraseAndScore(args: {
		phrase: string;
		input: string;
	}) {
		const commonPrompt = `
		You are a system responsible for outputting JSON and JSON only. 
		Your job is to take a JSON input like this {phrase: string, input: string}. 
		The phrase will be a Japanese string and the input will be what the user thought that phrase translates to. 
		You must first translate the phrase from English to Japanese and then compare the user phrase with the English version of the translated Japanese phrase and give a similarity score as a number percentage (no floats). 
		Once done return a JSON response with the following output {translation: string, score: number}. 
		DO NOT OUTPUT ANYTHING ELSE BUT THIS JSON.
	`;
		return {
			top_k: 0,
			top_p: 0.9,
			prompt: `${commonPrompt}\n\nUse the following JSON input {phrase: "${args.phrase}", input: "${args.input}"}`,
			max_tokens: 512,
			min_tokens: 0,
			temperature: 0.6,
			system_prompt: commonPrompt,
			length_penalty: 1,
			stop_sequences: "<|end_of_text|>,<|eot_id|>",
			prompt_template:
				"<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nYou are a helpful assistant<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
			presence_penalty: 1.15,
			log_performance_metrics: false,
		};
	},
};
