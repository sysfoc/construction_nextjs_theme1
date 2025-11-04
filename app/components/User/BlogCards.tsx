import React from "react";
import Image from "next/image";

interface BlogPost {
  date: string;
  title: string;
  author: string;
  image: string;
}

const BlogCards: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      date: "17\nJul 2023",
      title: "Just Because You Work Hard Successful.",
      author: "buildevo",
      image: "/priceCard/priceCard_03.png",
    },
    {
      date: "17\nJul 2023",
      title: "Solution For New Construction.",
      author: "buildevo",
      image: "/priceCard/priceCard_04.png",
    },
    {
      date: "17\nJul 2023",
      title: "What is the best time of year to repair your roof?",
      author: "buildevo",
      image: "/priceCard/priceCard_01.png",
    },
  ];

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full h-56">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-bold text-center leading-tight w-16 h-16 flex flex-col items-center justify-center transform -skew-x-6">
                  <span className="text-2xl">{post.date.split("\n")[0]}</span>
                  <span className="text-xs">{post.date.split("\n")[1]}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-100 mt-auto">
                  By <span className="text-gray-900 dark:text-gray-100">{post.author}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCards;
