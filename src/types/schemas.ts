import { components } from "./generated/openapi-schema"

type Schemas = components["schemas"]

export type ErrorModel = Schemas["ErrorModel"]
export type City = Schemas["City"]
export type HealthCheckResult = Schemas["HealthCheckResult"]
