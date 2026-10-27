export class ResourceNotFound extends Error {}
export class ValidationFailure extends Error {
  constructor(fields) {
    super("request validation failed");
    this.fields = fields;
  }
}
export class OperationConflict extends Error {}
export class OperationDenied extends Error {}
export class DependencyUnavailable extends Error {}
export class RateLimited extends Error {
  constructor(retryAfterSeconds) {
    super("rate limited");
    this.retryAfterSeconds = retryAfterSeconds;
  }
}
export class InvalidState extends Error {}
export class AuthenticationRequired extends Error {}
