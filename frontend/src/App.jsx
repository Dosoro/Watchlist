import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { useAuth } from "./hooks/useAuth";
import { GlobalHeader } from "./components/GlobalHeader.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import WatchlistPage from "./pages/WatchlistPage.jsx";
import AuthListener from "./components/AuthListener.jsx";
import LoadingSpinner from "./components/common/Loading.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Page wrapper with fade animation
function PageWrapper({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Trigger View Transition API on route change
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        // This will trigger the CSS transitions
      });
    }
  }, [location.pathname]);

  return (
    <div key={location.pathname} className="page-transition">
      {children}
    </div>
  );
}

// Separate component that uses useAuth - MUST be inside AuthProvider
function AppContent() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner fullScreen={true} />;
  }

  return (
    <>
      <GlobalHeader />
      <PageWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/authenticate" element={<AuthPage />} />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/watchlist"
            element={
              <ProtectedRoute>
                <WatchlistPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </PageWrapper>
      <AuthListener />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
