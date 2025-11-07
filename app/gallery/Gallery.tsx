"use client"

import { useState, useEffect } from "react"
import { isPageVisible } from "@/lib/api/pageVisibility"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Play, ImageIcon } from "lucide-react"

interface GalleryCategory {
  _id: string
  name: string
}

interface GalleryImage {
  _id: string
  categoryId: string
  src: string
  type: "photo" | "video"
}

export default function Gallery() {
  const [activeAlbum, setActiveAlbum] = useState<string | null>(null)
  const [categories, setCategories] = useState<GalleryCategory[]>([])
  const [allImages, setAllImages] = useState<GalleryImage[]>([])
  const [isVisible, setIsVisible] = useState(true)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkVisibility = async () => {
      const visible = await isPageVisible("gallery")
      setIsVisible(visible)
      if (!visible) {
        router.push("/not-found")
      }
    }
    checkVisibility()
  }, [router])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/gallery")
        const data = await response.json()

        setCategories(data.categories || [])
        setAllImages(data.images || [])

        if (data.categories && data.categories.length > 0) {
          setActiveAlbum("All")
        }
      } catch (error) {
        console.error("Error fetching gallery data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (isVisible) {
      fetchData()
    }
  }, [isVisible])

  if (!isVisible) {
    return null
  }

  if (loading) {
    return (
      <main className="min-h-screen text-gray-900 dark:text-gray-100 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Loading gallery...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const filteredItems =
    activeAlbum === "All"
      ? allImages
      : allImages.filter((img) => {
          const category = categories.find((c) => c._id === img.categoryId)
          return category?.name === activeAlbum
        })

  return (
    <main className="min-h-screen text-gray-900 dark:text-gray-100 px-6 py-12">
      <section className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 bg-primary rounded-full"></div>
            <h1 className="text-3xl font-bold text-primary uppercase tracking-tight">Project Gallery</h1>
          </div>
          <p className="dark:text-gray-300 text-paragraph text-sm max-w-2xl pl-6">
            Explore our work through photos and videos. Browse by category to see construction, renovation, and on-site
            progress.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setActiveAlbum("All")}
              className={`px-5 py-2.5 text-sm font-semibold transition-all relative ${
                activeAlbum === "All"
                  ? "text-primary"
                  : "text-gray-600 dark:text-gray-400 hover:text-primary"
              }`}
            >
              All
              {activeAlbum === "All" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
              )}
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setActiveAlbum(category.name)}
                className={`px-5 py-2.5 text-sm font-semibold transition-all relative ${
                  activeAlbum === category.name
                    ? "text-primary"
                    : "text-gray-600 dark:text-gray-400 hover:text-primary"
                }`}
              >
                {category.name}
                {activeAlbum === category.name && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">No media found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="group relative bg-background dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary transition-all duration-300"
              >
                {/* Media Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {item.type === "photo" ? (
                    <>
                      <Image
                        src={item.src || "/placeholder.svg"}
                        alt="Gallery item"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <ImageIcon className="w-4 h-4 text-white" />
                      </div>
                    </>
                  ) : (
                    <>
                      <video
                        controls
                        autoPlay
                        muted
                        loop
                        src={item.src}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 text-white" />
                      </div>
                    </>
                  )}
                </div>

                {/* Category Label */}
                <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-semibold text-paragraph dark:text-gray-300 truncate">
                    {categories.find((c) => c._id === item.categoryId)?.name || "Uncategorized"}
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}