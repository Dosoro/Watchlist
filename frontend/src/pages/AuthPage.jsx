import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import {
  IconAlertTriangle,
  IconVideo,
  IconVideoOff,
  IconMovie,
  IconLoader2,
  IconBrandGoogle,
  IconBrandApple,
} from "@tabler/icons-react";
import { ROUTES, VALIDATION, MESSAGES } from "../config/constants.js";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const validateForm = () => {
    if (!VALIDATION.EMAIL_REGEX.test(email)) {
      setError(MESSAGES.INVALID_EMAIL);
      return false;
    }

    if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
      setError(MESSAGES.PASSWORD_TOO_SHORT);
      return false;
    }

    if (password.length > VALIDATION.PASSWORD_MAX_LENGTH) {
      setError(MESSAGES.PASSWORD_TOO_LONG);
      return false;
    }

    if (!isLogin && password !== confirmPassword) {
      setError(MESSAGES.PASSWORD_MISMATCH);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    const result = isLogin
      ? await login(email, password)
      : await register(email, password, confirmPassword);

    setLoading(false);

    if (result.success) {
      navigate(ROUTES.HOME);
    } else {
      const errorMessage =
        result.error ||
        (isLogin ? MESSAGES.LOGIN_ERROR : MESSAGES.REGISTER_ERROR);
      setError(errorMessage);
    }
  };
  const handleOAuth = (provider) => {
    // TODO: Implement OAuth with Google/Apple
    console.log(`${provider} OAuth clicked`);
    alert(`${provider} authentication coming soon!`);
  };
  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-background px-4 py-8 animate-fade-in">
      <div className="md:mr-12">
        <button
          onClick={() => navigate(ROUTES.HOME)}
          className="mb-12 flex flex-col items-center gap-3 transition hover:opacity-80"
        >
          <div className="logo-md">
            <IconMovie className="h-16 w-16 text-foreground" />
          </div>
          <h2 className="text-4xl font-bold text-primary">Watchlist</h2>
        </button>
      </div>

      <div className="form-box animate-scale-up">
        <div key={isLogin ? "login" : "register"} className="mb-8">
          <h1 className="text-3xl font-bold text-primary">
            {isLogin ? "Welcome Back" : "Join Us"}
          </h1>
          <p className="mt-2 text-sm text-secondary">
            {isLogin
              ? "Sign in to access your watchlist"
              : "Create an account to get started"}
          </p>
        </div>

        {error && (
          <div className="error mb-6" role="alert" aria-live="assertive">
            <IconAlertTriangle className="h-5 w-5 shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="input-wrapper">
            <label className="label-input">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="input-base"
              disabled={loading}
            />
          </div>

          <div className="input-wrapper">
            <label className="label-input">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="input-base"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-accent transition"
                disabled={loading}
              >
                {showPassword ? (
                  <IconVideoOff className="h-5 w-5" />
                ) : (
                  <IconVideo className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="input-wrapper">
              <label className="label-input">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input-base"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-accent transition"
                  disabled={loading}
                >
                  {showConfirmPassword ? (
                    <IconVideoOff className="h-5 w-5" />
                  ) : (
                    <IconVideo className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="button-primary w-full"
          >
            {loading ? (
              <>
                <IconLoader2 className="h-6 w-6 animate-spin" />
                {isLogin ? "Signing in..." : "Creating account..."}
              </>
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        {/* Divider - smooth transition */}
        <div className="my-6 flex items-center gap-4 animate-fade-in">
          <div className="flex-1 h-px bg-secondary/20"></div>
          <p className="text-xs font-medium text-secondary">or continue with</p>
          <div className="flex-1 h-px bg-secondary/20"></div>
        </div>

        {/* OAuth buttons - smooth transition */}
        <div className="grid grid-cols-2 gap-3 animate-fade-in">
          {/* Google button */}
          <button
            type="button"
            onClick={() => handleOAuth("Google")}
            className="button-secondary"
          >
            <IconBrandGoogle className="h-5 w-5" />
            <span className="hidden sm:inline text-sm">Google</span>
          </button>

          {/* Apple button */}
          <button
            type="button"
            onClick={() => handleOAuth("Apple")}
            className="button-secondary"
          >
            <IconBrandApple className="h-5 w-5" />
            <span className="hidden sm:inline text-sm">Apple</span>
          </button>
        </div>
        <button
          type="button"
          onClick={handleToggle}
          className="w-full mt-6 text-center text-sm text-secondary transition font-medium"
          disabled={loading}
        >
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span className="text-accent font-bold hover:underline hover:text-accent">
            {isLogin ? "Sign up" : "Sign in"}
          </span>
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
