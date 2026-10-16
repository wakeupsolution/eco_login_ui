import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import DashboardLayout from "./components/DashboardLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import StoreList from "./pages/StoreList";
import CreateStore from "./pages/CreateStore";
import StoreDetails from "./pages/StoreDetails";
import Profile from "./pages/Profile";

function Home() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-950 px-5 py-16">
      <div className="max-w-3xl text-center">
        <div className="mb-6 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
          Organization Management Platform
        </div>

        <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-6xl">
          Manage your organization.
          <span className="block text-blue-500">
            Simplify your workflow.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl leading-7 text-gray-400">
          Access your organization workspace with a centralized
          account for your team and business operations.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/register"
            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="rounded-xl border border-gray-700 px-8 py-4 font-semibold text-white hover:border-blue-500"
          >
            Login to Account
          </Link>
        </div>
      </div>
    </main>
  );
}

function AppContent() {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = sessionStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    sessionStorage.setItem("user", JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      {!user && <Navbar user={user} onLogout={handleLogout} />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Register />
            )
          }
        />

        <Route
          element={
            user ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route
            path="/dashboard"
            element={
              <Dashboard
                user={user}
                onLogout={handleLogout}
              />
            }
          />

          <Route path="/stores" element={<StoreList />} />

          <Route
            path="/stores/create"
            element={<CreateStore />}
          />

          <Route
            path="/stores/:storeId"
            element={<StoreDetails />}
          />

          <Route path="/profile" element={<Profile user={user} />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}