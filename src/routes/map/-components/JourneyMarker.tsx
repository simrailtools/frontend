import { deepEqual } from "fast-equals";
import { type FC, memo, useEffect } from "react";
import { Marker } from "react-map-gl/maplibre";
import type { JourneyUpdateFrame } from "@/api/proto/event_bus_pb.ts";
import type { JourneyBaseData } from "@/hooks/useLiveJourneyData.tsx";
import type { NatsSyncedEntry } from "@/hooks/useNatsSyncedList.tsx";
import { useSelectedJourney } from "@/hooks/useSelectedJourney.tsx";
import { useUserData } from "@/hooks/useUserData.tsx";
import { MapTooltip } from "@/routes/map/-components/MapTooltip.tsx";
import { UserIcon } from "@/routes/map/-components/UserIcon.tsx";
import { useDriftPosition } from "@/routes/map/-hooks/useDriftPosition.tsx";

interface MarkerComponentProps {
  journey: NatsSyncedEntry<JourneyBaseData, JourneyUpdateFrame>;
}

export const JourneyMarker: FC<MarkerComponentProps> = memo(
  ({ journey }) => {
    const driver = journey.live?.journeyData?.driver;
    const hasDriver = !!driver;
    const { data: userInfo, isLoading: userInfoLoading } = useUserData(driver);

    const { latitude = 0, longitude = 0 } = journey.live?.journeyData?.position ?? {};
    const { pos, slideTo } = useDriftPosition({ latitude, longitude }, 2000);
    useEffect(() => slideTo({ latitude, longitude }), [latitude, longitude, slideTo]);

    const { setSelectedJourney } = useSelectedJourney();
    return (
      <Marker
        anchor={"center"}
        style={{ zIndex: 50 }}
        latitude={pos.latitude}
        longitude={pos.longitude}
        onClick={event => {
          setSelectedJourney(journey.live?.ids?.dataId);
          event.originalEvent?.stopPropagation();
        }}
      >
        <div className="relative flex items-center justify-center cursor-pointer">
          <UserIcon
            hasUser={hasDriver}
            userInfoLoading={userInfoLoading}
            userInfo={userInfo}
            className={"rounded-full h-8 w-8"}
          />
          <MapTooltip position={"bottom"} className={"text-[85%] p-1"}>
            {journey.base.transport.category} {journey.base.transport.number}
          </MapTooltip>
        </div>
      </Marker>
    );
  },
  (prev, next) => {
    // only update the component if the live data changed, the base data is fixed after initial render
    return deepEqual(prev.journey.live, next.journey.live);
  },
);
