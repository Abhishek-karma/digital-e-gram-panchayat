// ListServices.jsx
import React from 'react';
import { FileText } from 'lucide-react';

const ListServices = ({ 
  title = "Available Services", 
  services = [], 
  onServiceClick 
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FileText className="w-6 h-6 text-blue-600" />
        {title}
      </h2>

      {services.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No services available</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {services.map(service => (
            <div
              key={service.id}
              className="p-4 border rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
              onClick={() => onServiceClick?.(service)}
            >
              <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{service.description}</p>
              {service.requiredDocuments?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {service.requiredDocuments.map(doc => (
                    <span
                      key={doc}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {doc}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListServices;