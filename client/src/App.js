import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { VillaProvider } from './contexts/VillaContext';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import VillaListPage from './pages/VillaListPage';
import VillaDetailPage from './pages/VillaDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/admin/Dashboard';
import AdminVillas from './pages/admin/Villas';
import AdminUsers from './pages/admin/Users';
import AdminVillaForm from './pages/admin/VillaForm';
import NotFoundPage from './pages/NotFoundPage';
import DebugPage from './pages/DebugPage';

// Protected Route Component
import ProtectedRoute from './components/auth/ProtectedRoute';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <VillaProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/villas" element={<VillaListPage />} />
                  <Route path="/villas/:id" element={<VillaDetailPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/debug" element={<DebugPage />} />
                  
                  {/* Admin Routes */}
                  <Route 
                    path="/admin" 
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <AdminDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/villas" 
                    element={
                      <ProtectedRoute requiredRole="editor">
                        <AdminVillas />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/villas/new" 
                    element={
                      <ProtectedRoute requiredRole="editor">
                        <AdminVillaForm />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/villas/edit/:id" 
                    element={
                      <ProtectedRoute requiredRole="editor">
                        <AdminVillaForm />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/users" 
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <AdminUsers />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* 404 Route */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
          
          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </VillaProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App; 