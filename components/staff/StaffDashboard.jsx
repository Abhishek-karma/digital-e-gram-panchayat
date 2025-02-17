import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import ListServices from "../../common-components/ListServices";
import ApplicationManager from "../admin/ApplicationManager";

const StaffDashboard = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "services"), (snapshot) => {
      setServices(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Staff Dashboard</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading services...</p>
      ) : (
        <>
          <ListServices
            services={services}
            onSelectService={setSelectedService}
            selectedService={selectedService}
          />
          <ApplicationManager/>
        </>
      )}
    </div>
  );
};

export default StaffDashboard;
