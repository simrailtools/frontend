import { type FC, memo } from "react";
import type { SimRailUserDto } from "@/api/rest";
import { MapTooltip } from "@/routes/map/-components/MapTooltip.tsx";
import { UserIcon } from "@/routes/map/-components/UserIcon.tsx";

type JourneyMarkerContentProps = {
  hasUser: boolean;
  userInfoLoading: boolean;
  userInfo: SimRailUserDto | undefined;
  transportCategory: string;
  transportNumber: string;
};

export const JourneyMarkerContent: FC<JourneyMarkerContentProps> = memo(
  ({ hasUser, userInfoLoading, userInfo, transportCategory, transportNumber }) => {
    return (
      <div className="relative flex items-center justify-center cursor-pointer">
        <UserIcon
          hasUser={hasUser}
          userInfo={userInfo}
          userInfoLoading={userInfoLoading}
          className={"rounded-full h-8 w-8"}
        />
        <MapTooltip position={"bottom"} className={"text-[85%] p-1"}>
          {transportCategory} {transportNumber}
        </MapTooltip>
      </div>
    );
  },
);
