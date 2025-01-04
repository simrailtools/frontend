import { useSelectedJourney } from "@/hooks/useSelectedJourney.tsx";
import { type FC, useEffect, useState } from "react";
import { MdAdjust } from "react-icons/md";
import { useMap, useMapEvent } from "react-leaflet";

export const JourneyFocusHandler: FC = () => {
  const { selectedJourney } = useSelectedJourney();
  const [focusJourney, setFocusJourney] = useState(true);

  // updates the map focus in case a journey is selected and focused
  const map = useMap();
  useEffect(() => {
    if (selectedJourney && focusJourney) {
      map.setView([selectedJourney.positionLat, selectedJourney.positionLng], undefined, {
        animate: true,
        duration: 2,
        easeLinearity: 0.2,
      });
    }
  }, [map, focusJourney, selectedJourney]);

  // reset the focus state when no journey is selected anymore
  useEffect(() => {
    if (!selectedJourney) {
      setFocusJourney(true);
    }
  }, [selectedJourney]);

  // handler for starting a drag on the map, disable focus of the journey (unless no journey is selected)
  const dragHandler = () => {
    if (selectedJourney) {
      setFocusJourney(false);
    }
  };
  useMapEvent("dragstart", dragHandler);

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
        "absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[10000] flex items-center " +
        "space-x-2 p-2 cursor-pointer bg-blue-600 rounded-md shadow-lg hover:bg-blue-700 text-white"
      }
    >
      <MdAdjust className="h-7 w-7" />
      <span className="text-sm font-semibold">Focus Journey</span>
    </button>
  );
};
