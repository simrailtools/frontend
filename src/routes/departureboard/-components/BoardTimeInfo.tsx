import { cn } from "@/lib/utils.ts";
import type { ClassValue } from "clsx";
import type { DateTime } from "luxon";
import type { FC } from "react";

type BoardTimeInfoProps = {
  time: string;
  scheduledTime?: string;
  timeParser: (isoTime: string) => DateTime;
};

export const BoardTimeInfo: FC<BoardTimeInfoProps> = ({ time, scheduledTime, timeParser }) => {
  const dtTime = timeParser(time);
  const dtScheduled = scheduledTime ? timeParser(scheduledTime) : undefined;
  const timeColorClass = getTimeColorClass(dtTime, dtScheduled);
  return (
    <span className={cn("text-5xl font-bold", scheduledTime && "font-semibold", timeColorClass)}>
      {dtTime.toFormat("HH:mm")}
    </span>
  );
};

/**
 * Resolves the color to use for the given time information.
 * @param time the time to get the color for.
 * @param scheduledTime an optional scheduled time to compare against for color picking.
 */
const getTimeColorClass = (time: DateTime, scheduledTime?: DateTime): ClassValue => {
  if (!scheduledTime) {
    // if no realtime information is available, print the time black
    return "text-black";
  }

  if (time > scheduledTime) {
    // train is delayed
    return "text-red-600";
  }

  // train is on time or early
  return "text-green-600";
};
