import type { FastifyInstance, LightMyRequestResponse } from "fastify"

import { getTestServer } from "./helpers"

describe("route", () => {
  describe("GET /v1/route", () => {
    let server: FastifyInstance

    beforeAll(async () => {
      server = await getTestServer()
    })

    afterAll(async () => {
      await server.close()
    })

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

      it("should return 404 Not Found status code", () => {
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

  describe("POST /v1/route", () => {
    let server: FastifyInstance

    beforeAll(async () => {
      server = await getTestServer({ injectApiKey: "admin" })
    })

    afterAll(async () => {
      await server.close()
    })

    describe("when valid route is requested", () => {
      let response: LightMyRequestResponse

      beforeAll(async () => {
        response = await server.inject({
          method: "POST",
          url: "/v1/route",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            from: "manchester",
            to: "london",
            miles: 248,
          }),
        })
      })

      it("should return 200 OK status code", () => {
        expect(response.statusCode).toStrictEqual(200)
      })

      it("should return JSON body with route", () => {
        expect(response.json().data).toMatchObject({
          from: "manchester",
          to: "london",
          miles: 248,
        })
      })

      it("should return expected header", () => {
        expect(response.headers["location"]).toEqual("/v1/route?from=manchester&to=london")
      })
    })

    describe("when invalid route is posted in body", () => {
      let response: LightMyRequestResponse

      beforeAll(async () => {
        response = await server.inject({
          method: "POST",
          url: "/v1/route",
          body: {
            from: "foo",
          },
        })
      })

      it("should return 400 Bad Request status code", () => {
        expect(response.statusCode).toStrictEqual(400)
      })

      it("should return JSON body with error message", () => {
        expect(response.json()).toMatchObject({
          status: 400,
          message: "body must have required property 'to'",
        })
      })
    })
  })
})
