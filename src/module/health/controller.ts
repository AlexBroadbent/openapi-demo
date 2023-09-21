import type { FastifyRequest } from "fastify"

import { HealthCheckResult } from "../../types/schemas"
import { JsonResponse } from "../../types/types"

export const healthController = {
  async getHealthCheck(req: FastifyRequest): Promise<JsonResponse<"getHealthCheck">> {
    const data: HealthCheckResult = { ok: true }

    return { data }
  },
}
