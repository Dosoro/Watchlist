import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import {
  IconAlertTriangle,
  IconVideo,
  IconVideoOff,
} from "@tabler/icons-react";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const result = await register(email, password, confirmPassword);
    setLoading(false);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 animate-fade-in">
      <div className="w-full max-w-xl rounded-xl bg-foreground p-10 shadow-card animate-scale-up">
        <h1 className="mb-8 text-center text-3xl font-bold">Register</h1>

        {error && (
          <div className="error mb-6" role="alert">
            <IconAlertTriangle className="h-5 w-5" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-base"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary">
              Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-secondary
                  hover:text-accent
                  transition
                "
              >
                {showPassword ? (
                  <IconVideoOff className="h-6 w-6" />
                ) : (
                  <IconVideo className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary">
              Confirm Password:
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="input-base"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-secondary
                  hover:text-accent
                  transition
                "
              >
                {showConfirmPassword ? (
                  <IconVideoOff className="h-6 w-6" />
                ) : (
                  <IconVideo className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-lg
              bg-accent
              px-4
              py-3
              font-bold
              text-foreground

              transition-all
              duration-200
              ease-out

              hover:-translate-y-0.5
              hover:shadow-lg

              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 flex justify-center text-secondary">
          Already have an account?&nbsp;
          <a
            href="/login"
            className="
              inline-block
              font-semibold
              text-accent
              hover:underline
            "
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
