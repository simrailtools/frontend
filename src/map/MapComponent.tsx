import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { MarkerComponent } from "./MarkerComponent.tsx";
import type { JourneySnapshotWithRequiredPosition } from "./map.types.ts";
import useEventWebsocket from "../hooks/useEventWebsocket.ts";
import type { FC } from "react";
import type { JourneySnapshotFrame } from "../api/types/event.types.ts";

const MapComponent: FC = () => {
  const { journeys, dispatchPosts } = useEventWebsocket({
    journeys: "9db9b77d-a5ff-5385-89c3-6c6224e0824f",
    dispatchPosts: "9db9b77d-a5ff-5385-89c3-6c6224e0824f",
  });

  const isJourneyWithPosition = (journey: JourneySnapshotFrame): journey is JourneySnapshotWithRequiredPosition => {
    return journey.positionLat !== undefined && journey.positionLng !== undefined;
  };

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
        <MarkerComponent key={train.journeyId} journey={train} />
      ))}
      {dispatchPosts.map(train => (
        <Marker key={train.postId} position={[train.latitude, train.longitude]} />
      ))}
    </MapContainer>
  );
};

export default MapComponent;
