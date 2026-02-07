import { defineConfig } from "@hey-api/openapi-ts";

const baseUrl = process.env.API_BASE_URL ?? "https://apis.simrail.tools";
export default defineConfig({
  input: `${baseUrl}/docs/openapi.yaml`,
  output: {
    path: "./src/api/rest",
    lint: "biome",
    format: "biome",
  },
  plugins: [
    "@hey-api/typescript",
    "@tanstack/react-query",
    {
      name: "@hey-api/client-fetch",
      baseUrl,
    },
    {
      name: "@hey-api/sdk",
      responseStyle: "data",
    },
  ],
});
