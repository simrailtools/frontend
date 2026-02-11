import { type FC, useEffect, useState } from "react";
import { MdAdjust } from "react-icons/md";
import { useMap } from "react-map-gl/maplibre";
import { useSelectedJourney } from "@/hooks/useSelectedJourney.tsx";

export const JourneyFocusHandler: FC = () => {
  const { current: map } = useMap();
  const { selectedJourney } = useSelectedJourney();
  const [focusJourney, setFocusJourney] = useState(true);

  // updates the map focus in case a journey is selected and focused
  useEffect(() => {
    if (selectedJourney && focusJourney && map) {
      const { latitude, longitude } = selectedJourney.live.journeyData.position;
      map.easeTo({
        duration: 2000,
        center: [longitude, latitude],
      });
    }
  }, [selectedJourney, focusJourney, map]);

  // reset the focus state when no journey is selected anymore
  useEffect(() => {
    if (!selectedJourney) {
      setFocusJourney(true);
    }
  }, [selectedJourney]);

  // handler for starting a drag on the map, disable focus of the journey (unless no journey is selected)
  useEffect(() => {
    if (map) {
      const dragHandler = () => {
        if (selectedJourney) {
          setFocusJourney(false);
        }
      };
      map.on("dragstart", dragHandler);
      return () => {
        map.off("dragstart", dragHandler);
      };
    }
  }, [map, selectedJourney]);

  // if no journey is selected or the journey is currently focused
  // we don't need to render the focus button
  if (focusJourney || !selectedJourney) {
    return null;
  }

  return (
    <button
      type={"button"}
      onClick={event => {
        event.preventDefault();
        event.stopPropagation();
        setFocusJourney(true);
      }}
      className={
        "absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10000 flex items-center " +
        "space-x-2 p-2 cursor-pointer bg-blue-600 rounded-md shadow-lg hover:bg-blue-700 text-white"
      }
    >
      <MdAdjust className="h-7 w-7" />
      <span className="text-sm font-semibold">Focus Journey</span>
    </button>
  );
};
