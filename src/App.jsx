import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "../components/auth/signup/SignUp";
import Login from "../components/auth/login/Login";
import UserDashboard from "../components/user/UserDashboard";
import LandingPage from "./Pages/LandingPage";
import AdminDashboard from "../components/admin/AdminDashboard";
import StaffDashboard from "../components/staff/StaffDashboard";
import ProtectedRoute from "../utils/ProtectedRoute";
import ProfilePage from "../common-components/ProfilePage";
import Layout from "../components/header/Layout";
import EditProfilePage from "../common-components/EditProfilePage";
import ApplicationManager from "../components/admin/ApplicationManager";
import Services from "../components/admin/Services";
import ContactPage from "../common-components/ContactPage";
import AboutPage from "../common-components/AboutPage";
import ServicePage from "../components/user/ServicePage";
import ApplicationPage from "../components/user/ApplicationPage";

const App = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/user-signup" element={<SignUp />} />
      <Route path="/user-login" element={<Login />} />

      {/* Pages Inside Layout (Header + Footer) */}
      <Route element={<Layout />}>
        {/* Protected User Pages */}
        <Route path="/user-dashboard" element={
          <ProtectedRoute requiredRole="user">
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path="/user-services" element={
          <ProtectedRoute requiredRole="user">
            <ServicePage />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/edit-profile" element={
          <ProtectedRoute>
            <EditProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/user-application" element={
          <ProtectedRoute requiredRole="user">
            <ApplicationPage />
          </ProtectedRoute>
        } />

        {/* Protected Admin Pages */}
        <Route path="/admin-dashboard" element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin-application" element={
         <ProtectedRoute requiredRole={["admin","staff"]}>
            <ApplicationManager />
         </ProtectedRoute>
            
        } />
        <Route path="/admin-services" element={
          <ProtectedRoute requiredRole="admin">
            <Services />
          </ProtectedRoute>
        } />

        {/* Protected Staff Pages */}
        <Route path="/staff-dashboard" element={
          <ProtectedRoute requiredRole="staff">
            <StaffDashboard />
          </ProtectedRoute>
        } />

        {/* Public Pages */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
};

export default App;
