import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      toast.success('Login successful');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f2c] flex flex-col justify-center items-center p-4 selection:bg-primary-500 selection:text-white font-poppins">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-[#0f1117] rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800"
      >
        <div className="p-8 border-b border-gray-100 dark:border-gray-800 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/30">
            <span className="text-white font-bold text-2xl">RB</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Login</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sign in to manage Royal Blue PG</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-all duration-300 flex justify-center items-center shadow-lg hover:shadow-primary-600/30 active:scale-95"
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : 'Log In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
