import type { FastifyReply, FastifyRequest } from "fastify"

import { NotFoundError } from "../../server/errors"
import type { CityCreate } from "../../types/schemas"
import type { JsonResponse, PathParams, RequestBody } from "../../types/types"
import { createCity, getAllCities, getCity } from "./service"

export const cityController = {
  getCities: async (): Promise<JsonResponse<"getCities">> =>
    await getAllCities(),

  getCity: async (
    req: FastifyRequest<{
      Params: PathParams<"getCity">
    }>,
  ): Promise<JsonResponse<"getCity">> => {
    const { id } = req.params

    const city = await getCity(id)

    if (!city) throw new NotFoundError("City not found")

    return city
  },

  createCity: async (
    req: FastifyRequest<{
      Body: RequestBody<"createCity">
    }>,
    rep: FastifyReply,
  ): Promise<JsonResponse<"createCity">> => {
    const input: CityCreate = req.body

    const city = await createCity(input)

    rep.header("Location", `/v1/city/${city.id}`)

    return city
  },
}
