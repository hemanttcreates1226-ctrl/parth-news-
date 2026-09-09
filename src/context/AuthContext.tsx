import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types';

interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  isAuthenticated: boolean;
}

const AUTH_STORAGE_KEY = 'parth_news_admin_session_v1';

// Default Admin Credentials
export const DEFAULT_ADMIN: AdminUser = {
  uid: 'admin-parth-001',
  email: 'admin@parthnews.in',
  displayName: 'मुख्य संपादक (Chief Administrator)',
  role: 'super_admin'
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => false,
  logout: () => {},
  isAdmin: false,
  isAuthenticated: false
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch {
      setUser(null);
    }
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    // Strictly require password 'parthnews123'
    if (pass !== 'parthnews123') {
      throw new Error('गलत पासवर्ड! कृपया सही एडमिन पासवर्ड (parthnews123) दर्ज करें।');
    }

    const trimmedEmail = email.trim().toLowerCase() || 'admin@parthnews.in';
    const isSuperAdmin = trimmedEmail.includes('admin') || trimmedEmail === 'admin@parthnews.in';

    const authUser: AdminUser = {
      uid: `admin-${Date.now()}`,
      email: trimmedEmail,
      displayName: isSuperAdmin ? 'मुख्य संपादक (Chief Administrator)' : 'वरिष्ठ संपादक (Senior Editor)',
      role: isSuperAdmin ? 'super_admin' : 'editor'
    };

    setUser(authUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin: !!user, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
