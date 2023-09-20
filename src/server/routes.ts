import type { FastifyInstance } from "fastify"
import openApiGlue from "fastify-openapi-glue"
import * as path from "path"

import * as securityHandlers from "./security-handlers"

const specification = path.join(__dirname, "../config/openapi.bundle.json")

export const routes = (fastify: FastifyInstance) =>
  fastify.register(openApiGlue, {
    specification,
    securityHandlers,
    prefix: "v1",
  })
