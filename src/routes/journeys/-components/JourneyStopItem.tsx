import type { FC } from "react";
import type { JourneyEventDto } from "@/api/rest";
import { cn } from "@/lib/utils.ts";
import { JourneyEventTime } from "@/routes/journeys/-components/JourneyEventTime.tsx";
import { JourneyStopPlatform } from "@/routes/journeys/-components/JourneyStopPlatform.tsx";
import { JourneyStopTypeIndicator } from "@/routes/journeys/-components/JourneyStopTypeIndicator.tsx";
import { JourneyTimelineMarker } from "@/routes/journeys/-components/JourneyTimelineMarker.tsx";

type StopItemProps = {
  arrival?: JourneyEventDto;
  departure?: JourneyEventDto;
  timeFormatter: (isoTime: string) => string;
};

export const JourneyStopItem: FC<StopItemProps> = ({ arrival, departure, timeFormatter }) => {
  const stopPlace = arrival?.stopPlace ?? departure?.stopPlace;
  return (
    <div className="flex items-center space-x-3">
      <JourneyTimelineMarker arrival={arrival} departure={departure} />

      <div className={"flex flex-col"}>
        {arrival !== undefined && <JourneyEventTime event={arrival} timeFormatter={timeFormatter} />}
        {departure !== undefined && <JourneyEventTime event={departure} timeFormatter={timeFormatter} />}
      </div>

      <div className={"flex items-center space-x-1.5 basis-0 grow"}>
        <span
          className={cn("font-medium text-balance", (arrival?.additional || departure?.additional) && "text-green-600")}
        >
          {stopPlace?.name}
        </span>
        <JourneyStopTypeIndicator stopType={arrival?.stopType ?? departure?.stopType ?? "NONE"} />
      </div>

      <div className={"flex flex-col justify-end ml-auto"}>
        {arrival !== undefined && <JourneyStopPlatform event={arrival} />}
        {departure !== undefined && <JourneyStopPlatform event={departure} />}
      </div>
    </div>
  );
};
