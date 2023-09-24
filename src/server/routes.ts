import type { FastifyInstance } from "fastify"
import openApiGlue from "fastify-openapi-glue"
import path from "path"

import { healthController } from "../module/health/controller"
import { cityController } from "../module/city/controller"
import { routeController } from "../module/route/controller"
import securityHandlers from "./security-handlers"

const specification = path.join(__dirname, "../config/openapi.bundle.yml")

const service = {
  ...healthController,
  ...cityController,
  ...routeController,
}

export const routes = (fastify: FastifyInstance) =>
  fastify.register(openApiGlue, {
    specification,
    securityHandlers,
    prefix: "v1",
    service,
  })
