import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser, userRole, loading } = useAuth();

  if (loading) return null; // Prevents flickering

  if (!currentUser) {
    return <Navigate to="/user-login" />;
  }

  // Allow multiple roles
  if (requiredRole && !requiredRole.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
