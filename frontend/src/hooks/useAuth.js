import { useContext } from "react";
import AuthConext from "../context/AuthContext.jsx";

export const useAuth = () => {
  const context = useContext(AuthConext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
