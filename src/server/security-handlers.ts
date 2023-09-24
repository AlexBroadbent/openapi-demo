import type { FastifyReply, FastifyRequest, RequestParamsDefault } from "fastify"
import { BadRequestError, UnauthorizedError } from "./errors"

export type APIKey = { name: string; token: string; permissions: string[] }

console.log(JSON.parse(process.env.API_PERMISSIONS as string))

const keys: APIKey[] = [
  {
    name: "Test Token",
    token: process.env.API_KEY as string,
    permissions: JSON.parse(process.env.API_PERMISSIONS as string),
  },
]

const api_key = (request: FastifyRequest, reply: FastifyReply, params: RequestParamsDefault) => {
  if (!Array.isArray(params) || !params.every((param: unknown) => typeof param === "string"))
    throw new UnauthorizedError("Invalid route permissions")

  const apiKey = request.headers["x-api-key"]
  if (!apiKey) throw new BadRequestError("API key not provided")
  if (Array.isArray(apiKey)) throw new BadRequestError("API key not a valid string")

  const validKey = keys.find((key) => key.token === apiKey)
  if (!validKey) throw new UnauthorizedError("Invalid API key")

  const permissions = validKey.permissions
  if (!params.every((param: string) => permissions.includes(param)))
    throw new UnauthorizedError("Insufficient permissions")
}

export default { api_key }
