import { Link } from "@tanstack/react-router";
import type { FC } from "react";
import { MdDirectionsTransit, MdPerson, MdSpeed, MdTraffic } from "react-icons/md";
import type { JourneyUpdateFrame } from "@/api/proto/event_bus_pb.ts";
import type { JourneyBaseData } from "@/hooks/useLiveJourneyData.tsx";
import type { NatsSyncedEntry } from "@/hooks/useNatsSyncedList.tsx";
import { useUserData } from "@/hooks/useUserData.tsx";
import { cn } from "@/lib/utils.ts";

const formatDistance = (distance: number): string => {
  return distance >= 1000 ? `${(distance / 1000).toFixed(2)}km` : `${distance}m`;
};

const formatSignalMaxSpeed = (maxSpeed: number | undefined) => {
  if (maxSpeed === undefined) {
    return "CLEAR";
  }
  if (maxSpeed === 0) {
    return "STOP";
  }
  return `${maxSpeed}km/h`;
};

export const JourneyPopup: FC<{ journey: NatsSyncedEntry<JourneyBaseData, JourneyUpdateFrame> }> = ({ journey }) => {
  const { category, number, line, label } = journey.base.transport;
  const nextSignal = journey.live?.journeyData?.nextSignal;
  const { data: userInfo } = useUserData(journey.live?.journeyData?.driver);

  return (
    <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg p-6 max-w-md z-10000">
      <div className="space-y-0.5">
        {userInfo && (
          <div className={"flex justify-center items-center pb-4"}>
            <div className="w-16 h-16 rounded-full overflow-hidden border-solid border-2">
              <img src={userInfo.avatarUrl} alt={`${userInfo.name} Avatar`} className="w-full h-full object-cover" />
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
            {userInfo.location && <span>({userInfo.location})</span>}
          </div>
        )}

        <div className="flex items-center space-x-2 text-sm">
          <MdSpeed className="text-gray-700" size={24} />
          <span className="font-medium">{journey.live?.journeyData?.speed ?? 0} km/h</span>
        </div>

        {nextSignal && (
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <MdTraffic className="text-gray-700" size={24} />
            <span className={"flex space-x-1"}>
              <span className={"font-medium"}>{nextSignal.name}</span>
              <span>in {formatDistance(nextSignal.distanceMeters)}</span>
              <span
                className={cn(
                  "font-medium",
                  nextSignal.maxSpeedKmh === undefined && "text-green-400",
                  nextSignal.maxSpeedKmh === 0 && "text-red-600",
                  nextSignal.maxSpeedKmh && nextSignal.maxSpeedKmh > 0 && "text-orange-400",
                )}
              >
                ({formatSignalMaxSpeed(nextSignal.maxSpeedKmh)})
              </span>
            </span>
          </div>
        )}

        <div className="mt-4">
          <Link
            target={"_blank"}
            to={"/journeys/$journeyId"}
            params={{ journeyId: journey.live?.ids?.dataId ?? "" }}
            className="w-full block text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Journey Details
          </Link>
        </div>
      </div>
    </div>
  );
};
