"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceItem {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
}

interface ServicesData {
  services: ServiceItem[];
}

interface ServicesAndTeamSectionProps {
  data: ServicesData;
}

const teamMembers = [
  {
    img: "/Team/teamMember_01.png",
    name: "Marc Chiasson",
    role: "Head Railway Construction",
  },
  {
    img: "/Team/teamMember_02.png",
    name: "Marc Boucher",
    role: "Head Railway Construction",
  },
  {
    img: "/Team/teamMember_03.png",
    name: "Mitchel Johnson",
    role: "Head Railway Construction",
  },
];

export default function ServicesAndTeamSection({
  data,
}: ServicesAndTeamSectionProps) {
  if (!data || !data.services || data.services.length === 0) {
    return null;
  }

  return (
    <>
      {/* Services Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-4 lg:py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
          {data.services.map((service, index) => (
            <div
              key={index}
              className="relative bg-header-background dark:bg-header-background border-2 border-dashed border-border dark:border-border rounded-b-[5rem] p-3 sm:p-4 text-center flex flex-col justify-between h-[420px] overflow-hidden transition-colors"
            >
              {/* Image Wrapper */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-0 w-20 h-28 sm:w-24 sm:h-32 lg:w-28 lg:h-36 overflow-visible">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-contain object-top"
                />
              </div>

              {/* Content */}
              <div className="mt-32 px-2">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-5 sm:mb-6 leading-tight text-(--page-heading) dark:text-hero-heading whitespace-pre-line">
                  {service.title}
                </h3>
                <p className="text-paragraph dark:text-paragraph text-xs sm:text-sm mb-8 sm:mb-10 leading-snug">
                  {service.description}
                </p>
              </div>

              {/* Button */}
              <Link
                href={service.buttonUrl || "#"}
                className=" text-primary-foreground w-[80%] mx-auto py-2 sm:py-2.5 mb-5 rounded-t-full bg-primary transition-colors inline-flex items-center justify-center gap-2"
              >
                <span className="text-sm sm:text-base">{service.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-4 lg:py-6 flex justify-center">
        <div className="flex flex-col sm:flex-row items-stretch border-2 border-dashed border-border dark:border-border rounded-r-full overflow-hidden transition-colors">
          {/* Left Text Box */}
          <div className="bg-header-background dark:bg-header-background px-4 py-2.5 text-center sm:text-left flex items-center justify-center">
            <span className="text-primary dark:text-primary font-medium text-sm sm:text-base leading-tight">
              Offering High Quality Construction Solutions
            </span>
          </div>

          {/* Right Button */}
          <button className="bg-primary text-primary-foreground px-6 py-2.5 font-medium text-sm sm:text-base hover:opacity-90 transition-opacity">
            Build Your Dream Now
          </button>
        </div>
      </div>

      {/* Team Section */}
      <div className="relative w-full">
        {/* Background Image */}
        <div className="relative w-full h-[250px] dark:opacity-40">
          <Image
            src="/bgTeam.jpg"
            alt="Team Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Team Cards Section */}
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-12 -mt-52 py-6 lg:py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-10 lg:gap-0">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-start group">
                {/* Image + White Background */}
                <div className="relative h-[280px] mb-4 w-[80%]">
                  <div className="absolute bg-white dark:bg-header-background rounded-t-[4rem] w-[125%] h-[80%] top-[20%] left-[-2.5%] "></div>
                  <div className="relative h-[280px] w-auto aspect-[3/4] z-10 mx-auto">
                    <Image
                      src={member.img || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Name + Role */}
                <div className="bg-gray-200 text-gray-800 relative top-2 left-[-2%] px-3 py-3 -mt-6 rounded-bl-3xl w-[85%] text-left ">
                  <h3 className="text-sm font-bold leading-tight ">
                    {member.name}
                  </h3>
                  <p className="text-xs leading-snug">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
