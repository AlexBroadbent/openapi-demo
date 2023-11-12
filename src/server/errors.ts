import { ErrorModel } from "../types/schemas"

export class BadRequestError extends Error implements ErrorModel {
  readonly status = 400
  constructor(message: string) {
    super(message)
  }
}

export class NotFoundError extends Error implements ErrorModel {
  readonly status = 404
  constructor(message: string) {
    super(message)
  }
}

export class UnauthorizedError extends Error implements ErrorModel {
  readonly status = 401
  constructor(message: string) {
    super(message)
  }
}

export class InternalServerError extends Error implements ErrorModel {
  readonly status = 500
  constructor(message: string) {
    super(message)
  }
}
