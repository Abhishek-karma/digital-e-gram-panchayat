import React, { useState, useEffect } from "react";
import ListServices from "../../common-components/ListServices";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

const AdminDashboard = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "services"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }); 
        return () => unsubscribe();
    }, []);

    // Handle Click (Edit/Delete Service)
    const handleServiceClick = (service) => {
        console.log("Admin Clicked Service:", service);
        // Open edit modal or perform an admin action
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            {/* ✅ Display Services in Admin Panel */}
            <ListServices 
                title="Manage Gram Panchayat Services" 
                services={services} 
                onServiceClick={handleServiceClick} 
            />
        </div>
    );
};

export default AdminDashboard;
