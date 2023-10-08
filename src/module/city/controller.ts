import type { FastifyReply, FastifyRequest } from "fastify"

import { NotFoundError } from "../../server/errors"
import { CityCreate } from "../../types/schemas"
import { JsonResponse, PathParams, RequestBody } from "../../types/types"
import { slugify } from "../../util/slugify"
import { sendWebhook } from "../webhook/service"
import { createCity, getCity } from "./repository"

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
    rep: FastifyReply,
  ): Promise<JsonResponse<"createCity">> => {
    const body: CityCreate = req.body

    const data = await createCity({ ...body, id: slugify(body.name) })

    await sendWebhook(data)

    rep.header("Location", `/v1/city/${data.id}`)

    return { data }
  },
}
