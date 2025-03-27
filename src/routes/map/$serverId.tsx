import "leaflet/dist/leaflet.css";
import "./map.css";
import { listPointsQueryOptions } from "@/api/clients/pointClient.ts";
import { serverByCodeRequestOptions, serverByIdQueryOptions } from "@/api/clients/serversClient.ts";
import useEventWebsocket from "@/hooks/useEventWebsocket.ts";
import { safeExternalUrlTag } from "@/lib/urlFactory.ts";
import { DispatchPostMarker } from "@/routes/map/-components/DispatchPostMarker.tsx";
import { JourneyFocusHandler } from "@/routes/map/-components/JourneyFocusHandler.tsx";
import { JourneyMarker } from "@/routes/map/-components/JourneyMarker.tsx";
import { JourneyPopup } from "@/routes/map/-components/JourneyPopup.tsx";
import { MapElementWithoutEventPropagation } from "@/routes/map/-components/MapElementWithoutEventPropagation.tsx";
import { MapEventHandler } from "@/routes/map/-components/MapEventHandler.tsx";
import { PointMarker } from "@/routes/map/-components/PointMarker.tsx";
import { ServerStatusPopup } from "@/routes/map/-components/ServerStatusPopup.tsx";
import { useMapOptions } from "@/routes/map/-hooks/useMapOptions.ts";
import { isJourneyWithPosition } from "@/routes/map/-lib/map.types.ts";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { type FC, useEffect, useMemo } from "react";
import { LayerGroup, LayersControl, MapContainer, TileLayer } from "react-leaflet";
import { SelectedJourneyProvider, useSelectedJourney } from "../../hooks/useSelectedJourney.tsx";

export const Route = createFileRoute("/map/$serverId")({
  loader: async ({ context: { queryClient }, params: { serverId } }) => {
    const getServer = () => {
      return serverId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)?.length
        ? queryClient.ensureQueryData(serverByIdQueryOptions({ serverId }))
        : queryClient.ensureQueryData(serverByCodeRequestOptions({ serverCode: serverId }));
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
      <SelectedJourneyProvider>
        <ServerMap serverId={server.id} />
      </SelectedJourneyProvider>
    </>
  );
}

const ServerMap: FC<{ serverId: string }> = ({ serverId }) => {
  const { servers, journeys, dispatchPosts } = useEventWebsocket({
    servers: [serverId],
    journeys: serverId,
    dispatchPosts: serverId,
  });
  const server = servers.find(updatedServer => updatedServer.serverId === serverId);

  // update the selected journey or reset it to null if the journey was removed
  const { selectedJourney, setSelectedJourney } = useSelectedJourney();
  useEffect(() => {
    if (selectedJourney) {
      const updatedJourney = journeys
        .filter(isJourneyWithPosition)
        .find(journey => journey.journeyId === selectedJourney.journeyId);
      setSelectedJourney(updatedJourney ?? null);
    }
  }, [journeys, selectedJourney, setSelectedJourney]);

  // fetch points located on the map, filter out points that have an associated dispatch post
  const { data: pointsListData } = useQuery({
    ...listPointsQueryOptions({ limit: 10_000 }),
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  });
  const points = useMemo(() => {
    const dispatchPostPoints = new Set(dispatchPosts.map(post => post.pointId));
    return pointsListData?.items.filter(point => !dispatchPostPoints.has(point.id));
  }, [dispatchPosts, pointsListData]);

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
        zoom={10}
        zoomControl={false}
        preferCanvas={true}
        center={[50.5305, 19.6394]}
        scrollWheelZoom={true}
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
              minZoom={8}
              url={`https://ibasemaps-api.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}?token=${import.meta.env.VITE_ESRI_TILES_KEY}`}
              attribution={`Powered by ${safeExternalUrlTag("Esri", "https://esri.com")} | WULS/SGGW, GUGiK, Esri, Earthstar Geographics, TomTom, Garmin, Foursquare, FAO, METI/NASA, USGS`}
            />
          </LayersControl.BaseLayer>

          {/* Layers displaying information about the selected server */}
          <LayersControl.Overlay name={"Trains"} checked={mapOptions.enabledLayers.includes("trains")}>
            <LayerGroup>
              {journeys.filter(isJourneyWithPosition).map(journey => (
                <JourneyMarker key={journey.journeyId} journey={journey} />
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name={"Dispatch Posts"} checked={mapOptions.enabledLayers.includes("dispatch_posts")}>
            <LayerGroup>
              {dispatchPosts.map(dispatchPost => (
                <DispatchPostMarker key={dispatchPost.postId} dispatchPost={dispatchPost} />
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
