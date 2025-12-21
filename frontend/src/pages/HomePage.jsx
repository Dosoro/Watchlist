import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useEffect, useState } from "react";
import { IconArrowRight, IconMovie, IconLogout } from "@tabler/icons-react";
import { TYPING, ROUTES } from "../config/constants.js";

const words = ["want to watch", "watched", "thought"];

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!isDeleting && charIndex < currentWord.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), TYPING.SPEED);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), TYPING.SPEED / 2);
    } else if (!isDeleting && charIndex === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), TYPING.PAUSE_TIME);
    } else if (isDeleting && charIndex === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((w) => (w + 1) % words.length);
      }, TYPING.SPEED);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.AUTHENTICATE);
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="rounded-2xl bg-accent p-5 shadow-card">
            <IconMovie className="h-20 w-20 text-foreground" />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-primary">Welcome Back!</h1>
            <p className="text-lg text-secondary">
              You're logged in and ready to explore.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-lg bg-red-500 px-8 py-4 text-lg font-bold text-white shadow-card transition hover:-translate-y-1 hover:shadow-lg"
          >
            <IconLogout className="h-6 w-6" />
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-20 animate-fade-in">
        <div className="flex max-w-5xl flex-col items-center gap-16 text-center">
          <button
            onClick={() => navigate(ROUTES.HOME)}
            className="rounded-2xl bg-accent p-5 shadow-card transition hover:-translate-y-1 hover:shadow-lg"
          >
            <IconMovie className="h-20 w-20 text-foreground" />
          </button>

          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl sm:text-6xl font-black leading-tight text-primary md:text-7xl">
              Your watching, <span className="text-accent">organized</span>
            </h1>

            <p className="text-2xl font-medium text-secondary md:text-3xl">
              Remember what you{" "}
              <span className="font-bold text-accent">
                {words[wordIndex].slice(0, charIndex)}
                <span className="animate-pulse">|</span>
              </span>
            </p>
          </div>

          <p className="max-w-3xl text-lg leading-relaxed text-secondary md:text-xl">
            Keep track of movies and TV shows you{" "}
            <span className="font-semibold text-primary">want to watch</span>,{" "}
            <span className="font-semibold text-primary">have watched</span>,
            and <span className="font-semibold text-primary">loved</span>.
          </p>

          <button
            onClick={() => navigate(ROUTES.AUTHENTICATE)}
            className="button-primary animate-fade-in"
          >
            Start Remembering
            <IconArrowRight className="h-6 w-6" />
          </button>

          <div className="mt-16 grid w-full max-w-4xl gap-6 grid-cols-1 md:grid-cols-3 animate-fade-in">
            <div className="feature-card">
              <div className="rounded-lg bg-accent/10 p-4">
                <IconMovie className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-primary">Discover</h3>
              <p className="text-sm text-secondary">
                Search millions of movies and shows instantly
              </p>
            </div>

            <div className="feature-card">
              <div className="rounded-lg bg-accent/10 p-4">
                <IconMovie className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-primary">Organize</h3>
              <p className="text-sm text-secondary">
                Create and manage your personal watchlist
              </p>
            </div>

            <div className="feature-card">
              <div className="rounded-lg bg-accent/10 p-4">
                <IconMovie className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-primary">Track</h3>
              <p className="text-sm text-secondary">
                Rate, review, and track what you've watched
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
