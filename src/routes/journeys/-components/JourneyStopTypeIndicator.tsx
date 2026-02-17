import type { FC } from "react";
import type { JourneyEventDto } from "@/api/rest";
import { cn } from "@/lib/utils.ts";

export const JourneyStopTypeIndicator: FC<{ stopType: JourneyEventDto["stopType"] }> = ({ stopType }) => {
  // don't display anything if there is no stop scheduled
  if (stopType === "NONE") {
    return null;
  }

  const stopTypeDisplay = stopType === "PASSENGER" ? "PH" : "PT";
  return (
    <div
      className={cn(
        "text-white text-sm px-2 py-0.5 rounded-xl",
        stopType === "TECHNICAL" && "bg-blue-500",
        stopType === "PASSENGER" && "bg-fuchsia-700",
      )}
    >
      {stopTypeDisplay}
    </div>
  );
};
