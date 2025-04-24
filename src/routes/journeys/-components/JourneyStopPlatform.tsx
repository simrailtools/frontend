import type { JourneyEventDto, JourneyStopInfoDto } from "@/api/generated";
import type { FC } from "react";

const formatPlatformInfo = (platformInfo: JourneyStopInfoDto) => {
  return `P: ${platformInfo.platform} T: ${platformInfo.track}`;
};

export const JourneyStopPlatform: FC<{ event: JourneyEventDto }> = ({ event }) => {
  const scheduledPlatformInfo = event.scheduledPassengerStop && formatPlatformInfo(event.scheduledPassengerStop);
  const realtimePlatformInfo = event.realtimePassengerStop && formatPlatformInfo(event.realtimePassengerStop);
  if (!scheduledPlatformInfo) {
    return null;
  }

  if (!realtimePlatformInfo || scheduledPlatformInfo === realtimePlatformInfo) {
    return <span className={"text-sm text-gray-600 font-semibold"}>{scheduledPlatformInfo}</span>;
  }

  return (
    <div className={"flex space-x-2"}>
      <span className={"text-red-600 line-through hidden sm:block"}>{scheduledPlatformInfo}</span>
      <span className={"text-red-600"}>{realtimePlatformInfo}</span>
    </div>
  );
};
