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

// Validation Rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 128,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

// Messages
export const MESSAGES = {
  // Auth errors
  LOGIN_ERROR: "Login failed. Please try again.",
  REGISTER_ERROR: "Registration failed. Please try again.",
  NETWORK_ERROR: "Network error. Please check your connection.",
  SOMETHING_WRONG: "Something went wrong. Please try again.",

  // Validation errors
  PASSWORD_MISMATCH: "Passwords do not match",
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`,
  PASSWORD_TOO_LONG: `Password cannot exceed ${VALIDATION.PASSWORD_MAX_LENGTH} characters`,
  INVALID_EMAIL: "Please enter a valid email address",

  // Specific auth errors (for backend mapping)
  EMAIL_EXISTS: "An account with this email already exists",
  INVALID_CREDENTIALS: "Invalid email or password",
  SERVER_ERROR: "Server error. Please try again later",
};

// Feature Cards (for HomePage)
export const FEATURE_CARDS = [
  {
    id: "discover",
    icon: "search",
    title: "Discover",
    description: "Search millions of movies and shows instantly",
  },
  {
    id: "organize",
    icon: "list",
    title: "Organize",
    description: "Create and manage your personal watchlist",
  },
  {
    id: "track",
    icon: "chart",
    title: "Track",
    description: "Rate, review, and track what you've watched",
  },
];

// Mock Daata for Development (Dashboard)
export const MOCK_USER = {
  email: "john@example.com",
  username: "john",
};

export const MOCK_STATS = {
  total: 12,
  watched: 7,
  unwatched: 5,
};

export const MOCK_RECENT_ITEMS = [
  {
    id: 1,
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    watched: true,
    rating: 9,
  },
  {
    id: 2,
    title: "The Dark Knight",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    watched: true,
    rating: 9,
  },
  {
    id: 3,
    title: "Interstellar",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    watched: false,
    rating: null,
  },
];
