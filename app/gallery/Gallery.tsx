"use client"

import { useState, useEffect } from "react"
import { isPageVisible } from "@/lib/api/pageVisibility"
import { useRouter } from "next/navigation"
import Image from "next/image"

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
      <main className="min-h-screen text-gray-900 dark:text-gray-100 px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600">Loading gallery...</p>
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
    <main className="min-h-screen text-gray-900 dark:text-gray-100 px-6 py-16">
      <section className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-[#ff6600] mb-3 uppercase tracking-tight">Project Gallery</h1>
          <p className="dark:text-gray-300 max-w-2xl mx-auto">
            Explore our work through photos and videos. Browse by category to see construction, renovation, and on-site
            progress.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveAlbum("All")}
            className={`px-5 py-2 rounded-full border border-[#ff6600] text-sm font-medium transition-all ${
              activeAlbum === "All" ? "bg-[#ff6600] text-white" : "text-[#ff6600] hover:bg-[#ff6600]/10"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setActiveAlbum(category.name)}
              className={`px-5 py-2 rounded-full border border-[#ff6600] text-sm font-medium transition-all ${
                activeAlbum === category.name ? "bg-[#ff6600] text-white" : "text-[#ff6600] hover:bg-[#ff6600]/10"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
            >
              {item.type === "photo" ? (
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt="Gallery item"
                  width={600}
                  height={400}
                  className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <video controls autoPlay src={item.src} className="w-full h-56 object-cover bg-black" />
              )}
              <div className="p-4 text-center">
                <p className="text-sm font-medium dark:text-gray-300">
                  {categories.find((c) => c._id === item.categoryId)?.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center mt-10 text-gray-500 dark:text-gray-400">No media found in this category.</div>
        )}
      </section>
    </main>
  )
}
