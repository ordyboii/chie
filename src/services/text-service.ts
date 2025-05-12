export const textService = {
  similarText(str1: string, str2: string) {
    const distance = this.levenshteinDistance(str1, str2);
    const maxLength = Math.max(str1.length, str2.length);

    if (maxLength === 0) return 100;

    // Round to nearest whole number
    return Math.round((1 - distance / maxLength) * 100);
  },
  levenshteinDistance(str1: string, str2: string): number {
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
  },
};
