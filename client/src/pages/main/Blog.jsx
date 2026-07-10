import React, { useState } from "react";
import { Search, Newspaper } from "lucide-react";

import blogs from "../../constants/blogs";
import { Input } from "../../components/ui/Input";
import BlogCard from "../../components/cards/BlogCard";
import healthTips from "../../constants/healthTips";
import HealthTipCard from "../../components/cards/HealthTipCard";
import diseases from "../../constants/diseases";
import DiseaseCard from "../../components/cards/DiseaseCard";

function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(blogs.map((blog) => blog.category)),
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      blog.excerpt
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      blog.category
      .toLowerCase()
      .includes(searchTerm.toLowerCase());  

    const matchesCategory =
      category === "All" ||
      blog.category === category;

    return matchesSearch && matchesCategory;
  });

  const featuredBlog = blogs[0];

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">

      {/* Hero */}

      <div className="text-center mb-14">

        <div className="inline-flex items-center gap-2 bg-blue-50 text-primary px-5 py-2 rounded-full font-semibold text-sm">

          <Newspaper size={18} />

          Health Knowledge Center

        </div>

        <h1 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900">

          Health Articles &
          <br />

          Wellness Guides

        </h1>

        <p className="mt-5 text-lg text-gray-600 max-w-3xl mx-auto leading-8">

          Learn from trusted healthcare articles covering diseases,
          nutrition, mental health, prevention and healthy living.

        </p>

      </div>

      {/* Search */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-10">

        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">

          <Search size={18} />

          Search Articles

        </label>

        <Input
          placeholder="Search health articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div>

      {/* Categories */}

      <div className="flex flex-wrap gap-3 mb-12">

        {categories.map((item) => (

          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              category === item
                ? "bg-primary text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {item}
          </button>

        ))}

      </div>


      {/* Results */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">

        <h2 className="text-3xl font-bold">

          Health Articles

        </h2>

        <span className="text-gray-500 font-medium">

          Showing {filteredBlogs.length} Article
          {filteredBlogs.length !== 1 ? "s" : ""}

        </span>

      </div>

      {/* Blog Grid */}

      {filteredBlogs.length === 0 ? (

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 py-20 text-center">

          <h2 className="text-2xl font-bold">

            No Articles Found

          </h2>

          <p className="text-gray-500 mt-3">

            Try another keyword or category.

          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {filteredBlogs.map((blog) => (

            <BlogCard
              key={blog.id}
              blog={blog}
            />

          ))}

        </div>

      )}

      {/* ================= Health Tips ================= */}

<div className="mt-20">

  <div className="text-center mb-12">

    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">

      Daily Health Tips

    </h2>

    <p className="text-gray-500 mt-3 max-w-2xl mx-auto">

      Small healthy habits practiced every day can greatly improve
      your overall well-being and help prevent many diseases.

    </p>

  </div>

  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">

    {healthTips.map((tip) => (

      <HealthTipCard
        key={tip.id}
        tip={tip}
      />

    ))}

  </div>

</div>

{/* ================= Disease Information ================= */}

<div className="mt-24">

  <div className="text-center mb-12">

    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">

      Common Diseases

    </h2>

    <p className="mt-3 text-gray-500 max-w-2xl mx-auto">

      Learn about common medical conditions, recognize their symptoms,
      and discover preventive measures to maintain better health.

    </p>

  </div>

  <div className="grid md:grid-cols-2 gap-8">

    {diseases.map((disease) => (

      <DiseaseCard
        key={disease.id}
        disease={disease}
      />

    ))}

  </div>

</div>

    </section>
  );
}

export default Blog;