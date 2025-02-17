import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase.config";
import { collection, getDocs, addDoc, query, where, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { Loader2, CheckCircle, Send } from "lucide-react"; // Import Lucide icons

const ServicePage = () => {
  const { currentUser } = useAuth();
  const [services, setServices] = useState([]);
  const [appliedServiceIds, setAppliedServiceIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "services"));
        const serviceList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setServices(serviceList);
      } catch (error) {
        console.error("Error fetching services:", error);
        toast.error("Failed to load services.");
      } finally {
        setLoading(false);
      }
    };

    const fetchAppliedServices = async () => {
      if (!currentUser) return;
      try {
        const q = query(collection(db, "applications"), where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        const appliedList = new Set(querySnapshot.docs.map(doc => doc.data().serviceId));
        setAppliedServiceIds(appliedList);
      } catch (error) {
        console.error("Error fetching applied services:", error);
        toast.error("Failed to load applied services.");
      }
    };

    fetchServices();
    fetchAppliedServices();
  }, [currentUser]);

  const handleApply = async (service) => {
    if (!currentUser) {
      toast.error("You must be logged in to apply.");
      return;
    }

    try {
      await addDoc(collection(db, "applications"), {
        userId: currentUser.uid,
        serviceId: service.id,
        serviceName: service.name,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      toast.success("Application submitted successfully!");
      setAppliedServiceIds(prev => new Set(prev).add(service.id));
    } catch (error) {
      console.error("Error applying for service:", error);
      toast.error("Failed to apply.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-blue-600" /> {/* Lucide spinner */}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-2">
        Available Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <div key={service.id} className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              {service.name}
            </h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            {appliedServiceIds.has(service.id) ? (
              <div className="flex items-center gap-2 text-green-600 font-bold mt-2">
                <CheckCircle className="w-5 h-5" /> {/* Lucide check icon */}
                <span>Applied</span>
              </div>
            ) : (
              <button
                onClick={() => handleApply(service)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg w-full transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" /> {/* Lucide send icon */}
                <span>Apply</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;