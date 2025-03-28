import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Check if user was previously logged in
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('netflix_auth');
    return storedAuth === 'true';
  });

  // Initialize user state from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('netflix_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  // Update localStorage when auth state changes
  useEffect(() => {
    localStorage.setItem('netflix_auth', isAuthenticated);
  }, [isAuthenticated]);

  // Update localStorage when user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('netflix_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('netflix_user');
    }
  }, [user]);
  
  // Login function
  const login = (userData = {}) => {
    setIsAuthenticated(true);
    setUser(userData);
  };
  
  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('netflix_user');
  };

  // Update user profile
  const updateUser = (updatedData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...updatedData
    }));
  };

  const isAdmin = user?.role === 'admin';
  
  
  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout,
      user,
      updateUser,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 