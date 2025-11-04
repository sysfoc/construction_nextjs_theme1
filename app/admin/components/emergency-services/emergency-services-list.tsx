"use client"

import type { EmergencyService } from "./emergency-services-form"

interface ServicesListProps {
  services: EmergencyService[]
  loading: boolean
  onEdit: (service: EmergencyService) => void
  onDelete: (id: string) => void
  onAddNew: () => void
}

export function EmergencyServicesList({ services, loading, onEdit, onDelete, onAddNew }: ServicesListProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Services ({services.length})</h2>
        <button
          onClick={onAddNew}
          className="w-full sm:w-auto px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg"
        >
          Add Emergency Service
        </button>
      </div>

      {loading ? (
        <div className="p-4 sm:p-8 text-center text-gray-500">Loading services...</div>
      ) : services.length === 0 ? (
        <div className="p-4 sm:p-8 text-center text-gray-500">No services created yet</div>
      ) : (
        <div className="divide-y divide-gray-200">
          {services.map((service: EmergencyService) => (
            <div key={service._id} className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between mb-3 gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">{service.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Slug: {service.slug}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
                <div>
                  <p className="text-gray-600">
                    Callout Price: <span className="font-semibold text-gray-900">${service.calloutPrice}</span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">
                    Service Price: <span className="font-semibold text-gray-900">${service.price}</span>
                  </p>
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <p className="text-gray-600">
                    Response Time: <span className="font-semibold text-gray-900">{service.responseTime}</span>
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">What We Help With:</p>
                <div className="flex flex-wrap gap-1">
                  {service.whatWeHelpWith.map((item: string, idx: number) => (
                    <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row max-w-96 gap-2">
                <button
                  onClick={() => onEdit(service)}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(service._id)}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
