import { components } from "./generated/openapi-schema"

type Schemas = components["schemas"]

export type City = Schemas["City"]
export type CityCreate = Schemas["CityCreate"]
export type Route = Schemas["Route"]
export type ErrorModel = Schemas["ErrorModel"]
