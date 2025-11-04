"use client";
import type React from "react";
import { useEffect, useState } from "react";
import { Users, Award, Shield, Clock } from "lucide-react";
import Image from "next/image";
import { isPageVisible } from "@/lib/api/pageVisibility";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  imageSrc: string;
  title: string;
  description: string;
  budget: string;
  duration: string;
  certifications: string[];
  imagePosition: "left" | "right";
}

interface Stat {
  id: string;
  statKey: string;
  value: string;
}

interface Partner {
  id: string;
  name: string;
  logo: string;
}

const STAT_LABELS: Record<string, string> = {
  activePartnerships: "Active Partnerships",
  projectValue: "Combined Project Value",
  safetyCompliance: "Safety Compliance Rate",
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  imageSrc,
  title,
  description,
  budget,
  duration,
  certifications,
  imagePosition,
}) => {
  return (
    <div
      className={`flex ${
        imagePosition === "left"
          ? "flex-col lg:flex-row"
          : "flex-col lg:flex-row-reverse"
      } gap-0 mb-8 lg:mb-4 overflow-hidden rounded-lg shadow-lg max-w-6xl mx-auto`}
    >
      {/* Image Section */}
      <div className="w-full lg:w-2/5 relative h-64 sm:h-72 lg:h-64 bg-white">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover lg:object-contain"
        />
      </div>

      {/* Text Section */}
      <div className="w-full lg:w-3/5 bg-gray-50 dark:bg-gray-900 px-4 lg:px-6 py-4 lg:py-6 flex flex-col justify-center">
        <h3 className="text-lg md:text-xl font-bold text-[var(--page-heading)] mb-2">
          {title}
        </h3>
        <p className="text-sm md:text-base text-[var(--paragraph-color)] leading-relaxed mb-3">
          {description}
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-[var(--primary)] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">
                Duration
              </p>
              <p className="text-xs md:text-sm font-medium text-[var(--paragraph-color)]">
                {duration}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-[var(--primary)] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">
                Safety Rating
              </p>
              <p className="text-xs md:text-sm font-medium text-[var(--paragraph-color)]">
                ISO 45001 Certified
              </p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="flex flex-wrap gap-1.5">
          {certifications.map((cert, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-white text-xs font-medium text-[var(--paragraph-color)] rounded-full border border-[var(--border-color)]"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const PartnersClient: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [partnersLoading, setPartnersLoading] = useState(true);

  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchData();
    checkVisibility();
  }, [router]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/partners");
      const data = await response.json();
      setStats(data.stats || []);
      setPartners(data.partners || []);
    } catch (error) {
      console.error("Error fetching partners data:", error);
    } finally {
      setPartnersLoading(false);
    }
  };

  const checkVisibility = async () => {
    const visible = await isPageVisible("partners");
    setIsVisible(visible);
    if (!visible) {
      router.push("/not-found");
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-6 h-6 md:w-7 md:h-7 text-[var(--primary)]" />
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--page-heading)]">
              Strategic Partnerships
            </h2>
          </div>
          <p className="text-sm md:text-base text-[var(--paragraph-color)] max-w-3xl mb-6">
            We forge strategic alliances with industry-leading construction
            firms, engineering consultancies, and infrastructure developers. Our
            partnership framework emphasizes collaborative project delivery,
            risk mitigation, and value engineering to achieve superior outcomes.
          </p>

          {/* Partnership Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
            {stats.map((stat) => (
              <div key={stat.id} className="flex items-start gap-2">
                <Award className="w-5 h-5 text-[var(--primary)] mt-0.5" />
                <div>
                  <p className="text-xl md:text-2xl font-bold text-[var(--page-heading)]">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm text-[var(--paragraph-color)]">
                    {STAT_LABELS[stat.statKey]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partners Slider Section */}
      <section className="py-6 lg:py-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h3 className="text-base md:text-lg font-semibold text-[var(--page-heading)] mb-6 lg:mb-3 text-center">
            Our Trusted Partners
          </h3>

          {partnersLoading ? (
            <div className="w-full min-h-[120px] flex items-center justify-center">
              <p className="text-gray-600 text-lg">Loading Partners...</p>
            </div>
          ) : (
            <div className="relative overflow-hidden">
              <div className="flex animate-marquee whitespace-nowrap">
                {partners.map((p) => (
                  <div
                    key={p.id}
                    className="flex-shrink-0 flex flex-col items-center mx-8 lg:mx-10"
                  >
                    <div className="w-20 h-14 lg:w-28 lg:h-18 bg-white rounded-lg shadow-sm flex items-center justify-center hover:shadow-md transition p-2 relative">
                      <Image
                        src={p.logo || "/placeholder.svg"}
                        alt={p.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="mt-2 text-xs text-[var(--paragraph-color)] font-medium text-center">
                      {p.name}
                    </span>
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                {partners.map((p) => (
                  <div
                    key={`${p.id}-duplicate`}
                    className="flex-shrink-0 flex flex-col items-center mx-8 lg:mx-10"
                  >
                    <div className="w-20 h-14 lg:w-28 lg:h-18 bg-white rounded-lg shadow-sm flex items-center justify-center hover:shadow-md transition p-2 relative">
                      <Image
                        src={p.logo || "/placeholder.svg"}
                        alt={p.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="mt-2 text-xs text-[var(--paragraph-color)] font-medium text-center">
                      {p.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <style jsx>{`
            @keyframes marquee {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .animate-marquee {
              animation: marquee 30s linear infinite;
            }
            .hover\\:pause:hover {
              animation-play-state: paused;
            }
          `}</style>
        </div>
      </section>

      {/* Project Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <ProjectCard
          imageSrc="/partners/construction01 (1).png"
          title="Underground Infrastructure Development"
          description="Collaborating with specialized tunnel engineering firms, we execute complex underground infrastructure projects including metro systems, highway tunnels, and utility corridors."
          budget="$12 million"
          duration="24 Months"
          certifications={["ISO 9001", "LEED Certified", "BIM Level 2"]}
          imagePosition="right"
        />

        <ProjectCard
          imageSrc="/partners/construction01 (2).png"
          title="Commercial & High-Rise Construction"
          description="Partnering with renowned architectural firms and structural engineers, we deliver landmark commercial buildings and high-rise developments."
          budget="$12 million"
          duration="18 Months"
          certifications={[
            "OSHA Compliant",
            "Green Building",
            "Quality Assured",
          ]}
          imagePosition="left"
        />
      </div>
    </div>
  );
};

export default PartnersClient;