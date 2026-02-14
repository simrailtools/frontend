import { deepEqual } from "fast-equals";
import { type CSSProperties, type FC, memo, useCallback, useEffect, useRef } from "react";
import { Marker, type MarkerEvent, type MarkerInstance } from "react-map-gl/maplibre";
import type { JourneyUpdateFrame } from "@/api/proto/event_bus_pb.ts";
import type { JourneyBaseData } from "@/hooks/useLiveJourneyData.tsx";
import type { NatsSyncedEntry } from "@/hooks/useNatsSyncedList.tsx";
import { useSelectedJourney } from "@/hooks/useSelectedJourney.tsx";
import { useUserData } from "@/hooks/useUserData.tsx";
import { JourneyMarkerContent } from "@/routes/map/-components/JourneyMarkerContent.tsx";
import { useDriftPosition } from "@/routes/map/-hooks/useDriftPosition.tsx";

// style to apply to all rendered markers. defined here to circumvent memoization issues
const markerStyle: CSSProperties = {
  zIndex: 50,
} as const;

interface MarkerComponentProps {
  journey: NatsSyncedEntry<JourneyBaseData, JourneyUpdateFrame>;
}

export const JourneyMarker: FC<MarkerComponentProps> = memo(
  ({ journey }) => {
    const driver = journey.live?.journeyData?.driver;
    const { data: userInfo, isLoading: userInfoLoading } = useUserData(driver);

    const markerRef = useRef<MarkerInstance>(null);
    const updatePosition = useCallback((lat: number, lon: number) => {
      const marker = markerRef.current;
      if (marker) {
        marker.setLngLat([lon, lat]);
      }
    }, []);

    const { latitude = 0, longitude = 0 } = journey.live?.journeyData?.position ?? {};
    const { slideTo, currentPosRef } = useDriftPosition({ latitude, longitude }, 2000, updatePosition);
    useEffect(() => slideTo(latitude, longitude), [latitude, longitude, slideTo]);

    const { setSelectedJourney } = useSelectedJourney();
    const handleMarkerClick = useCallback(
      (event: MarkerEvent<MouseEvent>) => {
        setSelectedJourney(journey.live?.ids?.dataId);
        event.originalEvent?.stopPropagation();
      },
      [setSelectedJourney, journey.live?.ids?.dataId],
    );

    return (
      <Marker
        ref={markerRef}
        anchor={"center"}
        style={markerStyle}
        onClick={handleMarkerClick}
        latitude={currentPosRef.current.latitude}
        longitude={currentPosRef.current.longitude}
      >
        <JourneyMarkerContent
          hasUser={!!driver}
          userInfoLoading={userInfoLoading}
          userInfo={userInfo}
          transportCategory={journey.base.transport.category}
          transportNumber={journey.base.transport.number}
        />
      </Marker>
    );
  },
  (prev, next) => {
    // only update the component if the live data changed, the base data is fixed after initial render
    return deepEqual(prev.journey.live, next.journey.live);
  },
);
