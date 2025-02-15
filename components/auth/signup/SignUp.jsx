import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signup } from '../../../firebase/firebase.auth';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-hot-toast';
import logo from '../../../src/assets/image.png';

const SignUp = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [role, setRole] = useState('user');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsRegistering(true);
    try {
      await signup(email, password, name, role , phone, address);
      toast.success('User registered successfully');
      navigate('/user-dashboard');
    } catch (error) {
      // ... existing error handling ...
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <>
      {userLoggedIn && navigate('/user-dashboard')}
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left Side - Image */}
        <div className="md:w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 hidden md:flex items-center justify-center p-12">
          <img 
            src={logo} 
            alt="Digital Gram Panchayat" 
            className=" object-cover  animate-fade-in delay-100"
          />
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
              <p className="text-gray-600">Join our digital village community</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-md">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Full Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Email Address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Address
                </label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  placeholder="Village Name, District, State"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Select Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                  required
                >
                  <option value="user">Village Resident</option>
                  <option value="admin">Administrator</option>
                  <option value="staff">Panchayat Staff</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isRegistering}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {isRegistering ? 'Creating Account...' : 'Create Account'}
              </button>

              {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <p className="text-center text-gray-600 text-sm mt-6">
                Already have an account?{' '}
                <a 
                  href="/user-login" 
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Log in here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;