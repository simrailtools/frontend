import { useQuery } from "@tanstack/react-query";
import { type FC, memo } from "react";
import { Polyline } from "react-leaflet";
import type { JourneySnapshotFrame } from "@/api/eventbus.types.ts";
import { findMapPolylineByJourney } from "@/api/generated";

interface PolylineComponentProps {
  journey: JourneySnapshotFrame;
}

export const JourneyPolyline: FC<PolylineComponentProps> = memo(({ journey }) => {
  const { data } = useQuery({
    queryKey: ["journey_polyline", journey.journeyId],
    queryFn: async ({ signal }) =>
      await findMapPolylineByJourney({
        path: {
          id: journey.journeyId,
        },
        query: {
          includeCancelled: true,
          includeAdditional: true,
          allowFallbackComputation: true,
        },
        signal,
        throwOnError: true,
      }),
  });
  if (!data) {
    return null;
  }

  return <Polyline positions={data.polyline.map(pos => [pos.latitude, pos.longitude])} />;
});
