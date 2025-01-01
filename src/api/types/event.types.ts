/**
 * A wrapper for a single frame being sent by the backend.
 */
export type EventStreamFrame<T> = {
  frameType: "SERVER" | "JOURNEY" | "DISPATCH_POST";
  updateType: "ADD" | "REMOVE" | "UPDATE";
  frameData: T;
};

/**
 * Initial snapshot of a dispatch post.
 */
export type DispatchPostSnapshotFrame = {
  /**
   * The id of the dispatch post.
   */
  postId: string;
  /**
   * The id of the point associated with the dispatch post.
   */
  pointId: string;
  /**
   * The id of the server on which the dispatch post is located.
   */
  serverId: string;

  /**
   * The name of the dispatch post.
   */
  name: string;
  /**
   * The difficulty level of the dispatch post.
   */
  difficultyLevel: number;

  /**
   * The latitude where the dispatch post is located.
   */
  latitude: number;
  /**
   * The longitude where the dispatch post is located.
   */
  longitude: number;

  /**
   * The steam ids of the dispatchers, empty if not controlled by a player.
   */
  dispatcherSteamIds: string[];
};

/**
 * An update frame for a single dispatch post.
 */
export type DispatchPostUpdateFrame = {
  /**
   * The id of the dispatch post being updated.
   */
  postId: string;
  /**
   * The updated list of dispatcher steam ids, not given if the steam ids did not change.
   */
  dispatcherSteamIds?: string[];
};

/**
 * Initial snapshot of a server.
 */
export type ServerSnapshotFrame = {
  /**
   * The id of the server.
   */
  serverId: string;
  /**
   * The code of the server.
   */
  code: string;
  /**
   * The tags of the server.
   */
  tags: string[];
  /**
   * The language spoken on the server, null if the server is international.
   */
  spokenLanguage: string | null;
  /**
   * The region where the server is hosted.
   */
  region: "ASIA" | "EUROPE" | "US_NORTH";

  /**
   * Indicates if the server is currently online.
   */
  online: boolean;
  /**
   * The timezone id of the server according to the ISO-8601 specification.
   */
  timezoneId: string;
};

/**
 * An update frame for a single server.
 */
export type ServerUpdateFrame = {
  /**
   * The id of the server being updated.
   */
  serverId: string;
  /**
   * The timezone id of the server, not given if it didn't change.
   */
  timezoneId?: string;
  /**
   * If the server is online or offline, not given if it didn't change.
   */
  online?: boolean;
};

/**
 * Initial snapshot of a server.
 */
export type JourneySnapshotFrame = {
  /**
   * The id of the journey.
   */
  journeyId: string;
  /**
   * The id of the server where the journey happens.
   */
  serverId: string;

  /**
   * The category of the journey.
   */
  category: string;
  /**
   * The number of the journey.
   */
  number: string;
  /**
   * The line of the journey.
   */
  line?: string;
  /**
   * The label of the journey.
   */
  label?: string;

  /**
   * The current speed of the journey.
   */
  speed?: number;
  /**
   * The steam id of the current driver.
   */
  driverSteamId?: string;

  /**
   * The id of the signal ahead of the journey.
   */
  nextSignalId?: string;
  /**
   * The distance (in meters) of the journey to the next signal.
   */
  nextSignalDistance?: number;
  /**
   * The max speed allowed at the signal ahead of the journey.
   */
  nextSignalMaxSpeed?: number;

  /**
   * The latitude of the current journey position.
   */
  positionLat?: number;
  /**
   * The longitude of the current journey position.
   */
  positionLng?: number;
};

/**
 * An update frame for a single journey.
 */
export type JourneyUpdateFrame = {
  /**
   * The id of the journey being updated.
   */
  journeyId: string;

  /**
   * The current speed of the journey.
   */
  speed?: number;
  /**
   * The steam id of the current driver.
   */
  driverSteamId?: string;

  /**
   * The id of the signal ahead of the journey.
   */
  nextSignalId?: string;
  /**
   * The distance (in meters) of the journey to the next signal.
   */
  nextSignalDistance?: number;
  /**
   * The max speed allowed at the signal ahead of the journey.
   */
  nextSignalMaxSpeed?: number;

  /**
   * The latitude of the current journey position.
   */
  positionLat?: number;
  /**
   * The longitude of the current journey position.
   */
  positionLng?: number;
};
