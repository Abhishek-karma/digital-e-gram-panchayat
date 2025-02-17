import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, XCircle, AlertCircle, ArrowRight, User, Search } from "lucide-react"; // Lucide icons
import useFetchUserData from "../../src/hooks/useFetchUserData";

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const { userData, setUserData} = useFetchUserData();
  const [appliedServices, setAppliedServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const fetchAppliedServices = async () => {
      try {
        const q = query(collection(db, "applications"), where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        const services = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAppliedServices(services);
      } catch (error) {
        console.error("Error fetching applied services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedServices();
  }, [currentUser]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "Pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "Rejected":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {userData?.name || "User"} 👋</h1>
        <p className="text-gray-600">Manage your applications and explore new opportunities.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          to="/user-services"
          className="p-6 bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Search className="w-8 h-8" />
            <div>
              <h2 className="text-xl font-semibold">Browse Services</h2>
              <p className="text-gray-200">Explore and apply for new services.</p>
            </div>
          </div>
          <ArrowRight className="w-6 h-6" />
        </Link>
        <Link
          to="/profile"
          className="p-6 bg-gray-700 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <User className="w-8 h-8" />
            <div>
              <h2 className="text-xl font-semibold">Edit Profile</h2>
              <p className="text-gray-200">Update your personal information.</p>
            </div>
          </div>
          <ArrowRight className="w-6 h-6" />
        </Link>
      </div>

      {/* Applied Services Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Your Applications</h2>
        {appliedServices.length > 0 ? (
          <div className="space-y-4">
            {appliedServices.map(service => (
              <div
                key={service.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{service.serviceName}</h3>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(service.status)}
                    <span className={`font-semibold ${service.status === "Approved" ? "text-green-600" : service.status === "Rejected" ? "text-red-600" : "text-yellow-600"}`}>
                      {service.status}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mt-2">Applied on: {new Date(service.createdAt?.toDate()).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-600">You haven't applied for any services yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;