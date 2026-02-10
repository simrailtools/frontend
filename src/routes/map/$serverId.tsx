import "leaflet/dist/leaflet.css";
import "./map.css";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { deepEqual } from "fast-equals";
import { type FC, useEffect, useMemo } from "react";
import { LayerGroup, LayersControl, MapContainer, TileLayer } from "react-leaflet";
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
import { MapElementWithoutEventPropagation } from "@/routes/map/-components/MapElementWithoutEventPropagation.tsx";
import { MapEventHandler } from "@/routes/map/-components/MapEventHandler.tsx";
import { PointMarker } from "@/routes/map/-components/PointMarker.tsx";
import { ServerStatusPopup } from "@/routes/map/-components/ServerStatusPopup.tsx";
import { useMapOptions } from "@/routes/map/-hooks/useMapOptions.ts";
import { SelectedJourneyProvider, useSelectedJourney } from "../../hooks/useSelectedJourney.tsx";

export const Route = createFileRoute("/map/$serverId")({
  loader: async ({ context: { queryClient }, params: { serverId } }) => {
    const getServer = () => {
      return serverId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)?.length
        ? queryClient.ensureQueryData(findServerByIdOptions({ path: { id: serverId } }))
        : queryClient.ensureQueryData(findServerByCodeOptions({ path: { code: serverId } }));
    };

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
  const { selectedJourney, setSelectedJourney } = useSelectedJourney();
  useEffect(() => {
    if (selectedJourney && journeysById.size > 0) {
      const currLiveData = selectedJourney.live;
      const newJourneyData = journeysById.get(currLiveData.ids.dataId);
      if (!deepEqual(currLiveData, newJourneyData?.live)) {
        // only update (and trigger a re-render) in case the live data of the selected
        // journey changed - all other data associated with the journey is static
        setSelectedJourney(newJourneyData ?? null);
      }
    }
  }, [journeysById, selectedJourney, setSelectedJourney]);

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
  const changeTileLayer = (layer: string) => updateMapOptions({ tileLayer: layer });
  const toggleMapLayer = (layer: string, enabled: boolean) => {
    updateMapOptions(currentOptions => {
      const updatedLayers = enabled
        ? [...new Set([...currentOptions.enabledLayers, layer])]
        : currentOptions.enabledLayers.filter(l => l !== layer);
      return { enabledLayers: updatedLayers };
    });
  };

  return (
    <>
      {server && <ServerStatusPopup server={server} />}
      {selectedJourney && <JourneyPopup journey={selectedJourney} />}

      <MapContainer
        zoom={9}
        minZoom={3}
        maxZoom={17}
        zoomControl={false}
        preferCanvas={true}
        scrollWheelZoom={true}
        center={[51.331, 20.297]}
        className={"min-h-dvh w-full"}
      >
        <LayersControl position={"bottomright"} collapsed={true} sortLayers={false}>
          {/* Selectable base layers for the map */}
          <LayersControl.BaseLayer name={"Standard"} checked={mapOptions.tileLayer === "standard"}>
            <TileLayer
              minZoom={3}
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution={`Map data &copy; ${safeExternalUrlTag("OpenStreetMap", "https://openstreetmap.org/copyright")} contributors`}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name={"WMTS TopPlusOpen"} checked={mapOptions.tileLayer === "wmts_topplusopen"}>
            <TileLayer
              minZoom={3}
              maxZoom={17}
              minNativeZoom={1}
              maxNativeZoom={16}
              url={
                "https://sgx.geodatenzentrum.de/wmts_topplus_open/tile/1.0.0/web/default/WEBMERCATOR/{z}/{y}/{x}.png"
              }
              attribution={`Map data &copy; ${safeExternalUrlTag("Federal Agency for Cartography and Geodesy (BKG)", "https://bkg.bund.de")}`}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name={"ESRI Satellite"} checked={mapOptions.tileLayer === "esri_satellite"}>
            <TileLayer
              minZoom={3}
              maxZoom={18}
              url={"https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"}
              attribution={`Powered by ${safeExternalUrlTag("Esri", "https://esri.com")}`}
            />
          </LayersControl.BaseLayer>

          {/* Layers displaying information about the selected server */}
          <LayersControl.Overlay name={"Trains"} checked={mapOptions.enabledLayers.includes("trains")}>
            <LayerGroup>
              {Array.from(journeysById.entries()).map(([journeyId, data]) => (
                <JourneyMarker key={journeyId} journey={data} />
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name={"Dispatch Posts"} checked={mapOptions.enabledLayers.includes("dispatch_posts")}>
            <LayerGroup>
              {Array.from(dispatchPostsById.entries()).map(([postId, data]) => (
                <DispatchPostMarker key={postId} post={data} />
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name={"Other Points"} checked={mapOptions.enabledLayers.includes("other_points")}>
            <LayerGroup>
              {points?.map(point => (
                <PointMarker key={point.id} point={point} />
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay
            name={"Journey Polyline"}
            checked={mapOptions.enabledLayers.includes("journey_polyline")}
          >
            <LayerGroup>
              {selectedJourney && <JourneyPolyline journeyId={selectedJourney.live.ids.dataId} />}
            </LayerGroup>
          </LayersControl.Overlay>

          {/* Additional informative layers */}
          <LayersControl.Overlay name={"OpenRailWayMap"} checked={mapOptions.enabledLayers.includes("openrailwaymap")}>
            <TileLayer
              url={"https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"}
              attribution={`Rendering: ${safeExternalUrlTag("OpenRailWayMap", "https://openrailwaymap.org/")}`}
            />
          </LayersControl.Overlay>
        </LayersControl>

        <MapElementWithoutEventPropagation>
          <JourneyFocusHandler />
          <MapEventHandler changeTileLayer={changeTileLayer} toggleMapLayer={toggleMapLayer} />
        </MapElementWithoutEventPropagation>
      </MapContainer>
    </>
  );
};
