import { ErrorModel } from "../types/schemas"

export class BadRequestError extends Error implements ErrorModel {
  constructor(message: string, readonly status: number = 400) {
    super(message)
  }
}

export class NotFoundError extends Error implements ErrorModel {
  constructor(message: string, readonly status: number = 404) {
    super(message)
  }
}

export class UnauthorizedError extends Error implements ErrorModel {
  constructor(message: string, readonly status: number = 401) {
    super(message)
  }
}

export class InternalServerError extends Error implements ErrorModel {
  constructor(message: string, readonly status: number = 500) {
    super(message)
  }
}
