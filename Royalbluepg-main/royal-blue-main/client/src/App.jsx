import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingWhatsApp from './components/layout/FloatingWhatsApp';
import Loader from './components/layout/Loader';

// Providers
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Enquiry from './pages/Enquiry';
import Gallery from './pages/Gallery';

// Admin Layout & Pages
import AdminLayout from './admin/layouts/AdminLayout';
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import ManageEnquiries from './admin/pages/ManageEnquiries';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen flex flex-col font-poppins selection:bg-primary-500 selection:text-white">
          {!isAdminRoute && <Navbar />}
          
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Suspense fallback={<Loader />}>
                <Routes location={location} key={location.pathname}>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/enquiry" element={<Enquiry />} />
                  <Route path="/gallery" element={<Gallery />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<Login />} />
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="enquiries" element={<ManageEnquiries />} />
                    {/* Placeholder for other admin routes */}
                    <Route path="*" element={<Dashboard />} />
                  </Route>
                </Routes>
              </Suspense>
            </AnimatePresence>
          </main>

          {!isAdminRoute && (
            <>
              <Footer />
              <FloatingWhatsApp />
            </>
          )}
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
