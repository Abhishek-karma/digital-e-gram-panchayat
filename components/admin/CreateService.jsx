// CreateService.jsx
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import { toast } from "react-hot-toast";
import { Plus, FileText, X } from "lucide-react";

const PRESET_DOCUMENTS = ["Aadhaar Card", "PAN Card", "Voter ID", "Ration Card", "Driving License"];

const CreateService = ({ refreshServices }) => {
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    requiredDocuments: [],
  });

  const handleCreateService = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "services"), {
        ...newService,
        createdAt: new Date().toISOString(),
      });
      toast.success("Service created successfully!");
      setNewService({ name: "", description: "", requiredDocuments: [] });
      refreshServices();
    } catch (error) {
      toast.error("Error creating service");
      console.error(error);
    }
  };

  const toggleDocument = (docName) => {
    setNewService(prev => ({
      ...prev,
      requiredDocuments: prev.requiredDocuments.includes(docName)
        ? prev.requiredDocuments.filter(doc => doc !== docName)
        : [...prev.requiredDocuments, docName]
    }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Plus className="w-6 h-6 text-blue-600" />
        Create New Service
      </h2>
      <form onSubmit={handleCreateService} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Service Name</label>
          <input
            type="text"
            placeholder="e.g., Passport Application"
            value={newService.name}
            onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            placeholder="Describe the service requirements..."
            value={newService.description}
            onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Required Documents</label>
          <div className="flex flex-wrap gap-2">
            {PRESET_DOCUMENTS.map((doc) => (
              <button
                type="button"
                key={doc}
                onClick={() => toggleDocument(doc)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
                  newService.requiredDocuments.includes(doc)
                    ? "bg-blue-100 border-blue-500 text-blue-700"
                    : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                } transition-colors`}
              >
                <FileText className="w-4 h-4" />
                {doc}
                {newService.requiredDocuments.includes(doc) && (
                  <X className="w-4 h-4 ml-1 text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all"
        >
          Create Service
        </button>
      </form>
    </div>
  );
};

export default CreateService;