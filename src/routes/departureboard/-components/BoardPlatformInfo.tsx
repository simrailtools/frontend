import type { BoardStopInfoDto } from "@/api/generated";
import type { FC } from "react";

type BoardPlatformInfoProps = {
  scheduledStop?: BoardStopInfoDto;
  realtimeStop?: BoardStopInfoDto;
};

export const BoardPlatformInfo: FC<BoardPlatformInfoProps> = ({ scheduledStop, realtimeStop }) => {
  const scheduledPlatformInfo = scheduledStop && formatPlatformInfo(scheduledStop);
  const realtimePlatformInfo = realtimeStop && formatPlatformInfo(realtimeStop);
  if (!scheduledPlatformInfo) {
    // no stop is scheduled for the train
    return null;
  }

  if (!realtimePlatformInfo || scheduledPlatformInfo === realtimePlatformInfo) {
    // no realtime info is known or train stops at the scheduled platform
    return <span className="text-3xl font-bold text-black ml-auto whitespace-nowrap">{scheduledPlatformInfo}</span>;
  }

  // train stops at a platform that differs from schedule
  return <span className="text-3xl font-bold text-red-600 ml-auto whitespace-nowrap">{realtimePlatformInfo}</span>;
};

/**
 * Formats the given platform info into a human-readable string.
 * @param platformInfo the platform info to format.
 */
const formatPlatformInfo = (platformInfo: BoardStopInfoDto) => {
  return `P: ${platformInfo.platform} T: ${platformInfo.track}`;
};
