import { type FC, useId, useState } from "react";
import settingsIcon from "@/assets/icons/settings.svg";
import { cn } from "@/lib/utils.ts";
import type { MapOptions } from "@/routes/map/-hooks/useMapOptions.ts";
import { type MapBaseLayerId, mapBaseLayerSpecs, mapRasterLayerSpecs } from "@/routes/map/-util/tileLayers.ts";

type LayerControlProps = {
  mapOptions: MapOptions;
  onBaseLayerChange: (layer: MapBaseLayerId) => void;
  onToggleLayer: (layer: string, enabled: boolean) => void;
};

/**
 * Base overlay layers. Additional ones are defined in tileLayers.ts
 */
const baseOverlayLayers = {
  trains: { displayName: "Trains" },
  dispatch_posts: { displayName: "Dispatch Posts" },
  other_points: { displayName: "Other Points" },
  journey_polyline: { displayName: "Journey Polyline" },
} as const;

/**
 * All selectable overlay layers.
 */
const allOverlayLayers = { ...baseOverlayLayers, ...mapRasterLayerSpecs };

export const MapLayerControl: FC<LayerControlProps> = ({ mapOptions, onBaseLayerChange, onToggleLayer }) => {
  const panelId = useId();
  const [open, setOpen] = useState(false);

  return (
    <div className={"absolute bottom-7 right-2 z-10000 select-none"}>
      <div className="relative">
        <button
          type={"button"}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-md border-2",
            "bg-white shadow-lg backdrop-blur transition cursor-pointer",
          )}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={"Map layers"}
          onClick={event => {
            event.stopPropagation();
            setOpen(prev => !prev);
          }}
        >
          <img src={settingsIcon} alt="" className="h-10 w-10" />
        </button>
        {open && (
          <div
            id={panelId}
            className="absolute bottom-14 right-0 w-56 rounded-lg bg-white/95 p-3 text-sm text-gray-800 shadow-lg backdrop-blur"
          >
            <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Base Layers</div>
            <div className="mt-2 space-y-1">
              {Object.entries(mapBaseLayerSpecs).map(([id, layer]) => (
                <label key={id} className="flex cursor-pointer items-center space-x-2">
                  <input
                    type="radio"
                    name="base-layer"
                    checked={mapOptions.tileLayer === id}
                    onChange={() => onBaseLayerChange(id as MapBaseLayerId)}
                  />
                  <span>{layer.displayName}</span>
                </label>
              ))}
            </div>
            <div className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Overlays</div>
            <div className="mt-2 space-y-1">
              {Object.entries(allOverlayLayers).map(([id, { displayName }]) => (
                <label key={id} className="flex cursor-pointer items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={mapOptions.enabledLayers.includes(id)}
                    onChange={event => onToggleLayer(id, event.target.checked)}
                  />
                  <span>{displayName}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
