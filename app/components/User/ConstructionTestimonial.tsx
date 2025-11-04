import React from "react";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const ConstructionTestimonial: React.FC = () => {
  const teamMembers: TeamMember[] = [
    { name: "John Smith", role: "CEO of Data group", image: "/teamMember_01.png" },
    { name: "Peter parker", role: "CEO of News group", image: "/teamMember_01.png" },
    { name: "Thamos Miller", role: "CEO Built Builder", image: "/teamMember_01.png" },
  ];

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
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative flex-shrink-0 w-10 h-10">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover border border-[var(--color-border)] shadow-md"
                    />
                    {index === 0 && (
                      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[var(--color-border)] rounded-full border border-[var(--color-background)]" />
                    )}
                    {index === 2 && (
                      <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[var(--color-border)] rounded-full border border-[var(--color-background)]" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--color-header-text)] leading-tight">{member.name}</h3>
                    <p className="text-xs text-[var(--color-primary)] font-medium leading-tight">{member.role}</p>
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
              {[...Array(5)].map((_, i) => (
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
              For each project we establish relationships with partners who we know will
              help us create added value for your project. As well as bringing together
              the public and private sectors to ensure meaningful collaboration.
            </p>

            {/* Author */}
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/teamMember_01.png"
                  alt="John Smith"
                  fill
                  className="rounded-full object-cover border border-[var(--color-border)] shadow-sm"
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[var(--color-header-text)] leading-tight">John Smith</h4>
                <p className="text-xs text-[var(--color-primary)] font-medium leading-tight">
                  CEO of Data group
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionTestimonial;
