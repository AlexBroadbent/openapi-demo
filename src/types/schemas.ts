import { components } from "./generated/openapi-schema"

type Schemas = components["schemas"]

export type HealthCheckResult = Schemas["HealthCheckResult"]
