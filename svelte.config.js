import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [vitePreprocess({})],

  kit: {
    adapter: adapter({ runtime: "nodejs18.x" }),
    alias: {
      "@/*": "./src/*",
      "$l/*": "./src/lib/*",
      "$c/*": "./src/lib/components/*",
      "$r/*": "./src/routes/*",
    },
  },
};

export default config;
