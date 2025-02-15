import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import { useAuth } from "../../context/AuthContext";

const useFetchUserData = () => {
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!currentUser) return;

                const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                } else {
                    setError("User data not found");
                }
            } catch (err) {
                setError("Failed to fetch user data");
                console.error("Fetch error:", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [currentUser]);

    return { userData, setUserData, loading, error };
};

export default useFetchUserData;
