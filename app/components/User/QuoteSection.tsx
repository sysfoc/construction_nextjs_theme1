"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronsDown } from "lucide-react";

export default function QuoteSection() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    details: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/book-service/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        alert("Booking submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          date: "",
          details: "",
        });
      } else {
        alert(`${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Server error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-auto">
      {/* Full-Width Top Image */}
      <div className="relative w-full">
        <Image
          src="/worker_01.jpg"
          alt="Worker at Construction Site"
          width={1920}
          height={600}
          className="w-full h-auto object-cover"
          priority
        />
        <div className="absolute hidden md:block  top-1/2 left-6 sm:left-12 transform -translate-y-1/2 text-white max-w-xl space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight drop-shadow-md">
            Schedule your service to receive personalized consultation and
            professional support.
          </h2>
          <span className="flex gap-2 text-primary taxt-sm font-bold">
            BOOK YOUR SERVICE NOW
            <ChevronsDown />
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative bg-background w-full flex justify-center -mt-20 px-3 sm:px-4">
        <div className="z-10 max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 shadow-lg">
          {/* Left Section */}
          <div className="hidden md:flex items-stretch justify-end p-0 m-0">
            <Image
              src="/quote_01.jpg"
              alt="Construction Equipment"
              width={300}
              height={400}
              className="object-contain"
            />
          </div>

          {/* Right Form Section */}
          <div className="bg-background p-5 sm:p-6 md:p-8 flex flex-col justify-center">
            <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-paragraph text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 py-2 px-2.5 sm:py-2.5 sm:px-3 text-xs sm:text-sm focus:outline-none focus:border-gray-500 dark:focus:border-gray-400 rounded"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-paragraph dark:text-gray-200 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 py-2 px-2.5 sm:py-2.5 sm:px-3 text-xs sm:text-sm focus:outline-none focus:border-gray-500 dark:focus:border-gray-400 rounded"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-paragraph dark:text-gray-200 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 py-2 px-2.5 sm:py-2.5 sm:px-3 text-xs sm:text-sm focus:outline-none focus:border-gray-500 dark:focus:border-gray-400 rounded"
                  />
                </div>
              </div>

              {/* Service Type */}
              <div>
                <label
                  htmlFor="service"
                  className="block text-paragraph dark:text-gray-200 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2"
                >
                  Service Type
                </label>
                <select
                  id="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 py-2 px-2.5 sm:py-2.5 sm:px-3 text-xs sm:text-sm focus:outline-none focus:border-gray-500 dark:focus:border-gray-400 rounded"
                >
                  <option value="">Select a service</option>
                  <option>Residential Construction</option>
                  <option>Commercial Renovation</option>
                  <option>Site Inspection</option>
                  <option>Material Supply</option>
                  <option>Custom Project</option>
                </select>
              </div>

              {/* Preferred Date */}
              <div>
                <label
                  htmlFor="date"
                  className="block text-paragraph text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2"
                >
                  Preferred Date
                </label>
                <input
                  id="date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 py-2 px-2.5 sm:py-2.5 sm:px-3 text-xs sm:text-sm focus:outline-none focus:border-gray-500 dark:focus:border-gray-400 rounded"
                />
              </div>

              {/* Project Details */}
              <div>
                <label
                  htmlFor="details"
                  className="block text-paragraph text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2"
                >
                  Project Details
                </label>
                <input
                  id="details"
                  type="text"
                  required
                  placeholder="Describe your project..."
                  value={formData.details}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 py-2 px-2.5 sm:py-2.5 sm:px-3 text-xs sm:text-sm focus:outline-none focus:border-gray-500 dark:focus:border-gray-400 rounded"
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary rounded-md dark:bg-primary text-primary-foreground px-3 py-2 font-semibold text-xs sm:text-sm h-10 sm:h-[42px]"
                >
                  {loading ? "Submitting..." : "Book Appointment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
