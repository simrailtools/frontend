import { type BaseRequestOptions, requestJson, SIT_BASE_URL } from "../client.ts";
import type { BySteamIdsRequestOptions, SitUser } from "../types/users.types.ts";

/**
 * The base url for the users api client.
 */
const USERS_V1_BASE_URL = `${SIT_BASE_URL}/sit-users/v1`;

/**
 * Get a batch of users (up to 100) in a single request. If an id is provided which
 * can't be resolved to a user info, the id is skipped and there will be no reference
 * to the id in the response array. The provided ids must all be in the SteamID64 format.
 * @param request the request options.
 */
export const usersBySteamIds = (request: BaseRequestOptions & BySteamIdsRequestOptions): Promise<SitUser[]> => {
  const { steamIds, abortSignal } = request;
  return requestJson<SitUser[]>({
    url: `${USERS_V1_BASE_URL}/by-steam-ids`,
    method: "POST",
    body: steamIds,
    abortSignal,
  });
};
