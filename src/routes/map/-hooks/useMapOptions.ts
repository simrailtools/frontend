import { useCallback, useState } from "react";

/**
 * The key used to store the map options in the local storage.
 */
const MAP_OPTIONS_KEY = "map_options";

/**
 * The available tile layers for selection.
 */
const tileLayers = Object.freeze(["standard", "wmts_topplusopen", "esri_satellite"]);

/**
 * The default map options when the user hasn't selected some before.
 */
const defaultMapOptions: MapOptions = Object.freeze({
  tileLayer: tileLayers[0],
  enabledLayers: ["trains", "dispatch_posts", "journey_polyline"],
});

/**
 * The options selected by the user for the map.
 */
export type MapOptions = {
  tileLayer: string;
  enabledLayers: Array<string>;
};

/**
 * Reads the map options from the local storage, returns the default options if
 * no options were stored previously or if the json data is corrupted.
 */
const getMapOptions = (): MapOptions => {
  try {
    const storedOptions = localStorage.getItem(MAP_OPTIONS_KEY);
    if (storedOptions) {
      const parsed = JSON.parse(storedOptions);
      return validateMapOptions({
        ...defaultMapOptions,
        ...parsed,
      });
    }
  } catch (error) {
    // ignore errors during storage read or json parsing
    console.debug("error while reading map options from local storage", error);
  }

  return defaultMapOptions;
};

/**
 * Stores the given map options into the local storage.
 * @param options the options to store.
 */
const storeMapOptions = (options: MapOptions) => {
  try {
    const validatedOptions = validateMapOptions(options);
    const serialized = JSON.stringify(validatedOptions);
    localStorage.setItem(MAP_OPTIONS_KEY, serialized);
  } catch (error) {
    // might be thrown due to a serialization issue or if the user has local storage disabled (e.g. private tab)
    console.debug("error while storing map options to local storage", error);
  }
};

/**
 * Validates the given map options, returning a new options object with fixes applied if necessary.
 * @param options the options to validate.
 */
const validateMapOptions = (options: MapOptions) => {
  let fixedOptions = options;
  if (!tileLayers.includes(options.tileLayer)) {
    fixedOptions = { ...fixedOptions, tileLayer: tileLayers[0] };
  }

  return fixedOptions;
};

/**
 * Hook for the map options. Initially read from the local storage,
 * updates will immediately persist into local storage.
 */
export const useMapOptions = () => {
  const [mapOptions, setMapOptions] = useState<MapOptions>(() => getMapOptions());
  const updateMapOptions = useCallback(
    (updater: Partial<MapOptions> | ((currentOptions: MapOptions) => Partial<MapOptions>)) => {
      setMapOptions(currentOptions => {
        const newOptions = typeof updater === "function" ? updater(currentOptions) : updater;
        const updatedOptions = { ...currentOptions, ...newOptions };
        storeMapOptions(updatedOptions);
        return updatedOptions;
      });
    },
    [],
  );

  return { mapOptions, updateMapOptions };
};
