"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { isPageVisible } from "@/lib/api/pageVisibility";
import { useRouter } from "next/navigation";

interface Certification {
  _id: string;
  title: string;
  description: string;
  image: string | null;
  order: number;
}

export default function CertificationsClient() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  // 🔹 Visibility check
  useEffect(() => {
    const checkVisibility = async () => {
      const visible = await isPageVisible("certifications");
      setIsVisible(visible);
      if (!visible) {
        router.push("/not-found");
      }
    };
    checkVisibility();
  }, [router]);

  // 🔹 Fetch certifications
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await fetch("/api/certifications");
        const data = await response.json();
        setCertifications(data);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  // 🔹 Stop rendering if hidden
  if (!isVisible) {
    return null;
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-6 py-16">
        <section className="max-w-6xl mx-auto">
          <div className="text-center">
            <p className="text-gray-500">Loading certifications...</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-background px-6 py-16">
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-primary uppercase tracking-tight mb-4">
              Certifications & Licenses
            </h1>
            <p className="text-paragraph max-w-2xl mx-auto">
              Our certifications reflect our dedication to safety, quality, and
              sustainability in every construction project.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <div
                key={cert._id}
                className="bg-background/90 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  {cert.image ? (
                    <Image
                      src={cert.image || "/placeholder.svg"}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-paragraph text-sm leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {certifications.length === 0 && (
            <div className="text-center mt-10 text-gray-500 dark:text-gray-400">
              No certifications available at this moment.
            </div>
          )}
        </section>
      </main>
    </>
  );
}
