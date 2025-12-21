import { HTTP_STATUS, ERROR_MESSAGES } from "../config/constants.js";
import { sendError } from "../utils/response.js";
import { logger } from "../utils/logger.js";

/**
 * Centralized error handling middleware
 */
export const errorHandler = (err, req, res, next) => {
  logger.error("Error caught:", err.message);

  // Default to 500 if no status set
  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || ERROR_MESSAGES.SERVER_ERROR;

  // Send standardized error response
  res.status(statusCode).json(sendError(statusCode, message));
};

/**
 * 404 Not Found middleware
 */
export const notFoundHandler = (req, res) => {
  res
    .status(HTTP_STATUS.NOT_FOUND)
    .json(sendError(HTTP_STATUS.NOT_FOUND, "Route not found"));
};
