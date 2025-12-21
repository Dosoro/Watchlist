import { useState, useMemo } from "react";
import { AuthContext } from "./auth.js";
import apiClient from "../api/apiClient.js";
import { TOKEN_KEY } from "../config/constants.js";

const initializeToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(initializeToken);

  const register = async (email, password, confirmPassword) => {
    try {
      const response = await apiClient.post("/auth/register", {
        email,
        password,
        confirmPassword,
      });

      const { token: newToken, user: newUser } = response.data.data;
      setToken(newToken);
      setUser(newUser);
      localStorage.setItem(TOKEN_KEY, newToken);

      return { success: true };
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Registration failed";
      return { success: false, error: errorMsg };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });

      const { token: newToken, user: newUser } = response.data.data;
      setToken(newToken);
      setUser(newUser);
      localStorage.setItem(TOKEN_KEY, newToken);

      return { success: true };
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login failed";
      return { success: false, error: errorMsg };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!token,
      register,
      login,
      logout,
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
