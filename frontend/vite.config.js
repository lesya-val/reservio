import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/style/colors"; @import "src/style/mixins";`,
      },
    },
  },
});
