import type { FastifyInstance, FastifyRequest } from "fastify"

import { getServer } from "../../src/server"

export type GetTestServerOptions = {
  injectApiKeyHeader?: boolean
}

export const getTestServer = async ({
  injectApiKeyHeader = false,
}: GetTestServerOptions = {}): Promise<FastifyInstance> => {
  const server = await getServer()

  server.addHook("onRequest", async (request: FastifyRequest) => {
    if (injectApiKeyHeader) {
      request.headers = {
        "x-api-key": "test",
        ...request.headers,
      }
    }
  })

  return server
}
