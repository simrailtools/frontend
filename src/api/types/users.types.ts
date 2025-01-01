import type { BaseRequestOptions } from "../client.ts";

/**
 *
 */
export type BySteamIdsRequestOptions = BaseRequestOptions & {
  steamIds: string[];
};

/**
 *
 */
export type SitUser = {
  id: string;
  name: string;
  avatarHash: string;
  profileUrl: string;
  countryCode: string | null;
  profileVisible: boolean;
};
