import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();   // <-- IMPORTANT EXPORT

export const AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState(localStorage.getItem("jwt") || null);
  const [user, setUser] = useState(null);

  // Automatically load user from localStorage (optional)
  useEffect(() => {
    const savedJwt = localStorage.getItem("jwt");
    if (savedJwt) {
      setJwt(savedJwt);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ jwt, setJwt, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
