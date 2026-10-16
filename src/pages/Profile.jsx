import { Link } from "react-router-dom";
import { UserRound, Mail, Building2, ShieldCheck, Store } from "lucide-react";

export default function Profile({ user }) {
  const initial = (user?.name || "U").charAt(0).toUpperCase();

  return (
    <div className="mx-auto max-w-5xl space-y-7">
      <div>
        <h2 className="text-2xl font-bold">My Profile</h2>
        <p className="mt-2 text-sm text-slate-400">
          View your account and organization details.
        </p>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0b1120]">
        <div className="h-32 bg-gradient-to-r from-blue-700/60 via-indigo-600/30 to-slate-900" />

        <div className="px-6 pb-7">
          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-[#0b1120] bg-blue-600 text-4xl font-bold text-white">
              {initial}
            </div>

            <div className="pb-2">
              <h3 className="text-2xl font-bold">
                {user?.name || "User"}
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                {user?.role || "Organization Member"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-[#0b1120] p-6 sm:p-8">
        <h3 className="text-lg font-bold">Account Information</h3>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
              <UserRound size={21} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Full Name</p>
              <p className="mt-2 font-medium">
                {user?.name || "Not available"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
              <Mail size={21} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Email Address</p>
              <p className="mt-2 break-all font-medium">
                {user?.email || "Not available"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-violet-500/10 p-3 text-violet-400">
              <Building2 size={21} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Organization</p>
              <p className="mt-2 font-medium">
                {user?.organization || "Not available"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-amber-500/10 p-3 text-amber-400">
              <ShieldCheck size={21} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Account Role</p>
              <p className="mt-2 font-medium">
                {user?.role || "User"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-[#0b1120] p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
              <Store size={23} />
            </div>

            <div>
              <h3 className="font-semibold">Your Stores</h3>
              <p className="mt-1 text-sm text-slate-400">
                Manage your organization's store information.
              </p>
            </div>
          </div>

          <Link
            to="/stores"
            className="rounded-xl border border-slate-700 px-5 py-3 text-center text-sm font-semibold hover:border-blue-500"
          >
            View Store List
          </Link>
        </div>
      </section>
    </div>
  );
}