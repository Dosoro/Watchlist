import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useState, useEffect } from "react";

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {!isAuthenticated && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-8 max-w-5xl w-full">
            <h2 className="text-6xl font-bold text-center text-primary">
              Your watching, <span className="text-accent">organized</span>
            </h2>

            <p className="text-lg text-secondary">
              Remember what you{" "}
              <span className="text-accent font-bold">watched</span>
            </p>

            <button
              className="
                w-1/2 rounded-lg bg-accent px-4 py-3
                font-bold text-foreground
                transition-all duration-300 ease-out
                hover:-translate-y-0.5 hover:shadow-lg
              "
            >
              Start Tracking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
