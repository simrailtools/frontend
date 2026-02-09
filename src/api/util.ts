import { client } from "@/api/rest/client.gen.ts";

/**
 * Backend url used in production, only used as a fallback.
 */
const prodBackendUrl = "https://apis.simrail.tools";

/**
 * Production URI for connecting to the NATS backend.
 */
const prodNatsUrl = "wss://nats.simrail.tools";

/**
 * Utility method to resolve the NATS backend url based on the current environment configuration.
 */
export function resolveNatsBackendUrl(): string {
  if (import.meta.env.PROD) {
    return prodNatsUrl;
  }

  const restBaseUrl = client.getConfig().baseUrl ?? prodBackendUrl;
  const parsedBaseUrl = new URL(restBaseUrl);
  if (parsedBaseUrl.hostname !== "localhost") {
    // development environment, but not local. use production NATS instance
    return prodNatsUrl;
  }

  // local development environment, use local NATS
  parsedBaseUrl.protocol = "ws";
  parsedBaseUrl.port = "51803";
  return parsedBaseUrl.toString();
}
