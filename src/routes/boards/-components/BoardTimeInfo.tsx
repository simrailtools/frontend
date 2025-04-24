import { cn } from "@/lib/utils.ts";
import type { ClassValue } from "clsx";
import type { FC } from "react";

type BoardTimeInfoProps = {
  time: string;
  scheduledTime?: string;
  timeFormatter: (isoTime: string) => string;
};

export const BoardTimeInfo: FC<BoardTimeInfoProps> = ({ time, scheduledTime, timeFormatter }) => {
  const timeFormatted = timeFormatter(time);
  const scheduledTimeFormatted = scheduledTime && timeFormatter(scheduledTime);
  const timeColorClass = getTimeColorClass(timeFormatted, scheduledTimeFormatted);
  return (
    <span className={cn("text-5xl font-bold", scheduledTime && "font-semibold", timeColorClass)}>{timeFormatted}</span>
  );
};

/**
 *
 * @param time
 * @param scheduledTime
 */
const getTimeColorClass = (time: string, scheduledTime?: string): ClassValue => {
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
