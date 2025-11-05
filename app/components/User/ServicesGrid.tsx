"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import SolidButton from "../General/buttons/SolidButton"
import Link from "next/link"

interface Service {
  id: string
  type: "service" | "button"
  icon?: string
  title?: string
  subtitle?: string
  description?: string
  buttonText?: string
  buttonUrl?: string
}

export default function ServicesGrid() {
  const [services, setServices] = useState<Service[]>([])
  const [button, setButton] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/services")
      const data = await res.json()

      const allServices = data.services || []
      const buttonService = allServices.find((s: Service) => s.type === "button")
      const regularServices = allServices.filter((s: Service) => s.type === "service")

      setServices(regularServices)
      setButton(buttonService || null)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="py-12 dark:bg-gray-900">
        <div className="container mx-auto px-5 sm:px-16 flex items-center justify-center min-h-96">
          <p className="text-gray-600 dark:text-gray-400">Loading services...</p>
        </div>
      </div>
    )
  }

  return (
    <div className=" py-12 dark:bg-gray-900">
      <div className="container mx-auto px-5  sm:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <div key={service.id} className="bg-gray-50 dark:bg-gray-900 p-5 relative group">
              {/* Icon and Title Row */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <Image
                    src={service.icon || "/placeholder.svg"}
                    alt={service.title || "Service"}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-black dark:text-gray-200 font-bold text-lg leading-tight">
                    {service.title || "Service"}
                  </h3>
                  <h3 className="text-black dark:text-gray-200 font-semibold text-sm leading-tight">
                    {service.subtitle || "Subtitle"}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {service.description || "No description available"}
              </p>

              {/* Diagonal Orange Line */}
              <div className="absolute bottom-0 right-0 w-24 h-4 bg-[var(--color-primary)] transform origin-left clip-bottom-side"></div>
            </div>
          ))}

          <div className="bg-white dark:bg-gray-800 p-6 flex items-center justify-center">
            {button && (
              <Link href={button.buttonUrl || "#"}>
                <SolidButton text={button.buttonText || "GET STARTED"} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
