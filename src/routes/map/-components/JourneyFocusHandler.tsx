import { deepEqual } from "fast-equals";
import { type FC, memo, useEffect, useRef, useState } from "react";
import { MdAdjust } from "react-icons/md";
import { useMap } from "react-map-gl/maplibre";
import type { GeoPosition } from "@/api/proto/event_bus_pb.ts";
import { useSelectedJourney } from "@/hooks/useSelectedJourney.tsx";

export const JourneyFocusHandler: FC<{ position: GeoPosition | undefined }> = memo(
  ({ position }) => {
    const { current: map } = useMap();
    const [focusJourney, setFocusJourney] = useState(true);

    const { selectedJourneyId } = useSelectedJourney();
    const lastSelectedJourney = useRef<string | undefined>(selectedJourneyId);

    // updates the map focus in case a journey is selected and focused
    useEffect(() => {
      if (position && focusJourney && map) {
        map.easeTo({
          duration: 500,
          center: [position.longitude, position.latitude],
        });
      }
    }, [position, focusJourney, map]);

    // reset the focus state when the selected journey id changes
    useEffect(() => {
      const prevSelectedJourney = lastSelectedJourney.current;
      if (prevSelectedJourney !== selectedJourneyId) {
        setFocusJourney(true);
        lastSelectedJourney.current = selectedJourneyId;
      }
    }, [selectedJourneyId]);

    // handler for starting a drag on the map, disable focus of the journey (unless no journey is selected)
    useEffect(() => {
      if (map) {
        const dragHandler = () => {
          if (selectedJourneyId) {
            setFocusJourney(false);
          }
        };
        map.on("dragstart", dragHandler);
        return () => {
          map.off("dragstart", dragHandler);
        };
      }
    }, [map, selectedJourneyId]);

    // if no journey is selected or the journey is currently focused
    // we don't need to render the focus button
    if (focusJourney || !selectedJourneyId) {
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
  },
  (prev, next) => deepEqual(prev.position, next.position),
);
