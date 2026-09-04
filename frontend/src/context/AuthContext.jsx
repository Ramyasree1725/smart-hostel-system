import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('smart_hostel_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('smart_hostel_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await api.login(email, password);
    setUser(data);
    localStorage.setItem('smart_hostel_user', JSON.stringify(data));
    localStorage.setItem('token', data.token || 'mock_token');
    return data;
  };

  const register = async (studentData) => {
    const data = await api.register(studentData);
    setUser(data);
    localStorage.setItem('smart_hostel_user', JSON.stringify(data));
    localStorage.setItem('token', data.token || 'mock_token');
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smart_hostel_user');
    localStorage.removeItem('token');
  };

  const updateUserData = (updatedFields) => {
    const updated = { ...user, ...updatedFields };
    setUser(updated);
    localStorage.setItem('smart_hostel_user', JSON.stringify(updated));
  };

  // Quick Switcher between 3 main roles for instant viva presentation:
  const switchDemoUser = async (role) => {
    if (role === 'admin' || role === 'warden') {
      await login('warden@hostel.com', 'warden123password');
    } else if (role === 'security') {
      await login('security@hostel.com', 'security123password');
    } else {
      await login('student@hostel.com', 'student123password');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUserData,
        switchDemoUser,
        isAdmin: user?.role === 'admin' || user?.role === 'warden',
        isWarden: user?.role === 'warden' || user?.role === 'admin',
        isSecurity: user?.role === 'security',
        isStudent: user?.role === 'student',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
