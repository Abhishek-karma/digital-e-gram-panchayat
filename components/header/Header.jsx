import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-hot-toast";
import { Menu, X, Briefcase, Phone, Info, User, LogOut } from "lucide-react";
import logo from "../../src/assets/image.png";
import { fetchUserRole } from "../../firebase/firebase.auth"; // Import role fetcher

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user role when auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const role = await fetchUserRole(user.uid);
          setUserRole(role);
          localStorage.setItem("userRole", role);
        } catch (error) {
          toast.error("Error fetching user role");
          console.error(error);
        }
      } else {
        setUserRole(null);
        localStorage.removeItem("userRole");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
      console.error(error);
    }
  };

  if (loading) {
    return <div className="h-16 bg-gradient-to-r from-blue-600 to-purple-600"></div>;
  }

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to={userRole ? `/${userRole}-dashboard` : "/"} className="flex items-center">
          <img src={logo} alt="Logo" className="w-12 h-12 object-contain mr-2" />
          <span className="text-white text-xl font-bold">Digital E-Gram</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-4 text-white font-medium text-lg">
          {/* Navigation for Admin */}
          {userRole === "admin" && (
            <>
              <Link to="/admin-dashboard" className="hover:text-gray-300">Dashboard</Link>
              <Link to="/admin-services" className="hover:text-gray-300">Services</Link>
              <Link to="/admin-application" className="hover:text-gray-300">Applications</Link>
              <Link to="/contact" className="hover:text-gray-300">Contact</Link>
              <Link to="/about" className="hover:text-gray-300">About</Link>
            </>
          )}

          {/* Navigation for Staff */}
          {userRole === "staff" && (
            <>
              <Link to="/staff-dashboard" className="hover:text-gray-300">Dashboard</Link>

            </>
          )}

          {/* Navigation for User */}
          {userRole === "user" && (
            <>
              <Link to="/user-dashboard" className="hover:text-gray-300">Dashboard</Link>
              <Link to="/user-application" className="hover:text-gray-300">My Applications</Link>
              <Link to="/user-services" className="hover:text-gray-300">Services</Link>
              <Link to="/contact" className="hover:text-gray-300">Contact</Link>
              <Link to="/about" className="hover:text-gray-300">About</Link>
            </>
          )}

          {/* Profile Dropdown */}
          {userRole && (
            <div className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 hover:text-gray-300">
                <User size={20} /> Profile ▼
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                  <ul className="py-2">
                    <li>
                      <Link to="/profile" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                        <User size={18} className="mr-2" /> My Profile
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="flex w-full text-left items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                        <LogOut size={18} className="mr-2" /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-16 left-0 w-full z-50">
          <ul className="flex flex-col space-y-4 p-4 text-gray-800 font-medium">
            {/* Mobile Navigation for Admin */}
            {userRole === "admin" && (
              <>
                <li><Link to="/admin-dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
                <li><Link to="/admin-services" onClick={() => setMenuOpen(false)}>Services</Link></li>
                <li><Link to="/admin-application" onClick={() => setMenuOpen(false)}>Applications</Link></li>
                <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
                <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
              </>
            )}

            {/* Mobile Navigation for Staff */}
            {userRole === "staff" && (
              <>
                <li><Link to="/staff-dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
               
              </>
            )}

            {/* Mobile Navigation for User */}
            {userRole === "user" && (
              <>
                <li><Link to="/user-dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
                <li><Link to="/user-application" onClick={() => setMenuOpen(false)}>My Applications</Link></li>
                <li><Link to="/user-services" onClick={() => setMenuOpen(false)}>Services</Link></li>
                <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
                <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
              </>
            )}

            {/* Mobile Profile & Logout */}
            {userRole && (
              <>
                <li><Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link></li>
                <li>
                  <button onClick={handleLogout} className="text-red-600 w-full text-left">Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
