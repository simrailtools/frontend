import { defaultPlugins, defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "https://apis.simrail.tools/docs/openapi.yaml",
  output: {
    path: "src/api/generated",
    lint: "biome",
    format: "biome",
  },
  plugins: [...defaultPlugins, "@hey-api/client-fetch", "@tanstack/react-query"],
});
