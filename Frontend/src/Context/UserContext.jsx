import React, { createContext, useContext, useState, useEffect } from "react";

// Create User Context
const UserContext = createContext(null);

// Custom Hook for easier usage
export const useUser = () => useContext(UserContext);

// Provider Component
export const UserProvider = ({ children }) => {
  // Load user from localStorage on initialization
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Update localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
