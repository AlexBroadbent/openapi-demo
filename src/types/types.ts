import { operations } from "./generated/openapi-schema"
import { FilterConditionally } from "./utility"

type AnyObject = Record<string, unknown>

type AllOperations = { [K in keyof operations]: operations[K] }

type HasPathParameters = FilterConditionally<
  AllOperations,
  { parameters: { path?: AnyObject } }
>
type HasQueryParameters = FilterConditionally<
  AllOperations,
  { parameters: { query?: AnyObject } }
>
type HasRequestBody = FilterConditionally<
  AllOperations,
  { requestBody: AnyObject }
>
type HasJsonResponse = FilterConditionally<
  AllOperations,
  { responses: { 200: { content: { "application/json": AnyObject } } } }
>

export type PathParams<operation extends keyof HasPathParameters> =
  operations[operation]["parameters"]["path"]
export type QueryParams<operation extends keyof HasQueryParameters> =
  operations[operation]["parameters"]["query"]
export type RequestBody<operation extends keyof HasRequestBody> =
  operations[operation]["requestBody"]["content"]["application/json"]
export type JsonResponse<operation extends keyof HasJsonResponse> =
  operations[operation]["responses"][200]["content"]["application/json"]
