import type { StyleSpecification } from "@maplibre/maplibre-gl-style-spec";
import type { RasterSourceSpecification } from "react-map-gl/maplibre";
import { safeExternalUrlTag } from "@/lib/urlFactory.ts";

/**
 * Raster spec for OpenRailwayMap (ORM).
 */
export const mapRasterLayerSpecs = {
  "orm-infrastructure": {
    displayName: "ORM Infrastructure",
    spec: {
      type: "raster",
      tileSize: 256,
      attribution: `Rendering: ${safeExternalUrlTag("OpenRailwayMap", "https://openrailwaymap.org")}`,
      tiles: [
        "https://a.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png",
        "https://b.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png",
        "https://c.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png",
      ],
    },
  },
  "orm-speed": {
    displayName: "ORM Max Speed",
    spec: {
      type: "raster",
      tileSize: 256,
      attribution: `Rendering: ${safeExternalUrlTag("OpenRailwayMap", "https://openrailwaymap.org")}`,
      tiles: [
        "https://a.tiles.openrailwaymap.org/maxspeed/{z}/{x}/{y}.png",
        "https://b.tiles.openrailwaymap.org/maxspeed/{z}/{x}/{y}.png",
        "https://c.tiles.openrailwaymap.org/maxspeed/{z}/{x}/{y}.png",
      ],
    },
  },
  "orm-signalling": {
    displayName: "ORM Signalling",
    spec: {
      type: "raster",
      tileSize: 256,
      attribution: `Rendering: ${safeExternalUrlTag("OpenRailwayMap", "https://openrailwaymap.org")}`,
      tiles: [
        "https://a.tiles.openrailwaymap.org/signals/{z}/{x}/{y}.png",
        "https://b.tiles.openrailwaymap.org/signals/{z}/{x}/{y}.png",
        "https://c.tiles.openrailwaymap.org/signals/{z}/{x}/{y}.png",
      ],
    },
  },
} as const satisfies Record<string, { displayName: string; spec: RasterSourceSpecification }>;

/**
 * Type representing the map base layer ids.
 */
export type MapRasterLayerId = keyof typeof mapRasterLayerSpecs;

/**
 * The available map baser layers, mapped by id to their spec.
 */
export const mapBaseLayerSpecs = {
  "vt-colorful": {
    displayName: "VersaTiles Colorful",
    spec: "https://vector.openstreetmap.org/styles/shortbread/colorful.json",
  },
  "vt-eclipse": {
    displayName: "VersaTiles Eclipse",
    spec: "https://vector.openstreetmap.org/styles/shortbread/eclipse.json",
  },
  "vt-graybeard": {
    displayName: "VersaTiles Graybeard",
    spec: "https://vector.openstreetmap.org/styles/shortbread/graybeard.json",
  },
  "ofm-liberty": {
    displayName: "OFM Liberty",
    spec: "https://tiles.openfreemap.org/styles/liberty",
  },
  "ofm-positron": {
    displayName: "OFM Positron",
    spec: "https://tiles.openfreemap.org/styles/positron",
  },
  "osm-default": {
    displayName: "OSM Standard",
    spec: {
      version: 8,
      name: "OSM Standard",
      sources: {
        "osm-default": {
          type: "raster",
          tiles: [
            "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
            "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
            "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
          ],
          tileSize: 256,
          attribution: `Map data &copy; ${safeExternalUrlTag("OpenStreetMap", "https://openstreetmap.org/copyright")} contributors`,
        },
      },
      layers: [
        {
          id: "osm-default",
          type: "raster",
          source: "osm-default",
        },
      ],
    },
  },
  "wmts-topplusopen": {
    displayName: "WMTS TopPlusOpen",
    spec: {
      version: 8,
      name: "WMTS TopPlusOpen (BKG)",
      sources: {
        wmts_tpo: {
          type: "raster",
          tiles: [
            "https://sgx.geodatenzentrum.de/wmts_topplus_open/tile/1.0.0/web/default/WEBMERCATOR/{z}/{y}/{x}.png",
          ],
          minzoom: 3,
          maxzoom: 17,
          tileSize: 256,
          attribution: `Map data &copy; ${safeExternalUrlTag("Federal Agency for Cartography and Geodesy (BKG)", "https://bkg.bund.de")}`,
        },
      },
      layers: [
        {
          id: "wmts_tpo",
          type: "raster",
          source: "wmts_tpo",
        },
      ],
    },
  },
  "esri-sattelite": {
    displayName: "ESRI Satellite",
    spec: {
      version: 8,
      name: "ESRI Satellite",
      sources: {
        "esri-satellite": {
          type: "raster",
          tiles: ["https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
          minzoom: 3,
          maxzoom: 18,
          tileSize: 256,
          attribution: `Powered by ${safeExternalUrlTag("Esri", "https://esri.com")}`,
        },
      },
      layers: [
        {
          id: "esri-satellite",
          type: "raster",
          source: "esri-satellite",
        },
      ],
    },
  },
} as const satisfies Record<string, { displayName: string; spec: string | StyleSpecification }>;

/**
 * Type representing the map base layer ids.
 */
export type MapBaseLayerId = keyof typeof mapBaseLayerSpecs;

/**
 * The default tile layer to apply in case none is selected.
 */
export const defaultTileLayer: MapBaseLayerId = "ofm-liberty";
