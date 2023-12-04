import cors from "@fastify/cors"
import fastify, { FastifyInstance, FastifyReply, FastifyRequest, FastifyServerOptions } from "fastify"

import { errorHandler } from "./error-handler"
import { registerAPIRoutes } from "./routes"

const logRequests = (server: FastifyInstance) => {
  server.addHook("preHandler", (req: FastifyRequest, rep: FastifyReply, done) => {
    if (req.body) req.log.info({ body: req.body }, "request body")
    done()
  })
}

const logResponses = (server: FastifyInstance) => {
  server.addHook("onSend", (req: FastifyRequest, rep: FastifyReply, payload: string, done) => {
    const contentType = rep.getHeader("Content-Type")
    if (
      payload &&
      (typeof contentType === "string" || Array.isArray(contentType)) &&
      contentType.includes("application/json")
    ) {
      req.log.info({ payload: JSON.parse(payload) }, "response body")
    }

    done()
  })
}

const logFatalError = (server: FastifyInstance) => {
  process.on("uncaughtExceptionMonitor", (error, origin) => {
    server.log.fatal(error, origin)
  })
}

export const getServer = async (options: FastifyServerOptions = {}): Promise<FastifyInstance> => {
  const server = fastify(options).setErrorHandler(errorHandler)

  server.register(cors, {
    origin: "*",
  })

  logRequests(server)
  logResponses(server)
  logFatalError(server)

  await registerAPIRoutes(server)

  return server
}
