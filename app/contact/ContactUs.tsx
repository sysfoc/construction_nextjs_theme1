// app/contact/contactUs.tsx
"use client";
import { useState, useEffect } from "react";
import { isPageVisible } from "@/lib/api/pageVisibility";
import { useRouter } from "next/navigation";

export default function ContactUs() {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const checkVisibility = async () => {
      const visible = await isPageVisible("contact");
      setIsVisible(visible);
      if (!visible) {
        router.push("/not-found");
      }
    };
    checkVisibility();
  }, [router]);

  if (!isVisible) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };
  return (
    <main className="min-h-screen">
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-[#ff6600]">Contact Us</h1>
          <p className="text-lg">
            We’d love to hear from you. Reach out using the form or the details
            below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-[#ff6600]">
                Company Information
              </h2>
              <p className="mb-2">
                <strong>Address:</strong> 1234 Example Street, Karachi, Pakistan
              </p>
              <p className="mb-2">
                <strong>Phone:</strong>{" "}
                <a
                  href="tel:+923001234567"
                  className="hover:underline text-[#ff6600]"
                >
                  +92 300 1234567
                </a>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:info@example.com"
                  className="hover:underline text-[#ff6600]"
                >
                  info@example.com
                </a>
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.144267764765!2d67.0011!3d24.8607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33a958b1e2f13%3A0x58d395a23e9399a4!2sKarachi!5e0!3m2!1sen!2s!4v1697030139015!5m2!1sen!2s"
                width="100%"
                height="300"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
          <form
            className="p-8 rounded-2xl shadow-md border border-gray-100 space-y-6"
            onSubmit={handleFormData}
          >
            <h2 className="text-2xl font-semibold text-[#ff6600] mb-4">
              Send Us a Message
            </h2>

            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6600]"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6600]"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6600]"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#ff6600] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
