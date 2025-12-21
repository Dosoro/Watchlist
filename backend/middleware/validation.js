import {
  HTTP_STATUS,
  VALIDATION,
  ERROR_MESSAGES,
} from "../config/constants.js";

/**
 * Validate register request body
 */
export const validateRegister = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: "error",
      message: ERROR_MESSAGES.MISSING_FIELDS,
    });
  }

  if (!VALIDATION.EMAIL_REGEX.test(email)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: "error",
      message: "Invalid email format",
    });
  }

  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: "error",
      message: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`,
    });
  }

  if (password !== confirmPassword) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: "error",
      message: ERROR_MESSAGES.PASSWORD_MISMATCH,
    });
  }

  next();
};

/**
 * Validate login request body
 */
export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: "error",
      message: ERROR_MESSAGES.MISSING_FIELDS,
    });
  }

  if (!VALIDATION.EMAIL_REGEX.test(email)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: "error",
      message: "Invalid email format",
    });
  }

  next();
};
