import type { JourneySnapshotFrame } from "../api/types/event.types.ts";

export type JourneySnapshotWithRequiredPosition = JourneySnapshotFrame &
  Required<Pick<JourneySnapshotFrame, "positionLat" | "positionLng">>;
