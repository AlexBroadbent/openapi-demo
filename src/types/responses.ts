import { components } from "./generated/openapi-schema"

type Responses = components["responses"]

export type GetAllCities = Responses["CityAllGet"]["content"]["application/json"]
