import { HealthCheckResult } from "../../types/schemas"
import { JsonResponse } from "../../types/types"

export const healthController = {
  async getHealthCheck(): Promise<JsonResponse<"getHealthCheck">> {
    const data: HealthCheckResult = { ok: true }

    return { data }
  },
}
