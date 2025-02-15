import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from '../components/auth/signup/SignUp';
import Login from '../components/auth/login/Login';
import UserDashboard from '../components/home/UserDashboard';
import LandingPage from './Pages/LandingPage';
import AdminDashboard from '../components/home/AdminDashboard';
import StaffDashboard from '../components/home/StaffDashboard';
import ProtectedRoute from '../utils/ProtectedRoute';
import ProfilePage from '../common-components/ProfilePage';
import Layout from '../components/header/Layout';  
import EditProfilePage from '../common-components/EditProfilePage';
const App = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/user-signup" element={<SignUp />} />
      <Route path="/user-login" element={<Login />} />

      {/* Protected Pages inside Layout (Header visible on these pages) */}
      <Route element={<Layout />}>
        <Route path="/user-dashboard" element={<ProtectedRoute requiredRole='user'>
          <UserDashboard />
        </ProtectedRoute>} />

        <Route path="/admin-dashboard" element={<ProtectedRoute requiredRole='admin'>
          <AdminDashboard />
        </ProtectedRoute>} />

        <Route path="/staff-dashboard" element={<ProtectedRoute requiredRole='staff'>
          <StaffDashboard />
        </ProtectedRoute>} />

        <Route path="/profile" element={<ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>} />

        <Route path="/edit-profile" element={<ProtectedRoute>
          <EditProfilePage />
        </ProtectedRoute>} />
      </Route>
    </Routes>
  );
};

export default App;
