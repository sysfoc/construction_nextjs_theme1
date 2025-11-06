"use client";
import React, { useState } from "react";
import { Check } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SolidButton from "../General/buttons/SolidButton";

interface Stat {
  number: string;
  label: string;
}

interface TabContentData {
  description: string;
  stats: Stat[];
  consulting: string[];
}

interface TabContentMap {
  architecture: TabContentData;
  renovation: TabContentData;
  material: TabContentData;
}

type TabKey = keyof TabContentMap;

export default function ConstructionSection(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<TabKey>("architecture");
  const router = useRouter();

  const tabContent: TabContentMap = {
    architecture: {
      description:
        "For each project we establish relationships with partners who we know will help us create added value for your project. As well as bringing together the public and private sectors added value for your project. As well as bringing together",
      stats: [
        { number: "434+", label: "Projects Completed" },
        { number: "20+", label: "Awards Won" },
      ],
      consulting: [
        "General Consulting",
        "Project Management",
        "Strategic Planning",
      ],
    },
    renovation: {
      description:
        "Our building renovation services transform existing structures into modern, efficient spaces. We specialize in restoring and upgrading properties while maintaining their character and ensuring compliance with current standards.",
      stats: [
        { number: "285+", label: "Buildings Renovated" },
        { number: "42+", label: "Heritage Restorations" },
      ],
      consulting: [
        "Structural Assessment",
        "Interior Redesign",
        "Energy Efficiency",
      ],
    },
    material: {
      description:
        "We provide comprehensive material supply solutions for construction projects of all scales. Our network ensures timely delivery of high-quality materials, competitive pricing, and expert guidance on material selection.",
      stats: [
        { number: "520+", label: "Supply Projects" },
        { number: "95+", label: "Partner Suppliers" },
      ],
      consulting: [
        "Material Sourcing",
        "Quality Control",
        "Logistics Management",
      ],
    },
  };

  const currentContent: TabContentData = tabContent[activeTab];

 return (
  <div className="bg-[var(--color-foreground)] text-[var(--color-primary-foreground)] dark:bg-gray-800 min-h-screen relative overflow-hidden">
    {/* Background geometric shapes */}
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-gray-800 to-transparent transform rotate-12"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-gray-800 to-transparent transform -rotate-12"></div>
    </div>

    <div className="container mx-auto px-6 py-16 relative z-10">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Left Column - Image and Financing Box */}
        <div className="flex flex-row items-end justify-center gap-0">
          {/* Construction Image */}
          <div className="hidden sm:flex flex-1 min-w-0 h-44 relative">
            <Image
              src="/priceCard/priceCard_02.png"
              alt="Construction Site"
              fill
              className="object-cover"
            />
          </div>

          {/* Mortgage Financing Box */}
          <div className="bg-[var(--color-primary)] p-8 flex flex-col justify-center items-center text-center flex-shrink-0 w-64 h-44">
            <div className="text-[var(--color-primary-foreground)] text-lg font-medium mb-2">
              Start From
            </div>
            <div className="text-[var(--color-primary-foreground)] text-xs mb-4">Mortgage Credit</div>
            <div className="text-[var(--color-primary-foreground)] text-6xl font-bold mb-4">15.5</div>
            <div className="text-[var(--color-primary-foreground)] text-sm flex items-center gap-1">
              % interest →
            </div>
          </div>
        </div>

        {/* Right Column - Tabs, Description and Stats */}
        <div className="flex flex-col justify-between">
          {/* Top Navigation Tabs */}
          <div className="flex gap-6 mb-6">
            <div className="relative">
              <button
                onClick={() => setActiveTab("architecture")}
                className={`font-medium text-sm pb-2 transition ${
                  activeTab === "architecture"
                    ? "text-[var(--color-primary-foreground)]"
                    : "text-background"
                }`}
              >
                Architecture Design
              </button>
              {activeTab === "architecture" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-primary)]"></div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setActiveTab("renovation")}
                className={`font-medium text-sm pb-2 transition ${
                  activeTab === "renovation"
                    ? "text-[var(--color-primary-foreground)]"
                    : "text-background"
                }`}
              >
                Building Renovation
              </button>
              {activeTab === "renovation" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-primary)]"></div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setActiveTab("material")}
                className={`font-medium text-sm pb-2 transition ${
                  activeTab === "material"
                    ? "text-[var(--color-primary-foreground)]"
                    : "text-background"
                }`}
              >
                Material Supply
              </button>
              {activeTab === "material" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-primary)]"></div>
              )}
            </div>
          </div>

          {/* Description Text */}
          <div className="mb-8">
            <p className="text-background text-sm leading-relaxed">
              {currentContent.description}
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Projects Completed Stat 1 */}
            <div className="flex items-start gap-4">
              <div className="md:p-3 rounded flex items-center justify-center">
                <Image
                  src="/serviceDetail/serviceDetail_02.png"
                  alt="Service Detail"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-[var(--color-primary)] text-2xl sm:text-2xl md:text-4xl lg:text-5xl font-bold">
                  {currentContent.stats[0].number}
                </div>
                <div className="text-background text-sm mt-1">
                  {currentContent.stats[0].label}
                </div>
              </div>
            </div>

            {/* Projects Completed Stat 2 */}
            <div className="flex items-start gap-4">
              <div className="md:p-3 rounded">
                <Image
                  src="/serviceDetail/serviceDetail_01.png"
                  alt="Service Detail"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-[var(--color-primary)] text-2xl sm:text-2xl md:text-4xl lg:text-5xl font-bold">
                  {currentContent.stats[1].number}
                </div>
                <div className="text-background text-sm mt-1">
                  {currentContent.stats[1].label}
                </div>
              </div>
            </div>
          </div>

          {/* Get Started Button */}
          <div className="flex sm:flex-row flex-col gap-4">
           <SolidButton text="Our Projects" onClick={() => router.push("/projects")} />
           <SolidButton text="Emergency Services" onClick={() => router.push("/emergency-services")} />
          </div>
        </div>
      </div>

      {/* Bottom Consulting Labels - Smaller and Closer */}

      <div className="flex gap-6 mt-8">
        {currentContent.consulting.map((label: string, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-[1.5px] border-[var(--color-primary)] flex items-center justify-center">
              <Check className="w-3 h-3 text-[var(--color-primary)]" />
            </div>
            <span className="text-background text-xs font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}
