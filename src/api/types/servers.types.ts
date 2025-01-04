/**
 * Request options for listing the registered servers.
 */
export type ListServersRequestOptions = {
  includeOffline?: boolean;
  includeDeleted?: boolean;
};

/**
 * Request options for getting a single server by its id.
 */
export type GetServerByIdRequestOptions = {
  serverId: string;
};

/**
 * Request options for getting a single server by its code.
 */
export type GetServerByCodeRequestOptions = {
  serverCode: string;
};

/**
 * Type declaration of a single server returned by the SIT api.
 */
export type SitServer = {
  id: string;
  code: string;
  timezoneId: string;
  region: "ASIA" | "EUROPE" | "US_NORTH";
  tags: Array<string>;
  spokenLanguage: string | null;
  lastUpdated: Date;
  registeredSince: Date;
  online: boolean;
  deleted: boolean;
};
