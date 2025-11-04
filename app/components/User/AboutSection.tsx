'use client';
import Image from "next/image";
import SolidButton from "../General/buttons/SolidButton";
import { useRouter } from "next/navigation";

export default function AboutSection() {
  const router = useRouter();
  return (
    <section className="w-full bg-background dark:bg-gray-900 py-16 mt-10 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Images */}
          <div className="relative w-full">
            {/* Wrapper for medium to small screens */}
            <div className="flex lg:hidden gap-2 justify-center">
              {/* First image */}
              <div className="relative w-1/3 h-auto aspect-[4/5]">
                <Image
                  src="/About/constructionImage_03.png"
                  alt="Construction workers"
                  fill
                  className="object-contain"
                />
              </div>
              {/* Second image */}
              <div className="relative w-1/3 h-auto aspect-[4/5]">
                <Image
                  src="/About/constructionImage_06.png"
                  alt="Construction workers overlap"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Large screens (with overlap) */}
            <div className="hidden lg:block relative w-full h-[300px]">
              {/* Main (largest) image */}
              <div className="relative w-full h-full">
                <Image
                  src="/About/constructionImage_03.png"
                  alt="Construction workers"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Second image - overlaps top/right */}
              <div className="absolute -top-10 -right-6 w-1/2 h-[80%]">
                <Image
                  src="/About/constructionImage_06.png"
                  alt="Construction workers overlap"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Third image - only visible on large screens */}
              <div className="hidden lg:block absolute -bottom-16 left-64 w-2/5 h-[50%]">
                <Image
                  src="/About/constructionImage_07.png"
                  alt="Construction workers bottom overlap"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6">
            <p className="text-paragraph dark:text-gray-300 text-base leading-relaxed">
              For each project, we carefully establish strong relationships with
              trusted partners who can contribute genuine value to the success
              of your project. By bringing together expertise from both the
              public and private sectors, we ensure a collaborative approach
              that enhances efficiency, quality, and long-term impact. Our focus
              is not only on completing the work but also on creating
              sustainable solutions that add lasting value for our clients and
              communities.
            </p>

            {/* Awards/Certifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              {/* Certified & Awards Winner */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-7 h-7 relative">
                  <Image
                    src="/About/constructionImage_04.png"
                    alt="Certified & Awards"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-header-text dark:text-gray-200 text-lg">
                    Certified & Awards
                  </h3>
                  <p className="font-semibold text-header-text dark:text-gray-300">winner*</p>
                </div>
              </div>

              {/* Best Quality Services */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-7 h-7 relative">
                  <Image
                    src="/About/constructionImage_05.png"
                    alt="Best Quality Services"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-header-text dark:text-gray-200 text-lg">
                    Best Quality
                  </h3>
                  <p className="font-semibold text-header-text dark:text-gray-300">Services*</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <SolidButton text="Testimonials" onClick={() => router.push("/testimonials")}/>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="mt-3 p-4 sm:p-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {/* Stat 1 */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-header-text dark:text-gray-200 stroke-text">
                10
              </span>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-header-text dark:text-gray-200">
                +
              </span>
              <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-header-text dark:text-gray-200">
                COUNTRY
              </h3>
            </div>
            <p className="text-sm sm:text-base text-paragraph dark:text-gray-300">
              Construction Simulator
            </p>
          </div>

          {/* Stat 2 */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-header-text dark:text-gray-200 stroke-text">
                15
              </span>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-header-text dark:text-gray-200">
                +
              </span>
              <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-header-text dark:text-gray-200">
                PROJECT
              </h3>
            </div>
            <p className="text-sm sm:text-base text-paragraph dark:text-gray-300">
              Construction Simulator
            </p>
          </div>

          {/* Stat 3 */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-header-text dark:text-gray-200 stroke-text">
                50K
              </span>
              <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-header-text dark:text-gray-200">
                HAPPY
              </h3>
            </div>
            <p className="text-sm sm:text-base text-paragraph dark:text-gray-300">
              Professional Experience
            </p>
          </div>

          {/* Stat 4 */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-header-text dark:text-gray-200 stroke-text">
                10
              </span>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-header-text dark:text-gray-200">
                +
              </span>
              <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-header-text dark:text-gray-200">
                YEARS
              </h3>
            </div>
            <p className="text-sm sm:text-base text-paragraph dark:text-gray-300">
              Professional Experience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}