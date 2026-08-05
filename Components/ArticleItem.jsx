import Image from "next/image";
import Link from "next/link";
import React from "react";

const ArticleItem = ({ image, title, description, category, id, author, profile }) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
      {/* Thumbnail */}
      <Link href={`/articles/${id}`}>
        <div className="relative w-full h-44 bg-gray-100 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, 384px"
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-4">
        {/* Category badge */}
        <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          {category}
        </span>

        {/* Title */}
        <h3
          className="text-sm font-bold text-gray-900 line-clamp-2 mb-3"
          dangerouslySetInnerHTML={{ __html: title }}
        />

        {/* Author */}
        <div className="flex items-center gap-2 mb-4">
          <Image
            src={profile}
            alt="Author"
            width={30}
            height={30}
            className="rounded-full object-cover"
            style={{ width: 30, height: 30 }}
          />
          <p className="text-xs text-gray-600 truncate">{author}</p>
        </div>

        {/* CTA */}
        <Link
          href={`/articles/${id}`}
          className="block text-center text-xs font-semibold text-indigo-700 border border-indigo-200 hover:bg-indigo-50 py-2 rounded-lg transition-colors"
        >
          Read Article →
        </Link>
      </div>
    </div>
  );
};

export default ArticleItem;
