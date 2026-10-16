import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Store,
  ShieldCheck,
  KeyRound,
  RefreshCw,
  Clock,
  CalendarDays,
  Copy,
  Check,
  AlertCircle,
  LoaderCircle,
  Building2,
} from "lucide-react";

import {
  getStore,
  getStoreApiKeys,
} from "../services/storeService";

export default function StoreDetails() {
  const { storeId } = useParams();

  const [store, setStore] = useState(null);
  const [keys, setKeys] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState("");

  const loadStore = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [storeResponse, keysResponse] = await Promise.all([
        getStore(storeId),
        getStoreApiKeys(storeId),
      ]);

      if (!storeResponse.success || !storeResponse.store) {
        throw new Error("Unable to load store details.");
      }

      setStore(storeResponse.store);
      setKeys(keysResponse.keys || []);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Please log in to view this store.");
      } else if (err.response?.status === 403) {
        setError("You do not have permission to access this store.");
      } else {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load store information."
        );
      }
    } finally {
      setLoading(false);
    }
  }, [storeId]);

  useEffect(() => {
    if (!storeId) {
      setError("Store ID is missing.");
      setLoading(false);
      return;
    }

    loadStore();
  }, [storeId, loadStore]);

  const copyText = async (value, id) => {
    try {
      await navigator.clipboard.writeText(String(value));

      setCopiedId(id);

      setTimeout(() => {
        setCopiedId("");
      }, 1500);
    } catch {
      setError("Unable to copy. Check browser clipboard permissions.");
    }
  };

  const statusClass = (status) => {
    switch (String(status || "").toLowerCase()) {
      case "active":
        return "border-green-500/20 bg-green-500/10 text-green-400";

      case "provisioning":
        return "border-yellow-500/20 bg-yellow-500/10 text-yellow-400";

      case "revoked":
      case "inactive":
      case "disabled":
        return "border-red-500/20 bg-red-500/10 text-red-400";

      default:
        return "border-gray-700 bg-gray-800 text-gray-300";
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
        <div className="flex items-center gap-3 text-gray-400">
          <LoaderCircle size={24} className="animate-spin text-blue-500" />
          Loading store details...
        </div>
      </main>
    );
  }

  if (error && !store) {
    return (
      <main className="min-h-screen bg-gray-950 px-5 py-16 text-white">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-500/20 bg-gray-900 p-8">
          <AlertCircle size={35} className="mb-4 text-red-400" />

          <h1 className="text-2xl font-bold">
            Unable to load store
          </h1>

          <p className="mt-3 text-gray-400">{error}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={loadStore}
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700"
            >
              Try Again
            </button>

            <Link
              to="/dashboard"
              className="rounded-lg border border-gray-700 px-5 py-3 font-semibold hover:bg-gray-800"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <Link
              to="/dashboard"
              className="mb-5 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
            >
              <ArrowLeft size={17} />
              Back to Dashboard
            </Link>

            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/15 text-blue-400">
                <Store size={28} />
              </div>

              <div>
                <h1 className="text-3xl font-bold">
                  {store.name}
                </h1>

                <p className="mt-1 text-sm text-gray-400">
                  Store ID: {store.id}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={loadStore}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-700 px-5 py-3 text-sm font-semibold text-gray-300 transition hover:border-blue-500 hover:text-white disabled:opacity-50"
          >
            <RefreshCw size={17} />
            Refresh
          </button>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300"
          >
            {error}
          </div>
        )}

        {/* Store information */}
        <section className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-400">Store Status</p>
              <ShieldCheck size={20} className="text-blue-400" />
            </div>

            <span
              className={`inline-flex rounded-full border px-3 py-1.5 text-sm font-medium ${statusClass(store.status)}`}
            >
              {store.status || "Unknown"}
            </span>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-400">Store Slug</p>
              <Store size={20} className="text-blue-400" />
            </div>

            <p className="break-all text-lg font-semibold">
              {store.slug}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-400">Organization ID</p>
              <Building2 size={20} className="text-blue-400" />
            </div>

            <p className="text-lg font-semibold">
              {store.organization_id}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-400">API Keys</p>
              <KeyRound size={20} className="text-blue-400" />
            </div>

            <p className="text-3xl font-bold">{keys.length}</p>
            <p className="mt-1 text-xs text-gray-500">
              Keys returned by the API
            </p>
          </div>
        </section>

        {/* Store information card */}
        <section className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6 sm:p-8">
          <h2 className="mb-6 text-xl font-bold">
            Store Information
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">

            <div>
              <p className="text-sm text-gray-500">Store Name</p>
              <p className="mt-2 font-medium">{store.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Store Slug</p>
              <div className="mt-2 flex items-center gap-2">
                <p className="break-all font-medium">{store.slug}</p>

                <button
                  onClick={() => copyText(store.slug, "slug")}
                  className="rounded-md p-1.5 text-gray-400 hover:bg-gray-800 hover:text-white"
                  aria-label="Copy store slug"
                >
                  {copiedId === "slug" ? (
                    <Check size={16} />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Store ID</p>
              <p className="mt-2 font-medium">{store.id}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Organization ID</p>
              <p className="mt-2 font-medium">
                {store.organization_id}
              </p>
            </div>

          </div>
        </section>

        {/* API keys table */}
        <section className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">

          <div className="flex flex-col gap-3 border-b border-gray-800 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <KeyRound size={23} className="text-blue-400" />

                <h2 className="text-xl font-bold">
                  API Keys
                </h2>
              </div>

              <p className="mt-2 text-sm text-gray-400">
                View the keys associated with this store.
              </p>
            </div>

            <span className="rounded-lg bg-gray-800 px-3 py-2 text-sm text-gray-300">
              {keys.length} keys
            </span>
          </div>

          {keys.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-800 text-gray-400">
                <KeyRound size={26} />
              </div>

              <h3 className="font-semibold">
                No API keys found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                No API keys were returned for this store.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">

                <thead className="bg-gray-950/60 text-gray-400">
                  <tr>
                    <th className="px-6 py-4 font-medium">Key Prefix</th>
                    <th className="px-6 py-4 font-medium">Type</th>
                    <th className="px-6 py-4 font-medium">Environment</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Created</th>
                    <th className="px-6 py-4 font-medium">Last Used</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-800">

                  {keys.map((key) => (
                    <tr
                      key={key.id}
                      className="transition hover:bg-gray-800/40"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <code className="rounded-md bg-gray-950 px-2 py-1 text-blue-300">
                            {key.key_prefix || "Unavailable"}
                          </code>

                          <button
                            onClick={() =>
                              copyText(
                                key.key_prefix || "",
                                `key-${key.id}`
                              )
                            }
                            disabled={!key.key_prefix}
                            className="rounded p-1 text-gray-500 hover:bg-gray-800 hover:text-white disabled:opacity-30"
                            aria-label="Copy API key prefix"
                          >
                            {copiedId === `key-${key.id}` ? (
                              <Check size={15} />
                            ) : (
                              <Copy size={15} />
                            )}
                          </button>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-gray-300">
                        {key.key_type || "—"}
                      </td>

                      <td className="px-6 py-5">
                        <span className="rounded-md border border-blue-500/20 bg-blue-500/10 px-2 py-1 text-blue-300">
                          {key.environment || "—"}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs ${statusClass(key.status)}`}
                        >
                          {key.status || "Unknown"}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-gray-400">
                        <span className="inline-flex items-center gap-2">
                          <CalendarDays size={15} />

                          {key.created_at
                            ? new Date(
                                key.created_at
                              ).toLocaleDateString()
                            : "—"}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-gray-400">
                        <span className="inline-flex items-center gap-2">
                          <Clock size={15} />

                          {key.last_used_at
                            ? new Date(
                                key.last_used_at
                              ).toLocaleDateString()
                            : "Never"}
                        </span>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          )}
        </section>

        <p className="mt-5 text-xs leading-6 text-gray-500">
          API key prefixes are identifiers, not complete API secrets.
          Never expose full secret keys in a public frontend or browser logs.
        </p>

      </div>
    </main>
  );
}