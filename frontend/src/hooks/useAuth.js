import { useContext } from "react";
import { AuthContext } from "../context/auth.js";

/**
 * Hook to access authentication state and methods
 * @returns {Object} { user, token, isAuthenticated, register, login, logout }
 * @throws {Error} If used outside AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
