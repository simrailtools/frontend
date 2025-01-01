import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MapComponent from "./map/MapComponent.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// biome-ignore lint/style/noNonNullAssertion: root element is present, trust me
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MapComponent />
    </QueryClientProvider>
  </StrictMode>,
);
