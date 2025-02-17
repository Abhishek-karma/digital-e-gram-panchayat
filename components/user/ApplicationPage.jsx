import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react"; // Lucide icons for status

const ApplicationPage = () => {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!currentUser) return;
      try {
        const q = query(collection(db, "applications"), where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        const applicationList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setApplications(applicationList);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Applications</h2>
      {applications.length > 0 ? (
        <div className="space-y-6">
          {applications.map(app => (
            <div key={app.id} className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{app.serviceName}</h3>
                <div className="flex items-center gap-2">
                  {getStatusIcon(app.status)}
                  <span className={`font-semibold ${app.status === "Approved" ? "text-green-600" : app.status === "Rejected" ? "text-red-600" : "text-yellow-600"}`}>
                    {app.status}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mt-2">Applied on: {new Date(app.createdAt?.toDate()).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg">You have not applied for any services yet.</p>
        </div>
      )}
    </div>
  );
};

export default ApplicationPage;