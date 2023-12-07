import type { FastifyReply, FastifyRequest } from "fastify"

import { NotFoundError } from "../../server/errors"
import type { QueryFrom, QueryTo } from "../../types/parameters"
import type { Route } from "../../types/schemas"
import type { JsonResponse, QueryParams, RequestBody } from "../../types/types"
import { createRoute, getRoute } from "./repository"

export const routeController = {
  getRoute: async (
    req: FastifyRequest<{
      Querystring: QueryParams<"getRoute">
    }>,
  ): Promise<JsonResponse<"getRoute">> => {
    const { from, to }: { from: QueryFrom; to: QueryTo } = req.query

    const route = await getRoute(from, to)

    if (!route) throw new NotFoundError("Route not found")

    return route
  },

  createRoute: async (
    req: FastifyRequest<{
      Body: RequestBody<"createRoute">
    }>,
    rep: FastifyReply,
  ): Promise<JsonResponse<"createRoute">> => {
    const input: Route = req.body

    const route = await createRoute(input)

    rep.header("Location", `/v1/route?from=${route.from}&to=${route.to}`)

    return route
  },
}
