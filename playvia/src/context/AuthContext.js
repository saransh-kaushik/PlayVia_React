/**
 * Authentication Context for PlayVia
 * Provides authentication state management and user data persistence
 * throughout the application using React Context API.
 */

import React, { createContext, useState, useEffect } from 'react';

// Create the authentication context
export const AuthContext = createContext();

/**
 * AuthProvider Component
 * Manages authentication state and user data for the entire application
 * Provides login, logout, and user profile update functionality
 * Persists authentication state and user data in localStorage
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to auth context
 */
export const AuthProvider = ({ children }) => {
  /**
   * Authentication state
   * Initialized from localStorage to persist login state across page refreshes
   */
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('netflix_auth');
    return storedAuth === 'true';
  });

  /**
   * User state
   * Stores user data including profile information and role
   * Initialized from localStorage if available
   */
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('netflix_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  /**
   * Effect to persist authentication state
   * Updates localStorage whenever isAuthenticated changes
   */
  useEffect(() => {
    localStorage.setItem('netflix_auth', isAuthenticated);
  }, [isAuthenticated]);

  /**
   * Effect to persist user data
   * Updates or removes user data in localStorage when user state changes
   */
  useEffect(() => {
    if (user) {
      localStorage.setItem('netflix_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('netflix_user');
    }
  }, [user]);
  
  /**
   * Login function
   * Sets authentication state to true and stores user data
   * @param {Object} userData - User information to store
   */
  const login = (userData = {}) => {
    setIsAuthenticated(true);
    setUser(userData);
  };
  
  /**
   * Logout function
   * Clears authentication state and user data
   * Removes user data from localStorage
   */
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('netflix_user');
  };

  /**
   * Update user profile
   * Merges new user data with existing user data
   * @param {Object} updatedData - New user data to merge
   */
  const updateUser = (updatedData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...updatedData
    }));
  };

  /**
   * Check if current user has admin role
   * Used for admin route protection
   */
  const isAdmin = user?.role === 'admin';
  
  // Provide authentication context to children components
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