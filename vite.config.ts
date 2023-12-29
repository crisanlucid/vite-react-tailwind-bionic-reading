/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
  
//   plugins: [react()],
// });

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: "/vite-react-tailwind-bionic-reading/",
    plugins: [react()],
    test: {
      // Do not process css files (is slow)
      css: false,
      environment: 'jsdom',
      // This is to not import test, it, expect, vi (instead of jest). Similar to how jest works
      globals: true,
      setupFiles: ["./src/setupTests.ts"],
    },
    server: {
      watch: {
        usePolling: true,
      },
      host: true,
      strictPort: true,
      port: +process.env?.PORT || 3000,
    },
  });
};