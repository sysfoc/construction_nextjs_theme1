"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function QuoteSection() {
  const [selectedService, setSelectedService] = useState<"gray" | "premium">(
    "gray"
  );
  const [houseArea, setHouseArea] = useState("");
  const [constructionStory, setConstructionStory] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="relative w-full h-auto bg-white dark:bg-gray-900">
      {/* Full-Width Top Image */}
      <div className="w-full">
        <Image
          src="/worker_01.jpg"
          alt="Worker at Construction Site"
          width={1920}
          height={600}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="relative w-full flex justify-center -mt-20 px-3 sm:px-4">
        <div className="z-10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 shadow-lg bg-white dark:bg-gray-800">
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
          <div className="bg-white dark:bg-gray-800 p-5 sm:p-6 md:p-8 flex flex-col justify-center">
            <form className="space-y-4 sm:space-y-5">
              {/* House Area */}
              <div>
                <label className="block text-gray-800 dark:text-gray-200 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                  House Area
                </label>
                <select
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 py-2 px-2.5 sm:py-2.5 sm:px-3 text-xs sm:text-sm focus:outline-none focus:border-gray-500 dark:focus:border-gray-400 rounded"
                  value={houseArea}
                  onChange={(e) => setHouseArea(e.target.value)}
                >
                  <option value="">Choose Area</option>
                  <option value="3-marla">3 Marla</option>
                  <option value="5-marla">5 Marla</option>
                  <option value="7-marla">7 Marla</option>
                  <option value="10-marla">10 Marla</option>
                  <option value="1-kanal">1 Kanal</option>
                </select>
              </div>

              {/* Construction Story & Room */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-gray-800 dark:text-gray-200 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                    Construction Story
                  </label>
                  <select
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 py-2 px-2.5 sm:py-2.5 sm:px-3 text-xs sm:text-sm focus:outline-none focus:border-gray-500 dark:focus:border-gray-400 rounded"
                    value={constructionStory}
                    onChange={(e) => setConstructionStory(e.target.value)}
                  >
                    <option value="">Choose Story</option>
                    <option value="ground">Ground Floor</option>
                    <option value="1">1 Story</option>
                    <option value="2">2 Story</option>
                    <option value="3">3 Story</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-800 dark:text-gray-200 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                    Room
                  </label>
                  <select
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 py-2 px-2.5 sm:py-2.5 sm:px-3 text-xs sm:text-sm focus:outline-none focus:border-gray-500 dark:focus:border-gray-400 rounded"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                  >
                    <option value="">Choose Rooms</option>
                    <option value="2">2 Rooms</option>
                    <option value="3">3 Rooms</option>
                    <option value="4">4 Rooms</option>
                    <option value="5">5 Rooms</option>
                    <option value="6">6+ Rooms</option>
                  </select>
                </div>
              </div>

              {/* Building Services Buttons */}
              <div>
                <label className="block text-gray-800 dark:text-gray-200 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                  Building Services
                </label>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedService("gray")}
                    className={`w-full sm:w-1/2 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm transition-all ${
                      selectedService === "gray"
                        ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                        : "bg-primary/10 dark:bg-primary text-primary dark:text-primary/10 hover:bg-primary/10 dark:hover:bg-primary"
                    }`}
                  >
                    A+ Gray Structure
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedService("premium")}
                    className={`w-full sm:w-1/2 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm transition-all ${
                      selectedService === "premium"
                         ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                        : "bg-primary/10 dark:bg-primary text-primary dark:text-primary/10 hover:bg-primary/10 dark:hover:bg-primary"
                    }`}
                  >
                    Premium Finishing
                  </button>
                </div>
              </div>

              {/* Quote Section */}
              <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-3">
                <button
                  type="button"
                  className="bg-black dark:bg-gray-900 text-white px-3 py-2 font-semibold text-xs sm:text-sm h-[40px] sm:h-[42px]"
                >
                  Get Quote Now
                </button>
                <div className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 dark:text-gray-200 px-3 font-bold text-base sm:text-lg flex items-center h-[40px] sm:h-[42px]">
                  $ 80000
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}