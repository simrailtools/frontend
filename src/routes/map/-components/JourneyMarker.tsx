import { findUsersBySteamIds } from "@/api/generated";
import personOffIcon from "@/assets/icons/person_off.svg";
import { useSelectedJourney } from "@/hooks/useSelectedJourney.tsx";
import { steamAvatarUrl } from "@/lib/utils.ts";
import { constructIcon } from "@/routes/map/-lib/iconFactory.ts";
import type { JourneySnapshotWithRequiredPosition } from "@/routes/map/-lib/map.types.ts";
import { useQuery } from "@tanstack/react-query";
import type { BaseIconOptions, Icon } from "leaflet";
import { type FC, memo } from "react";
import { Tooltip } from "react-leaflet";
import ReactLeafletDriftMarker from "react-leaflet-drift-marker";

interface MarkerComponentProps {
  journey: JourneySnapshotWithRequiredPosition;
}

export const JourneyMarker: FC<MarkerComponentProps> = memo(({ journey }) => {
  const { setSelectedJourney } = useSelectedJourney();
  const { isLoading, data } = useQuery({
    enabled: !!journey.driverSteamId,
    queryKey: ["steam_user", journey.driverSteamId],
    queryFn: async ({ signal }) => {
      // biome-ignore lint/style/noNonNullAssertion: must be present here, see enabled field
      return await findUsersBySteamIds({ body: [journey.driverSteamId!], signal, throwOnError: true });
    },
  });

  let icon: Icon<BaseIconOptions>;
  if (journey.driverSteamId) {
    const userInfo = data?.find(user => user.id === journey.driverSteamId);
    const userAvatarAlt = userInfo ? `${userInfo.name} Avatar` : undefined;
    const userAvatarUrl = userInfo ? steamAvatarUrl(userInfo.avatarHash) : undefined;
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
      alt={`${journey.category} ${journey.number}`}
      position={[journey.positionLat, journey.positionLng]}
      eventHandlers={{
        mouseup: () => setSelectedJourney(journey),
      }}
    >
      <Tooltip permanent={true} direction={"bottom"} offset={[0, 20]} opacity={0.9} className={"!p-0.5"}>
        <span className={"text-[85%]"}>
          {journey.category} {journey.number}
        </span>
      </Tooltip>
    </ReactLeafletDriftMarker>
  );
});
