import { components } from "./generated/openapi-schema"

type Schemas = components["schemas"]

export type City = Schemas["City"]
export type Route = Schemas["Route"]
export type HealthCheckResult = Schemas["HealthCheckResult"]
