import type { FastifyInstance } from "fastify"
import openApiGlue from "fastify-openapi-glue"
import path from "path"

import { healthController } from "../module/health/controller"
import securityHandlers from "./security-handlers"

const specification = path.join(__dirname, "../config/openapi.bundle.json")

const service = {
  ...healthController,
}

export const routes = (fastify: FastifyInstance) =>
  fastify.register(openApiGlue, {
    specification,
    securityHandlers,
    prefix: "v1",
    service,
  })
