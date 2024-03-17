import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [vitePreprocess({})],

  kit: {
    adapter: adapter({
      fallback: "404.html",
      precompress: true,
    }),
    alias: {
      "@/*": "./src/*",
      "$l/*": "./src/lib/*",
      "$c/*": "./src/lib/components/*",
      "$r/*": "./src/routes/*",
    },
  },
};

export default config;
