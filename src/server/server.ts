import fastify, { FastifyInstance, FastifyServerOptions } from "fastify"

import { errorHandler } from "./error-handler"
import { registerAPIRoutes } from "./routes"

export const getServer = async (options: FastifyServerOptions = {}): Promise<FastifyInstance> => {
  const server = fastify(options).setErrorHandler(errorHandler)

  process.on("uncaughtExceptionMonitor", (error, origin) => {
    server.log.fatal(error, origin)
  })

  await registerAPIRoutes(server)

  return server
}
