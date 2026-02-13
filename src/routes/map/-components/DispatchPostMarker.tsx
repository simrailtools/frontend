import { deepEqual } from "fast-equals";
import { type FC, memo, useState } from "react";
import { MdOutlineLocationOn, MdOutlinePsychology, MdPersonOutline } from "react-icons/md";
import { Marker, Popup } from "react-map-gl/maplibre";
import type { DispatchPostUpdateFrame } from "@/api/proto/event_bus_pb.ts";
import type { SimRailUserDto } from "@/api/rest";
import type { DispatchPostBaseData } from "@/hooks/useLiveDispatchPostData.tsx";
import type { NatsSyncedEntry } from "@/hooks/useNatsSyncedList.tsx";
import { useUserData } from "@/hooks/useUserData.tsx";
import { cn } from "@/lib/utils.ts";
import { MapTooltip } from "@/routes/map/-components/MapTooltip.tsx";
import { UserIcon } from "@/routes/map/-components/UserIcon.tsx";

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
}> = memo(
  ({ post }) => {
    const { name, position, difficulty } = post.base;
    const [popupVisible, setPopupVisible] = useState(false);

    const dispatcher = post.live?.dispatchPostData?.dispatcher;
    const hasDispatcher = !!dispatcher;
    const { data: userInfo, isLoading: userInfoLoading } = useUserData(dispatcher);

    return (
      <>
        <Marker longitude={position.longitude} latitude={position.latitude} anchor={"center"} style={{ zIndex: 100 }}>
          <button
            type={"button"}
            className={cn("relative flex items-center justify-center", userInfo && "cursor-pointer")}
            onMouseEnter={() => setPopupVisible(true)}
            onMouseLeave={() => setPopupVisible(false)}
            onPointerDown={event => event.stopPropagation()}
            onClick={event => {
              event.stopPropagation();
              if (userInfo) {
                window.open(userInfo.profileUrl, "_blank", "noopener, noreferrer");
              }
            }}
          >
            <UserIcon
              hasUser={hasDispatcher}
              userInfoLoading={userInfoLoading}
              userInfo={userInfo}
              className={"rounded-md h-9 w-9"}
            />
            {!popupVisible && (
              <MapTooltip position={"top"} className={"text-xs font-semibold p-1.5"}>
                {name}
              </MapTooltip>
            )}
          </button>
        </Marker>
        {/** biome-ignore lint/nursery/noLeakedRender: biomejs/biome#8664 */}
        {popupVisible && (
          <Popup
            offset={23}
            anchor={"bottom"}
            closeButton={false}
            closeOnClick={false}
            style={{ zIndex: 100 }}
            latitude={position.latitude}
            longitude={position.longitude}
            onClose={() => setPopupVisible(false)}
          >
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
        )}
      </>
    );
  },
  (prev, next) => {
    // only update the component if the live data changed, the base data is fixed after initial render
    return deepEqual(prev.post.live, next.post.live);
  },
);
