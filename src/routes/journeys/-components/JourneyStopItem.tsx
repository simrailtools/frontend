import type { SitJourneyEvent } from "@/api/types/journeys.types.ts";
import { JourneyEventTime } from "@/routes/journeys/-components/JourneyEventTime.tsx";
import { JourneyStopPlatform } from "@/routes/journeys/-components/JourneyStopPlatform.tsx";
import { JourneyStopTypeIndicator } from "@/routes/journeys/-components/JourneyStopTypeIndicator.tsx";
import { JourneyTimelineMarker } from "@/routes/journeys/-components/JourneyTimelineMarker.tsx";
import type { FC } from "react";

type StopItemProps = {
  arrival?: SitJourneyEvent;
  departure?: SitJourneyEvent;
  timeFormatter: (isoTime: string) => string;
};

export const JourneyStopItem: FC<StopItemProps> = ({ arrival, departure, timeFormatter }) => {
  const stopPlace = arrival?.stopPlace ?? departure?.stopPlace;
  return (
    <div className="flex items-center space-x-3">
      <JourneyTimelineMarker arrival={arrival} departure={departure} />

      <div className={"flex flex-col"}>
        {arrival && <JourneyEventTime event={arrival} timeFormatter={timeFormatter} />}
        {departure && <JourneyEventTime event={departure} timeFormatter={timeFormatter} />}
      </div>

      <div className={"flex items-center space-x-1.5 basis-0 grow"}>
        <span className={"font-medium text-balance"}>{stopPlace?.name}</span>
        <JourneyStopTypeIndicator stopType={arrival?.stopType ?? departure?.stopType ?? "NONE"} />
      </div>

      <div className={"flex flex-col justify-end ml-auto"}>
        {arrival && <JourneyStopPlatform event={arrival} />}
        {departure && <JourneyStopPlatform event={departure} />}
      </div>
    </div>
  );
};
