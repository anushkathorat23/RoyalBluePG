import { Navigate, Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { FiHome, FiInbox, FiImage, FiMessageSquare, FiLogOut, FiMoon, FiSun } from 'react-icons/fi';
import { motion } from 'framer-motion';

const sidebarLinks = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: FiHome },
  { name: 'Enquiries', path: '/admin/enquiries', icon: FiInbox },
  { name: 'Gallery', path: '/admin/gallery', icon: FiImage },
  { name: 'Testimonials', path: '/admin/testimonials', icon: FiMessageSquare },
];

const AdminLayout = () => {
  const { admin, loading, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg">
        <div className="loader-spinner !w-10 !h-10 border-primary-500" />
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f2c] flex selection:bg-primary-500 selection:text-white font-poppins">

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 bg-white dark:bg-[#0f1117] border-r border-gray-200 dark:border-gray-800 flex flex-col fixed inset-y-0 z-20"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">RB</span>
            </div>
            <span className="font-bold text-lg text-gray-800 dark:text-white">Admin Panel</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
              >
                <link.icon size={18} />
                {link.name}
              </Link>
            )
          })}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
          <button
            onClick={toggleDarkMode}
            className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left"
          >
            {darkMode ? <FiSun /> : <FiMoon />} Theme
          </button>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-left"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white capitalize">
              {location.pathname.split('/').pop()}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Welcome back, {admin.username}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold border border-primary-200 dark:border-primary-800">
            {admin.username.charAt(0).toUpperCase()}
          </div>
        </header>

        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>

    </div>
  );
};

export default AdminLayout;
