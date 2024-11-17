// React Router generated types for route:
// routes/about.tsx

import * as T from "react-router/types"

export type Params = {}

type RouteModule = typeof import("./about")

export namespace Route {
  export type LoaderData = T.CreateLoaderData<RouteModule>
  export type ActionData = T.CreateActionData<RouteModule>

  export type LoaderArgs = T.CreateServerLoaderArgs<Params>
  export type ClientLoaderArgs = T.CreateClientLoaderArgs<Params, RouteModule>
  export type ActionArgs = T.CreateServerActionArgs<Params>
  export type ClientActionArgs = T.CreateClientActionArgs<Params, RouteModule>

  export type HydrateFallbackProps = T.CreateHydrateFallbackProps<Params>
  export type ComponentProps = T.CreateComponentProps<Params, LoaderData, ActionData>
  export type ErrorBoundaryProps = T.CreateErrorBoundaryProps<Params, LoaderData, ActionData>
}