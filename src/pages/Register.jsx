import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  User,
  Mail,
  LockKeyhole,
  MapPin,
  Phone,
} from "lucide-react";
import api from "../api/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    organizationName: "",
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await api.post("/register", {
        organizationName: form.organizationName.trim(),
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        address: form.address.trim(),
        phone: form.phone.trim(),
      });

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Registration failed."
        );
      }

      setSuccess("Organization registered successfully!");

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3.5 text-white outline-none placeholder:text-gray-600 transition focus:border-blue-500";

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-950 px-5 py-12">

      <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-gray-900 p-7 shadow-2xl sm:p-12">

        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-400">
            Get Started
          </p>

          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Create your account
          </h1>

          <p className="mt-3 text-gray-400">
            Register your organization to get started.
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

        {success && (
          <div
            role="status"
            className="mb-5 rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-300"
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="grid gap-5 sm:grid-cols-2">

            <div>
              <label
                htmlFor="organizationName"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Organization Name *
              </label>

              <div className="relative">
                <Building2
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  id="organizationName"
                  name="organizationName"
                  value={form.organizationName}
                  onChange={handleChange}
                  placeholder="Company name"
                  autoComplete="organization"
                  maxLength={150}
                  required
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Full Name *
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  autoComplete="name"
                  maxLength={100}
                  required
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Email Address *
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  maxLength={254}
                  required
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Phone Number
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  autoComplete="tel"
                  maxLength={20}
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Organization Address
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-4 top-4 text-gray-500"
                />

                <textarea
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter your organization address"
                  autoComplete="street-address"
                  maxLength={500}
                  rows={3}
                  className={`${inputClass} resize-y pl-11`}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Password *
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  minLength={12}
                  maxLength={128}
                  required
                  className={`${inputClass} pl-11`}
                />
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Use a unique password with at least 12 characters.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Organization"}
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-400 hover:text-blue-300"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}