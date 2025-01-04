import L from "leaflet";
import type { FC, PropsWithChildren } from "react";

export const MapElementWithoutEventPropagation: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      ref={ref => {
        if (ref) {
          L.DomEvent.disableClickPropagation(ref).disableScrollPropagation(ref);
        }
      }}
    >
      {children}
    </div>
  );
};
