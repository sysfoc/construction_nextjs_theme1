"use client";
import { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Users,
  TrendingUp,
  Layers,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { ProjectData } from "@/lib/models/Project";
import SlantedButton from "../General/buttons/SlantedButton";
import Loader from "../General/Loader";

const statusConfig = {
  ongoing: {
    label: "Ongoing",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    dotColor: "bg-blue-500",
  },
  completed: {
    label: "Completed",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    borderColor: "border-green-200 dark:border-green-800",
    dotColor: "bg-green-500",
  },
  upcoming: {
    label: "Upcoming",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    borderColor: "border-amber-200 dark:border-amber-800",
    dotColor: "bg-amber-500",
  },
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "ongoing" | "completed" | "upcoming"
  >("all");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setProjects(data);
      setFilteredProjects(data.slice(0, 3));
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
      setFilteredProjects(projects.slice(0, 3));
    } else {
      const filtered = projects.filter((p) => p.status === filter);
      setFilteredProjects(filtered.slice(0, 3));
    }
  };

  if (loading) {
    return <Loader height="623px" />;
  }

  return (
    <section className="px-6 max-w-6xl mx-auto py-6 min-h-[623px]">
      {/* Centered Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 bg-primary/10 rounded-full">
          <Layers className="w-3.5 h-3.5 text-primary" />
          <span className="text-primary text-xs font-bold uppercase">Featured Work</span>
        </div>
        <p className="text-paragraph dark:text-gray-400 text-xs max-w-xl mx-auto mb-4">
          Explore our recent construction and development projects
        </p>

        {/* Centered Pill Filters */}
        <div className="flex justify-center flex-wrap gap-2">
          {(["all", "ongoing", "completed", "upcoming"] as const).map(
            (filter) => (
              <button
                key={filter}
                onClick={() => handleFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-background border border-gray-300 dark:border-gray-700 text-paragraph hover:border-primary"
                }`}
              >
                {filter}
              </button>
            )
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12 bg-background rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-2">
            <Layers className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-paragraph/70 dark:text-gray-400 text-xs">
            No {activeFilter !== "all" ? activeFilter : ""} projects available.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="group relative bg-background rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-primary transition-all duration-300 flex flex-col"
            >
              {/* Image with Category Badge */}
              <div className="relative h-40 overflow-hidden flex-shrink-0">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Team Count - Bottom Right on Image */}
                <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full">
                  <Users className="w-3 h-3 text-primary" />
                  <span className="text-xs font-bold text-foreground dark:text-white">{project.team} employees</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                {/* Title and Status Row */}
                <div className="mb-2">
                  <h3 className="text-base font-bold text-foreground dark:text-white mb-1.5 line-clamp-1">
                    {project.title}
                  </h3>
                  
                  {/* Status Indicator */}
                  <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${statusConfig[project.status].bgColor} ${statusConfig[project.status].borderColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[project.status].dotColor} animate-pulse`}></span>
                    <span className={`text-xs font-bold ${statusConfig[project.status].color}`}>
                      {statusConfig[project.status].label}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-paragraph/80 dark:text-gray-400 mb-3 line-clamp-2 flex-grow">
                  {project.description}
                </p>

                {/* Progress Section for Ongoing */}
                {project.status === "ongoing" && project.progress !== undefined && (
                  <div className={`mb-3 p-2.5 rounded-lg ${statusConfig[project.status].bgColor} border ${statusConfig[project.status].borderColor}`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-5 h-5 rounded-full ${statusConfig[project.status].bgColor} flex items-center justify-center border ${statusConfig[project.status].borderColor}`}>
                          <TrendingUp className={`w-3 h-3 ${statusConfig[project.status].color}`} />
                        </div>
                        <span className={`text-xs font-bold ${statusConfig[project.status].color}`}>
                          Progress
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className={`text-sm font-bold ${statusConfig[project.status].color}`}>
                          {project.progress}
                        </span>
                        <span className={`text-xs font-semibold ${statusConfig[project.status].color}/70`}>
                          %
                        </span>
                      </div>
                    </div>
                    <div className="relative w-full bg-white dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${statusConfig[project.status].dotColor}`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Location and Date Row */}
                <div className="grid grid-cols-2 gap-2 mt-auto">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-xs text-paragraph dark:text-gray-400 truncate">
                      {project.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-xs text-paragraph dark:text-gray-400 truncate">
                      {project.startDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Centered Button */}
      {filteredProjects.length > 0 && (
        <div className="flex justify-center">
          <SlantedButton
            text="View All Projects"
            onClick={() => router.push("/projects")}
          />
        </div>
      )}
    </section>
  );
}