import L from "leaflet";
import { type ComponentRef, type FC, useEffect, useMemo, useRef } from "react";
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

export const JourneyMarker: FC<MarkerComponentProps> = ({ journey }) => {
  const driver = journey.live.journeyData.driver;
  const hasDriver = !!driver;
  const { data: userInfo, isLoading } = useUserData(driver);
  const userIcon = useMemo(() => {
    if (hasDriver) {
      const userAvatarAlt = userInfo ? `${userInfo.name} Avatar` : undefined;
      return constructIcon({
        isLoading,
        url: userInfo?.avatarUrl,
        alt: userAvatarAlt,
        className: "rounded-full h-8 w-8",
        popupAnchor: [0, -14],
      });
    }

    return constructIcon({
      url: personOffIcon,
      alt: "Bot Driver Icon",
      className: "rounded-full h-8 w-8 p-1",
      popupAnchor: [0, -14],
    });
  }, [userInfo, isLoading, hasDriver]);

  // handler to prevent clicks on the marker to propagate to the map they're rendered on
  const markerRef = useRef<ComponentRef<typeof ReactLeafletDriftMarker>>(null);
  useEffect(() => {
    const element = markerRef.current?.getElement();
    if (element) {
      L.DomEvent.disableClickPropagation(element);
    }
  }, []);

  const { setSelectedJourney } = useSelectedJourney();
  return (
    <ReactLeafletDriftMarker
      ref={markerRef}
      icon={userIcon}
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
};
