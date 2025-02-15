import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 animate-fade-in">
          Welcome to Digital E Gram Panchayat
        </h1>
        <p className="text-xl mb-8 animate-fade-in delay-100">
          Empowering villages with digital solutions for better governance and citizen services.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="space-x-4 animate-fade-in delay-200">
          <Link
            to="/user-signup"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition duration-300"
          >
            Sign Up
          </Link>
          <Link
            to="/user-login"
            className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-sm text-gray-200">
        <p>© 2023 Digital E Gram Panchayat. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LandingPage;