import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import tanstackRouter from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    minify: "oxc",
    cssMinify: "lightningcss",
    reportCompressedSize: true,
    target: "baseline-widely-available",
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    devtools({
      removeDevtoolsOnBuild: true,
      injectSource: {
        enabled: false,
      },
    }),
    tailwindcss(),
    tanstackRouter({
      target: "react",
      quoteStyle: "double",
      autoCodeSplitting: true,
      routeFileIgnorePrefix: "-",
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    react(),
  ],
});
