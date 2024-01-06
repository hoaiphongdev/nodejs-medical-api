'use strict'

const { ResonPhrases, StatusCode } = require('../utils/httpStatusCode');

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(message = ResonPhrases.CONFLICT, statusCode = StatusCode.FORBIDDEN) {
    super(message, statusCode)
  }
}

class BadRequestError extends ErrorResponse {
  constructor(message = ResonPhrases.BAD_REQUEST, statusCode = StatusCode.BAD_REQUEST) {
    super(message, statusCode)
  }
}

class AuthFailtureError extends ErrorResponse {
  constructor(message = ResonPhrases.UNAUTHORIZED, statusCode = StatusCode.UNAUTHORIZED) {
    super(message, statusCode)
  }
}

module.exports = {
  ErrorResponse,
  ConflictRequestError,
  BadRequestError,
  AuthFailtureError
}