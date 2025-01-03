import tailwindcss from "@tailwindcss/vite";
import TanStackRouterVite from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import * as path from "node:path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
