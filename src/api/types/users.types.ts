/**
 * Request options for getting user information from the backend.
 */
export type BySteamIdsRequestOptions = {
  steamIds: string[];
};

/**
 * Type declaration of a single user returned by the SIT api.
 */
export type SitUser = {
  id: string;
  name: string;
  avatarHash: string;
  profileUrl: string;
  countryCode: string | null;
  profileVisible: boolean;
};
