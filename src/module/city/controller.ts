import type { FastifyReply, FastifyRequest } from "fastify"

import { NotFoundError } from "../../server/errors"
import type { CityCreate } from "../../types/schemas"
import type { JsonResponse, PathParams, RequestBody } from "../../types/types"
import { createCity, getAllCities, getCity } from "./service"

export const cityController = {
  getCities: async (): Promise<JsonResponse<"getCities">> => {
    const data = await getAllCities()

    return { data }
  },

  getCity: async (
    req: FastifyRequest<{
      Params: PathParams<"getCity">
    }>,
  ): Promise<JsonResponse<"getCity">> => {
    const { id } = req.params

    const data = await getCity(id)

    if (!data) throw new NotFoundError("City not found")

    return { data }
  },

  createCity: async (
    req: FastifyRequest<{
      Body: RequestBody<"createCity">
    }>,
    rep: FastifyReply,
  ): Promise<JsonResponse<"createCity">> => {
    const body: CityCreate = req.body

    const data = await createCity(body)

    rep.header("Location", `/v1/city/${data.id}`)

    return { data }
  },
}
