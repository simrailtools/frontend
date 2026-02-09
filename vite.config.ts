import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import tanstackRouter from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    sourcemap: false,
    minify: "esbuild",
    cssMinify: "esbuild",
    assetsInlineLimit: 4096,
    reportCompressedSize: true,
    target: "baseline-widely-available",
  },
  plugins: [
    devtools({
      removeDevtoolsOnBuild: true,
    }),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
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
    viteReact(),
  ],
});
