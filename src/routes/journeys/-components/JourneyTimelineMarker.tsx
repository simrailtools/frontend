import type { SitJourneyEvent } from "@/api/types/journeys.types.ts";
import { cn } from "@/lib/utils.ts";
import type { FC } from "react";

type JourneyTimelineMarkerProps = {
  arrival?: SitJourneyEvent;
  departure?: SitJourneyEvent;
};

const eventTimeStatus = (arrival?: SitJourneyEvent, departure?: SitJourneyEvent) => {
  // check if the event is happening now
  if (
    arrival &&
    departure &&
    !departure.cancelled &&
    arrival.realtimeTimeType === "REAL" &&
    departure.realtimeTimeType !== "REAL"
  ) {
    return 0;
  }

  // check if the event will be in the future based on the arrival event time if present
  // this prevents display issues due to missing delay information in case the departure event got cancelled
  if (arrival && arrival.realtimeTimeType === "REAL") {
    return -1;
  }

  // check if the departure event already happened - we only do this in case we don't have arrival info
  if (!arrival && departure && departure.realtimeTimeType === "REAL") {
    return -1;
  }

  return 1;
};

export const JourneyTimelineMarker: FC<JourneyTimelineMarkerProps> = ({ arrival, departure }) => {
  const timeStatus = eventTimeStatus(arrival, departure);
  return (
    <div
      className={cn(
        "w-4 h-4 rounded-full",
        timeStatus === 1 && "bg-gray-500",
        timeStatus === 0 && "bg-blue-500",
        timeStatus === -1 && "bg-green-500",
        arrival && departure && arrival.cancelled && departure.cancelled && "bg-red-500",
        (!arrival || !departure) && (arrival?.cancelled || departure?.cancelled) && "bg-red-500",
      )}
    />
  );
};
