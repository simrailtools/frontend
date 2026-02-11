import type { FC } from "react";
import { Marker } from "react-map-gl/maplibre";
import { tools } from "@/api/proto/bundle";
import type { JourneyBaseData } from "@/hooks/useLiveJourneyData.tsx";
import type { NatsSyncedEntry } from "@/hooks/useNatsSyncedList.tsx";
import { useSelectedJourney } from "@/hooks/useSelectedJourney.tsx";
import { useUserData } from "@/hooks/useUserData.tsx";
import { MapTooltip } from "@/routes/map/-components/MapTooltip.tsx";
import { UserIcon } from "@/routes/map/-components/UserIcon.tsx";

import JourneyUpdateFrame = tools.simrail.backend.JourneyUpdateFrame;

interface MarkerComponentProps {
  journey: NatsSyncedEntry<JourneyBaseData, JourneyUpdateFrame>;
}

export const JourneyMarker: FC<MarkerComponentProps> = ({ journey }) => {
  const driver = journey.live.journeyData.driver;
  const hasDriver = !!driver;
  const { data: userInfo, isLoading: userInfoLoading } = useUserData(driver);

  const { setSelectedJourney } = useSelectedJourney();
  const position = journey.live.journeyData.position;
  return (
    <Marker
      anchor={"center"}
      latitude={position.latitude}
      longitude={position.longitude}
      style={{ zIndex: 50 }} // , transition: "transform 0.75s ease-out"
      onClick={event => {
        setSelectedJourney(journey);
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
};
