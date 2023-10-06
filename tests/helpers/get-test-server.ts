import type { FastifyInstance, FastifyRequest } from "fastify"

import { getServer } from "../../src/server"

export type ApiKeyOption = "admin" | "test"

export type GetTestServerOptions = {
  injectApiKey?: ApiKeyOption
}

export const getTestServer = async ({ injectApiKey = "test" }: GetTestServerOptions = {}): Promise<FastifyInstance> => {
  const server = await getServer()

  server.addHook("onRequest", async (request: FastifyRequest) => {
    request.headers = {
      ...request.headers,
      "x-api-key": injectApiKey,
    }
  })

  return server
}
