'use client'
import React, { useEffect, useState } from "react";
import ArticleItem from "./ArticleItem";
import axios from "axios";

const EVENT_TYPES = ["All", "Conference", "Workshop", "Seminar", "Hackathon", "Webinar", "Bootcamp"];

const ArticleList = () => {
  const [filter, setFilter] = useState("All");
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("/api/article")
      .then((res) => setArticles(res.data.articles || []))
      .catch(() => setArticles([]));
  }, []);

  const visible = articles.filter(
    (a) => filter === "All" || a.category === filter
  );

  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-900">Latest Articles</h2>
        <p className="mt-2 text-gray-500 text-sm">
          News, recaps, and insights from the EduTech community.
        </p>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {EVENT_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
              filter === t
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="flex flex-wrap justify-around gap-6">
        {visible.length === 0 ? (
          <p className="text-gray-400 py-16">No articles found for this category.</p>
        ) : (
          visible.map((a) => (
            <ArticleItem
              key={a._id}
              id={a._id}
              image={a.image}
              title={a.title}
              description={a.description}
              category={a.category}
              author={a.author}
              profile={a.author_img}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default ArticleList;
