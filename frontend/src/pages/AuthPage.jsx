import { useState } from "react"; // State management
import { useNavigate } from "react-router-dom"; // Navigate after auth
import { useAuth } from "../hooks/useAuth.js"; // Auth context
import {
  IconAlertTriangle,
  IconVideo,
  IconVideoOff,
  IconBrandGoogle,
  IconBrandApple,
  IconMovie,
} from "@tabler/icons-react"; // Icons

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // Toggle login/register
  const [email, setEmail] = useState(""); // Email input
  const [password, setPassword] = useState(""); // Password input
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle confirm visibility
  const [error, setError] = useState(""); // Error messages
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Navigation
  const { login, register } = useAuth(); // Auth functions

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form refresh
    setError(""); // Clear previous errors

    // Validation for register
    if (!isLogin) {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
    }

    setLoading(true); // Show loading

    // Call appropriate auth function
    const result = isLogin
      ? await login(email, password)
      : await register(email, password, confirmPassword);

    setLoading(false); // Hide loading

    if (result.success) {
      navigate("/"); // Go to home
    } else {
      setError(
        result.error || (isLogin ? "Login failed" : "Registration failed")
      );
    }
  };

  const handleOAuth = (provider) => {
    // TODO: Implement OAuth with Google/Apple
    console.log(`${provider} OAuth clicked`);
    alert(`${provider} authentication coming soon!`);
  };

  const handleToggle = () => {
    setIsLogin(!isLogin); // Toggle mode
    setError(""); // Clear errors
    setPassword(""); // Clear fields
    setConfirmPassword("");
    setEmail("");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-background px-4 py-8 animate-fade-in">
      <div className="md:mr-12">
        <button
          onClick={() => navigate("/")}
          className="mb-12 flex flex-col items-center gap-3 transition hover:opacity-80"
        >
          <div className="logo-md">
            <IconMovie className="h-16 w-16 text-foreground" />
          </div>
          <h2 className="text-4xl font-bold text-primary">Watchlist</h2>
        </button>
      </div>

      <div className="form-box animate-scale-up">
        {/* Header - smooth transition */}
        <div
          key={isLogin ? "login" : "register"}
          className="mb-8 animate-fade-in"
        >
          <h1 className="text-3xl font-bold text-primary">
            {isLogin ? "Welcome Back" : "Join Us"}
          </h1>
          <p className="mt-2 text-sm text-secondary">
            {isLogin
              ? "Sign in to access your watchlist"
              : "Create an account to get started"}
          </p>
        </div>

        {/* Error message - smooth transition */}
        {error && (
          <div
            className="error mb-6 animate-fade-in"
            role="alert"
            aria-live="assertive"
          >
            <IconAlertTriangle className="h-5 w-5 shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Form with smooth transitions */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email field */}
          <div className="input-wrapper animate-fade-in">
            <label className="label-input">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="input-base"
            />
          </div>

          {/* Password field */}
          <div className="input-wrapper animate-fade-in">
            <label className="label-input">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="input-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-accent transition"
              >
                {showPassword ? (
                  <IconVideoOff className="h-5 w-5" />
                ) : (
                  <IconVideo className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm password field (register only) - smooth appear/disappear */}
          {!isLogin && (
            <div className="input-wrapper animate-fade-in">
              <label className="label-input">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input-base"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-accent transition"
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

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="button-primary w-full"
          >
            {loading
              ? isLogin
                ? "Signing in..."
                : "Creating account..."
              : isLogin
              ? "Sign In"
              : "Create Account"}
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

        {/* Toggle link */}
        <button
          type="button"
          onClick={handleToggle}
          className="w-full mt-6 text-center text-sm text-secondary transition font-medium"
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
