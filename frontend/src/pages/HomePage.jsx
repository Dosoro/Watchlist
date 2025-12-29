import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useEffect, useState } from "react";
import {
  IconArrowRight,
  IconMovie,
  IconLogout,
  IconSearch,
  IconList,
  IconChartBar,
  IconEye,
  IconTrendingUp,
  IconStar,
  IconPlus,
} from "@tabler/icons-react";
import {
  TYPING,
  ROUTES,
  FEATURE_CARDS,
  MOCK_USER,
  MOCK_STATS,
  MOCK_RECENT_ITEMS,
} from "../config/constants.js";

const words = ["want to watch", "watched", "thought"];

const FEATURE_ICONS = {
  search: IconSearch,
  list: IconList,
  chart: IconChartBar,
};

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
      <div className="min-h-screen bg-background px-4 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-primary">
                Welcome back, {MOCK_USER.username}
              </h1>
              <p className="mt-2 text-secondary">
                Here's what's happening with your watchlisth
              </p>
            </div>
            <button className="button-danger" onClick={handleLogout}>
              <IconLogout className="h-5 w-5" />
              Logout
            </button>
          </div>
          {/* Stats Cards */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Total Movies */}
            <div className="rounded-xl border-2 border-secondary/20 bg-foreground p-6 shadow-card">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-accent/10 p-3">
                  <IconMovie className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-secondary">Total Movies</p>
                  <p className="text-3xl text-primary font-bold">
                    {MOCK_STATS.total}
                  </p>
                </div>
              </div>
            </div>
            {/* Watched */}
            <div className="rounded-xl border-2 border-secondary/20 bg-foreground p-6 shadow-card">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-accent/10 p-3">
                  <IconEye className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-secondary">Watched</p>
                  <p className="text-3xl text-primary font-bold">
                    {MOCK_STATS.watched}
                  </p>
                </div>
              </div>
            </div>
            {/* Unwatched */}
            <div className="rounded-xl border-2 border-secondary/20 bg-foreground p-6 shadow-card">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-accent/10 p-3">
                  <IconTrendingUp className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-secondary">To watch</p>
                  <p className="text-3xl text-primary font-bold">
                    {MOCK_STATS.unwatched}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Watchlist */}
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-primary">
              Recent Watchlist
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {MOCK_RECENT_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="group overflow-hidden rounded-xl border-2 border-secondary/20 bg-foreground shadow-card transition hover:border-accent hover:shadow-lg"
                >
                  <div className="relative aspect-2/3 overflow-hidden bg-secondary/10">
                    <img
                      src={item.poster}
                      alt={item.title}
                      title={item.title}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />

                    {item.watched && (
                      <div className="absolute top-2 right-2 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-foreground">
                        Watched
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-primary">{item.title}</h3>
                    {item.rating && (
                      <div className="mt-2 flex items-center gap-1 text-accent">
                        <IconStar className="h-4 w-4  fill-current" />
                        <span className="text-sm font-semibold">
                          {item.rating}/10
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 sm:grid-cols-2">
            <button
              onClick={() => navigate(ROUTES.SEARCH)}
              className="button-primary"
            >
              <IconPlus className="h-6 w-6" />
              Add Movie
            </button>
            <button
              className="button-secondary"
              onClick={() => navigate(ROUTES.WATCHLIST)}
            >
              <IconList className="h-6 w-6" />
              View Full Watchlist
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-20 animate-fade-in">
        <div className="flex max-w-5xl flex-col items-center gap-16 text-center">
          <div className="logo-lg">
            <IconMovie className="h-20 w-20 text-foreground" />
          </div>

          <div className="space-y-6">
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
            className="button-primary"
          >
            Start Remembering
            <IconArrowRight className="h-6 w-6" />
          </button>

          <div className="mt-16 grid w-full max-w-4xl gap-6 grid-cols-1 md:grid-cols-3">
            {FEATURE_CARDS.map((feature) => {
              const Icon = FEATURE_ICONS[feature.icon];
              return (
                <div key={feature.id} className="feature-card">
                  <div className="rounded-lg bg-accent/10 p-4">
                    <Icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-secondary">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
