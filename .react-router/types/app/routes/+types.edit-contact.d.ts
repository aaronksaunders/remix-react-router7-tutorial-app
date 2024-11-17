// React Router generated types for route:
// routes/edit-contact.tsx

import * as T from "react-router/types"

export type Params = {
  "id": string
}

type RouteModule = typeof import("./edit-contact")

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