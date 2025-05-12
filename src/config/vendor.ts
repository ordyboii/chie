import { env } from "@/config/env";
import { v2 } from "@google-cloud/translate";

export const googleTranslate = new v2.Translate({
  credentials: env.GOOGLE_APPLICATION_CREDENTIALS,
});
