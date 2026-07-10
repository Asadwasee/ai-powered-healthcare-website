import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  User,
  CircleCheck,
  TriangleAlert,
} from "lucide-react";

import blogs from "../../constants/blogs";

function BlogDetails() {
  const { id } = useParams();

  const blog = blogs.find(
    (item) => item.id === Number(id)
  );

  if (!blog) {
    return (
      <section className="max-w-5xl mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Article Not Found
        </h1>

        <p className="text-gray-500 mt-4">
          The article you're looking for doesn't exist.
        </p>

        <Link
          to="/health-blog"
          className="inline-flex items-center gap-2 mt-8 bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
        >
          <ArrowLeft size={18} />
          Back to Blogs
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">

      {/* Back Button */}

      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
      >
        <ArrowLeft size={18} />
        Back to Health Blogs
      </Link>

      {/* Category */}

      <div className="mt-8">

        <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">

          {blog.category}

        </span>

      </div>

      {/* Title */}

      <h1 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">

        {blog.title}

      </h1>

      {/* Meta */}

      <div className="flex flex-wrap gap-6 mt-6 text-gray-500">

        <div className="flex items-center gap-2">
          <User size={18} />
          By {blog.author}
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays size={18} />
          {blog.publishDate}
        </div>

        <div className="flex items-center gap-2">
          <Clock3 size={18} />
          {blog.readTime}
        </div>

      </div>

      {/* Image */}

      <div className="mt-10 overflow-hidden rounded-3xl shadow">

        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 md:h-[500px] object-cover"
        />

      </div>

      {/* Content */}

      <div className="mt-12 bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

        <h2 className="text-3xl font-bold text-gray-900">

          Overview

        </h2>

        <p className="mt-6 text-gray-600 leading-8 text-lg">

          {blog.content}

        </p>

      </div>

      {/* Symptoms */}

      {blog.symptoms?.length > 0 && (

        <div className="mt-10 bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

          <div className="flex items-center gap-3 mb-6">

            <TriangleAlert
              className="text-red-500"
              size={28}
            />

            <h2 className="text-3xl font-bold text-gray-900">

              Common Symptoms

            </h2>

          </div>

          <ul className="space-y-4">

            {blog.symptoms.map((symptom, index) => (

              <li
                key={index}
                className="flex items-start gap-3 text-gray-700"
              >

                <span className="w-2 h-2 bg-red-500 rounded-full mt-3" />

                <span>{symptom}</span>

              </li>

            ))}

          </ul>

        </div>

      )}

      {/* Prevention */}

      <div className="mt-10 bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

        <div className="flex items-center gap-3 mb-6">

          <CircleCheck
            className="text-green-600"
            size={28}
          />

          <h2 className="text-3xl font-bold text-gray-900">

            Prevention Tips

          </h2>

        </div>

        <ul className="space-y-4">

          {blog.prevention?.map((tip, index) => (

            <li
              key={index}
              className="flex items-start gap-3 text-gray-700"
            >

              <CircleCheck
                size={20}
                className="text-green-600 mt-1 flex-shrink-0"
              />

              <span>{tip}</span>

            </li>

          ))}

        </ul>

      </div>

    </section>
  );
}

export default BlogDetails;