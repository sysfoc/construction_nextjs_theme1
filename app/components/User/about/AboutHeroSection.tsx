"use client";
import { useState } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";

import { useGeneralSettings } from "@/app/context/GeneralSettingsContext";

interface HeroData {
  heading: string;
  image: string;
  paragraph: string;
  subheadings: Array<{ title: string; description: string }>;
  buttonText: string;
  buttonUrl: string;
}

interface AboutHeroSectionProps {
  data: HeroData;
}

export default function AboutHeroSection({ data }: AboutHeroSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const { settings } = useGeneralSettings();

  if (!data || !data.heading) {
    return null;
  }

  const currentSubheading = data.subheadings?.[activeTab] || {
    title: "",
    description: "",
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-4 lg:py-10">
      <div className="flex flex-col lg:flex-row items-start justify-around gap-4 lg:gap-6">
        {/* Left Content */}
        <div className="flex-1 w-full max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex flex-col gap-0.5">
              <div className="w-0.5 h-2 bg-primary"></div>
              <div className="w-0.5 h-2 bg-primary"></div>
              <div className="w-0.5 h-2 bg-primary"></div>
            </div>
            <span className="text-primary dark:text-primary text-xs sm:text-sm font-medium">
              About Our Company
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-2 text-(--page-heading) dark:text-white">
            {data.heading}
          </h1>

          <p className="text-paragraph dark:text-gray-300 text-sm sm:text-base leading-snug mb-3 max-w-xl">
            {data.paragraph}
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
            {data.subheadings?.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === index
                    ? "bg-header-background dark:bg-header-background border-b-2 border-primary text-header-text dark:text-header-text"
                    : "bg-transparent text-paragraph dark:text-paragraph hover:text-primary"
                }`}
              >
                {data.subheadings[index]?.title}
              </button>
            ))}
          </div>

          {/* Content Box */}
          {currentSubheading && (
            <div className="bg-header-background dark:bg-header-background border-l-4 border-primary p-3 sm:p-4 mb-3 max-w-xl">
              <p className="text-paragraph dark:text-paragraph text-xs sm:text-sm leading-snug">
                {currentSubheading.description}
              </p>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <a
              href={data.buttonUrl || "#"}
              className="bg-primary text-primary-foreground px-5 sm:px-6 py-2 text-xs sm:text-sm font-medium uppercase w-full sm:w-auto hover:opacity-90 transition-opacity text-center"
            >
              {data.buttonText || "Learn More"}
            </a>
            <div className="flex items-center gap-2">
              <div className="group w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-primary flex items-center justify-center flex-shrink-0 transition-all hover:bg-primary hover:text-primary-foreground">
                <Phone className="w-4 h-4 text-primary transition-colors group-hover:text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs text-paragraph dark:text-paragraph leading-tight">
                  Want to Discuss:
                </div>
                <div className="text-base sm:text-lg font-bold leading-tight text-(--page-heading) dark:text-hero-heading">
                  {settings?.phone}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        {data.image && (
          <div className="relative flex-shrink-0 w-full lg:w-auto">
            <div className="relative w-full lg:w-80 xl:w-96 aspect-[4/5] rounded-tl-3xl overflow-hidden">
              <Image
                src={data.image || "/placeholder.svg"}
                alt="About section"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Overlay with years of experience */}
            <div className="absolute bottom-0 right-0 w-full bg-primary text-primary-foreground flex items-center px-4 py-2">
              <span className="text-5xl sm:text-6xl font-bold leading-none mr-2">
                25.
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-sm text-gray-800 font-bold uppercase">
                  Years of
                </span>
                <span className="text-lg sm:text-xl font-bold uppercase">
                  Experience
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
