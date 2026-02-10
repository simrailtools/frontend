import L from "leaflet";
import { type FC, useEffect, useMemo, useRef } from "react";
import { MdOutlineLocationOn, MdOutlinePsychology, MdPersonOutline } from "react-icons/md";
import { Marker, Popup, Tooltip } from "react-leaflet";
import { tools } from "@/api/proto/bundle";
import type { SimRailUserDto } from "@/api/rest";
import personOffIcon from "@/assets/icons/person_off.svg";
import type { DispatchPostBaseData } from "@/hooks/useLiveDispatchPostData.tsx";
import type { NatsSyncedEntry } from "@/hooks/useNatsSyncedList.tsx";
import { useUserData } from "@/hooks/useUserData.tsx";
import { cn } from "@/lib/utils.ts";
import { constructIcon } from "@/routes/map/-lib/iconFactory.ts";

import DispatchPostUpdateFrame = tools.simrail.backend.DispatchPostUpdateFrame;

/**
 * Zero-based difficulty name index.
 */
const difficultyNames = ["Very Easy", "Easy", "Intermediate", "Advanced", "Hard", "Expert"];

/**
 * Maps a difficulty number to a display name. If no name is available, the number in stringified form is returned.
 * @param difficulty the difficulty display name for the given difficulty.
 */
const mapDifficultyName = (difficulty: number): string => {
  return difficultyNames.at(difficulty) ?? `${difficulty}`;
};

/**
 * Formats the name of the given user. If no user is given, undefined is returned.
 * @param user the user to format the display name of.
 */
const formatUserName = (user?: SimRailUserDto): string | undefined => {
  return user?.location ? `${user.name} (${user.location})` : user?.name;
};

export const DispatchPostMarker: FC<{
  post: NatsSyncedEntry<DispatchPostBaseData, DispatchPostUpdateFrame>;
}> = ({ post }) => {
  const { name, position, difficulty } = post.base;

  const dispatcher = post.live.dispatchPostData.dispatcher;
  const hasDispatcher = !!dispatcher;
  const { data: userInfo, isLoading } = useUserData(dispatcher);
  const userIcon = useMemo(() => {
    if (hasDispatcher) {
      const userAvatarAlt = userInfo ? `${userInfo.name} Avatar` : undefined;
      return constructIcon({
        isLoading,
        url: userInfo?.avatarUrl,
        alt: userAvatarAlt,
        className: "rounded-md h-9 w-9",
        popupAnchor: [0, -14],
      });
    }

    return constructIcon({
      url: personOffIcon,
      alt: "Bot Dispatcher Icon",
      className: "rounded-md h-9 w-9 p-1",
      popupAnchor: [0, -14],
    });
  }, [userInfo, isLoading, hasDispatcher]);

  // handler to prevent clicks on the marker to propagate to the map they're rendered on
  const markerRef = useRef<L.Marker>(null);
  useEffect(() => {
    const element = markerRef.current?.getElement();
    if (element) {
      L.DomEvent.disableClickPropagation(element);
    }
  }, []);

  return (
    <Marker
      ref={markerRef}
      icon={userIcon}
      zIndexOffset={100}
      alt={name}
      position={[position.latitude, position.longitude]}
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
          <span className={"text-sm font-semibold"}>{name}</span>
        </div>
        <div className={"flex space-x-1 items-center"}>
          <MdOutlinePsychology className={"w-5 h-5"} />
          <span className={"text-sm"}>{mapDifficultyName(difficulty)}</span>
        </div>
        <div className={"flex space-x-1 items-center"}>
          <MdPersonOutline className={"w-5 h-5"} />
          <span className={cn("text-sm", !userInfo && "italic")}>{formatUserName(userInfo) ?? "Bot"}</span>
        </div>
      </Popup>
      <Tooltip permanent={true} direction={"top"} offset={[0, -20]} className={"p-0.5!"}>
        <span className={"text-xs font-semibold"}>{name}</span>
      </Tooltip>
    </Marker>
  );
};
