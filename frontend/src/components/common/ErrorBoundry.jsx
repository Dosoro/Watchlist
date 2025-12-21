import { Component } from "react";
import { IconAlertTriangle } from "@tabler/icons-react";

/**
 * Error boundary to catch component errors
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="rounded-full bg-red-100 p-4">
              <IconAlertTriangle className="h-12 w-12 text-red-600" />
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-primary">Oops!</h1>
              <p className="text-lg text-secondary">
                Something went wrong. Please try again.
              </p>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-accent px-8 py-3 font-bold text-foreground shadow-card transition hover:-translate-y-1 hover:shadow-lg"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
