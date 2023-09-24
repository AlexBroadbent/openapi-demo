import type { FastifyInstance, LightMyRequestResponse } from "fastify"

import { getTestServer } from "./helpers"
import { describe } from "node:test"

describe("city", () => {
  let server: FastifyInstance

  beforeAll(async () => {
    server = await getTestServer({ injectApiKeyHeader: true })
  })

  afterAll(async () => {
    await server.close()
  })

  describe("GET /v1/city", () => {
    describe("when valid city is requested", () => {
      let response: LightMyRequestResponse

      beforeAll(async () => {
        response = await server.inject({
          method: "GET",
          url: "/v1/city/london",
        })
      })

      it("should return 200 OK status code", () => {
        expect(response.statusCode).toStrictEqual(200)
      })

      it("should return JSON body with ok set to true", () => {
        expect(response.json().data).toMatchObject({
          id: "london",
          name: "London",
          country: "United Kingdom",
        })
      })
    })

    describe("when invalid city is requested", () => {
      let response: LightMyRequestResponse

      beforeAll(async () => {
        response = await server.inject({
          method: "GET",
          url: "/v1/city/gotham",
        })
      })

      it("should return 200 OK status code", () => {
        expect(response.statusCode).toStrictEqual(404)
      })

      it("should return JSON body with ok set to true", () => {
        expect(response.json()).toMatchObject({
          status: 404,
          message: "City not found",
        })
      })
    })
  })
})
