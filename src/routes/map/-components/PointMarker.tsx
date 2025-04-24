import type { PointInfoDto } from "@/api/generated";
import type { FC } from "react";
import { CircleMarker, Tooltip } from "react-leaflet";

export const PointMarker: FC<{ point: PointInfoDto }> = ({ point }) => {
  const { name, position } = point;
  return (
    <CircleMarker center={[position.latitude, position.longitude]} radius={5} fill={true} fillOpacity={1}>
      <Tooltip permanent={true} direction={"top"} offset={[0, -8]} opacity={0.8} className={"!p-0.5"}>
        <span className={"text-[85%] font-semibold"}>{name}</span>
      </Tooltip>
    </CircleMarker>
  );
};
