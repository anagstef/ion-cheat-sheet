import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://anagstef.github.io',
  base: '/ion-cheat-sheet',
  outDir: './dist',
  integrations: [react()],
});