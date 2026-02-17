import type { FC } from "react";
import type { JourneyEventDto } from "@/api/rest";
import { cn } from "@/lib/utils.ts";

type JourneyEventTimeProps = {
  event: JourneyEventDto;
  timeFormatter: (isoTime: string) => string;
};

export const JourneyEventTime: FC<JourneyEventTimeProps> = ({ event, timeFormatter }) => {
  const scheduledTimeFormatted = timeFormatter(event.scheduledTime);
  const realtimeTimeFormatted = timeFormatter(event.realtimeTime);
  const isSameTime = scheduledTimeFormatted === realtimeTimeFormatted;

  return (
    <div className={"flex flex-row items-start space-x-2"}>
      <span
        className={cn(
          "text-sm font-semibold text-gray-600",
          event.cancelled && "line-through decoration-2 decoration-red-600",
        )}
      >
        {scheduledTimeFormatted}
      </span>
      <span
        className={cn(
          "text-sm",
          event.realtimeTime > event.scheduledTime && "text-red-600",
          isSameTime && "text-green-600",
          event.scheduledTime >= event.realtimeTime && "text-green-600",
          event.realtimeTimeType === "REAL" && "font-bold",
          event.cancelled && "line-through decoration-2 decoration-red-600",
        )}
      >
        {realtimeTimeFormatted}
      </span>
    </div>
  );
};
