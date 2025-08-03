import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🧘‍♀️</span>
            <span className="text-xl font-bold text-gray-800">Wellness Platform</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActiveLink('/dashboard') || isActiveLink('/')
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/my-sessions"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActiveLink('/my-sessions')
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              My Sessions
            </Link>
            <Link
              to="/session-editor"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActiveLink('/session-editor')
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Create Session
            </Link>
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user?.name || user?.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
          >
            <svg
              className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <Link
                to="/dashboard"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActiveLink('/dashboard') || isActiveLink('/')
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-green-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/my-sessions"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActiveLink('/my-sessions')
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-green-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Sessions
              </Link>
              <Link
                to="/session-editor"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActiveLink('/session-editor')
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-green-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Create Session
              </Link>
              <div className="border-t border-gray-200 pt-4">
                <div className="px-3 py-2">
                  <p className="text-sm text-gray-600">Welcome, {user?.name || user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;