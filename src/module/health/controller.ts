import type { FastifyRequest } from "fastify"

import { JsonResponse } from "../../types/types"
import { HealthCheckResult } from "../../types/schemas"

export const healthController = {
  async getHealthCheck(req: FastifyRequest<{}>): Promise<JsonResponse<"getHealthCheck">> {
    const data: HealthCheckResult = { ok: true }

    return { data }
  },
}
