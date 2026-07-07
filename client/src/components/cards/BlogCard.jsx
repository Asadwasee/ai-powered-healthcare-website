import React from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  ArrowRight,
} from "lucide-react";

function BlogCard({ blog }) {
  return (
    <article
      className="
      group
      bg-white
      rounded-3xl
      border border-gray-100
      shadow-sm
      hover:shadow-xl
      transition-all
      duration-300
      overflow-hidden
      flex
      flex-col
      h-full
      "
    >
      {/* Image */}

      <div className="relative overflow-hidden">

        <img
          src={blog.image}
          alt={blog.title}
          className="
          w-full
          h-56
          object-cover
          transition-transform
          duration-500
          group-hover:scale-105
          "
        />

        {/* Category */}

        <span
          className="
          absolute
          top-4
          left-4
          bg-primary
          text-white
          text-xs
          font-semibold
          px-3
          py-1.5
          rounded-full
          "
        >
          {blog.category}
        </span>

      </div>

      {/* Content */}

      <div className="flex flex-col flex-1 p-6">

        {/* Meta */}

        <div className="flex items-center gap-5 text-sm text-gray-500">

          <div className="flex items-center gap-2">

            <CalendarDays size={16} />

            {blog.publishDate}

          </div>

          <div className="flex items-center gap-2">

            <Clock3 size={16} />

            {blog.readTime}

          </div>

        </div>

        {/* Title */}

        <h2
          className="
          mt-4
          text-xl
          font-bold
          text-gray-900
          leading-8
          group-hover:text-primary
          transition-colors
          "
        >
          {blog.title}
        </h2>

        {/* Description */}

        <p
          className="
          mt-3
          text-gray-600
          leading-7
          line-clamp-3
          flex-1
          "
        >
          {blog.excerpt}
        </p>

        {/* Footer */}

        <div className="mt-6 flex items-center justify-between">

          <span className="text-sm font-medium text-gray-500">
            {blog.author}
          </span>

          <Link
            to={`/blog/${blog.id}`}
            className="
            inline-flex
            items-center
            gap-2
            font-semibold
            text-primary
            group-hover:gap-3
            transition-all
            "
          >
            Read More

            <ArrowRight size={18} />

          </Link>

        </div>

      </div>
    </article>
  );
}

export default BlogCard;