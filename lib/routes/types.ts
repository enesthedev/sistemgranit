export type RouteValue = string | { [key: string]: string | RouteValue };

export type RouteConfig = {
  [key: string]: RouteValue;
};

export type FlatRouteKey<T, Prefix extends string = ""> = T extends string
  ? Prefix
  : T extends Record<string, unknown>
    ? {
        [K in keyof T]: K extends string
          ? FlatRouteKey<T[K], Prefix extends "" ? K : `${Prefix}.${K}`>
          : never;
      }[keyof T]
    : never;
