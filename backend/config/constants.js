// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

// JWT Configuration
export const JWT_CONFIG = {
  ACCESS_TOKEN_EXPIRY: "15m",
  REFRESH_TOKEN_EXPIRY: "7d",
};

// Validation Rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

// Error Messages
export const ERROR_MESSAGES = {
  MISSING_FIELDS: "All fields are required",
  PASSWORD_MISMATCH: "Passwords do not match",
  EMAIL_IN_USE: "Email already in use",
  INVALID_CREDENTIALS: "Invalid credentials",
  USER_NOT_FOUND: "User not found",
  NO_TOKEN: "No token provided",
  INVALID_TOKEN: "Invalid or expired token",
  SERVER_ERROR: "Server error occurred",
  WATCHLIST_ITEM_NOT_FOUND: "Watchlist item not found",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  USER_REGISTERED: "User registered successfully",
  LOGIN_SUCCESSFUL: "Login successful",
  LOGOUT_SUCCESSFUL: "Logout successful",
  ITEM_ADDED: "Item added to watchlist",
  ITEM_UPDATED: "Item updated successfully",
  ITEM_DELETED: "Item deleted successfully",
};

// Regex Patterns
export const PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  MONGODB_ID: /^[0-9a-fA-F]{24}$/,
};
