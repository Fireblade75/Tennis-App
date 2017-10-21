
class ApiError extends Error {
    toJSON() { return { error: 'api_error', message: this.message } }
    status(number) {
        if(number) {
            this.statusNr = number;
        } else {
            return this.statusNr || 500;
        }
    }
}

/**
 * Converts a normal error to an ApiError
 * If the error is already an ApiError the input
 * will be returnd without modifications
 * @param {Error} err the error to transform
 * @returns {ApiError} the API error
 */
function toApiError(err) {
    if (err instanceof ApiError) {
        return err;
    }
    let apiErr = new ApiError();
    apiErr.message = err.message;
    apiErr.status(500);
    return apiErr;
}

class UnauthorizedError extends ApiError {
    toJSON() { return { error: 'unauthorized', message: this.message } }
    status() { return 401; }
}

class InvalidRequestError extends ApiError {
    toJSON() { return { error: 'invalid_request', message: this.message } }
    status() { return 400; }
}

class ResourceExistsError extends ApiError {
    toJSON() { return { error: 'resource_exists', message: this.message } }
    status() { return 409; }
}

module.exports = {
    ApiError,
    toApiError,
    UnauthorizedError,
    InvalidRequestError,
    ResourceExistsError
}