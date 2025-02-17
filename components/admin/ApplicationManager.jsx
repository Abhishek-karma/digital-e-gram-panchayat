import { useState, useEffect } from "react";
import { collection, onSnapshot, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import { toast } from "react-hot-toast";
import { CheckCircle, Clock, XCircle, AlertCircle, RefreshCw } from "lucide-react";

const ApplicationManager = ({
  applicationsCollection = "applications",
  servicesCollection = "services",
  usersCollection = "users",
  allowedStatuses = ["Pending", "Approved", "Rejected"],
  title = "Manage Applications"
}) => {
  const [applications, setApplications] = useState([]);
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [statusUpdates, setStatusUpdates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch applications
    const unsubscribeApps = onSnapshot(collection(db, applicationsCollection), (snapshot) => {
      setApplications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    // Fetch services
    const unsubscribeServices = onSnapshot(collection(db, servicesCollection), (snapshot) => {
      setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Fetch users
    const unsubscribeUsers = onSnapshot(collection(db, usersCollection), (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeApps();
      unsubscribeServices();
      unsubscribeUsers();
    };
  }, []);

  // Get user display name based on userId from applications
  const getUserDisplayName = (userId) => {
    if (!userId || !users.length) return "Unknown User";
    const user = users.find(user => user.id === userId || user.uid === userId);
    return user?.name || user?.email || "Unknown User";
  };

  // Get service name based on serviceId
  const getServiceDisplayName = (serviceId) => {
    if (!serviceId || !services.length) return "Unknown Service";
    return services.find(s => s.id === serviceId)?.name || "Unknown Service";
  };

  // Format Firestore timestamp
  const formatFirestoreTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    try {
      const date = timestamp?.toDate?.() || new Date(timestamp.seconds * 1000);
      return date.toLocaleString();
    } catch {
      return "Invalid Date";
    }
  };

  // Handle status selection
  const handleStatusChange = (applicationId, newStatus) => {
    setStatusUpdates(prev => ({ ...prev, [applicationId]: newStatus }));
  };

  // Handle status update
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
      console.error("Update error:", error);
    }
  };

  // Get status indicator icon
  const getStatusIndicator = (status) => {
    const baseStyle = "w-5 h-5";
    switch (status) {
      case "Approved": return <CheckCircle className={`${baseStyle} text-green-600`} />;
      case "Pending": return <Clock className={`${baseStyle} text-yellow-600`} />;
      case "Rejected": return <XCircle className={`${baseStyle} text-red-600`} />;
      default: return <AlertCircle className={`${baseStyle} text-gray-600`} />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600" />
      </div>
    );
  }

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
              {applications.map(application => {
                const selectedStatus = statusUpdates[application.id] || application.status;
                return (
                  <tr key={application.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium">
                      {getServiceDisplayName(application.serviceId)}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {getUserDisplayName(application.userId)}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {formatFirestoreTimestamp(application.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {formatFirestoreTimestamp(application.updatedAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {getStatusIndicator(selectedStatus)}
                        <select
                          className="border rounded px-2 py-1 text-gray-700 focus:ring-2 focus:ring-green-400"
                          value={selectedStatus}
                          onChange={(e) => handleStatusChange(application.id, e.target.value)}
                        >
                          {allowedStatuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleStatusUpdate(application.id)}
                        className={`bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition flex items-center gap-1 ${
                          selectedStatus === application.status ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={selectedStatus === application.status}
                      >
                        <RefreshCw className="w-4 h-4" />
                        Update
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApplicationManager;
