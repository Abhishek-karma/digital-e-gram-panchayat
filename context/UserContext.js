import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-hot-toast";

// ✅ Create UserContext
const UserContext = createContext();

// ✅ Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("");

  // Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const role = localStorage.getItem("userRole") || "user";
        setUserRole(role);
      } else {
        setUserRole("");
      }
    });

    return () => unsubscribe();
  }, []);

  // Logout Function
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userRole");
      setUser(null);
      setUserRole("");
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <UserContext.Provider value={{ user, userRole, setUserRole, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Custom Hook to use context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default useUser;
