import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Heart } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'patient': return 'bg-blue-100 text-blue-800';
      case 'doctor': return 'bg-green-100 text-green-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">HealthCare AI</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user?.role || '')}`}>
                {user?.role?.toUpperCase()}
              </span>
              <button
                onClick={logout}
                className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        {children}
      </main>
    </div>
  );
};