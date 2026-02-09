import { useQuery } from "@tanstack/react-query";
import { type FC, memo } from "react";
import { Polyline } from "react-leaflet";
import { findMapPolylineByJourney } from "@/api/rest";

interface PolylineComponentProps {
  journeyId: string;
}

export const JourneyPolyline: FC<PolylineComponentProps> = memo(({ journeyId }) => {
  const { data } = useQuery({
    queryKey: ["journey_polyline", journeyId],
    queryFn: async ({ signal }) =>
      await findMapPolylineByJourney({
        path: {
          id: journeyId,
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
