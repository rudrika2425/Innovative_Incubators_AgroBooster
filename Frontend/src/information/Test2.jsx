import React from "react";
import { useUser } from "../Context/UserContext";

const TestUser = () => {
  const { user, setUser } = useUser();

  const handleLogout = () => {
    setUser(null); // Clears user data from context (and localStorage)
    window.location.href = "/login";
  };

  return (
    <nav className="bg-emerald-500 p-4 flex justify-between text-white">
      <h1 className="text-xl font-bold">My App</h1>
      {user ? (
        <div className="flex gap-4">
          <span>Welcome, {user.fullname}!</span>
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
            Logout
          </button>
        </div>
      ) : (
        <a href="/login" className="bg-white text-emerald-500 px-4 py-2 rounded">
          Login
        </a>
      )}
    </nav>
  );
};

export default TestUser;
