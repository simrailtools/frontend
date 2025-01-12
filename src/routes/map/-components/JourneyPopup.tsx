import { usersBySteamIds } from "@/api/clients/usersClient.ts";
import type { JourneySnapshotFrame } from "@/api/types/event.types.ts";
import { cn, steamAvatarUrl } from "@/lib/utils.ts";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { FC } from "react";
import { MdDirectionsTransit, MdPerson, MdSpeed, MdTraffic } from "react-icons/md";

const formatDistance = (distance: number): string => {
  return distance >= 1000 ? `${(distance / 1000).toFixed(2)}km` : `${distance}m`;
};

const formatSignalMaxSpeed = (maxSpeed?: number | null) => {
  if (maxSpeed === undefined || maxSpeed === null) {
    return "CLEAR";
  }
  if (maxSpeed === 0) {
    return "STOP";
  }
  return `${maxSpeed}km/h`;
};

export const JourneyPopup: FC<{ journey: JourneySnapshotFrame }> = ({ journey }) => {
  const {
    journeyId,
    category,
    number,
    line,
    label,
    driverSteamId,
    speed,
    nextSignalId,
    nextSignalDistance,
    nextSignalMaxSpeed,
  } = journey;

  // fetch the user details in case the journey is controlled by a player
  const { data } = useQuery({
    enabled: !!driverSteamId,
    queryKey: ["steam_user", driverSteamId],
    // biome-ignore lint/style/noNonNullAssertion: must be present here, see enabled field
    queryFn: ({ signal }) => usersBySteamIds({ steamIds: [driverSteamId!], abortSignal: signal }),
  });
  const userInfo = data?.find(user => user.id === journey.driverSteamId);

  return (
    <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg p-6 max-w-md z-[10000]">
      <div className="space-y-0.5">
        {userInfo && (
          <div className={"flex justify-center items-center pb-4"}>
            <div className="w-16 h-16 rounded-full overflow-hidden border-solid border-2">
              <img
                src={steamAvatarUrl(userInfo.avatarHash)}
                alt={`${userInfo.name} Avatar`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2 text-lg font-semibold">
          <MdDirectionsTransit className="text-gray-700" size={24} />
          <span>
            {category} {number}
            {line && ` (${line})`}
            {label && ` "${label}"`}
          </span>
        </div>

        {userInfo && (
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <MdPerson className="text-gray-700" size={24} />
            <a
              target={"_blank"}
              className={"underline"}
              href={userInfo.profileUrl}
              rel={"noopener noreferrer external"}
            >
              {userInfo.name}
            </a>
            {userInfo.countryCode && <span>({userInfo.countryCode})</span>}
          </div>
        )}

        {speed !== undefined && (
          <div className="flex items-center space-x-2 text-sm">
            <MdSpeed className="text-gray-700" size={24} />
            <span className="font-medium">{speed} km/h</span>
          </div>
        )}

        {nextSignalId && (
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <MdTraffic className="text-gray-700" size={24} />
            <span className={"flex space-x-1"}>
              <span className={"font-medium"}>{nextSignalId}</span>
              {nextSignalDistance && <span>in {formatDistance(nextSignalDistance)}</span>}
              <span
                className={cn(
                  "font-medium",
                  nextSignalMaxSpeed === null && "text-green-400",
                  nextSignalMaxSpeed === 0 && "text-red-600",
                  nextSignalMaxSpeed && nextSignalMaxSpeed > 0 && "text-orange-400",
                )}
              >
                ({formatSignalMaxSpeed(nextSignalMaxSpeed)})
              </span>
            </span>
          </div>
        )}

        <div className="mt-4">
          <Link
            target={"_blank"}
            to={"/journeys/$journeyId"}
            params={{ journeyId }}
            className="w-full block text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Journey Details
          </Link>
        </div>
      </div>
    </div>
  );
};
