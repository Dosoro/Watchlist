import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import {
  IconAlertTriangle,
  IconVideo,
  IconVideoOff,
} from "@tabler/icons-react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);

    setLoading(false);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 animate-fade-in">
      <div className="w-full max-w-xl rounded-xl bg-foreground p-10 shadow-card">
        <h1 className="mb-8 text-center text-3xl font-bold ">Login</h1>

        {error && (
          <div className="error" role="alert" aria-live="assertive">
            <IconAlertTriangle className="h-5 w-5 text-red-700" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-primary "
            >
              Email:
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-base"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-primary "
            >
              Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-secondary
                hover:text-accent
                transition
                cursor-pointer
                "
              >
                {showPassword ? (
                  <IconVideoOff className="h-6 w-6 hover:h-7 hover:w-7 duration-300" />
                ) : (
                  <IconVideo className="h-6 w-6 hover:h-7 hover:w-7 duration-300" />
                )}
              </button>
            </div>
          </div>
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
            duration-300
            ease-out
            hover:-translate-y-0.5
            hover:shadow-lg    
            disabled:opacity-60
            disabled:cursor-not-allowed
            cursor-pointer
          "
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className=" font-normal text-secondary mt-6 flex items-center justify-center ">
          Don't have an account?&nbsp;{" "}
          <a
            href="/register"
            className="font-semibold
            text-accent          
            inline-block
            hover:underline"
          >
            {" "}
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
