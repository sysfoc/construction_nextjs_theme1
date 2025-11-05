"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Testimonial {
  id: string;
  name: string;
  designation: string;
  photo: string | null;
  stars: number;
  comment: string;
}

const ConstructionTestimonial: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials");
        const data = await response.json();
        setTestimonials(data.testimonials?.slice(0, 3) || []);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) return null;

  const selectedTestimonial = testimonials[selectedIndex];

  return (
    <section className="relative w-full min-h-[45vh] sm:min-h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/construction_01.jpg"
          alt="Construction background"
          fill
          priority
          quality={100}
          className="object-cover object-top sm:object-center"
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/90 via-[var(--color-background)]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 md:gap-10 items-center bg-[var(--color-background)]/75 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-10 border border-[var(--color-border)]">
          
          {/* Left Side - Team Members */}
          <div className="flex flex-col justify-center space-y-4">
            {testimonials.map((member, index) => (
              <div 
                key={member.id} 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setSelectedIndex(index)}
              >
                <div className="flex items-center gap-2">
                  <div className="relative flex-shrink-0 w-10 h-10">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="rounded-full object-cover border border-[var(--color-border)] shadow-md"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gray-200 border border-[var(--color-border)] shadow-md" />
                    )}
                    {index === 0 && (
                      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[var(--color-border)] rounded-full border border-[var(--color-background)]" />
                    )}
                    {index === 2 && (
                      <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[var(--color-border)] rounded-full border border-[var(--color-background)]" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--color-header-text)] leading-tight">{member.name}</h3>
                    <p className="text-xs text-[var(--color-primary)] font-medium leading-tight">{member.designation}</p>
                  </div>
                </div>
                <div className="w-0.5 h-10 bg-[var(--color-primary)] hidden md:block" />
              </div>
            ))}
          </div>

          {/* Right Side - Testimonial */}
          <div className="flex flex-col justify-center">
            {/* Stars */}
            <div className="flex gap-0.5 mb-2">
              {[...Array(selectedTestimonial.stars)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 fill-[var(--color-primary)]"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-[var(--color-paragraph)] text-sm md:text-base leading-relaxed mb-3">
              {selectedTestimonial.comment}
            </p>

            {/* Author */}
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10 flex-shrink-0">
                {selectedTestimonial.photo ? (
                  <Image
                    src={selectedTestimonial.photo}
                    alt={selectedTestimonial.name}
                    fill
                    className="rounded-full object-cover border border-[var(--color-border)] shadow-sm"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-200 border border-[var(--color-border)] shadow-sm" />
                )}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[var(--color-header-text)] leading-tight">{selectedTestimonial.name}</h4>
                <p className="text-xs text-[var(--color-primary)] font-medium leading-tight">
                  {selectedTestimonial.designation}
                </p>
              </div>
            </div>

            {/* View All Button */}
            <button
              onClick={() => router.push("/testimonials")}
              className="mt-4 text-xs text-[var(--color-primary)] font-semibold hover:underline self-start"
            >
              View All Testimonials →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionTestimonial;