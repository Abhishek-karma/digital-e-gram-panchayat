import React from 'react';
import { Users, ShieldCheck, HeartHandshake, Globe } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Digital E-Gram Panchayat</h1>
          <p className="text-xl text-gray-600">Empowering villages through digital governance</p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg">
              To bridge the gap between rural communities and government services through 
              transparent, efficient, and accessible digital solutions. We aim to empower 
              every villager with easy access to essential services and information.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="bg-blue-100 w-max mx-auto p-4 rounded-full mb-4">
              <ShieldCheck className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
            <p className="text-gray-600">Bank-grade security for all your data</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="bg-green-100 w-max mx-auto p-4 rounded-full mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Citizen First</h3>
            <p className="text-gray-600">Designed for rural empowerment</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="bg-purple-100 w-max mx-auto p-4 rounded-full mb-4">
              <HeartHandshake className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">Dedicated support team always ready</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="bg-orange-100 w-max mx-auto p-4 rounded-full mb-4">
              <Globe className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Wide Reach</h3>
            <p className="text-gray-600">Serving 500+ villages across India</p>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Team Member {item}</h3>
                <p className="text-gray-600 mb-2">Position/Role</p>
                <p className="text-gray-500 text-sm">Experience in rural development</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-sm">Applications Processed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-sm">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2H</div>
              <div className="text-sm">Average Resolution Time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;