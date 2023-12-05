import type { FastifyInstance } from "fastify"
import openApiGlue from "fastify-openapi-glue"
import path from "path"

import { cityController } from "../module/city/controller"
import { routeController } from "../module/route/controller"
import securityHandlers from "./security-handlers"

const specification = path.join(__dirname, "../config/openapi-internal.bundle.json")

const service = {
  ...cityController,
  ...routeController,
}

export const registerAPIRoutes = (fastify: FastifyInstance) =>
  fastify.register(openApiGlue, {
    specification,
    securityHandlers,
    prefix: "v1",
    service,
  })
