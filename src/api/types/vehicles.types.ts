/**
 * Request options to get the vehicle composition for a single journey.
 */
export type JourneyVehicleCompositionRequestOptions = {
  journeyId: string;
};

/**
 * The vehicle composition of a journey.
 */
export type SitJourneyComposition = {
  journeyId: string;
  status: "REAL" | "PREDICTION" | "UNKNOWN";
  lastUpdated: string;
  vehicles: Array<SitVehicle>;
};

/**
 * Information about of the vehicle used in a train composition.
 */
export type SitVehicle = {
  indexInGroup: number;
  loadWeight: number | null;
  load: SitVehicleLoad | null;
  railcar: SitRailcarDescriptor;
};

/**
 * A simple descriptor of the railcar of a vehicle.
 */
export type SitRailcarDescriptor = {
  id: string;
  name: string;
  type: "WAGON" | "LOCOMOTIVE" | "ELECTRIC_MULTIPLE_UNIT";
  weight: number;
  width: number;
  length: number;
};

/**
 * The load of a vehicle in a group.
 */
export enum SitVehicleLoad {
  TIE = "TIE",
  T_BEAM = "T_BEAM",
  PIPELINE = "PIPELINE",
  CONTAINER = "CONTAINER",
  TREE_TRUNK = "TREE_TRUNK",
  WOODEN_BEAM = "WOODEN_BEAM",
  METAL_SHEET = "METAL_SHEET",
  STEEL_CIRCLE = "STEEL_CIRCLE",
  CONCRETE_SLAB = "CONCRETE_SLAB",
  PETROL = "PETROL",
  ETHANOL = "ETHANOL",
  CRUDE_OIL = "CRUDE_OIL",
  HEATING_OIL = "HEATING_OIL",
  COAL = "COAL",
  SAND = "SAND",
  BALLAST = "BALLAST",
  WOOD_LOGS = "WOOD_LOGS",
  UNKNOWN = "UNKNOWN",
}
