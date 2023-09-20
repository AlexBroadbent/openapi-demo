export class BadRequestError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export class InternalServerError extends Error {
  constructor(message: string) {
    super(message)
  }
}
