import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { ClockLoader } from "react-spinners";
import { User, Phone, MapPin, Save, ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import useFetchUserData from "../src/hooks/useFetchUserData";

const EditProfilePage = () => {
    const navigate = useNavigate();
    const { userData, setUserData, loading, error } = useFetchUserData();
    const [isUpdating, setIsUpdating] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true);

        try {
            if (!userData) throw new Error("User not authenticated");

            await updateDoc(doc(db, "users", userData.uid), {
                name: userData.name,
                phone: userData.phone,
                address: userData.address,
            });

            toast.success("Profile updated successfully!");
            navigate("/profile");
        } catch (err) {
            toast.error("Failed to update profile");
            console.error("Update error:", err.message);
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <ClockLoader color="#3B82F6" size={50} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500 text-xl">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="px-6 py-5 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center gap-3">
                        <User size={36} className="text-white" />
                        <div>
                            <h1 className="text-3xl font-bold text-white">Edit Profile</h1>
                            <p className="mt-1 text-sm text-blue-100">
                                Update your personal information
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="px-6 py-5 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                <User size={18} className="text-blue-500" /> Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={userData?.name || ""}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                <Phone size={18} className="text-green-500" /> Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={userData?.phone || ""}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                <MapPin size={18} className="text-purple-500" /> Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={userData?.address || ""}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={() => navigate("/profile")}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <ArrowLeft size={16} className="mr-2" /> Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isUpdating}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <Save size={16} className="mr-2" />
                                {isUpdating ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;
