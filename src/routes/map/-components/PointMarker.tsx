import type { FC } from "react";
import { Marker } from "react-map-gl/maplibre";
import type { PointInfoDto } from "@/api/rest";
import { MapTooltip } from "@/routes/map/-components/MapTooltip.tsx";

export const PointMarker: FC<{ point: PointInfoDto }> = ({ point }) => {
  const { name, position } = point;
  return (
    <Marker longitude={position.longitude} latitude={position.latitude} anchor="center">
      <div className="relative flex items-center justify-center">
        <div className="h-2.5 w-2.5 rounded-full bg-blue-600 shadow" />
        <MapTooltip position={"top"} className={"p-0.5 text-[85%] font-semibold"}>
          {name}
        </MapTooltip>
      </div>
    </Marker>
  );
};
