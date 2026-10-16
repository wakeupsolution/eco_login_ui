import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import api from "../api/api";

export default function Login({ onLogin }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/login", {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });


//       const response = await api.post(
//   "/login",
//   JSON.stringify({
//     email: form.email.trim().toLowerCase(),
//     password: form.password,
//   }),
//   {
//     headers: {
//       "Content-Type": "text/plain",
//     },
//   }
// );
      const data = response.data;

      if (!data.success || !data.token || !data.user) {
        throw new Error("Invalid login response from server.");
      }

      // Compatible with your current JWT response.
      sessionStorage.setItem("accessToken", data.token);

      onLogin(data.user);

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-950 px-5 py-12">

      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-gray-900 shadow-2xl lg:grid-cols-2">

        {/* Left panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-700 via-blue-900 to-gray-950 p-12 lg:flex">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />

          <div className="relative">
            <ShieldCheck size={45} className="mb-8 text-blue-200" />

            <h2 className="text-4xl font-bold leading-tight text-white">
              Welcome back to
              <br />
              your workspace.
            </h2>

            <p className="mt-5 leading-7 text-blue-100/80">
              Sign in to manage your organization, access your
              account, and continue your work.
            </p>
          </div>

          <p className="relative text-sm text-blue-200/70">
            Secure organization management.
          </p>
        </div>

        {/* Login form */}
        <div className="p-7 sm:p-12">
          <div className="mb-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-400">
              Account Access
            </p>

            <h1 className="text-3xl font-bold text-white">
              Sign in
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Enter your account details to continue.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="login-email"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Email address
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-700 bg-gray-950 px-4 focus-within:border-blue-500">
                <Mail size={19} className="text-gray-500" />

                <input
                  id="login-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  maxLength={254}
                  required
                  className="w-full bg-transparent py-4 text-white outline-none placeholder:text-gray-600"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Password
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-700 bg-gray-950 px-4 focus-within:border-blue-500">
                <LockKeyhole size={19} className="text-gray-500" />

                <input
                  id="login-password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full bg-transparent py-4 text-white outline-none placeholder:text-gray-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-400 hover:text-blue-300"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}