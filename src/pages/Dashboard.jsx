import { Link } from "react-router-dom";
import {
  Store,
  PlusCircle,
  UserRound,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function Dashboard({ user }) {
  const cards = [
    {
      title: "Store Management",
      description: "View and manage your organization's stores.",
      icon: Store,
      link: "/stores",
      button: "View Stores",
      color: "blue",
    },
    {
      title: "Create Store",
      description: "Set up a new store for your organization.",
      icon: PlusCircle,
      link: "/stores/create",
      button: "Create Store",
      color: "emerald",
    },
    {
      title: "My Profile",
      description: "View your account and organization information.",
      icon: UserRound,
      link: "/profile",
      button: "View Profile",
      color: "violet",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/20 via-[#0b1120] to-[#0b1120] p-7 sm:p-10">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-300">
            <ShieldCheck size={15} />
            Organization Workspace
          </span>

          <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
            Welcome back, {user?.name || "User"}!
          </h2>

          <p className="mt-4 max-w-xl leading-7 text-slate-400">
            Manage your organization, create stores, and access
            your account from one centralized dashboard.
          </p>

          <Link
            to="/stores/create"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            <PlusCircle size={18} />
            Create New Store
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-5">
          <h3 className="text-xl font-bold">Quick Actions</h3>
          <p className="mt-2 text-sm text-slate-400">
            Access your workspace features.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-800 bg-[#0b1120] p-6 transition hover:-translate-y-1 hover:border-slate-600"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-blue-400">
                  <Icon size={23} />
                </div>

                <h4 className="mt-5 text-lg font-bold">
                  {card.title}
                </h4>

                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">
                  {card.description}
                </p>

                <Link
                  to={card.link}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300"
                >
                  {card.button}
                  <ArrowRight size={16} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-[#0b1120] p-6">
        <h3 className="text-lg font-bold">Organization Information</h3>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">Organization</p>
            <p className="mt-2 font-medium">
              {user?.organization || "Not available"}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Account Email</p>
            <p className="mt-2 break-all font-medium">
              {user?.email || "Not available"}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Account Role</p>
            <p className="mt-2 font-medium">
              {user?.role || "User"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}