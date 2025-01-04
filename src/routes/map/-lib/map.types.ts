import type { JourneySnapshotFrame } from "@/api/types/event.types.ts";

/**
 * A journey snapshot with the position attributes required.
 */
export type JourneySnapshotWithRequiredPosition = JourneySnapshotFrame &
  Required<Pick<JourneySnapshotFrame, "positionLat" | "positionLng">>;

/**
 * Function that filters journeys that has the position attributes set.
 * @param journey the journey to check.
 */
export const isJourneyWithPosition = (
  journey: JourneySnapshotFrame,
): journey is JourneySnapshotWithRequiredPosition => {
  return journey.positionLat !== undefined && journey.positionLng !== undefined;
};
