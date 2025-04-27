import type { BoardEntryDto, PointInfoDto } from "@/api/generated";
import { BoardDestinationInfo } from "@/routes/departureboard/-components/BoardDestinationInfo.tsx";
import { BoardPlatformInfo } from "@/routes/departureboard/-components/BoardPlatformInfo.tsx";
import { BoardTimeInfo } from "@/routes/departureboard/-components/BoardTimeInfo.tsx";
import { BoardTrainInfo } from "@/routes/departureboard/-components/BoardTrainInfo.tsx";
import { BoardViaInfo } from "@/routes/departureboard/-components/BoardViaInfo.tsx";
import type { DateTime } from "luxon";
import type { FC } from "react";

type BoardEntryProps = {
  isFreight: boolean;
  entry: BoardEntryDto;
  currentPoint: PointInfoDto;
  timeParser: (isoTime: string) => DateTime;
};

export const BoardEntry: FC<BoardEntryProps> = ({ isFreight, entry, currentPoint, timeParser }) => {
  return (
    <li className="even:bg-gray-100 overflow-hidden">
      <div className="p-4">
        <div className={"flex flex-col w-full"}>
          <div className="flex flex-row">
            <BoardTimeInfo time={entry.scheduledTime} timeParser={timeParser} />
            <BoardTrainInfo isFreight={isFreight} isEventCancelled={entry.cancelled} transport={entry.transport} />
            <BoardDestinationInfo currentPointName={currentPoint.name} via={entry.via} />
            <BoardPlatformInfo
              scheduledStop={entry.scheduledPassengerStop}
              realtimeStop={entry.realtimePassengerStop}
            />
          </div>
          <div className="flex flex-row items-center mt-1">
            <BoardTimeInfo time={entry.realtimeTime} scheduledTime={entry.scheduledTime} timeParser={timeParser} />
            <BoardViaInfo via={entry.via} />
          </div>
        </div>
      </div>
    </li>
  );
};
