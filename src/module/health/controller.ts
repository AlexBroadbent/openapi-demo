import { HealthCheck } from "../../types/schemas"
import { JsonResponse } from "../../types/types"

export const healthController = {
  async getHealthCheck(): Promise<JsonResponse<"getHealthCheck">> {
    const data: HealthCheck = { ok: true }

    return { data }
  },
}
