import React, { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import NotificationsPage from "./pages/NotificationsPage";

export default function App() {
  const [activePage, setActivePage] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Simulasi login otomatis jika ada user di localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(storedUser));
      setActivePage("dashboard");
    }
  }, []);

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    setActivePage("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("user");
    setActivePage("login");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      {isLoggedIn && (
        <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-md p-4 flex flex-col">
          <h1 className="text-2xl font-bold text-blue-600 mb-6">My Fins</h1>
          <nav className="flex flex-col space-y-4">
            <button onClick={() => setActivePage("dashboard")} className="text-left py-2 px-4 rounded hover:bg-blue-100">Dashboard</button>
            <button onClick={() => setActivePage("profile")} className="text-left py-2 px-4 rounded hover:bg-blue-100">Profile</button>
            <button onClick={() => setActivePage("settings")} className="text-left py-2 px-4 rounded hover:bg-blue-100">Settings</button>
            <button onClick={() => setActivePage("notifications")} className="text-left py-2 px-4 rounded hover:bg-blue-100">Notifications</button>
          </nav>
        </aside>
      )}

      {/* Main Content Area */}
      <main className="ml-64 p-8">
        {!isLoggedIn && activePage === "login" && (
          <LoginPage setActivePage={setActivePage} onLogin={handleLoginSuccess} />
        )}
        {!isLoggedIn && activePage === "register" && (
          <RegisterPage setActivePage={setActivePage} />
        )}
        {isLoggedIn && activePage === "dashboard" && <DashboardPage />}
        {isLoggedIn && activePage === "profile" && (
          <ProfilePage currentUser={currentUser} onLogout={handleLogout} />
        )}
        {isLoggedIn && activePage === "settings" && (
          <SettingsPage currentUser={currentUser} onLogout={handleLogout} />
        )}
        {isLoggedIn && activePage === "notifications" && (
          <NotificationsPage currentUser={currentUser} onLogout={handleLogout} />
        )}
      </main>
    </div>
  );
}