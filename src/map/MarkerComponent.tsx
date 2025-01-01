import { type FC, memo } from "react";
import ReactLeafletDriftMarker from "react-leaflet-drift-marker";
import { Popup, Tooltip } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import type { JourneySnapshotWithRequiredPosition } from "./map.types.ts";
import { usersBySteamIds } from "../api/clients/usersClient.ts";
import { constructIcon } from "./iconFactory.ts";
import { steamAvatarUrl } from "../lib/utils.ts";
import type { BaseIconOptions, Icon } from "leaflet";

interface MarkerComponentProps {
  journey: JourneySnapshotWithRequiredPosition;
}

export const MarkerComponent: FC<MarkerComponentProps> = memo(({ journey }) => {
  const { isLoading, data } = useQuery({
    enabled: !!journey.driverSteamId,
    queryKey: ["steam_user", journey.driverSteamId],
    // biome-ignore lint/style/noNonNullAssertion: must be present here, see enabled field
    queryFn: ({ signal }) => usersBySteamIds({ steamIds: [journey.driverSteamId!], abortSignal: signal }),
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
      url: "/person_off.svg",
      alt: "Bot Driver Icon",
      className: "rounded-full h-8 w-8 p-1",
      popupAnchor: [0, -14],
    });
  }

  return (
    <ReactLeafletDriftMarker duration={750} icon={icon} position={[journey.positionLat, journey.positionLng]}>
      <Tooltip permanent={true} direction={"bottom"} offset={[0, 20]}>
        {journey.journeyId}
      </Tooltip>
      <Popup>
        {journey.category} {journey.number} ({journey.journeyId})
      </Popup>
    </ReactLeafletDriftMarker>
  );
});
