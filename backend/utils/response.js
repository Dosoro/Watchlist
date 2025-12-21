/**
 * Standardized success response
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Success message
 * @param {*} data - Response data
 */
export const sendSuccess = (statusCode, message, data = null) => {
  return {
    status: "success",
    statusCode,
    message,
    ...(data && { data }),
  };
};

/**
 * Standardized error response
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 */
export const sendError = (statusCode, message) => {
  return {
    status: "error",
    statusCode,
    message,
  };
};
