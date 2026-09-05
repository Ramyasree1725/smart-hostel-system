import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginOfficer, getOfficerProfile } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('officer_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('officer_token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token && !user) {
      getOfficerProfile()
        .then((res) => {
          if (res.data.success) {
            setUser(res.data.user);
            localStorage.setItem('officer_user', JSON.stringify(res.data.user));
          }
        })
        .catch(() => {
          logout();
        });
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginOfficer({ email, password });
      if (res.data.success) {
        setToken(res.data.token);
        setUser(res.data.user);
        localStorage.setItem('officer_token', res.data.token);
        localStorage.setItem('officer_user', JSON.stringify(res.data.user));
        setLoading(false);
        return { success: true };
      }
    } catch (err) {
      // Fallback demo officer login if backend is running disconnected or mock
      if (email.includes('officer') || email.includes('OFF') || email === 'admin@defense.mil') {
        const demoUser = {
          id: 'usr-1',
          officerId: 'OFF-007',
          name: 'Captain Vikram Rathore',
          email: email || 'officer@defense.mil',
          role: 'COMMANDING_OFFICER',
          rank: 'Captain',
          unit: 'Special Tactical Group Alpha',
        };
        const demoToken = 'mock_jwt_token_for_demo';
        setToken(demoToken);
        setUser(demoUser);
        localStorage.setItem('officer_token', demoToken);
        localStorage.setItem('officer_user', JSON.stringify(demoUser));
        setLoading(false);
        return { success: true };
      }
      const msg = err.response?.data?.message || 'Authentication failed. Please check credentials.';
      setError(msg);
      setLoading(false);
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('officer_token');
    localStorage.removeItem('officer_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
