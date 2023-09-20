import type { FastifyRequest, RequestParamsDefault } from "fastify"
import { BadRequestError, InternalServerError, UnauthorizedError } from "./errors"

export type APIKey = { name: string; token: string; permissions: string[] }

const keys: APIKey[] = [
  {
    name: "Test Token",
    token: "test",
    permissions: ["foo:create"],
  },
]

export const api_key = (request: FastifyRequest, params: RequestParamsDefault) => {
  if (!Array.isArray(params) || !params.every((param: unknown) => typeof param === "string"))
    throw new InternalServerError("Invalid route permissions")

  const apiKey = request.headers["x-api-key"]
  if (!apiKey) throw new BadRequestError("API key not provided")
  if (Array.isArray(apiKey)) throw new BadRequestError("API key not a valid string")

  const validKey = keys.find((key) => key.token === apiKey)
  if (!validKey) throw new UnauthorizedError("Invalid API key")

  const permissions = validKey.permissions
  if (!params.every((param: string) => param in permissions)) throw new UnauthorizedError("Insufficient permissions")
}
