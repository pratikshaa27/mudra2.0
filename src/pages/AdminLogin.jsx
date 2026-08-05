import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const dummyCredentials = {
    email: 'admin@mudra.gov.in',
    password: 'Admin@123'
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (email === dummyCredentials.email && password === dummyCredentials.password) {
        localStorage.setItem('adminLoggedIn', 'true');
        setIsLoading(false);
        navigate(createPageUrl('AdminDashboard'));
      } else {
        setError('Invalid email or password. Use admin@mudra.gov.in / Admin@123');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 relative">
          {/* Back Button */}
          <button
            onClick={() => navigate(createPageUrl('PMMYPortal'))}
            className="absolute top-4 left-4 text-gray-600 hover:text-red-700 transition-colors"
            title="Back to Portal"
          >
            <ArrowLeft size={24} />
          </button>

          {/* Header with Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                alt="India Emblem"
                className="h-28 w-28 object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Portal Login</h1>
            <p className="text-gray-600 text-xs">Secure access for administrators</p>
          </div>

          {/* Demo Credentials */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-xs font-semibold text-amber-900 mb-2">Demo Credentials:</p>
            <p className="text-xs text-amber-800"><strong>Email:</strong> admin@mudra.gov.in</p>
            <p className="text-xs text-amber-800"><strong>Password:</strong> Admin@123</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mudra.gov.in"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-700 to-red-800 text-white font-bold py-3 rounded-lg hover:from-red-800 hover:to-red-900 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? 'Logging in...' : (
                <>
                  Login to Dashboard
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-600">
              MUDRA Admin Portal | Secure Access Only
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}