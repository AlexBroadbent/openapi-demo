import type { FastifyRequest } from "fastify"

import { NotFoundError } from "../../server/errors"
import { CityCreate } from "../../types/schemas"
import { JsonResponse, PathParams, RequestBody } from "../../types/types"
import { slugify } from "../../util/slugify"
import { createCity, getCity } from "./repository"
import { sendWebhook } from "../webhook/service"

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

  createCity: async (
    req: FastifyRequest<{
      Body: RequestBody<"createCity">
    }>,
  ): Promise<JsonResponse<"createCity">> => {
    const body: CityCreate = req.body

    const data = await createCity({ ...body, id: slugify(body.name) })

    await sendWebhook(data)

    return { data }
  },
}
