import { useState, useEffect } from "react";
import { collection, onSnapshot, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { toast } from "react-hot-toast";

const ApplicationManager = ({ 
  applicationsCollection = "applications", 
  servicesCollection = "services", 
  allowedStatuses = ["Pending", "Approved", "Rejected"],
  title = "Manage Applications"
}) => {
  const [applications, setApplications] = useState([]);
  const [services, setServices] = useState([]);
  const [statusUpdates, setStatusUpdates] = useState({});

  // Fetch applications and services
  useEffect(() => {
    const unsubscribeApps = onSnapshot(collection(db, applicationsCollection), (snapshot) => {
      setApplications(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    const unsubscribeServices = onSnapshot(collection(db, servicesCollection), (snapshot) => {
      setServices(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeApps();
      unsubscribeServices();
    };
  }, [applicationsCollection, servicesCollection]);

  // Format timestamp safely
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    if (timestamp?.toDate) return timestamp.toDate().toLocaleDateString();
    if (timestamp?.seconds) return new Date(timestamp.seconds * 1000).toLocaleDateString();
    return "Invalid Date";
  };

  // Get service name by ID safely
  const getServiceName = (serviceId) => {
    if (!serviceId || !services.length) return "Unknown Service";
    return services.find((service) => service.id === serviceId)?.name || "Unknown Service";
  };

  // Handle status change in dropdown
  const handleStatusChange = (applicationId, newStatus) => {
    setStatusUpdates((prev) => ({ ...prev, [applicationId]: newStatus }));
  };

  // Submit status update
  const handleStatusUpdate = async (applicationId) => {
    if (!statusUpdates[applicationId]) return;

    try {
      await updateDoc(doc(db, applicationsCollection, applicationId), {
        status: statusUpdates[applicationId],
        updatedAt: serverTimestamp(),
      });
      toast.success("Status updated successfully!");
    } catch (error) {
      toast.error("Error updating status");
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">{title}</h2>

      {applications.length === 0 ? (
        <p className="text-gray-500 text-center">No applications found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                <th className="px-4 py-3 text-left">Service</th>
                <th className="px-4 py-3 text-left">Applicant</th>
                <th className="px-4 py-3 text-left">Submitted</th>
                <th className="px-4 py-3 text-left">Last Updated</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{getServiceName(application.serviceId)}</td>
                  <td className="px-4 py-3 text-gray-600">{application.userId}</td>
                  <td className="px-4 py-3 text-gray-500">{formatTimestamp(application.submittedAt)}</td>
                  <td className="px-4 py-3 text-gray-500">{formatTimestamp(application.updatedAt)}</td>
                  <td className="px-4 py-3">
                    <select
                      className="border rounded px-2 py-1 text-gray-700 focus:ring-2 focus:ring-green-400"
                      value={statusUpdates[application.id] || application.status}
                      onChange={(e) => handleStatusChange(application.id, e.target.value)}
                    >
                      {allowedStatuses.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleStatusUpdate(application.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApplicationManager;
