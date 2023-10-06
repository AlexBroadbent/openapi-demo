import type { FastifyInstance, LightMyRequestResponse } from "fastify"

import { getTestServer } from "./helpers"

describe("health check", () => {
  let server: FastifyInstance

  beforeAll(async () => {
    server = await getTestServer()
  })

  afterAll(async () => {
    await server.close()
  })

  describe("GET /v1/_health", () => {
    let response: LightMyRequestResponse

    beforeAll(async () => {
      response = await server.inject({
        method: "GET",
        url: "/v1/_health",
      })
    })

    it("should return 200 OK status code", () => {
      expect(response.statusCode).toStrictEqual(200)
    })

    it("should return JSON body with ok set to true", () => {
      expect(response.json().data).toMatchObject({ ok: true })
    })
  })
})
