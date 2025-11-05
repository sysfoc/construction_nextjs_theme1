"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SlantedButton from "../General/buttons/SlantedButton";
import Link from "next/link";

interface BlogPost {
  image: string;
  title: string;
  slug: string;
  blogWriter: string;
  createdAt: string;
}

const BlogCards: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog/all", {
          method: "GET",
        });
        const data = await res.json();
        setBlogPosts(data.blogs.slice(0, 3));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 py-16 px-6">
      {/* View All Blogs Button */}
      <div className="mb-8 flex justify-end">
        <SlantedButton
          text="View all Blogs"
          onClick={() => router.push("/blogs")}
        />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Link href={`/blogs/${post.slug}`} key={index}>
              <div className="flex flex-col">
                {/* Image */}
                <div className="relative w-full h-56">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground font-bold text-center leading-tight w-16 h-16 flex flex-col items-center justify-center transform -skew-x-6">
                    <span className="text-2xl">
                      {new Date(post.createdAt).getDate()}
                    </span>
                    <span className="text-xs">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-100 mt-auto">
                    By{" "}
                    <span className="text-gray-900 dark:text-gray-100">
                      {post.blogWriter}
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCards;
