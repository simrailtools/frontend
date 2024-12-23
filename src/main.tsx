import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import MapComponent from "./map/MapComponent.tsx";

// biome-ignore lint/style/noNonNullAssertion: root element is present, trust me
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MapComponent />
  </StrictMode>,
);
