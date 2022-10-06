import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";
// import vitals from "vite-vitals";

// https://vitejs.dev/config/
export default defineConfig({
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
      "~app": path.resolve(__dirname, "./src/app"),
      "~features": path.resolve(__dirname, "./src/features"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
