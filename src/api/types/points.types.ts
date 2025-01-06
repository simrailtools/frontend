/**
 * Request options to list the points registered in the backend.
 */
export type ListPointsRequestOptions = {
  countries?: Array<string>;
  page?: number;
  limit?: number;
};

/**
 * A single point returned by the backend.
 */
export type SitPoint = {
  id: string;
  name: string;
  country: string;
  position: SitPointPosition;
  uicRef: string | null;
  osmNodeId: number;
  maxSpeed: number;
  platforms: Array<SitPointPlatform>;
};

/**
 * The position of a single point.
 */
export type SitPointPosition = {
  latitude: number;
  longitude: number;
};

/**
 * The platform information about a single point.
 */
export type SitPointPlatform = {
  track: number;
  platform: number;
};
