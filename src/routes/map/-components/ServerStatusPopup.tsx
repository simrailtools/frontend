import "react-clock/dist/Clock.css";
import type { ServerSnapshotFrame } from "@/api/types/event.types.ts";
import { Heading } from "@/components/Heading.tsx";
import { timeStringAtIsoZoneOffset } from "@/lib/timeHelper.ts";
import { cn } from "@/lib/utils.ts";
import { type FC, useEffect, useState } from "react";
import Clock from "react-clock";
import { MdOutlineTimer, MdOutlineTimerOff } from "react-icons/md";

export const ServerStatusPopup: FC<{ server: ServerSnapshotFrame }> = ({ server }) => {
  // holds the current server time in 'HH:mm:ss' format,
  // updated every second based on the server timezone id
  const [serverTime, setServerTime] = useState<string | null>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      const formattedServerTime = timeStringAtIsoZoneOffset(server.timezoneId);
      setServerTime(formattedServerTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [server]);

  // if the clock should be displayed or not
  const [clockVisible, setClockVisible] = useState(true);
  const clockVisibilityToggle = () => {
    setClockVisible(prevState => !prevState);
  };

  return (
    <div className="fixed top-4 left-4 p-4 bg-white shadow-lg rounded-lg min-w-36 max-w-48 z-[10000]">
      <div className="flex justify-between">
        <div className={"flex items-center space-x-2"}>
          <span className={"relative flex h-3 w-3"}>
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                server.online && "bg-green-400",
                !server.online && "bg-red-400",
              )}
            />
            <span
              className={cn(
                "relative inline-flex rounded-full h-3 w-3",
                server.online && "bg-green-500",
                !server.online && "bg-red-500",
              )}
            />
          </span>
          <Heading level={3} className="text-gray-800">
            {server.code}
          </Heading>
        </div>
        <div className={"flex items-center"}>
          <button type={"button"} className={"cursor-pointer"} onClick={clockVisibilityToggle}>
            {clockVisible && <MdOutlineTimer className={"w-5 h-5"} />}
            {!clockVisible && <MdOutlineTimerOff className={"w-5 h-5"} />}
          </button>
        </div>
      </div>
      {clockVisible && (
        <div className={"mt-1"}>
          <Clock
            size={160}
            hourHandLength={60}
            hourHandOppositeLength={20}
            hourHandWidth={6}
            hourMarksLength={20}
            hourMarksWidth={6}
            minuteHandLength={90}
            minuteHandOppositeLength={20}
            minuteHandWidth={4}
            minuteMarksWidth={2}
            secondHandLength={75}
            secondHandOppositeLength={25}
            secondHandWidth={2}
            value={serverTime}
          />
        </div>
      )}
    </div>
  );
};
