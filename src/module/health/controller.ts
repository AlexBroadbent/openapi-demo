import type { FastifyRequest } from "fastify"

import { HealthCheckResult } from "~/src/types/schemas"
import { JsonResponse } from "~/src/types/types"

export const healthController = {
  async getHealthCheck(req: FastifyRequest): Promise<JsonResponse<"getHealthCheck">> {
    const data: HealthCheckResult = { ok: true }

    return { data }
  },
}
