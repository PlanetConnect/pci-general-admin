import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";
// import vitals from "vite-vitals";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [
    react(),
    // report web vitals
    // vitals({
    //   // Tracking ID (required) { string }
    //   trackingID: "UA-XXXXXXXX-X",
    //   // // Event Category (optional) { string }
    //   eventCategory: "Vite Vitals",
    //   // Debug (optional) { boolean }
    //   debug: false,
    // }),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
  define: { global: {} },
});
