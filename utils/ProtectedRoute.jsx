import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
import { fetchUserRole } from "../firebase/firebase.auth";

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = auth.currentUser;

  if (!user) {
    return <Navigate to="/login" />;
  }

  const checkRole = async () => {
    const role = await fetchUserRole(user.uid);
    if (!role.includes(requiredRole)) {
      return <Navigate to="/" />;
    }
  };

  checkRole();

  return children;
};

export default ProtectedRoute;
