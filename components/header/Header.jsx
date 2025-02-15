import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";
import { signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import {
  Menu,
  X,
  Home,
  Briefcase,
  Phone,
  Info,
  User,
  LogOut,
} from "lucide-react"; 
import logo from "../../src/assets/image.png";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-md ">
      <div className="container mx-auto flex justify-between items-center ">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="w-12 h-12 object-contain mr-2" />
          <span className="text-white text-xl font-bold">Digital E-Gram</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6 text-white font-medium text-lg">
          <Link to="/" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
            <Home size={20} /> Home
          </Link>
          <Link to="/services" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
            <Briefcase size={20} /> Services
          </Link>
          <Link to="/contact" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
            <Phone size={20} /> Contact
          </Link>
          <Link to="/about" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
            <Info size={20} /> About
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 hover:text-gray-300 transition-colors focus:outline-none"
            >
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
                    <button
                      onClick={handleLogout}
                      className="flex w-full text-left items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      <LogOut size={18} className="mr-2" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-16 left-0 w-full z-50">
          <ul className="flex flex-col items-center space-y-4 py-4 text-lg text-gray-800 font-medium">
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-blue-600">
                <Home size={20} /> Home
              </Link>
            </li>
            <li>
              <Link to="/services" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-blue-600">
                <Briefcase size={20} /> Services
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-blue-600">
                <Phone size={20} /> Contact
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-blue-600">
                <Info size={20} /> About
              </Link>
            </li>
            <li>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-blue-600">
                <User size={20} /> Profile
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 text-red-600 hover:text-red-800"
              >
                <LogOut size={20} /> Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
