import type { BoardEntryDto, PointInfoDto } from "@/api/generated";
import { BoardDestinationInfo } from "@/routes/boards/-components/BoardDestinationInfo.tsx";
import { BoardPlatformInfo } from "@/routes/boards/-components/BoardPlatformInfo.tsx";
import { BoardTimeInfo } from "@/routes/boards/-components/BoardTimeInfo.tsx";
import { BoardTrainInfo } from "@/routes/boards/-components/BoardTrainInfo.tsx";
import { BoardViaInfo } from "@/routes/boards/-components/BoardViaInfo.tsx";
import type { FC } from "react";

type BoardEntryProps = {
  isFreight: boolean;
  entry: BoardEntryDto;
  currentPoint: PointInfoDto;
  timeFormatter: (isoTime: string) => string;
};

export const BoardEntry: FC<BoardEntryProps> = ({ isFreight, entry, currentPoint, timeFormatter }) => {
  return (
    <li className="even:bg-gray-100 overflow-hidden">
      <div className="p-4">
        <div className={"flex flex-col w-full"}>
          <div className="flex flex-row">
            <BoardTimeInfo time={entry.scheduledTime} timeFormatter={timeFormatter} />
            <BoardTrainInfo isFreight={isFreight} via={entry.via} transport={entry.transport} />
            <BoardDestinationInfo currentPointName={currentPoint.name} via={entry.via} />
            <BoardPlatformInfo
              scheduledStop={entry.scheduledPassengerStop}
              realtimeStop={entry.realtimePassengerStop}
            />
          </div>
          <div className="flex flex-row items-center mt-1">
            <BoardTimeInfo
              time={entry.realtimeTime}
              scheduledTime={entry.scheduledTime}
              timeFormatter={timeFormatter}
            />
            <BoardViaInfo via={entry.via} />
          </div>
        </div>
      </div>
    </li>
  );
};
