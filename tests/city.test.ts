import type { FastifyInstance, LightMyRequestResponse } from "fastify"

import { getTestServer } from "./helpers"

describe("city", () => {
  let server: FastifyInstance

  beforeAll(async () => {
    server = await getTestServer()
  })

  afterAll(async () => {
    await server.close()
  })

  describe("GET /v1/city", () => {
    let response: LightMyRequestResponse

    beforeAll(async () => {
      response = await server.inject({
        method: "GET",
        url: "/v1/city",
      })
    })

    it("should return 200 OK status code", () => {
      expect(response.statusCode).toStrictEqual(200)
    })

    it("should return JSON body with 6 cities from repository", () => {
      expect(response.json().data).toHaveLength(6)
      expect(response.json().data).toMatchObject(
        expect.arrayContaining([
          expect.objectContaining({ id: "barcelona" }),
          expect.objectContaining({ id: "geneva" }),
          expect.objectContaining({ id: "london" }),
          expect.objectContaining({ id: "milan" }),
          expect.objectContaining({ id: "paris" }),
          expect.objectContaining({ id: "thurles" }),
        ]),
      )
    })
  })

  describe("GET /v1/city/{id}", () => {
    let server: FastifyInstance

    beforeAll(async () => {
      server = await getTestServer()
    })

    afterAll(async () => {
      await server.close()
    })

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

      it("should return JSON body with city", () => {
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

      it("should return JSON body with error message", () => {
        expect(response.json()).toMatchObject({
          status: 404,
          message: "City not found",
        })
      })
    })
  })

  describe("POST /v1/city", () => {
    let server: FastifyInstance

    beforeAll(async () => {
      server = await getTestServer({ injectApiKey: "admin" })
    })

    afterAll(async () => {
      await server.close()
    })

    describe("when valid city is posted in body", () => {
      let response: LightMyRequestResponse

      beforeAll(async () => {
        response = await server.inject({
          method: "POST",
          url: "/v1/city",
          body: {
            name: "Reykjavík",
            country: "Ísland",
          },
        })
      })

      it("should return 200 OK status code", () => {
        expect(response.statusCode).toStrictEqual(200)
      })

      it("should return JSON body with city", () => {
        expect(response.json().data).toMatchObject({
          id: "reykjavik",
          name: "Reykjavík",
          country: "Ísland",
        })
      })

      it("should return Location header with new identifier", () => {
        expect(response.headers["location"]).toEqual("/v1/city/reykjavik")
      })
    })

    describe("when invalid city is posted in body", () => {
      let response: LightMyRequestResponse

      beforeAll(async () => {
        response = await server.inject({
          method: "POST",
          url: "/v1/city",
          body: {
            name: "foo",
          },
        })
      })

      it("should return 400 Bad Request status code", () => {
        expect(response.statusCode).toStrictEqual(400)
      })

      it("should return JSON body with error message", () => {
        expect(response.json()).toMatchObject({
          status: 400,
          message: "body must have required property 'country'",
        })
      })
    })
  })
})
