import React from "react";
import { Navigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import PageLoader from "./PageLoader";

// ErrorBoundary
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err, info) {
    console.error("ErrorBoundary:", err, info);
  }
  render() {
    if (this.state.hasError)
      return (
        <div
          style={{ background: "var(--navy)", minHeight: "100vh" }}
          className="flex items-center justify-center px-4"
        >
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{
                background: "rgba(255,77,106,0.12)",
                border: "1px solid rgba(255,77,106,0.25)",
              }}
            >
              <AlertTriangle
                className="w-8 h-8"
                style={{ color: "var(--error)" }}
              />
            </div>
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-xl font-bold text-white mb-2"
            >
              Something went wrong
            </h1>
            <p style={{ color: "var(--muted)" }} className="text-sm mb-5">
              Please refresh and try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary text-sm"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    return this.props.children;
  }
}

export default ErrorBoundary;

// PrivateRoute
export const PrivateRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, loading, user } = useAuth();
  if (loading) return <PageLoader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (adminOnly && user?.role !== "admin")
    return <Navigate to="/dashboard" replace />;
  return children;
};
