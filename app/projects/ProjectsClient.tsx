// app/projects/page.tsx
"use client";
import { useState, useEffect } from "react";
import { Calendar, MapPin, Users } from "lucide-react";
import type { ProjectData } from "@/lib/models/Project";
import { isPageVisible } from "@/lib/api/pageVisibility";
import { useRouter } from "next/navigation";

const statusConfig = {
  ongoing: {
    label: "Ongoing",
    color: "bg-blue-100 text-blue-800",
    dotColor: "bg-blue-500",
  },
  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-800",
    dotColor: "bg-green-500",
  },
  upcoming: {
    label: "Upcoming",
    color: "bg-amber-100 text-amber-800",
    dotColor: "bg-amber-500",
  },
};

export default function ProjectsClient() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "ongoing" | "completed" | "upcoming"
  >("all");
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
    checkVisibility();
  }, [router]);

  const checkVisibility = async () => {
    const visible = await isPageVisible("projects");
    setIsVisible(visible);
    if (!visible) {
      router.push("/not-found");
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setProjects(data);
      setFilteredProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (
    filter: "all" | "ongoing" | "completed" | "upcoming"
  ) => {
    setActiveFilter(filter);
    if (filter === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => p.status === filter));
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-600">Loading projects...</p>
      </div>
    );
  }
  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Main Content */}
      <section className="px-4 max-w-6xl mx-auto py-10">
        {/* Header */}
        <div className="mb-8">
          <span className="text-primary font-semibold text-sm uppercase tracking-wide">
            Our Projects
          </span>
          <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-page-heading">
                Active & Completed Projects
              </h2>
              <p className="text-page-heading/70 mt-1">
                Showcasing our portfolio of successful infrastructure and
                construction projects
              </p>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleFilter("all")}
              className={`py-1.5 px-5 rounded-full text-sm font-medium cursor-pointer transition-all ${
                activeFilter === "all"
                  ? "bg-primary text-white shadow-lg"
                  : "border border-page-heading text-page-heading hover:border-primary hover:text-primary"
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => handleFilter("ongoing")}
              className={`py-1.5 px-5 rounded-full text-sm font-medium cursor-pointer transition-all ${
                activeFilter === "ongoing"
                  ? "bg-primary text-white shadow-lg"
                  : "border border-page-heading text-page-heading hover:border-primary hover:text-primary"
              }`}
            >
              Ongoing
            </button>
            <button
              onClick={() => handleFilter("completed")}
              className={`py-1.5 px-5 rounded-full text-sm font-medium cursor-pointer transition-all ${
                activeFilter === "completed"
                  ? "bg-primary text-white shadow-lg"
                  : "border border-page-heading text-page-heading hover:border-primary hover:text-primary"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => handleFilter("upcoming")}
              className={`py-1.5 px-5 rounded-full text-sm font-medium cursor-pointer transition-all ${
                activeFilter === "upcoming"
                  ? "bg-primary text-white shadow-lg"
                  : "border border-page-heading text-page-heading hover:border-primary hover:text-primary"
              }`}
            >
              Upcoming
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="bg-background rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              {/* Image Container */}
              <div className="relative h-52 overflow-hidden bg-gray-200">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      statusConfig[project.status].color
                    }`}
                  >
                    {statusConfig[project.status].label}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-base font-bold text-paragraph mb-1.5 line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-sm text-paragraph/70 mb-3 line-clamp-2">
                  {project.description}
                </p>

                {/* Progress Bar (for ongoing projects) */}
                {project.status === "ongoing" &&
                  project.progress !== undefined && (
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-semibold text-paragraph">
                          Progress
                        </span>
                        <span className="text-xs font-bold text-primary">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                {/* Project Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-paragraph/70">
                      {project.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-paragraph/70">
                      {project.startDate}
                      {project.endDate && ` - ${project.endDate}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-paragraph/70">
                      {project.team} Team Members
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#1a2b4c]/70 text-lg">
              No projects found for this filter.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
