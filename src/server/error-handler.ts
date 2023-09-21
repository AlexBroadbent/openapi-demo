import type { FastifyError, FastifyReply, FastifyRequest } from "fastify"

import { BadRequestError, InternalServerError, UnauthorizedError } from "./errors"

export const errorHandler = async (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  console.error(error)
  request.log.error(error)

  if (error instanceof BadRequestError)
    return reply.status(400).send({
      status: 400,
      message: error.message,
    })
  if (error instanceof UnauthorizedError)
    return reply.status(401).send({
      status: 401,
      message: error.message,
    })
  if (error instanceof InternalServerError)
    return reply.status(500).send({
      status: 500,
      message: error.message,
    })

  return reply.status(error.statusCode || 500).send({
    status: error.statusCode || 500,
    message: error instanceof InternalServerError ? error.message : "Internal Server Error",
  })
}
