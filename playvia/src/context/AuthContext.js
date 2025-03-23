import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Check if user was previously logged in
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('netflix_auth');
    return storedAuth === 'true';
  });
  
  // Update localStorage when auth state changes
  useEffect(() => {
    localStorage.setItem('netflix_auth', isAuthenticated);
  }, [isAuthenticated]);
  
  // Login function
  const login = () => {
    setIsAuthenticated(true);
  };
  
  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 