import User from "../models/User.js";
import jwt from "jsonwebtoken";
import {
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "../config/constants.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { logger } from "../utils/logger.js";

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(HTTP_STATUS.CONFLICT)
        .json(sendError(HTTP_STATUS.CONFLICT, ERROR_MESSAGES.EMAIL_IN_USE));
    }

    // Create user
    const user = await User.create({ email, password });

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    logger.info("User registered", { userId: user._id, email });

    res.status(HTTP_STATUS.CREATED).json({
      ...sendSuccess(HTTP_STATUS.CREATED, SUCCESS_MESSAGES.USER_REGISTERED),
      data: { token, user: { id: user._id, email: user.email } },
    });
  } catch (error) {
    logger.error("Registration error", error.message);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json(
          sendError(
            HTTP_STATUS.UNAUTHORIZED,
            ERROR_MESSAGES.INVALID_CREDENTIALS
          )
        );
    }

    // Compare password
    const isPasswordCorrect = await user.comparePasswords(password);
    if (!isPasswordCorrect) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json(
          sendError(
            HTTP_STATUS.UNAUTHORIZED,
            ERROR_MESSAGES.INVALID_CREDENTIALS
          )
        );
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    logger.info("User login", { userId: user._id, email });

    res.status(HTTP_STATUS.OK).json({
      ...sendSuccess(HTTP_STATUS.OK, SUCCESS_MESSAGES.LOGIN_SUCCESSFUL),
      data: { token, user: { id: user._id, email: user.email } },
    });
  } catch (error) {
    logger.error("Login error", error.message);
    next(error);
  }
};
