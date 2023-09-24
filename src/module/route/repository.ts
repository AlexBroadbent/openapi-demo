import { City, Route } from "../../types/schemas"

const store: Route[] = [
  { from: "london", to: "thurles", miles: 459 },
  { from: "london", to: "paris", miles: 288 },
  { from: "london", to: "milan", miles: 819 },
  { from: "london", to: "geneva", miles: 614 },
  { from: "thurles", to: "london", miles: 460 },
  { from: "thurles", to: "paris", miles: 755 },
  { from: "thurles", to: "milan", miles: 1274 },
  { from: "thurles", to: "geneva", miles: 1081 },
  { from: "paris", to: "london", miles: 292 },
  { from: "paris", to: "thurles", miles: 756 },
  { from: "paris", to: "milan", miles: 529 },
  { from: "paris", to: "geneva", miles: 336 },
  { from: "milan", to: "london", miles: 810 },
  { from: "milan", to: "thurles", miles: 1274 },
  { from: "milan", to: "paris", miles: 529 },
  { from: "milan", to: "geneva", miles: 198 },
  { from: "geneva", to: "london", miles: 617 },
  { from: "geneva", to: "thurles", miles: 1023 },
  { from: "geneva", to: "paris", miles: 336 },
  { from: "geneva", to: "milan", miles: 198 },
]

export const getRoute = async (from: City["id"], to: City["id"]): Promise<Route | null> => {
  const result = store.find((route) => route.from === from && route.to === to)
  return result ?? null
}
