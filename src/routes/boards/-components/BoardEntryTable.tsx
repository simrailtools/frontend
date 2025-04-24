import { type BoardEntryDto, listBoardDepartures, type PointInfoDto, type SimRailServerDto } from "@/api/generated";
import { Throbber } from "@/components/Throbber.tsx";
import { BoardEntry } from "@/routes/boards/-components/BoardEntry.tsx";
import { BoardTableHeading } from "@/routes/boards/-components/BoardTableHeading.tsx";
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import type { FC } from "react";

type BoardEntryTableProps = {
  server: SimRailServerDto;
  point: PointInfoDto;
  timeSpan: number;
  onlyPassengerTrains: boolean;
  sortOrder: "schedule" | "realtime";
};

export const BoardEntryTable: FC<BoardEntryTableProps> = ({
  server,
  point,
  timeSpan,
  onlyPassengerTrains,
  sortOrder,
}) => {
  const { data: boardEntries, isLoading } = useQuery({
    queryFn: async ({ signal }) => {
      const [timeStart, timeEnd] = getBoardFetchTimeRange(server, timeSpan);
      const { data } = await listBoardDepartures({
        query: {
          serverId: server.id,
          pointId: point.id,
          timeStart,
          timeEnd,
          sortBy: sortOrder === "schedule" ? "SCHEDULED_TIME" : "REALTIME_TIME",
        },
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: [],
    refetchInterval: 15_000,
  });
  if (isLoading) {
    return <Throbber />;
  }
  if (boardEntries === undefined) {
    throw new Error("Unable to load board entries");
  }

  // formats the given iso date/time in the server timezone using the optionally provided format
  const timeFormatter = (isoTime: string, format?: string) => {
    const serverTz = server.timezoneId === "Z" ? "utc" : server.timezoneId;
    const givenDt = DateTime.fromISO(isoTime);
    const dtZoned = givenDt.setZone(serverTz);
    const dt = dtZoned.isValid ? dtZoned : givenDt;
    return dt.toFormat(format ?? "HH:mm");
  };

  return (
    <div className="w-full max-w-full">
      <BoardTableHeading />
      <ul>
        {boardEntries
          .filter(entry => entry.realtimeTimeType !== "REAL")
          .map(entry => {
            const isFreight = isFreightTrain(entry);
            return { entry, isFreight };
          })
          .filter(train => !onlyPassengerTrains || !train.isFreight)
          .map(train => (
            <BoardEntry key={train.entry.journeyId} {...train} currentPoint={point} timeFormatter={timeFormatter} />
          ))}
      </ul>
    </div>
  );
};

/**
 * Checks if the given board entry is a freight train.
 * @param entry the entry to check.
 */
const isFreightTrain = (entry: BoardEntryDto) => {
  const transportType = entry.transport.type;
  return (
    transportType === "MANEUVER_TRAIN" ||
    transportType === "EMPTY_TRANSFER_TRAIN" ||
    transportType === "INTER_NATIONAL_CARGO_TRAIN" ||
    transportType === "NATIONAL_CARGO_TRAIN" ||
    transportType === "MAINTENANCE_TRAIN"
  );
};

/**
 * Gets the time range (start and end time) for the board fetch request.
 * @param server the server to request the board of.
 * @param timeSpan the time span (in minutes) that should be requested.
 */
const getBoardFetchTimeRange = (server: SimRailServerDto, timeSpan: number): [string, string] => {
  const serverTz = server.timezoneId === "Z" ? "utc" : server.timezoneId;
  const cdt = DateTime.now();
  const sdt = cdt.setZone(serverTz);
  const dt = sdt.isValid ? sdt : cdt;

  const timeStart = dt.minus(3 * 60 * 1000); // current time - 3 minutes
  const timeEnd = dt.plus(timeSpan * 60 * 1000); // current time + timeSpan minutes
  return [timeStart.toISO(), timeEnd.toISO()];
};
