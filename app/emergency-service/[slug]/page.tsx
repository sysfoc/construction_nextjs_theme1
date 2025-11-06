// app/emergency-service/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Mail as MailIcon, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface EmergencyService {
  _id: string;
  title: string;
  slug: string;
  image: string;
  calloutPrice: number;
  price: number;
  responseTime: string;
  whatWeHelpWith: string[];
}

interface Settings {
  emergencyEmail?: string;
  emergencyPhone?: string;
}

export default function EmergencyServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [service, setService] = useState<EmergencyService | null>(null);
  const [settings, setSettings] = useState<Settings>({
    emergencyEmail: "",
    emergencyPhone: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const [servicesRes, settingsRes] = await Promise.all([
          fetch("/api/emergency-services"),
          fetch("/api/emergency-services/settings"),
        ]);

        if (!servicesRes.ok) throw new Error("Failed to fetch services");
        if (!settingsRes.ok) throw new Error("Failed to fetch settings");

        const allServices = await servicesRes.json();
        const settingsData = await settingsRes.json();

        const foundService = allServices.find(
          (s: EmergencyService) => s.slug === slug
        );

        if (!foundService) {
          router.push("/emergency-service");
          return;
        }

        setService(foundService);
        setSettings({
          emergencyEmail: settingsData.emergencyEmail || "",
          emergencyPhone: settingsData.emergencyPhone || "",
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, router]);

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto min-h-[400px]">
        <div className="px-6 sm:px-12 py-12 text-center">
          <p className="text-gray-600">Loading service details...</p>
        </div>
      </main>
    );
  }

  if (error || !service) {
    return (
      <main className="max-w-6xl mx-auto">
        <div className="px-6 sm:px-12 py-12 text-center text-red-600">
          <p>Error: {error || "Service not found"}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 sm:px-12 py-10 bg-background">
        <div className="flex flex-col justify-center order-2 md:order-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-header-text mb-4">
            {service.title}
          </h1>
          <p className="text-sm sm:text-base mb-4 leading-relaxed text-paragraph">
            Professional {service.title.toLowerCase()} emergency response
            available 24/7. Our certified team handles urgent situations with
            expertise and care.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-background rounded border border-gray-200">
              <p className="text-xs font-semibold mb-1 text-primary">
                CALLOUT FEE
              </p>
              <p className="text-xl font-bold text-header-text">
                ${service.calloutPrice}
              </p>
            </div>
            <div className="p-3 bg-background rounded border border-gray-200">
              <p className="text-xs font-semibold mb-1 text-primary">
                RESPONSE TIME
              </p>
              <p className="text-xl font-bold text-header-text">
                {service.responseTime}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <a
              href={`https://wa.me/${settings.emergencyPhone?.replace(
                /\D/g,
                ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg"
            >
              <MessageCircle size={20} className="text-primary" />
              <div className="text-left">
                <p className="text-xs text-paragraph font-semibold">
                  Quick Response via WhatsApp
                </p>
                <p className="text-sm font-medium text-primary break-all">
                  {settings.emergencyPhone}
                </p>
              </div>
            </a>
            <a
              href={`mailto:${settings.emergencyEmail}`}
              className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg"
            >
              <MailIcon size={20} className="text-primary" />
              <div className="text-left">
                <p className="text-xs text-paragraph font-semibold">
                  Email for Support
                </p>
                <p className="text-sm font-medium text-primary break-all">
                  {settings.emergencyEmail}
                </p>
              </div>
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center rounded overflow-hidden h-60 sm:h-80 order-1 md:order-2">
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <Image
              src={service.image || "/placeholder.svg"}
              alt={service.title}
              width={1024}
              height={1024}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* What We Help With Section */}
      <section className="px-6 sm:px-12 py-8 bg-background">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-header-text">
          In What {service.title} Emergencies We Can Help You With
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {service.whatWeHelpWith.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2
                size={20}
                className="text-primary flex-shrink-0 mt-0.5"
              />
              <p className="text-sm text-paragraph">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 sm:px-12 py-8 bg-background">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-header-text">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              title: "Call Us Immediately",
              description:
                "Contact our emergency team as soon as you discover the issue. Our dispatch center is available 24/7.",
            },
            {
              step: "2",
              title: "Expert Assessment",
              description:
                "Our certified technician will assess the situation and provide immediate recommendations.",
            },
            {
              step: "3",
              title: "Professional Resolution",
              description:
                "We resolve the emergency efficiently with quality materials and guaranteed workmanship.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-background p-5 rounded border border-gray-200"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-lg mb-3">
                {item.step}
              </div>
              <h3 className="text-base font-bold mb-2 text-header-text">
                {item.title}
              </h3>
              <p className="text-sm text-paragraph leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="px-6 sm:px-12 py-10 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-header-text">
            Need Immediate Assistance?
          </h2>
          <p className="text-sm sm:text-base mb-6 text-paragraph">
            Our emergency response team is ready to help you 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${settings.emergencyPhone?.replace(
                /\D/g,
                ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 text-base font-bold text-primary-foreground rounded bg-green-600 hover:bg-green-700 inline-flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle size={20} />
              WhatsApp Now
            </a>
            <a
              href={`mailto:${settings.emergencyEmail}`}
              className="px-8 py-3 text-base font-bold text-primary-foreground rounded bg-primary hover:bg-primary/90 inline-flex items-center justify-center gap-2 transition-colors"
            >
              <MailIcon size={20} />
              Send Email
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
