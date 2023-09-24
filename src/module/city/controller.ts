import type { FastifyRequest } from "fastify"

import { NotFoundError } from "../../server/errors"
import { JsonResponse, PathParams } from "../../types/types"
import { getCity } from "./repository"

export const cityController = {
  getCity: async (
    req: FastifyRequest<{
      Params: PathParams<"getCity">
    }>,
  ): Promise<JsonResponse<"getCity">> => {
    const data = await getCity(req.params.id)

    if (!data) throw new NotFoundError("City not found")

    return { data }
  },
}
