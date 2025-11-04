// app/about/components/AboutBlogSection.tsx
"use client";
import React from "react";
import Image from "next/image";

export default function BlogSection() {
  return (
    <div className="bg-header-background dark:bg-header-background py-12">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Card 1 */}
          <div className="group cursor-pointer">
            {/* Image Container */}
            <div className="relative h-[200px] bg-primary mb-2 overflow-hidden rounded-tl-[80px] rounded-tr-lg">
              <Image
                src="/services/service_06.png"
                alt="Finding hidden Gems of this sort to play creativity"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Author Info Overlay */}
              <div className="absolute bottom-3 left-3 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-sm overflow-hidden bg-header-background dark:bg-header-background">
                  <Image
                    src="/About/worker.jpg"
                    alt="BUILDEXO"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-primary-foreground">
                  <p className="text-xs font-medium opacity-80">BY POST</p>
                  <p className="text-sm font-bold">CONSTRUCT</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-4">
              <div className="flex items-center gap-2">
                <span className="text-primary dark:text-primary text-xs font-bold tracking-wide">
                  LATEST POST
                </span>
                <span className="text-primary dark:text-primary text-xs font-bold">
                  /
                </span>
                <span className="text-primary dark:text-primary text-xs font-bold tracking-wide">
                  JULY 26, 2023
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-[--page-heading] dark:text-hero-heading leading-snug group-hover:text-primary transition-colors">
                Finding hidden Gems of this sort to play creativity
              </h3>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group cursor-pointer">
            {/* Image Container */}
            <div className="relative h-[200px] bg-primary mb-2 overflow-hidden rounded-tr-[80px] rounded-tl-lg">
              <Image
                src="/services/service_06.png"
                alt="The rest of us Avoid Common Issues to get stuck"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Author Info Overlay */}
              <div className="absolute bottom-3 left-3 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-sm overflow-hidden bg-header-background dark:bg-header-background">
                  <Image
                    src="/About/worker.jpg"
                    alt="BUILDEXO"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-primary-foreground">
                  <p className="text-xs font-medium opacity-80">BY POST</p>
                  <p className="text-sm font-bold">CONSTRUCT</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-4">
              <div className="flex items-center gap-2">
                <span className="text-primary dark:text-primary text-xs font-bold tracking-wide">
                  LATEST POST
                </span>
                <span className="text-primary dark:text-primary text-xs font-bold">
                  /
                </span>
                <span className="text-primary dark:text-primary text-xs font-bold tracking-wide">
                  JULY 25, 2023
                </span>
              </div>
              <h3 className=" text-lg md:text-xl font-bold text-[--page-heading] dark:text-hero-heading leading-snug group-hover:text-primary transition-colors">
                The rest of us Avoid Common Issues to get stuck
              </h3>
            </div>
          </div>
        </div>

        {/* More Explore Button */}
        <div className="flex justify-center">
          <button className="bg-primary hover:opacity-90 text-primary-foreground font-bold text-sm tracking-wide px-10 py-4 rounded transition-opacity uppercase">
            MORE EXPLORE
          </button>
        </div>
      </div>
    </div>
  );
}