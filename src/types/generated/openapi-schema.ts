/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/city/{id}": {
    /**
     * Get City
     * @description Get a city given an ID
     */
    get: operations["getCity"];
  };
  "/route": {
    /**
     * Get a Route
     * @description Get a route between two cities
     */
    get: operations["getRoute"];
  };
  "/_health": {
    /**
     * Get Health Check Status
     * @description Returns the health check for the service
     */
    get: operations["getHealthCheck"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /** Health Check Result */
    HealthCheckResult: {
      ok: boolean;
    };
    /** Error Model */
    ErrorModel: {
      status: number;
      message: string;
    };
    /** City */
    City: {
      /** @description City Identifier */
      id: string;
      /** @description Name of the city */
      name: string;
      /** @description The country which the city is in */
      country: string;
    };
    /**
     * Route
     * @description A route between two cities (`from` and `to`), with a distance of miles
     */
    Route: {
      /** @description A city identifier */
      from: string;
      /** @description A city identifier */
      to: string;
      /**
       * Format: int32
       * @description The distance in miles between the two cities
       */
      miles: number;
    };
  };
  responses: {
    GetCity: components["responses"]["City"];
    GetRoute: components["responses"]["Route"];
    GetHealthCheck: components["responses"]["HealthCheck"];
    ErrorResponse: components["responses"]["ErrorModel"];
    /** @description An error returned when the requested resource cannot be found */
    NotFoundError: {
      content: {
        "application/json": {
          /** Not Found Error */
          data: {
            /** @enum {integer} */
            status: 404;
            /** @enum {string} */
            message: "Not Found";
          };
        };
      };
    };
    /** @description Error when there is a problem while fulfilling the request */
    ErrorModel: {
      content: {
        "application/json": {
          data: components["schemas"]["ErrorModel"];
        };
      };
    };
    /** @description Returns city result */
    City: {
      content: {
        "application/json": {
          data: components["schemas"]["City"];
        };
      };
    };
    /** @description Returns route result */
    Route: {
      content: {
        "application/json": {
          data: components["schemas"]["Route"];
        };
      };
    };
    /** @description Returns health check result */
    HealthCheck: {
      content: {
        "application/json": {
          data: components["schemas"]["HealthCheckResult"];
        };
      };
    };
  };
  parameters: {
    /**
     * @description City Identifier
     * @example paris
     */
    PathCityID: string;
    /**
     * @description City Identifier
     * @example london
     */
    QueryFrom: string;
    /**
     * @description City Identifier
     * @example milan
     */
    QueryTo: string;
  };
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  /**
   * Get City
   * @description Get a city given an ID
   */
  getCity: {
    parameters: {
      path: {
        id: components["parameters"]["PathCityID"];
      };
    };
    responses: {
      200: components["responses"]["City"];
      404: components["responses"]["NotFoundError"];
      default: components["responses"]["ErrorModel"];
    };
  };
  /**
   * Get a Route
   * @description Get a route between two cities
   */
  getRoute: {
    parameters: {
      query: {
        to: components["parameters"]["QueryFrom"];
        from: components["parameters"]["QueryTo"];
      };
    };
    responses: {
      200: components["responses"]["Route"];
      404: components["responses"]["NotFoundError"];
      default: components["responses"]["ErrorModel"];
    };
  };
  /**
   * Get Health Check Status
   * @description Returns the health check for the service
   */
  getHealthCheck: {
    responses: {
      200: components["responses"]["HealthCheck"];
      /** Unauthorized */
      401: components["responses"]["ErrorModel"];
      default: components["responses"]["ErrorModel"];
    };
  };
}
