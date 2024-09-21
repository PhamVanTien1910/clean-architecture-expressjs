import { BAD_REQUEST, FORBIDDEN, NOT_FOUND, UNAUTHORIZED } from 'http-status';

class ErrorResponse extends Error {
  constructor(message, status, err_code) {
    super(message);
    this.status = status;
    this.err_code = err_code;
  }
}

class BadRequestError extends ErrorResponse {
  constructor(message, status = BAD_REQUEST, err_code) {
    super(message, status, err_code);
  }
}

class Unauthorized extends ErrorResponse {
  constructor(message, status = UNAUTHORIZED, err_code) {
    super(message, status, err_code);
  }
}

class Forbidden extends ErrorResponse {
  constructor(message, status = FORBIDDEN, err_code) {
    super(message, status, err_code);
  }
}

class NotFoundError extends ErrorResponse {
  constructor(message, status = NOT_FOUND, err_code) {
    super(message, status, err_code);
  }
}

export { ErrorResponse, BadRequestError, Unauthorized, Forbidden, NotFoundError };