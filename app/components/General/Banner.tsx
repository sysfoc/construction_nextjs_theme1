'use client';
import React from "react";
import Image from "next/image";
import SlantedButton from "../General/buttons/SlantedButton";
import { useRouter } from "next/navigation";

const ConstructionCTA: React.FC = () => {
  const router = useRouter();
  return (
    <div className="relative w-full h-80 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/worker_03.jpg"
          alt="Construction worker"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-8 tracking-wide">
          Construction Projects
        </h2>
        <div className="flex sm:flex-row flex-col gap-4">
       <SlantedButton text="How we work" onClick={() => router.push("/how-we-work")}/>
       <SlantedButton text="Book Service" onClick={() => router.push("/book-service")}/>
        </div>
      </div>
    </div>
  );
};

export default ConstructionCTA;
