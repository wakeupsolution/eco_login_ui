import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Store,
  PlusCircle,
  UserRound,
  LogOut,
  Layers3,
  PanelLeftClose,
} from "lucide-react";

export default function Sidebar({ user, onLogout, onClose }) {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Store List",
      path: "/stores",
      icon: Store,
    },
    {
      name: "Create Store",
      path: "/stores/create",
      icon: PlusCircle,
    },
    {
      name: "My Profile",
      path: "/profile",
      icon: UserRound,
    },
  ];

  return (
    <aside className="flex h-full w-72 flex-col border-r border-slate-800 bg-[#0b1120] text-white">
      <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
            <Layers3 size={23} />
          </div>

          <div>
            <h2 className="text-lg font-bold">StoreHub</h2>
            <p className="text-xs text-slate-400">
              Management Platform
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 lg:hidden"
            aria-label="Close sidebar"
          >
            <PanelLeftClose size={20} />
          </button>
        )}
      </div>

      <div className="px-4 pt-7">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Workspace
        </p>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/stores"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-950/40"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon size={19} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto border-t border-slate-800 p-4">
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-slate-900 p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600/20 font-bold text-blue-400">
            {(user?.name || "U").charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">
              {user?.name || "User"}
            </p>
            <p className="truncate text-xs text-slate-400">
              {user?.email || "Account"}
            </p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
        >
          <LogOut size={19} />
          Logout
        </button>
      </div>
    </aside>
  );
}