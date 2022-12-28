import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, UserConfig } from "vitest/config";
// import vitals from "vite-vitals";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  const config: UserConfig = {
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
  };
  if (command === "serve" && mode === "development") {
    // the following is only needed for yarn dev
    config.define = { global: {} };
  }
  return config;
});
