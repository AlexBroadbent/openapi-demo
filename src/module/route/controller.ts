import type { FastifyRequest } from "fastify"

import { NotFoundError } from "../../server/errors"
import { Route } from "../../types/schemas"
import { JsonResponse, RequestBody, QueryParams } from "../../types/types"
import { createRoute, getRoute } from "./repository"

export const routeController = {
  getRoute: async (
    req: FastifyRequest<{
      Querystring: QueryParams<"getRoute">
    }>,
  ): Promise<JsonResponse<"getRoute">> => {
    const { from, to } = req.query

    const data = await getRoute(from, to)

    if (!data) throw new NotFoundError("Route not found")

    return { data }
  },

  createRoute: async (
    req: FastifyRequest<{
      Body: RequestBody<"createRoute">
    }>,
  ): Promise<JsonResponse<"createRoute">> => {
    const route: Route = req.body

    const data = await createRoute(route)

    if (!data) throw new NotFoundError("Route not found")

    return { data }
  },
}
