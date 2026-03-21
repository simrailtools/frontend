import type { FC } from "react";
import type { JourneyEventDto, JourneyStopInfoDto } from "@/api/rest";

const formatPlatformInfo = (platformInfo: JourneyStopInfoDto) => `P: ${platformInfo.platform} T: ${platformInfo.track}`;

export const JourneyStopPlatform: FC<{ event: JourneyEventDto; departureConfirmed: boolean }> = ({
  event,
  departureConfirmed,
}) => {
  const scheduledPlatformInfo = event.scheduledPassengerStop && formatPlatformInfo(event.scheduledPassengerStop);
  const realtimePlatformInfo = event.realtimePassengerStop && formatPlatformInfo(event.realtimePassengerStop);
  if (!scheduledPlatformInfo) {
    // no scheduled stop at the current event
    return null;
  }

  if (departureConfirmed && !realtimePlatformInfo) {
    // the train departed from the station, but no stop at a platform was recorded
    return <span className={"text-sm text-red-600 font-semibold line-through"}>{scheduledPlatformInfo}</span>;
  }

  if (!realtimePlatformInfo || scheduledPlatformInfo === realtimePlatformInfo) {
    // either the stop did not happen yet, or the stop happened at the scheduled platform
    return <span className={"text-sm text-gray-600 font-semibold"}>{scheduledPlatformInfo}</span>;
  }

  // the stop did happen but at a platform different to the scheduled one
  return (
    <div className={"flex space-x-2"}>
      <span className={"text-sm text-red-600 font-semibold line-through hidden sm:block"}>{scheduledPlatformInfo}</span>
      <span className={"text-sm text-red-600 font-medium"}>{realtimePlatformInfo}</span>
    </div>
  );
};
