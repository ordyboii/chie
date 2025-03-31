import { createBot, createTranslateClient } from "@api";

export const bot = createBot();
export const tClient = createTranslateClient();

function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = [];

  // Initialize the DP matrix
  for (let i = 0; i <= m; i++) {
    dp[i] = [];
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  // Calculate the Levenshtein distance
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] =
          1 +
          Math.min(
            dp[i - 1][j], // Deletion
            dp[i][j - 1], // Insertion
            dp[i - 1][j - 1], // Substitution
          );
      }
    }
  }

  return dp[m][n];
}

export function similarText(str1: string, str2: string) {
  const distance = levenshteinDistance(str1, str2);
  const maxLength = Math.max(str1.length, str2.length);

  if (maxLength === 0) {
    return 100; // If both strings are empty, they're 100% similar
  }

  // Round to nearest whole number
  return Math.round((1 - distance / maxLength) * 100);
}

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
