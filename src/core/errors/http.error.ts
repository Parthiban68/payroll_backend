import { appError } from "./app.error";

export class BadRequestError extends appError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

export class UnauthorizedError extends appError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class NotFoundError extends appError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

