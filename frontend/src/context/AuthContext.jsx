import { createContext, useState, useMemo } from "react";
import apiClient from "../api/apiClient.js";

const AuthContext = createContext();

const initializeToken = () => {
  return localStorage.getItem("token");
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
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  const value = useMemo(
    () => ({
      user,
      token,
      register,
      login,
      logout,
      isAuthenticated: !!token,
    }),
    [user, token]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
