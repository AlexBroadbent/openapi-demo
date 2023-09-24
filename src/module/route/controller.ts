import type { FastifyRequest } from "fastify"

import { NotFoundError } from "../../server/errors"
import { JsonResponse, QueryParams } from "../../types/types"
import { getRoute } from "./repository"

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
}
