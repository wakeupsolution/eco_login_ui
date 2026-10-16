import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";

export default function Navbar({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    onLogout();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/95 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/30">
            <ShieldCheck size={27} />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-wide">
              Eco<span className="text-blue-500">UI</span>
            </h1>
            <p className="text-xs text-gray-400">
              Organization Platform
            </p>
          </div>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm text-gray-300 transition hover:text-blue-400"
          >
            Home
          </Link>

          <a
            href="#about"
            className="text-sm text-gray-300 transition hover:text-blue-400"
          >
            About
          </a>

          {user ? (
            <>
              <span className="text-sm text-gray-300">
                Welcome, {user.name}
              </span>

              <button
                onClick={logout}
                className="flex items-center gap-2 rounded-lg border border-red-500/30 px-4 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-200 transition hover:text-blue-400"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg border border-white/10 p-2 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-gray-950 px-5 py-5 md:hidden">
          <div className="flex flex-col gap-5">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-blue-400"
            >
              Home
            </Link>

            <a
              href="#about"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-blue-400"
            >
              About
            </a>

            {user ? (
              <button
                onClick={logout}
                className="flex items-center gap-2 text-left text-red-400"
              >
                <LogOut size={18} />
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-300 hover:text-blue-400"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}