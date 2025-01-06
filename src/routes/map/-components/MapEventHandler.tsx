import { useSelectedJourney } from "@/hooks/useSelectedJourney.tsx";
import type { FC } from "react";
import { useMapEvent } from "react-leaflet";

export type MapEventHandlerProps = {
  /**
   * Function to change the base tile layer in the map options.
   * @param layer the base tile layer to use.
   */
  changeTileLayer: (layer: string) => void;
  /**
   * Function to toggle a single map layer in the map options.
   * @param layer the layer to enable or disable.
   * @param enabled if the given layer should be enabled or disabled.
   */
  toggleMapLayer: (layer: string, enabled: boolean) => void;
};

export const MapEventHandler: FC<MapEventHandlerProps> = ({ changeTileLayer, toggleMapLayer }) => {
  // reset journey selection when clicked somewhere on the map
  const { setSelectedJourney } = useSelectedJourney();
  useMapEvent("click", () => setSelectedJourney(null));

  // update map options in case of a layer add/remove or base layer change
  const layerOptionsName = (layerName: string) => layerName.toLowerCase().replace(" ", "_");
  useMapEvent("overlayadd", event => toggleMapLayer(layerOptionsName(event.name), true));
  useMapEvent("overlayremove", event => toggleMapLayer(layerOptionsName(event.name), false));
  useMapEvent("baselayerchange", event => changeTileLayer(layerOptionsName(event.name)));

  return null;
};
