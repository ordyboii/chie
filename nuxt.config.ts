// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/eslint",
  ],
  experimental: {
    inlineRouteRules: true,
  },
  nitro: {
    experimental: {
      websocket: true,
    },
  },
});
