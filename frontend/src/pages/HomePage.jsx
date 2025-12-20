import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { IconSearch, IconBookmark, IconLogout } from "@tabler/icons-react";

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="flex items-center justify-between border-b border-secondary/20 bg-foreground px-8 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-primary">Watchlist</h1>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <p className="text-sm text-secondary">{user?.email}</p>
              <button
                onClick={handleLogout}
                className="
            flex 
            items-center 
            gap-2 
            rounded-lg 
            bg-accent 
            px-4
            py-2 
            text-sm 
            font-semibold 
            text-foreground
            transition
            hover:-translate-y-0.5
            hover:shadow-lg"
              >
                <IconLogout className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="
                rounded-lg
                px-4
                py-2
                text-sm
                font-semibold
                text-accent
                transition
                hover:underline"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="
                rounded-lg
                px-4
                py-2
                text-sm
                font-semibold
                text-accent
                transition
                hover:underline"
              >
                Register
              </button>
            </>
          )}
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center px-4 py-20">
        {isAuthenticated ? (
          <>
            <h2 className="mb-4 text-4xl font-bold text-primary">
              Welcome back!
            </h2>
            <p className="mb-12 text-center text-lg text-secondary">
              Find and manage your favorite mmovies and TV shows
            </p>
            <div className="grid sm:grid-cols-2">
              <button
                onClick={() => navigate("/search")}
                className="
                group
                flex
                flex-col
                items-center
                gap-4
                rounded-xl
                border-2
                border-secondary/20
                bg-foreground
                px-8
                py-12
                transition
                hover:border-accent
                hover:bg-foreground/80"
              >
                <IconSearch className="h-12 w-12 text-secondary group-hover:text-accent" />
                <h3 className="text-xl font-bold text-primary">
                  Search Movies & Shows
                </h3>
                <p className="text-sm text-secondary">
                  Discover and add to your watchlist
                </p>
              </button>

              <button
                onClick={() => navigate("/watchlist")}
                className="
              group
              flex
              flex-col
              items-center
              gap-4
              rounded-xl
              border-2
              border-secondary/20
              bg-foreground
              px-8
              py-12
              transition
              hover:border-accent
              hover:bg-foreground/80"
              >
                <IconBookmark className="w-12 h-12 text-secondary group-hover:text-accent" />
                <h3 className="text-xl font-bold text-primary">
                  Your Watclist
                </h3>
                <p className="text-sm text-secondary">Your Watclist</p>
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="mb-4 text-4xl font-bold text-primary">
              Your Personal Watchlist 🎬
            </h2>
            <p className="mb-12 max-w-md text-center text-lg text-secondary">
              Keep track of movies and TV shows you want to watch. Create an
              account or login to get started.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/login")}
                className="
                rounded-lg
                border-2
                border-accent px-8
                py-3
                font-bold
                text-accent
                transition
                hover:bg-accent
                hover:text-foreground"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="
                rounded-lg
                border-2
                border-accent px-8
                py-3
                font-bold
                text-accent
                transition
                hover:bg-accent
                hover:text-foreground"
              >
                Create Account
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default HomePage;
