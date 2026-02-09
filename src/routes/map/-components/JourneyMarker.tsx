import type { BaseIconOptions, Icon } from "leaflet";
import { type FC, memo } from "react";
import { Tooltip } from "react-leaflet";
import ReactLeafletDriftMarker from "react-leaflet-drift-marker";
import { tools } from "@/api/proto/bundle";
import personOffIcon from "@/assets/icons/person_off.svg";
import type { JourneyBaseData } from "@/hooks/useLiveJourneyData.tsx";
import type { NatsSyncedEntry } from "@/hooks/useNatsSyncedList.tsx";
import { useSelectedJourney } from "@/hooks/useSelectedJourney.tsx";
import { useUserData } from "@/hooks/useUserData.tsx";
import { constructIcon } from "@/routes/map/-lib/iconFactory.ts";

import JourneyUpdateFrame = tools.simrail.backend.JourneyUpdateFrame;

interface MarkerComponentProps {
  journey: NatsSyncedEntry<JourneyBaseData, JourneyUpdateFrame>;
}

export const JourneyMarker: FC<MarkerComponentProps> = memo(({ journey }) => {
  const { setSelectedJourney } = useSelectedJourney();
  const { data: userInfo, isLoading } = useUserData(journey.live.journeyData.driver);

  let icon: Icon<BaseIconOptions>;
  if (journey.live.journeyData.driver) {
    const userAvatarAlt = userInfo ? `${userInfo.name} Avatar` : undefined;
    const userAvatarUrl = userInfo?.avatarUrl;
    icon = constructIcon({
      isLoading,
      url: userAvatarUrl,
      alt: userAvatarAlt,
      className: "rounded-full h-8 w-8",
      popupAnchor: [0, -14],
    });
  } else {
    icon = constructIcon({
      url: personOffIcon,
      alt: "Bot Driver Icon",
      className: "rounded-full h-8 w-8 p-1",
      popupAnchor: [0, -14],
    });
  }

  return (
    <ReactLeafletDriftMarker
      icon={icon}
      duration={750}
      zIndexOffset={50}
      alt={`${journey.base.transport.category} ${journey.base.transport.number}`}
      position={[journey.live.journeyData.position.latitude, journey.live.journeyData.position.longitude]}
      eventHandlers={{
        mouseup: () => setSelectedJourney(journey),
      }}
    >
      <Tooltip permanent={true} direction={"bottom"} offset={[0, 20]} opacity={0.9} className={"p-0.5!"}>
        <span className={"text-[85%]"}>
          {journey.base.transport.category} {journey.base.transport.number}
        </span>
      </Tooltip>
    </ReactLeafletDriftMarker>
  );
});
