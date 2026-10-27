import {
  AuthenticationRequired,
  DependencyUnavailable,
  InvalidState,
  OperationConflict,
  OperationDenied,
  RateLimited,
  ResourceNotFound,
  ValidationFailure,
} from "./PublicErrors.js";

export function toPublicError(error) {
  if (error instanceof ResourceNotFound) {
    return [404, { error: "not_found", message: "Resource not found" }];
  }

  if (error instanceof ValidationFailure) {
    return [400, {
      error: "validation_failed",
      message: "Request validation failed",
      fields: error.fields,
    }];
  }

  if (error instanceof AuthenticationRequired) {
    return [401, {
      error: "authentication_required",
      message: "Authentication required",
    }];
  }

  if (error instanceof OperationDenied) {
    return [403, {
      error: "operation_denied",
      message: "You do not have permission to perform this operation",
    }];
  }

  if (error instanceof RateLimited) {
    return [429, {
      error: "rate_limited",
      message: "Too many requests",
      retry_after_seconds: error.retryAfterSeconds,
    }];
  }

  if (error instanceof OperationConflict) {
    return [409, {
      error: "conflict",
      message: "The resource changed before this request could be applied",
    }];
  }

  if (error instanceof InvalidState) {
    return [409, {
      error: "invalid_state",
      message: "Operation is not valid in the current state",
    }];
  }

  if (error instanceof DependencyUnavailable) {
    return [503, {
      error: "dependency_unavailable",
      message: "A required service is temporarily unavailable",
    }];
  }

  return [500, {
    error: "internal_error",
    message: "An unexpected error occurred",
  }];
}
