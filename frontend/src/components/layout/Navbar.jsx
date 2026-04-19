import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  FileText,
  ShieldCheck,
  ChevronDown,
  Sparkles,
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setUserMenu(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const isActive = (path) => location.pathname === path;

  const navLink = (path, label) => (
    <Link
      to={path}
      className={`text-sm font-medium transition-colors duration-200 ${
        isActive(path) ? "text-white" : "text-[var(--muted)] hover:text-white"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(6,9,26,0.92)] backdrop-blur-xl border-b border-[var(--border)] shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--blue)] to-[var(--cyan)] flex items-center justify-center shadow-[0_0_16px_var(--blue-glow)]">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span
              style={{ fontFamily: "var(--font-display)" }}
              className="text-lg font-bold text-white group-hover:text-[var(--cyan)] transition-colors"
            >
              Xplosure
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-7">
            {navLink("/pricing", "Pricing")}
            {user && navLink("/dashboard", "Dashboard")}
            {user && navLink("/cover-letter", "Cover Letter")}
            {user?.role === "admin" && navLink("/admin", "Admin")}

            {user ? (
              /* User Dropdown */
              <div className="relative">
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2 glass px-3 py-1.5 rounded-lg hover:border-[rgba(255,255,255,0.15)] transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--blue)] to-[var(--cyan)] flex items-center justify-center text-xs font-bold text-white">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-white">
                    {user.name?.split(" ")[0]}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[var(--muted)] transition-transform ${userMenu ? "rotate-180" : ""}`}
                  />
                </button>

                {userMenu && (
                  <div className="absolute right-0 top-11 w-48 glass border border-[var(--border)] rounded-xl p-1.5 shadow-[var(--shadow)] animate-scale-in">
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[var(--muted)] hover:text-white hover:bg-[var(--glass-hover)] transition-all"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <Link
                      to="/cover-letter"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[var(--muted)] hover:text-white hover:bg-[var(--glass-hover)] transition-all"
                    >
                      <FileText className="w-4 h-4" /> Cover Letter
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[var(--muted)] hover:text-white hover:bg-[var(--glass-hover)] transition-all"
                      >
                        <ShieldCheck className="w-4 h-4" /> Admin Panel
                      </Link>
                    )}
                    <div className="border-t border-[var(--border)] my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[var(--error)] hover:bg-[rgba(255,77,106,0.08)] transition-all"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-[var(--muted)] hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link to="/signup" className="btn-primary text-sm py-2 px-5">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[var(--muted)] hover:text-white p-2 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[var(--navy-2)] border-t border-[var(--border)] p-4 space-y-1 animate-fade-up">
          <MobileLink
            to="/pricing"
            label="Pricing"
            active={isActive("/pricing")}
          />
          {user && (
            <MobileLink
              to="/dashboard"
              label="Dashboard"
              active={isActive("/dashboard")}
            />
          )}
          {user && (
            <MobileLink
              to="/cover-letter"
              label="Cover Letter"
              active={isActive("/cover-letter")}
            />
          )}
          {user?.role === "admin" && (
            <MobileLink
              to="/admin"
              label="Admin Panel"
              active={isActive("/admin")}
            />
          )}

          <div className="pt-3 border-t border-[var(--border)] mt-3">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 px-3 text-sm text-[var(--error)] font-medium flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  className="block py-2 px-3 text-sm text-[var(--muted)]"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary text-sm justify-center"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const MobileLink = ({ to, label, active }) => (
  <Link
    to={to}
    className={`block py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
      active
        ? "bg-[var(--glass)] text-white"
        : "text-[var(--muted)] hover:text-white"
    }`}
  >
    {label}
  </Link>
);

export default Navbar;
