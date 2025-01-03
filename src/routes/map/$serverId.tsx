import "leaflet/dist/leaflet.css";
import { serverByCodeRequestOptions, serverByIdQueryOptions } from "@/api/clients/serversClient.ts";
import type { SitServer } from "@/api/types/servers.types.ts";
import useEventWebsocket from "@/hooks/useEventWebsocket.ts";
import { JourneyMarker } from "@/routes/map/-components/JourneyMarker.tsx";
import { isJourneyWithPosition } from "@/routes/map/-lib/map.types.ts";
import { createFileRoute } from "@tanstack/react-router";
import type { FC } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { SelectedJourneyProvider } from "../../hooks/useSelectedJourney.tsx";

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
    <SelectedJourneyProvider>
      <ServerMap server={server} />
    </SelectedJourneyProvider>
  );
}

const ServerMap: FC<{ server: SitServer }> = ({ server }) => {
  const { journeys, dispatchPosts } = useEventWebsocket({
    servers: [server.id],
    journeys: server.id,
    dispatchPosts: server.id,
  });

  // satellite
  // https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}
  // https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}

  // nice looking
  // https://sgx.geodatenzentrum.de/wmts_topplus_open/tile/1.0.0/web/default/WEBMERCATOR/{z}/{y}/{x}.png
  // https://sgx.geodatenzentrum.de/wmts_topplus_open/tile/1.0.0/web_grau/default/WEBMERCATOR/{z}/{y}/{x}.png

  // different languages
  // https://tile.openstreetmap.de/{z}/{x}/{y}.png

  // open railway map layer
  // https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png

  return (
    <>
      <div className={"top-0 right-0 fixed bg-gray-800 z-[100000]"}>world</div>
      <MapContainer
        zoom={10}
        zoomControl={false}
        center={[50.5305, 19.6394]}
        scrollWheelZoom={true}
        className={"h-screen w-screen"}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://sgx.geodatenzentrum.de/wmts_topplus_open/tile/1.0.0/web/default/WEBMERCATOR/{z}/{y}/{x}.png"
        />
        {journeys.filter(isJourneyWithPosition).map(train => (
          <JourneyMarker key={train.journeyId} journey={train} />
        ))}
        {dispatchPosts.map(train => (
          <Marker key={train.postId} position={[train.latitude, train.longitude]} />
        ))}
      </MapContainer>
    </>
  );
};
