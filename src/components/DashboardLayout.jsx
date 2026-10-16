import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu, Bell } from "lucide-react";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/stores": "Store List",
    "/stores/create": "Create Store",
    "/profile": "My Profile",
  };

  const title =
    pageTitles[location.pathname] ||
    (location.pathname.startsWith("/stores/")
      ? "Store Details"
      : "Workspace");

  return (
    <div className="flex min-h-screen bg-[#080d18] text-white">
      {/* Desktop sidebar */}
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        <Sidebar user={user} onLogout={onLogout} />
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close navigation"
            className="absolute inset-0 bg-black/70"
            onClick={() => setSidebarOpen(false)}
          />

          <div className="relative h-full w-72">
            <Sidebar
              user={user}
              onLogout={onLogout}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="min-w-0 flex-1 lg:ml-72">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-800 bg-[#080d18]/95 px-5 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:bg-slate-800 lg:hidden"
              aria-label="Open navigation"
            >
              <Menu size={21} />
            </button>

            <div>
              <h1 className="text-lg font-bold sm:text-xl">
                {title}
              </h1>
              <p className="hidden text-xs text-slate-400 sm:block">
                Manage your organization workspace
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="rounded-xl border border-slate-800 p-2.5 text-slate-400 hover:bg-slate-800 hover:text-white"
              aria-label="Notifications"
            >
              <Bell size={19} />
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/20 font-bold text-blue-400">
              {(user?.name || "U").charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}