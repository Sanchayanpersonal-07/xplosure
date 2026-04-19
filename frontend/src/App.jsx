import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PrivateRoute from "./components/layout/PrivateRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import PricingPage from "./pages/PricingPage";
import AdminDashboard from "./pages/AdminDashboard";
import CoverLetterPage from "./pages/CoverLetterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "var(--navy-2)",
              color: "var(--white)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              fontFamily: "var(--font-body)",
              fontSize: "13px",
            },
            success: { iconTheme: { primary: "#10D08C", secondary: "#fff" } },
            error: { iconTheme: { primary: "#FF4D6A", secondary: "#fff" } },
          }}
        />
        {/* Navbar is fixed — pages handle their own top padding */}
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomePage />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/pricing"
            element={
              <>
                <PricingPage />
                <Footer />
              </>
            }
          />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/cover-letter"
            element={
              <PrivateRoute>
                <CoverLetterPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute adminOnly>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="*"
            element={
              <div
                style={{
                  background: "var(--navy)",
                  minHeight: "100vh",
                  paddingTop: "80px",
                }}
                className="flex items-center justify-center text-center px-4"
              >
                <div>
                  <h1
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "96px",
                      lineHeight: 1,
                      color: "rgba(255,255,255,0.05)",
                    }}
                    className="font-bold select-none"
                  >
                    404
                  </h1>
                  <h2
                    style={{ fontFamily: "var(--font-display)" }}
                    className="text-2xl font-bold text-white mb-2 -mt-6"
                  >
                    Page Not Found
                  </h2>
                  <p style={{ color: "var(--muted)" }} className="text-sm mb-6">
                    This page doesn't exist or has been moved.
                  </p>
                  <a href="/" className="btn-primary inline-flex">
                    ← Back to Home
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
