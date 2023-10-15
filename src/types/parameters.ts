import { components } from "./generated/openapi-schema"

type Parameters = components["parameters"]

export type QueryLimit = Parameters["QueryLimit"]
export type QuerySkip = Parameters["QuerySkip"]
