import type { FastifyReply, FastifyRequest } from "fastify"

import { NotFoundError } from "../../server/errors"
import { QueryFrom, QueryTo } from "../../types/parameters"
import { Route } from "../../types/schemas"
import { JsonResponse, QueryParams, RequestBody } from "../../types/types"
import { createRoute, getRoute } from "./repository"

export const routeController = {
  getRoute: async (
    req: FastifyRequest<{
      Querystring: QueryParams<"getRoute">
    }>,
  ): Promise<JsonResponse<"getRoute">> => {
    const { from, to }: { from: QueryFrom; to: QueryTo } = req.query

    const data = await getRoute(from, to)

    if (!data) throw new NotFoundError("Route not found")

    return { data }
  },

  createRoute: async (
    req: FastifyRequest<{
      Body: RequestBody<"createRoute">
    }>,
    rep: FastifyReply,
  ): Promise<JsonResponse<"createRoute">> => {
    const route: Route = req.body

    const data = await createRoute(route)

    rep.header("Location", `/v1/route?from=${data.from}&to=${data.to}`)

    return { data }
  },
}
