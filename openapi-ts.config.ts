import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "https://apis.simrail.tools/docs/openapi.yaml",
  output: {
    path: "src/api/generated",
    lint: "biome",
    format: "biome",
  },
  plugins: [
    "@hey-api/typescript",
    "@hey-api/client-fetch",
    "@tanstack/react-query",
    {
      name: "@hey-api/sdk",
      responseStyle: "data",
    },
  ],
});
