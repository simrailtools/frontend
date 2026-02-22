import { DateTime } from "luxon";
import { type FC, useEffect, useState } from "react";
import type { PointInfoDto, SimRailServerDto } from "@/api/rest";
import { cn } from "@/lib/utils.ts";

type BoardHeaderProps = {
  point: PointInfoDto;
  server: SimRailServerDto;
};

export const BoardHeader: FC<BoardHeaderProps> = ({ point, server }) => {
  const [serverTime, setServerTime] = useState(DateTime.utc());
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const serverTime = DateTime.utc().plus({ hours: server.utcOffsetHours });
      setServerTime(serverTime);
    }, 1000);
    return () => window.clearInterval(intervalId);
  }, [server]);

  return (
    <header className={"bg-gray-900 text-white flex items-center justify-between px-6 py-8"}>
      <div className={"flex items-baseline space-x-6"}>
        <div className={"text-5xl font-bold"}>
          <span>{serverTime.toFormat("HH")}</span>
          <span className={cn(serverTime.second % 2 === 0 && "text-transparent")}>:</span>
          <span>{serverTime.toFormat("mm")}</span>
        </div>
        <span className={"text-5xl font-bold"}>Departures</span>
      </div>
      <span className={"text-5xl font-medium whitespace-nowrap"}>
        {server.code.toUpperCase()} / {point.name}
      </span>
    </header>
  );
};
