import React, { useState, useEffect } from "react";
import ManageServices from "./ManageServices";
import CreateService from "./CreateService";
import ListServices from "../../common-components/ListServices";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

const Services = () => {
    const [services, setServices] = useState([]);

    // Function to refresh services
    const fetchServices = () => {
        const q = query(collection(db, "services"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return unsubscribe;
    };

    useEffect(() => {
        const unsubscribe = fetchServices();
        return () => unsubscribe();
    }, []);

    return (
        <div>
            {/* ✅ Pass refresh function to CreateService */}
            <CreateService refreshServices={fetchServices} />
            <ListServices services={services} />
            <ManageServices services={services} refreshServices={fetchServices} />
        </div>
    );
};

export default Services;
