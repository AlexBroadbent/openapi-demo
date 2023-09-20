import type { FastifyInstance, FastifyServerOptions } from "fastify"
import fastify from "fastify"

import { errorHandler } from "./error-handler"
import { routes } from "./routes"

export const getServer = async (options: FastifyServerOptions = {}): Promise<FastifyInstance> => {
  const server = fastify(options).setErrorHandler(errorHandler)

  process.on("uncaughtExceptionMonitor", (error, origin) => {
    server.log.fatal(error, origin)
  })

  await routes(server)

  return server
}
