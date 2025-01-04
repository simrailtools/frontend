import { usersBySteamIds } from "@/api/clients/usersClient.ts";
import type { DispatchPostSnapshotFrame } from "@/api/types/event.types.ts";
import type { SitUser } from "@/api/types/users.types.ts";
import personOffIcon from "@/assets/icons/person_off.svg";
import { cn, steamAvatarUrl } from "@/lib/utils.ts";
import { constructIcon } from "@/routes/map/-lib/iconFactory.ts";
import { useQuery } from "@tanstack/react-query";
import type { BaseIconOptions, Icon } from "leaflet";
import type { FC } from "react";
import { MdOutlineLocationOn, MdOutlinePsychology, MdPersonOutline } from "react-icons/md";
import { Marker, Popup, Tooltip } from "react-leaflet";

const mapDifficultyName = (difficulty: number): string => {
  const difficultyNames = ["Very Easy", "Easy", "Normal", "Advanced", "Hard"];
  return difficultyNames.at(difficulty - 1) ?? `${difficulty}`;
};

const formatUserName = (user?: SitUser): string | undefined => {
  // append the country code of the user to the username if known, only
  // return the username on case the country is unknown. undefined is only
  // returned in case the input user is undefined as well
  return user?.countryCode ? `${user.name} (${user.countryCode})` : user?.name;
};

export const DispatchPostMarker: FC<{ dispatchPost: DispatchPostSnapshotFrame }> = ({ dispatchPost }) => {
  // currently dispatch posts can only be dispatched by one person at a time, if
  // this ever changes this has to change as well, but for now we can just use the
  // first element in the dispatcher list as the user dispatching the post
  const relevantUser = dispatchPost.dispatcherSteamIds.at(0);
  const { isLoading, data } = useQuery({
    enabled: !!relevantUser,
    queryKey: ["steam_user", relevantUser],
    queryFn: ({ signal }) => usersBySteamIds({ steamIds: dispatchPost.dispatcherSteamIds, abortSignal: signal }),
  });
  const userInfo = data?.find(user => user.id === relevantUser);

  let icon: Icon<BaseIconOptions>;
  if (relevantUser) {
    const userAvatarAlt = userInfo ? `${userInfo.name} Avatar` : undefined;
    const userAvatarUrl = userInfo ? steamAvatarUrl(userInfo.avatarHash) : undefined;
    icon = constructIcon({
      isLoading,
      url: userAvatarUrl,
      alt: userAvatarAlt,
      className: "rounded-md h-9 w-9",
      popupAnchor: [0, -14],
    });
  } else {
    icon = constructIcon({
      url: personOffIcon,
      alt: "Bot Driver Icon",
      className: "rounded-md h-9 w-9 p-1",
      popupAnchor: [0, -14],
    });
  }

  return (
    <Marker
      icon={icon}
      zIndexOffset={100}
      alt={dispatchPost.name}
      position={[dispatchPost.latitude, dispatchPost.longitude]}
      eventHandlers={{
        mouseout: event => event.target.closePopup(),
        mouseover: event => event.target.openPopup(),
        click: () => {
          if (userInfo) {
            window.open(userInfo.profileUrl, "_blank", "noopener, noreferrer");
          }
        },
      }}
    >
      <Popup closeButton={false}>
        <div className={"flex space-x-1 items-center"}>
          <MdOutlineLocationOn className={"w-5 h-5"} />
          <span className={"text-sm font-semibold"}>{dispatchPost.name}</span>
        </div>
        <div className={"flex space-x-1 items-center"}>
          <MdOutlinePsychology className={"w-5 h-5"} />
          <span className={"text-sm"}>{mapDifficultyName(dispatchPost.difficultyLevel)}</span>
        </div>
        <div className={"flex space-x-1 items-center"}>
          <MdPersonOutline className={"w-5 h-5"} />
          <span className={cn("text-sm", !userInfo && "italic")}>{formatUserName(userInfo) ?? "Bot"}</span>
        </div>
      </Popup>
      <Tooltip permanent={true} direction={"top"} offset={[0, -20]} className={"!p-0.5"}>
        <span className={"text-xs font-semibold"}>{dispatchPost.name}</span>
      </Tooltip>
    </Marker>
  );
};
