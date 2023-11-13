import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: 'https://anagstef.github.io',
  base: '/ion-cheat-sheet',
  outDir: './dist',
  integrations: [react()],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});