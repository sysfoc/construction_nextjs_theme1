// app/portfolio/page.tsx
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { isPageVisible } from "@/lib/api/pageVisibility";
import { useRouter } from "next/navigation";

interface Project {
  id: string;
  title: string;
  category: string;
  photos: string[];
}

export default function PortfolioClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
    checkVisibility();
  }, [router]);

  const checkVisibility = async () => {
    const visible = await isPageVisible("portfolio");
    setIsVisible(visible);
    if (!visible) {
      router.push("/not-found");
    }
  };
  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/portfolio");
      const data = await response.json();
      const fetchedProjects: Project[] = data.projects || [];
      setProjects(fetchedProjects);
      setFilteredProjects(fetchedProjects);

      const uniqueCategories = Array.from(
        new Set(fetchedProjects.map((p) => p.category))
      ).filter(Boolean);
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (category: string) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => p.category === category));
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <section className="px-4 max-w-5xl mx-auto py-16">
        <div>
          <span className="text-primary">Our best portfolio</span>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-bold">Our portfolio</h2>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-sm">
                We&apos;ve grown up with the internet revolution, and we know
                how to deliver on its promise of improved business
              </p>
            </div>
          </div>

          {/* Dynamic category filters */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleFilter("All")}
              className={`py-2 px-6 rounded-full text-xs cursor-pointer uppercase ${
                activeCategory === "All"
                  ? "bg-primary text-white"
                  : "border border-black dark:border-white"
              }`}
            >
              See all
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`py-2 px-6 rounded-full text-xs cursor-pointer uppercase ${
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "border border-black dark:border-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filtered Projects */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <div key={project.id}>
              {project.photos.length > 0 ? (
                <Image
                  src={project.photos[0] || "/placeholder.svg"}
                  alt={project.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No image</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
