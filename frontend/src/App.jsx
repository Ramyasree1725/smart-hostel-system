import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentRooms from './pages/student/StudentRooms';
import StudentFees from './pages/student/StudentFees';
import StudentComplaints from './pages/student/StudentComplaints';
import StudentLeave from './pages/student/StudentLeave';
import StudentProfile from './pages/student/StudentProfile';

// Warden / Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRooms from './pages/admin/AdminRooms';
import AdminStudents from './pages/admin/AdminStudents';
import AdminComplaints from './pages/admin/AdminComplaints';
import AdminLeaves from './pages/admin/AdminLeaves';
import AdminFees from './pages/admin/AdminFees';
import AdminAttendance from './pages/admin/AdminAttendance';
import AdminNotices from './pages/admin/AdminNotices';
import AdminMess from './pages/admin/AdminMess';

// Security Guard Pages
import SecurityDashboard from './pages/security/SecurityDashboard';
import GateRegister from './pages/security/GateRegister';

// Protected Route Guard
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'security') return <Navigate to="/security/dashboard" replace />;
    if (user.role === 'warden' || user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/student/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <div>
                <Navbar />
                <LandingPage />
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <div>
                <Navbar />
                <Login />
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div>
                <Navbar />
                <Register />
              </div>
            }
          />

          {/* Student Protected Routes */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/rooms"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentRooms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/fees"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentFees />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/complaints"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentComplaints />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/leave"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentLeave />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/profile"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentProfile />
              </ProtectedRoute>
            }
          />

          {/* Warden Protected Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin', 'warden']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/rooms"
            element={
              <ProtectedRoute allowedRoles={['admin', 'warden']}>
                <AdminRooms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/students"
            element={
              <ProtectedRoute allowedRoles={['admin', 'warden']}>
                <AdminStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/complaints"
            element={
              <ProtectedRoute allowedRoles={['admin', 'warden']}>
                <AdminComplaints />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/leaves"
            element={
              <ProtectedRoute allowedRoles={['admin', 'warden']}>
                <AdminLeaves />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/mess"
            element={
              <ProtectedRoute allowedRoles={['admin', 'warden']}>
                <AdminMess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/fees"
            element={
              <ProtectedRoute allowedRoles={['admin', 'warden']}>
                <AdminFees />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/attendance"
            element={
              <ProtectedRoute allowedRoles={['admin', 'warden']}>
                <AdminAttendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/notices"
            element={
              <ProtectedRoute allowedRoles={['admin', 'warden']}>
                <AdminNotices />
              </ProtectedRoute>
            }
          />

          {/* Security Guard Protected Routes */}
          <Route
            path="/security/dashboard"
            element={
              <ProtectedRoute allowedRoles={['security', 'admin', 'warden']}>
                <SecurityDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/security/register"
            element={
              <ProtectedRoute allowedRoles={['security', 'admin', 'warden']}>
                <GateRegister />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
