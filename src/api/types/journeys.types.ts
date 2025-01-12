/**
 * Request options to get a single journey by its id.
 */
export type JourneyByIdRequestOptions = {
  id: string;
};

/**
 * Full details about a single journey.
 */
export type SitJourney = {
  journeyId: string;
  serverId: string;
  lastUpdated: string;
  firstSeenTime: string | null;
  lastSeenTime: string | null;
  journeyCancelled: boolean;
  liveData?: SitJourneyLiveData;
  events: Array<SitJourneyEvent>;
};

/**
 * A single event along the route of a journey.
 */
export type SitJourneyEvent = {
  id: string;
  type: "ARRIVAL" | "DEPARTURE";
  cancelled: boolean;
  additional: boolean;
  stopPlace: SitJourneyStopPlace;
  scheduledTime: string;
  realtimeTime: string;
  realtimeTimeType: "SCHEDULE" | "PREDICTION" | "REAL";
  stopType: "NONE" | "TECHNICAL" | "PASSENGER";
  scheduledPassengerStop: SitJourneyPassengerStopInfo | null;
  realtimePassengerStop: SitJourneyPassengerStopInfo | null;
  transport: SitJourneyTransport;
};

/**
 * The transport used for a journey.
 */
export type SitJourneyTransport = {
  category: string;
  number: string;
  line: string | null;
  label: string | null;
  type: SitJourneyTrainType;
  maxSpeed: number;
};

/**
 * Live information about a journey.
 */
export type SitJourneyLiveData = {
  speed: number;
  position: SitJourneyPosition;
  driverSteamId: string | null;
  nextSignal: SitJourneySignal | null;
};

/**
 * General information about a stop place along the journey route.
 */
export type SitJourneyStopPlace = {
  id: string;
  name: string;
  position: SitJourneyPosition;
  inPlayableBorder: boolean;
};

/**
 * A geo position.
 */
export type SitJourneyPosition = {
  latitude: number;
  longitude: number;
};

/**
 * Information about a single signal.
 */
export type SitJourneySignal = {
  name: string;
  distance: number;
  maxSpeed: number | null;
};

/**
 * Information about the passenger stop of a train.
 */
export type SitJourneyPassengerStopInfo = {
  platform: number;
  track: number;
};

/**
 * Higher level categories of a journey.
 */
export enum SitJourneyTrainType {
  NATIONAL_EXPRESS_TRAIN = "NATIONAL_EXPRESS_TRAIN",
  INTER_NATIONAL_EXPRESS_TRAIN = "INTER_NATIONAL_EXPRESS_TRAIN",
  INTER_REGIONAL_EXPRESS_TRAIN = "INTER_REGIONAL_EXPRESS_TRAIN",
  INTER_REGIONAL_TRAIN = "INTER_REGIONAL_TRAIN",
  REGIONAL_FAST_TRAIN = "REGIONAL_FAST_TRAIN",
  REGIONAL_TRAIN = "REGIONAL_TRAIN",
  ADDITIONAL_TRAIN = "ADDITIONAL_TRAIN",
  MANEUVER_TRAIN = "MANEUVER_TRAIN",
  EMPTY_TRANSFER_TRAIN = "EMPTY_TRANSFER_TRAIN",
  INTER_NATIONAL_CARGO_TRAIN = "INTER_NATIONAL_CARGO_TRAIN",
  NATIONAL_CARGO_TRAIN = "NATIONAL_CARGO_TRAIN",
  MAINTENANCE_TRAIN = "MAINTENANCE_TRAIN",
}
