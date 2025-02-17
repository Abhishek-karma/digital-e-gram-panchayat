// ManageServices.jsx
import { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import { toast } from "react-hot-toast";
import { Edit, Trash2, Check, X } from "lucide-react";

const ManageServices = ({ services = [], refreshServices }) => {
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpdateService = async (e) => {
    e.preventDefault();
    if (!editingService) return;

    setLoading(true);
    try {
      await updateDoc(doc(db, "services", editingService.id), editingService);
      toast.success("Service updated successfully!");
      setEditingService(null);
      refreshServices();
    } catch (error) {
      toast.error("Failed to update service");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    
    setLoading(true);
    try {
      await deleteDoc(doc(db, "services", serviceId));
      toast.success("Service deleted successfully!");
      refreshServices();
    } catch (error) {
      toast.error("Failed to delete service");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Edit className="w-6 h-6 text-blue-600" />
        Manage Services
      </h2>

      {services.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No services available</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {services.map((service) => (
            <div key={service.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{service.name}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                  {service.requiredDocuments?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {service.requiredDocuments.map((doc) => (
                        <span
                          key={doc}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                        >
                          {doc}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingService(service)}
                    className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-100"
                    disabled={loading}
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-gray-100"
                    disabled={loading}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Service</h3>
            <form onSubmit={handleUpdateService} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Service Name</label>
                <input
                  value={editingService.name}
                  onChange={(e) => setEditingService(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={editingService.description}
                  onChange={(e) => setEditingService(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg h-32"
                  required
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  ) : (
                    <Check className="w-5 h-5" />
                  )}
                  Update Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServices;