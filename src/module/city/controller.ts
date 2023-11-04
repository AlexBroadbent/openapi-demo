import type { FastifyReply, FastifyRequest } from "fastify"

import { NotFoundError } from "../../server/errors"
import { QueryLimit, QuerySkip } from "../../types/parameters"
import { CityCreate } from "../../types/schemas"
import { JsonResponse, PathParams, QueryParams, RequestBody } from "../../types/types"
import { sendWebhook } from "../webhook/service"
import { createCity, getAllCities, getCity } from "./service"

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

  getCities: async (
    req: FastifyRequest<{
      Querystring: QueryParams<"getCities">
    }>,
  ): Promise<JsonResponse<"getCities">> => {
    const limit: QueryLimit = req.query?.limit
    const skip: QuerySkip = req.query?.skip

    return getAllCities(limit, skip)
  },

  createCity: async (
    req: FastifyRequest<{
      Body: RequestBody<"createCity">
    }>,
    rep: FastifyReply,
  ): Promise<JsonResponse<"createCity">> => {
    const body: CityCreate = req.body

    const data = await createCity(body)

    await sendWebhook(data)

    rep.header("Location", `/v1/city/${data.id}`)

    return { data }
  },
}
