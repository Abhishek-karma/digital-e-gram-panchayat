import { useNavigate } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import { User, Mail, Phone, MapPin, Calendar, Pencil } from "lucide-react";
import useFetchUserData from "../src/hooks/useFetchUserData";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
    const navigate = useNavigate();
    const { userData, loading, error } = useFetchUserData();
    const { currentUser } = useAuth();

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
                    {/* Profile Header */}
                    <div className="px-6 py-5 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center gap-3">
                        <User size={36} className="text-white" />
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                {userData?.name}'s Profile
                            </h1>
                            <p className="mt-1 text-sm text-blue-100">
                                {userData?.role?.charAt(0).toUpperCase() + userData?.role?.slice(1)} Account
                            </p>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="border-t border-gray-200">
                        <dl>
                            {/* Personal Information */}
                            <div className="bg-gray-50 px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 flex items-center">
                                <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                                    <User size={20} className="text-blue-500" /> Personal Information
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 space-y-2">
                                    <p><Mail size={18} className="inline text-gray-500 mr-2" /> {userData?.email}</p>
                                    <p><Phone size={18} className="inline text-gray-500 mr-2" /> {userData?.phone || 'Not provided'}</p>
                                    <p><MapPin size={18} className="inline text-gray-500 mr-2" /> {userData?.address || 'Not provided'}</p>
                                </dd>
                            </div>

                            {/* Account Information */}
                            <div className="bg-white px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 flex items-center">
                                <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                                    <Calendar size={20} className="text-green-500" /> Account Details
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 space-y-2">
                                    <p>Account ID: {currentUser?.uid}</p>
                                    <p>Account Created: {new Date(currentUser?.metadata?.creationTime).toLocaleDateString()}</p>
                                    <p>Last Login: {new Date(currentUser?.metadata?.lastSignInTime).toLocaleDateString()}</p>
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Edit Profile Button */}
                    <div className="px-6 py-4 bg-gray-50 text-right">
                        <button
                            onClick={() => navigate('/edit-profile')}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <Pencil size={16} className="mr-2" /> Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
