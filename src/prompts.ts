export function translatePhraseAndScorePrompt(args: {
  phrase: string;
  input: string;
}) {
  return {
    top_k: 0,
    top_p: 0.95,
    prompt: `Translate "${args.phrase}" to English and work out the similarity score as a whole number 
    out of 100 between your translation and "${args.input}" which is what the user input. 
    Output them in JSON format as follows:\n
    {\n  
      "translation": string,\n
      "score": number\n
    }\n
    DO NOT OUTPUT ANYTHING ELSE BUT THE JSON.`,
    max_tokens: 512,
    temperature: 0.75,
    system_prompt: "You are a bot responsible for outputting JSON.",
    length_penalty: 1,
    max_new_tokens: 512,
    stop_sequences: "<|end_of_text|>,<|eot_id|>",
    prompt_template:
      "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
    presence_penalty: 0,
    log_performance_metrics: false,
  };
}
