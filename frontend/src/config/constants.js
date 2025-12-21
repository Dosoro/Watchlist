// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";
export const API_TIMEOUT = 10000;

// Storage Keys
export const TOKEN_KEY = "token";
export const THEME_KEY = "theme";

// Routes
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  AUTHENTICATE: "/authenticate",
  SEARCH: "/search",
  WATCHLIST: "/watchlist",
};

// UI Constants
export const TYPING = {
  SPEED: 80,
  PAUSE_TIME: 1200,
};

export const SIZES = {
  LOGO_LARGE: "h-20 w-20",
  LOGO_MEDIUM: "h-16 w-16",
  ICON_LARGE: "h-8 w-8",
  ICON_MEDIUM: "h-6 w-6",
  ICON_SMALL: "h-5 w-5",
};

// Messages
export const MESSAGES = {
  LOGIN_ERROR: "Login failed. Please try again.",
  REGISTER_ERROR: "Registration failed. Please try again.",
  NETWORK_ERROR: "Network error. Please check your connection.",
  SOMETHING_WRONG: "Something went wrong. Please try again.",
};
