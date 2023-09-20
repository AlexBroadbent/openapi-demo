/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
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
    HealthCheckResult: external["schemas/HealthCheckResult.yml"];
  };
  responses: {
    /** @description Unauthorized Error */
    UnauthorizedError: {
      content: {
        "application/json": {
          /** @description HTTP response code */
          status: number;
          /** @description Message which describes the error */
          message: string;
        };
      };
    };
  };
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export interface external {
  "schemas/HealthCheckResult.yml": {
    ok: boolean;
  };
}

export interface operations {

  /**
   * Get Health Check Status
   * @description Returns the health check for the service
   */
  getHealthCheck: {
    responses: {
      /** @description Returns health check result */
      200: {
        content: {
          "application/json": {
            data: components["schemas"]["HealthCheckResult"];
          };
        };
      };
      401: components["responses"]["UnauthorizedError"];
    };
  };
}
