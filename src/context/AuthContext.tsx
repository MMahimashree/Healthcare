import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'created_at'>) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'patient@demo.com',
    name: 'John Smith',
    role: 'patient',
    phone: '+1234567890',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'doctor@demo.com',
    name: 'Dr. Sarah Johnson',
    role: 'doctor',
    phone: '+1234567891',
    specialization: 'General Medicine',
    experience: 8,
    avatar: 'https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg?auto=compress&cs=tinysrgb&w=400',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    email: 'admin@demo.com',
    name: 'Admin User',
    role: 'admin',
    created_at: '2024-01-01T00:00:00Z'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('healthcareUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'demo123') {
      setUser(foundUser);
      localStorage.setItem('healthcareUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('healthcareUser');
  };

  const register = async (userData: Omit<User, 'id' | 'created_at'>): Promise<boolean> => {
    // Mock registration - in real app, this would call an API
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    setUser(newUser);
    localStorage.setItem('healthcareUser', JSON.stringify(newUser));
    return true;
  };

  const value = {
    user,
    login,
    logout,
    register,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};