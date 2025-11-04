"use client";
import { GiHouse } from "react-icons/gi";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Github,
  MessageCircle,
  Send,
  MessageSquare,
  Music,
  Dribbble,
  Palette,
  Play,
  Users,
  BookOpen,
  AtSign,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useGeneralSettings } from "@/app/context/GeneralSettingsContext";
import Image from "next/image";

const SOCIAL_ICONS = {
  facebook: { icon: Facebook, color: "hover:bg-blue-600" },
  twitter: { icon: Twitter, color: "hover:bg-sky-500" },
  instagram: { icon: Instagram, color: "hover:bg-pink-600" },
  linkedin: { icon: Linkedin, color: "hover:bg-blue-700" },
  youtube: { icon: Youtube, color: "hover:bg-red-600" },
  github: { icon: Github, color: "hover:bg-gray-700" },
  discord: { icon: MessageCircle, color: "hover:bg-indigo-600" },
  telegram: { icon: Send, color: "hover:bg-sky-600" },
  whatsapp: { icon: MessageSquare, color: "hover:bg-green-600" },
  tiktok: { icon: Music, color: "hover:bg-black" },
  pinterest: { icon: Dribbble, color: "hover:bg-pink-500" },
  dribbble: { icon: Dribbble, color: "hover:bg-pink-600" },
  behance: { icon: Palette, color: "hover:bg-blue-600" },
  twitch: { icon: Play, color: "hover:bg-purple-600" },
  reddit: { icon: Users, color: "hover:bg-orange-600" },
  medium: { icon: BookOpen, color: "hover:bg-gray-700" },
  mastodon: { icon: AtSign, color: "hover:bg-purple-700" },
};

const QUICK_LINKS = [
  { name: "About", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
  { name: "News letter", href: "/newsletter" },
  { name: "How we work", href: "/how-we-work" },
  { name: "FAQ", href: "/faqs" },
];

const SHOWCASE_LINKS = [
  { name: "Partners", href: "/partners" },
  { name: "Certifications", href: "/certifications" },
  { name: "Projects", href: "/projects" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Why Choose Us", href: "/why-choose-us" },
  { name: "Gallery", href: "/gallery" },
];

function Footer() {
  const [email, setEmail] = useState("");
  const { settings } = useGeneralSettings();

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/subscribers/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await response.json();
      if (response.ok) {
        setEmail("");
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
    }
  };

  return (
    <footer className="bg-black text-white">
      <div className="bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center md:text-left">
              Join Newsletter
            </h2>
            <form
              className="flex flex-wrap md:flex-nowrap w-auto md:w-auto"
              onSubmit={handleForm}
            >
              <input
                type="email"
                placeholder="Your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[180px] sm:w-80 px-4 py-3 bg-gray-800 text-white placeholder-gray-500 rounded-l-full focus:outline-none focus:ring-0"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white px-4 md:px-6 py-3 rounded-r-full font-semibold transition-colors duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-1 z-20 mb-3">
              {settings?.logo && (
                <div className="w-10 h-10 lg:w-12 lg:h-12 relative">
                  <Image
                    src={settings?.logo}
                    alt="Company Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <span className="text-xl lg:text-2xl font-bold">
                {settings?.companyName}
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Construct is a trusted construction company committed to quality,
              innovation, and reliability. We deliver efficient and lasting
              solutions for residential, commercial, and infrastructure
              projects.
            </p>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-6">Quick Link</h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-6">Showcase</h3>
            <ul className="space-y-3">
              {SHOWCASE_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div>
                <span className="text-primary font-semibold">Email:</span>
                <span className="text-gray-400 ml-2">{settings?.email}</span>
              </div>
              <div>
                <span className="text-primary font-semibold">Phone:</span>
                <span className="text-gray-400 ml-2">{settings?.phone}</span>
              </div>
              <div>
                <span className="text-primary font-semibold">Work Time:</span>
                <span className="text-gray-400 ml-1">
                  {settings?.officeHours}
                </span>
              </div>
              <div>
                <span className="text-primary font-semibold">Address:</span>
                <span className="text-gray-400 ml-2 break-words">
                  {settings?.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Social Media Icons */}
        {settings?.socialLinks && settings.socialLinks.length > 0 && (
          <div className="mb-8 min-h-5">
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {settings.socialLinks
                .filter((link) => link.url)
                .map((link) => {
                  const socialConfig =
                    SOCIAL_ICONS[link.platform as keyof typeof SOCIAL_ICONS];
                  if (!socialConfig) return null;
                  const Icon = socialConfig.icon;
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-gray-800 ${socialConfig.color} transition-colors duration-200 flex items-center justify-center`}
                      aria-label={link.platform}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
            </div>
          </div>
        )}

        <div className="border-t border-gray-800 pt-6">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Powered by{" "}
            <Link
              className="hover:underline hover:text-app-bg"
              href="https://sysfoc.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Sysfoc website"
            >
              Sysfoc.
            </Link>{" "}
            All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
