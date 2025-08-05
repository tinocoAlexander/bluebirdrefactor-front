import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminGallery from './pages/admin/AdminGallery';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminQuotes from './pages/admin/AdminQuotes';
import AdminSettings from './pages/admin/AdminSettings';
import AdminSidebar from './components/admin/AdminSidebar';
import ProtectedRoute from './components/ProtectedRoute';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          } />

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/appointments" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminAppointments />
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/gallery" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminGallery />
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/testimonials" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminTestimonials />
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/quotes" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminQuotes />
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/settings" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminSettings />
              </AdminLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;