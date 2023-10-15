import type { FastifyError, FastifyReply, FastifyRequest } from "fastify"

import { ErrorModel } from "../types/schemas"

const isErrorModel = (error: FastifyError | ErrorModel): error is ErrorModel =>
  (error as ErrorModel).status !== undefined

export const errorHandler = async (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  request.log.error(error)

  if (isErrorModel(error))
    return reply.status(error.status).send({
      status: error.status,
      message: error.message,
    })

  return reply.status(error.statusCode || 500).send({
    status: error.statusCode || 500,
    message: error.message ?? "Internal Server Error",
  })
}
