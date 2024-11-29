import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "client",
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});