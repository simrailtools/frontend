import { useQuery } from "@tanstack/react-query";
import type { GeoJSON, Position } from "geojson";
import { type FC, memo, useMemo } from "react";
import { Layer, Source } from "react-map-gl/maplibre";
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
        headers: {
          Accept: "application/json",
        },
        signal,
        throwOnError: true,
      }),
  });
  const geoJson = useMemo((): GeoJSON | undefined => {
    if (data) {
      return {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: data.polyline.map((position): Position => [position.longitude, position.latitude]),
        },
      };
    }
  }, [data]);

  if (!geoJson) {
    return null;
  }

  return (
    <Source id={`journey-polyline-${journeyId}`} type={"geojson"} data={geoJson}>
      <Layer
        id={`journey-polyline-layer-${journeyId}`}
        type="line"
        paint={{
          "line-width": 3,
          "line-color": "#2563eb",
        }}
      />
    </Source>
  );
});
