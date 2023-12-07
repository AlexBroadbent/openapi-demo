import { operations } from "./generated/openapi-schema"
import { FilterConditionally } from "./utility"

type Anything = unknown

type AllOperations = { [K in keyof operations]: operations[K] }

type HasPathParameters = FilterConditionally<
  AllOperations,
  { parameters: { path?: Anything } }
>
type HasQueryParameters = FilterConditionally<
  AllOperations,
  { parameters: { query?: Anything } }
>
type HasRequestBody = FilterConditionally<
  AllOperations,
  { requestBody: Anything }
>
type HasJsonResponse = FilterConditionally<
  AllOperations,
  { responses: { 200: { content: { "application/json": Anything } } } }
>

export type PathParams<operation extends keyof HasPathParameters> =
  operations[operation]["parameters"]["path"]
export type QueryParams<operation extends keyof HasQueryParameters> =
  operations[operation]["parameters"]["query"]
export type RequestBody<operation extends keyof HasRequestBody> =
  operations[operation]["requestBody"]["content"]["application/json"]
export type JsonResponse<operation extends keyof HasJsonResponse> =
  operations[operation]["responses"][200]["content"]["application/json"]
