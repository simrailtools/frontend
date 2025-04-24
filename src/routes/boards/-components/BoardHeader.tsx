import type { PointInfoDto, SimRailServerDto } from "@/api/generated";
import { cn } from "@/lib/utils.ts";
import { DateTime } from "luxon";
import { type FC, useEffect, useState } from "react";

type BoardHeaderProps = {
  point: PointInfoDto;
  server: SimRailServerDto;
};

export const BoardHeader: FC<BoardHeaderProps> = ({ point, server }) => {
  // updates the time every second to the current server time
  const [serverTime, setServerTime] = useState(DateTime.now());
  useEffect(() => {
    const intervalId = setInterval(() => {
      const serverTz = server.timezoneId === "Z" ? "utc" : server.timezoneId;
      const cdt = DateTime.now();
      const sdt = cdt.setZone(serverTz);
      const dt = sdt.isValid ? sdt : cdt;
      setServerTime(dt);
    }, 1000);
    return () => clearInterval(intervalId);
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
