# OpenAPI Demo

An example project to demonstrate how the OpenAPI schema can be used as the source of truth for a server.

The OpenAPI schema defines all the endpoints of the server.

Redocly bundles all the OpenAPI files in the `config` folder into a single spec.

[openapi-typescript](https://www.npmjs.com/package/openapi-typescript) generates type definitions, of all models in the endpoints, from the bundled OpenAPI spec.

[fastify-openapi-glue](https://www.npmjs.com/package/fastify-openapi-glue) plugs in the endpoints and models to fastify and handles all the routing and authentication.

## Prerequistes

- node 18
- pnpm

## Commands

| Command      | Purpose                                                                          |
| ------------ | -------------------------------------------------------------------------------- |
| dev          | Run the server locally                                                           |
| openapi      | Bundle the OpenAPI internal and public schemas, and generate type defitions      |
| verify       | Generates the OpenAPI schemas, type definitions and builds and lints the project |
| docs:preview | View the public API documentation                                                |
| test         | Runs all the unit tests                                                          |

Note: after making a change to `openapi.yml`, run `pnpm openapi` to update all the models and server code.

## Structure

| Folder | Usage                                                                            |
| ------ | -------------------------------------------------------------------------------- |
| config | Used to store the OpenAPI schema, separated into folders for each component type |
| module | Database repository, service and controller code for each module in the service  |
| server | Functions used to start and run the server                                       |
| types  | Type declarations within the modules                                             |
| util   | Helper functions                                                                 |

## Notes

- Some dependancies are using older versions to use CommonJS. The same principles will work in ESM.
- The API key authentication is not secure or well crafted, it has been included to show the usage of hooking in the security methods of `fastify-openapi-glue`.
