"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const AgencyFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(1);

  const faqs: FAQItem[] = [
    {
      question: "What is Agency ?",
      answer:
        "Improve efficiency, provide a better customer experience with modern technolo services available around Improve efficiency, provide a better customer experience",
    },
    {
      question: "Nulla vitae est risus. Aenean aliquam dolor a massa",
      answer:
        "Improve efficiency, provide a better customer experience with modern technolo services available around Improve efficiency, provide a better customer experience",
    },
    {
      question: "Pellentesque habitant morbi tristique senectus ?",
      answer:
        "Improve efficiency, provide a better customer experience with modern technolo services available around Improve efficiency, provide a better customer experience",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const companies = [
    { name: "Clutch", image: "/companies/clutch.png" },
    { name: "Google", image: "/companies/google.png" },
    { name: "LinkedIn", image: "/companies/linkedIn.png" },
    { name: "Balkan", image: "/companies/balkan.png" },
    { name: "Alfred", image: "/companies/alfred.png" },
  ];

  return (
    <div className="w-full bg-[var(--color-background)] text-[var(--color-foreground)] py-6 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className="relative w-full max-w-md mx-auto aspect-[4/3]">
            <Image
              src="/workers_02.png"
              alt="Construction workers"
              fill
              className="object-contain"
              priority
            />

            {/* Badge */}
            <div className="absolute top-40 left-16 hidden md:flex items-center justify-center w-20 h-20 bg-[var(--color-primary-foreground)] rounded-full shadow-lg">
              {/* Wrapper is relative so children can be absolutely centered */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Circular Text Image */}
                <Image
                  src="/text.png"
                  alt="Watch Video Text"
                  fill
                  className="object-contain scale-90"
                />

                {/* Play Icon */}
                <Play className="absolute w-5 h-5 text-[var(--color-primary)] " />
              </div>
            </div>
          </div>

          {/* Right Side - FAQ */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-[var(--color-border)] pb-4"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-start justify-between gap-4 text-left group"
                >
                  <h3 className="text-lg font-semibold text-[var(--color-header-text)] transition-colors group-hover:text-[var(--color-primary)]">
                    {faq.question}
                  </h3>
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-[var(--color-primary)] text-2xl font-light transition-transform duration-300">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-40 opacity-100 mt-3"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-[var(--color-paragraph)] text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Companies Section */}
        <div className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 md:gap-14 lg:gap-28">
            {companies.map((company, index) => (
              <div
                key={index}
                className="relative w-24 h-12 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <Image
                  src={company.image}
                  alt={company.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyFAQ;
