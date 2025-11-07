// app/portfolio/page.tsx
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { isPageVisible } from "@/lib/api/pageVisibility";
import { useRouter } from "next/navigation";
import { Layers, Grid3x3 } from "lucide-react";

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
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (!isVisible) {
    return null;
  }

  return (
    <section className="px-6 max-w-7xl mx-auto py-12">
      {/* Header Section */}
      <div className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end">
          {/* Left Side - Title */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-5 h-5 text-primary" />
              <span className="text-primary text-sm font-semibold uppercase tracking-wide">Our best portfolio</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground dark:text-white">Our Portfolio</h2>
          </div>
          
          {/* Right Side - Description */}
          <div>
            <p className="text-sm text-paragraph dark:text-gray-300 leading-relaxed">
              We&apos;ve grown up with the internet revolution, and we know how to deliver on its promise of improved business
            </p>
          </div>
        </div>

        {/* Category Filters - Horizontal Tabs */}
        <div className="mt-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => handleFilter("All")}
              className={`px-5 py-2.5 text-sm font-semibold transition-all relative ${
                activeCategory === "All"
                  ? "text-primary"
                  : "text-gray-600 dark:text-gray-400 hover:text-primary"
              }`}
            >
              See All
              {activeCategory === "All" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
              )}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`px-5 py-2.5 text-sm font-semibold transition-all relative ${
                  activeCategory === cat
                    ? "text-primary"
                    : "text-gray-600 dark:text-gray-400 hover:text-primary"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
            <Grid3x3 className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">No projects found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-background dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                {project.photos.length > 0 ? (
                  <Image
                    src={project.photos[0] || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400 text-sm">No image</span>
                  </div>
                )}
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-lg mb-1">{project.title}</h3>
                    <p className="text-white/80 text-xs">{project.category}</p>
                  </div>
                </div>
              </div>

              {/* Info Section - Visible by Default */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-foreground dark:text-white text-sm mb-1 truncate">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{project.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}