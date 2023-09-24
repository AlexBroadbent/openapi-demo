import type { FastifyInstance, LightMyRequestResponse } from "fastify"

import { getTestServer } from "./helpers"
import { describe } from "node:test"

describe("route", () => {
  let server: FastifyInstance

  beforeAll(async () => {
    server = await getTestServer({ injectApiKeyHeader: true })
  })

  afterAll(async () => {
    await server.close()
  })

  describe("GET /v1/route", () => {
    describe("when valid route is requested", () => {
      let response: LightMyRequestResponse

      beforeAll(async () => {
        response = await server.inject({
          method: "GET",
          url: "/v1/route?from=london&to=paris",
        })
      })

      it("should return 200 OK status code", () => {
        expect(response.statusCode).toStrictEqual(200)
      })

      it("should return JSON body with route", () => {
        expect(response.json().data).toMatchObject({
          from: "london",
          to: "paris",
          miles: 288,
        })
      })
    })

    describe("when invalid route is requested", () => {
      let response: LightMyRequestResponse

      beforeAll(async () => {
        response = await server.inject({
          method: "GET",
          url: "/v1/route?from=gotham&to=zion",
        })
      })

      it("should return 200 OK status code", () => {
        expect(response.statusCode).toStrictEqual(404)
      })

      it("should return JSON body with error response", () => {
        expect(response.json()).toMatchObject({
          status: 404,
          message: "Route not found",
        })
      })
    })
  })
})
