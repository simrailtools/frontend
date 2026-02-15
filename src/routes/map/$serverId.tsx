import "maplibre-gl/dist/maplibre-gl.css";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { type FC, useEffect, useMemo } from "react";
import { AttributionControl, Layer, Map as MapLibreMap, Source } from "react-map-gl/maplibre";
import {
  findServerByCodeOptions,
  findServerByIdOptions,
  listPointsOptions,
} from "@/api/rest/@tanstack/react-query.gen.ts";
import { resolveNatsBackendUrl } from "@/api/util.ts";
import { useLiveDispatchPostData } from "@/hooks/useLiveDispatchPostData.tsx";
import { useLiveJourneyData } from "@/hooks/useLiveJourneyData.tsx";
import { useLiveServerData } from "@/hooks/useLiveServerData.tsx";
import { NatsContextProvider } from "@/hooks/useNats.tsx";
import { safeExternalUrlTag } from "@/lib/urlFactory.ts";
import { DispatchPostMarker } from "@/routes/map/-components/DispatchPostMarker.tsx";
import { JourneyFocusHandler } from "@/routes/map/-components/JourneyFocusHandler.tsx";
import { JourneyMarker } from "@/routes/map/-components/JourneyMarker.tsx";
import { JourneyPolyline } from "@/routes/map/-components/JourneyPolyline.tsx";
import { JourneyPopup } from "@/routes/map/-components/JourneyPopup.tsx";
import { MapLayerControl } from "@/routes/map/-components/MapLayerControl.tsx";
import { PointMarker } from "@/routes/map/-components/PointMarker.tsx";
import { ServerStatusPopup } from "@/routes/map/-components/ServerStatusPopup.tsx";
import { useMapOptions } from "@/routes/map/-hooks/useMapOptions.ts";
import {
  type MapBaseLayerId,
  type MapRasterLayerId,
  mapBaseLayerSpecs,
  mapRasterLayerSpecs,
} from "@/routes/map/-util/tileLayers.ts";
import { SelectedJourneyProvider, useSelectedJourney } from "../../hooks/useSelectedJourney.tsx";

export const Route = createFileRoute("/map/$serverId")({
  loader: async ({ context: { queryClient }, params: { serverId } }) => {
    const getServer = () =>
      serverId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)?.length
        ? queryClient.ensureQueryData(findServerByIdOptions({ path: { id: serverId } }))
        : queryClient.ensureQueryData(findServerByCodeOptions({ path: { code: serverId } }));

    const server = await getServer();
    if (!server) {
      throw new Error("The requested server does not exist");
    }

    return server;
  },
  component: MapServerComponent,
});

function MapServerComponent() {
  const server = Route.useLoaderData();
  return (
    <>
      <title>{`${server.code.toUpperCase()} Map - SIT`}</title>
      <NatsContextProvider websocketUrl={resolveNatsBackendUrl()}>
        <SelectedJourneyProvider>
          <ServerMap serverId={server.id} />
        </SelectedJourneyProvider>
      </NatsContextProvider>
    </>
  );
}

const ServerMap: FC<{ serverId: string }> = ({ serverId }) => {
  const { map: serversById } = useLiveServerData(serverId);
  const server = serversById.get(serverId);

  // update the selected journey or reset it to null if the journey was removed
  // only update if there is at least one known journey, an empty journeys array
  // (after a journey was selected) should only happen when the websocket has to
  // reconnect to the backend which shouldn't remove the focused journey
  const { map: journeysById } = useLiveJourneyData(serverId);
  const { selectedJourneyId, setSelectedJourney } = useSelectedJourney();
  const selectedJourney = selectedJourneyId ? journeysById.get(selectedJourneyId) : undefined;
  const selectedJourneyExists = journeysById.size === 0 || selectedJourney !== undefined;
  useEffect(() => {
    if (!selectedJourneyExists) {
      setSelectedJourney(undefined);
    }
  }, [selectedJourneyExists, setSelectedJourney]);

  // fetch points located on the map, filter out points that have an associated dispatch post
  const { map: dispatchPostsById } = useLiveDispatchPostData(serverId);
  const { data: pointsList } = useQuery({
    ...listPointsOptions({ query: { limit: 10_000 } }),
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  });
  const points = useMemo(() => {
    const points = pointsList?.items ?? [];
    const pointsWithDispatchPost = new Set(Array.from(dispatchPostsById.values(), post => post.base.pointId));
    return points.filter(point => !pointsWithDispatchPost.has(point.id));
  }, [pointsList, dispatchPostsById]);

  // map options handling
  const { mapOptions, updateMapOptions } = useMapOptions();
  const changeTileLayer = (layer: MapBaseLayerId) => updateMapOptions({ tileLayer: layer });
  const toggleMapLayer = (layer: string, enabled: boolean) => {
    updateMapOptions(currentOptions => {
      const updatedLayers = enabled
        ? [...new Set([...currentOptions.enabledLayers, layer])]
        : currentOptions.enabledLayers.filter(l => l !== layer);
      return { enabledLayers: updatedLayers };
    });
  };
  const tileLayer = useMemo(() => mapBaseLayerSpecs[mapOptions.tileLayer], [mapOptions.tileLayer]);

  return (
    <>
      {server && <ServerStatusPopup server={server} />}
      {selectedJourney !== undefined && <JourneyPopup journey={selectedJourney} />}

      <MapLibreMap
        reuseMaps={true}
        style={{ width: "100%", minHeight: "100dvh" }}
        initialViewState={{ latitude: 51.331, longitude: 20.297, zoom: 9 }}
        minZoom={3}
        maxZoom={17}
        dragPan={true}
        dragRotate={false}
        keyboard={false}
        scrollZoom={true}
        maplibreLogo={false}
        doubleClickZoom={false}
        attributionControl={false}
        refreshExpiredTiles={false}
        mapStyle={tileLayer.spec}
        onClick={() => setSelectedJourney(undefined)}
      >
        <AttributionControl
          compact={false}
          position={"bottom-right"}
          style={{ background: "white" }}
          customAttribution={[
            safeExternalUrlTag("MapLibre", "https://maplibre.org"),
            safeExternalUrlTag("GitHub", "https://github.com/simrailtools"),
          ]}
        />
        {mapOptions.enabledLayers
          .filter(layer => layer in mapRasterLayerSpecs)
          .map(layer => {
            const rasterSpec = mapRasterLayerSpecs[layer as MapRasterLayerId].spec;
            return (
              <Source key={layer} id={layer} {...rasterSpec}>
                <Layer id={`${layer}-layer`} type={"raster"} source={layer} paint={{ "raster-opacity": 0.8 }} />
              </Source>
            );
          })}

        {mapOptions.enabledLayers.includes("journey_polyline") && selectedJourney && (
          <JourneyPolyline journeyId={selectedJourney.live?.ids?.dataId ?? ""} />
        )}

        {mapOptions.enabledLayers.includes("trains") &&
          Array.from(journeysById.entries()).map(([journeyId, data]) => (
            <JourneyMarker key={journeyId} journey={data} />
          ))}

        {mapOptions.enabledLayers.includes("dispatch_posts") &&
          Array.from(dispatchPostsById.entries()).map(([postId, data]) => (
            <DispatchPostMarker key={postId} post={data} />
          ))}

        {mapOptions.enabledLayers.includes("other_points") &&
          points?.map(point => <PointMarker key={point.id} point={point} />)}

        <JourneyFocusHandler position={selectedJourney?.live?.journeyData?.position} />
        <MapLayerControl mapOptions={mapOptions} onBaseLayerChange={changeTileLayer} onToggleLayer={toggleMapLayer} />
      </MapLibreMap>
    </>
  );
};
