import React, { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import { authService } from '../services/authService';
import { TOKEN_KEY } from '../utils/constants';
import toast from 'react-hot-toast';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ FIX: loadUser reads from localStorage directly — no token in deps
  // This prevents the infinite re-render loop that occurred when token
  // state changed triggered loadUser which changed state again
  const loadUser = useCallback(async () => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (!storedToken) {
      setLoading(false);
      return;
    }

    try {
      const data = await authService.getCurrentUser();
      setUser(data.user);
    } catch (err) {
      console.error('Failed to load user:', err);
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []); // ✅ Empty deps — only runs on mount

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // ✅ FIX: Listen for auth:logout event dispatched by api.js interceptor
  // This properly clears React state when a 401 is received anywhere in the app
  useEffect(() => {
    const handleForceLogout = () => {
      setUser(null);
    };
    window.addEventListener('auth:logout', handleForceLogout);
    return () => window.removeEventListener('auth:logout', handleForceLogout);
  }, []);

  const login = (newToken, userData) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setUser(userData);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateUserState = (updatedUser) => {
    setUser(updatedUser);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    loadUser,
    updateUserState,
    isAuthenticated: !!localStorage.getItem(TOKEN_KEY) && !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
