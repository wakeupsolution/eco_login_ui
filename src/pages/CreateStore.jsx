import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Store,
  MapPin,
  Phone,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";

import { createStore } from "../services/storeService";

export default function CreateStore() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
  name: "",
  slug: "",
  address: "",
  phone: "",
  gst_number: "",
  aadhar_number: "",
});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "slug") {
      setForm((previous) => ({
        ...previous,
        slug: value
          .toLowerCase()
          .replace(/[^a-z0-9-]/g, "")
          .replace(/-+/g, "-"),
      }));

      return;
    }

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const name = form.name.trim();
    const slug = form.slug.trim();

    if (!name || !slug) {
      setError("Store name and slug are required.");
      return;
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      setError(
        "Use lowercase letters, numbers, and single hyphens in the slug."
      );
      return;
    }

    setLoading(true);

    try {
      const result = await createStore({
        name,
        slug,
        address: form.address.trim(),
        phone: form.phone.trim(),
          gst_number: form.gst_number.trim().toUpperCase(),
    aadhar_number: form.aadhar_number.trim(),
      });

      if (!result.success || !result.store?.id) {
        throw new Error(
          result.message || "Store creation failed."
        );
      }

      setSuccess("Store created successfully!");

      // Open the newly created store details page.
      setTimeout(() => {
        navigate(`/stores/${result.store.id}`);
      }, 700);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Your session has expired. Please log in again.");
      } else if (err.response?.status === 403) {
        setError("You do not have permission to create a store.");
      } else {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Unable to create the store."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10";

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Back navigation */}
        <Link
          to="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600/15 text-blue-400">
            <Store size={28} />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Create Store
            </h1>

            <p className="mt-2 text-gray-400">
              Set up a new store for your organization.
            </p>
          </div>
        </div>

        {/* Form card */}
        <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-2xl">

          <div className="border-b border-gray-800 px-6 py-5 sm:px-8">
            <h2 className="text-lg font-semibold">
              Store Information
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Enter the details for your new store.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-6 sm:p-8"
          >
            {/* Store name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Store Name <span className="text-red-400">*</span>
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Example: Chennai Main Store"
                maxLength={150}
                autoComplete="organization"
                required
                className={inputClass}
              />
            </div>

            {/* Store slug */}
            <div>
              <label
                htmlFor="slug"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Store Slug <span className="text-red-400">*</span>
              </label>

              <input
                id="slug"
                name="slug"
                type="text"
                value={form.slug}
                onChange={handleChange}
                placeholder="chennai-main-store"
                maxLength={100}
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                title="Use lowercase letters, numbers, and hyphens."
                required
                className={inputClass}
              />

              <p className="mt-2 text-xs text-gray-500">
                Use lowercase letters, numbers, and hyphens.
                The slug must be unique within your organization.
              </p>
            </div>

            {/* Address and phone */}
            <div className="grid gap-6 sm:grid-cols-2">

              <div>
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Store Address
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
                    placeholder="Enter store address"
                    autoComplete="street-address"
                    maxLength={500}
                    rows={4}
                    className={`${inputClass} resize-y pl-11`}
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
                    className="absolute left-4 top-4 text-gray-500"
                  />

                  <textarea
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    autoComplete="tel"
                    maxLength={20}
                    rows={4}
                    className={`${inputClass} resize-y pl-11`}
                  />
                </div>
              </div>
            </div>
            {/* GST and Aadhaar */}

                  <div className="grid gap-6 sm:grid-cols-2">

                  {/* GST Number */}

                    <div>
                      <label
                        htmlFor="gst_number"
                        className="mb-2 block text-sm font-medium text-gray-300"
                      >
                        GST Number
                      </label>


                  <input
                    id="gst_number"
                    name="gst_number"
                    type="text"
                    value={form.gst_number}
                    onChange={handleChange}
                    placeholder="Enter GST number"
                    maxLength={15}
                    autoComplete="off"
                    className={inputClass}
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    Enter your 15-character GST identification number.
                  </p>


                    </div>

                  {/* Aadhaar Number */}

                    <div>
                      <label
                        htmlFor="aadhar_number"
                        className="mb-2 block text-sm font-medium text-gray-300"
                      >
                        Aadhaar Number
                      </label>


                  <input
                    id="aadhar_number"
                    name="aadhar_number"
                    type="password"
                    value={form.aadhar_number}
                    onChange={handleChange}
                    placeholder="Enter 12-digit Aadhaar number"
                    maxLength={12}
                    inputMode="numeric"
                    autoComplete="off"
                    className={inputClass}
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    Enter your 12-digit Aadhaar number.
                  </p>


                    </div>

                  </div>



            {/* Information notice */}
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-blue-400"
                />

                <div>
                  <p className="text-sm font-medium text-blue-300">
                    Automatic environment creation
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    Your backend creates a test environment
                    when the store is created. Its initial status
                    will be provisioning.
                  </p>
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300"
              >
                <AlertCircle size={19} className="mt-0.5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Success */}
            {success && (
              <div
                role="status"
                className="rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-300"
              >
                {success}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-800 pt-6 sm:flex-row sm:justify-end">
              <Link
                to="/dashboard"
                className="rounded-xl border border-gray-700 px-6 py-3.5 text-center text-sm font-semibold text-gray-300 transition hover:bg-gray-800"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" />
                    Creating Store...
                  </>
                ) : (
                  <>
                    <Store size={18} />
                    Create Store
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}