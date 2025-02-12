/**
 * Standard HTTP response messages and codes for consistent API responses
 */
const httpResponses = {
    // Success responses
    OK: {
        code: 200,
        message: 'Request successful'
    },
    CREATED: {
        code: 201,
        message: 'Resource created successfully'
    },
    NO_CONTENT: {
        code: 204,
        message: 'Request successful, no content to return'
    },

    // Client error responses
    BAD_REQUEST: {
        code: 400,
        message: 'Invalid request parameters'
    },
    UNAUTHORIZED: {
        code: 401,
        message: 'Authentication required'
    },
    FORBIDDEN: {
        code: 403,
        message: 'Access denied'
    },
    NOT_FOUND: {
        code: 404,
        message: 'Resource not found'
    },
    CONFLICT: {
        code: 409,
        message: 'Resource already exists'
    },
    UNPROCESSABLE_ENTITY: {
        code: 422,
        message: 'Unable to process request'
    },

    // Server error responses
    INTERNAL_SERVER_ERROR: {
        code: 500,
        message: 'Internal server error'
    },
    SERVICE_UNAVAILABLE: {
        code: 503,
        message: 'Service temporarily unavailable'
    }
};

module.exports = httpResponses;
