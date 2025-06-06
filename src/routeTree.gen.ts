/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root"
import { Route as IndexImport } from "./routes/index"
import { Route as MapIndexImport } from "./routes/map/index"
import { Route as MapServerIdImport } from "./routes/map/$serverId"
import { Route as JourneysJourneyIdImport } from "./routes/journeys/$journeyId"

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any)

const MapIndexRoute = MapIndexImport.update({
  id: "/map/",
  path: "/map/",
  getParentRoute: () => rootRoute,
} as any)

const MapServerIdRoute = MapServerIdImport.update({
  id: "/map/$serverId",
  path: "/map/$serverId",
  getParentRoute: () => rootRoute,
} as any)

const JourneysJourneyIdRoute = JourneysJourneyIdImport.update({
  id: "/journeys/$journeyId",
  path: "/journeys/$journeyId",
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/"
      path: "/"
      fullPath: "/"
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    "/journeys/$journeyId": {
      id: "/journeys/$journeyId"
      path: "/journeys/$journeyId"
      fullPath: "/journeys/$journeyId"
      preLoaderRoute: typeof JourneysJourneyIdImport
      parentRoute: typeof rootRoute
    }
    "/map/$serverId": {
      id: "/map/$serverId"
      path: "/map/$serverId"
      fullPath: "/map/$serverId"
      preLoaderRoute: typeof MapServerIdImport
      parentRoute: typeof rootRoute
    }
    "/map/": {
      id: "/map/"
      path: "/map"
      fullPath: "/map"
      preLoaderRoute: typeof MapIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute
  "/journeys/$journeyId": typeof JourneysJourneyIdRoute
  "/map/$serverId": typeof MapServerIdRoute
  "/map": typeof MapIndexRoute
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute
  "/journeys/$journeyId": typeof JourneysJourneyIdRoute
  "/map/$serverId": typeof MapServerIdRoute
  "/map": typeof MapIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  "/": typeof IndexRoute
  "/journeys/$journeyId": typeof JourneysJourneyIdRoute
  "/map/$serverId": typeof MapServerIdRoute
  "/map/": typeof MapIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: "/" | "/journeys/$journeyId" | "/map/$serverId" | "/map"
  fileRoutesByTo: FileRoutesByTo
  to: "/" | "/journeys/$journeyId" | "/map/$serverId" | "/map"
  id: "__root__" | "/" | "/journeys/$journeyId" | "/map/$serverId" | "/map/"
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  JourneysJourneyIdRoute: typeof JourneysJourneyIdRoute
  MapServerIdRoute: typeof MapServerIdRoute
  MapIndexRoute: typeof MapIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  JourneysJourneyIdRoute: JourneysJourneyIdRoute,
  MapServerIdRoute: MapServerIdRoute,
  MapIndexRoute: MapIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/journeys/$journeyId",
        "/map/$serverId",
        "/map/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/journeys/$journeyId": {
      "filePath": "journeys/$journeyId.tsx"
    },
    "/map/$serverId": {
      "filePath": "map/$serverId.tsx"
    },
    "/map/": {
      "filePath": "map/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
