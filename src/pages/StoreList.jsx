import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Store,
  Plus,
  Search,
  RefreshCw,
  Eye,
  MapPin,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";

import { getStores } from "../services/storeService";

export default function StoreList() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStores = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getStores();
      setStores(result.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load stores."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStores();
  }, []);

  const filteredStores = stores.filter((store) =>
    `${store.name || ""} ${store.slug || ""} ${store.status || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const statusStyle = (status) => {
    switch ((status || "").toLowerCase()) {
      case "active":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";

      case "provisioning":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";

      default:
        return "bg-slate-700/50 text-slate-300 border-slate-600";
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      {/* Heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Store Management
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            View and manage all your organization's stores.
          </p>
        </div>

        <Link
          to="/stores/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Store
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-[#0b1120] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">Total Stores</p>
            <Store className="text-blue-400" size={21} />
          </div>

          <h3 className="mt-4 text-3xl font-bold text-white">
            {stores.length}
          </h3>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0b1120] p-5">
          <p className="text-sm text-slate-400">Active Stores</p>

          <h3 className="mt-4 text-3xl font-bold text-emerald-400">
            {
              stores.filter(
                (store) =>
                  (store.status || "").toLowerCase() === "active"
              ).length
            }
          </h3>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0b1120] p-5">
          <p className="text-sm text-slate-400">Provisioning</p>

          <h3 className="mt-4 text-3xl font-bold text-amber-400">
            {
              stores.filter(
                (store) =>
                  (store.status || "").toLowerCase() ===
                  "provisioning"
              ).length
            }
          </h3>
        </div>
      </div>

      {/* Store table */}
      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0b1120]">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-800 p-5 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-semibold text-white">
              All Stores
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              {filteredStores.length} stores found
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                placeholder="Search stores..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-[#080d18] py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 sm:w-64"
              />
            </div>

            <button
              onClick={loadStores}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 disabled:opacity-50"
            >
              <RefreshCw
                size={16}
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="m-5 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
            <AlertCircle size={19} className="mt-0.5 shrink-0" />
            <div className="flex-1">{error}</div>

            <button
              onClick={loadStores}
              className="font-semibold underline"
            >
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex min-h-64 items-center justify-center gap-3 text-slate-400">
            <LoaderCircle
              size={24}
              className="animate-spin text-blue-500"
            />
            Loading stores...
          </div>
        ) : !error && filteredStores.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 text-slate-400">
              <Store size={28} />
            </div>

            <h3 className="mt-5 font-semibold text-white">
              {search ? "No stores found" : "No stores yet"}
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              {search
                ? "Try a different search term."
                : "Create your first store to get started."}
            </p>

            {!search && (
              <Link
                to="/stores/create"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Plus size={17} />
                Create Store
              </Link>
            )}
          </div>
        ) : (
          !error && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="bg-slate-900/70 text-xs uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="px-6 py-4 font-medium">Store</th>
                    <th className="px-6 py-4 font-medium">Slug</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Store ID</th>
                    <th className="px-6 py-4 text-right font-medium">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800">
                  {filteredStores.map((store) => (
                    <tr
                      key={store.id}
                      className="transition hover:bg-slate-800/30"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
                            <Store size={19} />
                          </div>

                          <div>
                            <p className="font-semibold text-white">
                              {store.name}
                            </p>

                            <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                              <MapPin size={12} />
                              Store
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-slate-300">
                        {store.slug || "—"}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full border px-3 py-1.5 text-xs font-medium ${statusStyle(store.status)}`}
                        >
                          {store.status || "Unknown"}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-slate-400">
                        {store.id}
                      </td>

                      <td className="px-6 py-5 text-right">
                        <Link
                          to={`/stores/${store.id}`}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-300 hover:border-blue-500 hover:text-white"
                        >
                          <Eye size={15} />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </section>
    </div>
  );
}