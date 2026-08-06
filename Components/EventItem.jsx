import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Colour palette per event type
const TYPE_STYLES = {
  Conference:   { badge: "bg-blue-600 text-white",   btn: "bg-blue-600 hover:bg-blue-700" },
  Workshop:     { badge: "bg-emerald-600 text-white", btn: "bg-emerald-600 hover:bg-emerald-700" },
  Seminar:      { badge: "bg-purple-600 text-white",  btn: "bg-purple-600 hover:bg-purple-700" },
  Hackathon:    { badge: "bg-orange-500 text-white",  btn: "bg-orange-500 hover:bg-orange-600" },
  Webinar:      { badge: "bg-teal-600 text-white",    btn: "bg-teal-600 hover:bg-teal-700" },
  Bootcamp:     { badge: "bg-rose-600 text-white",    btn: "bg-rose-600 hover:bg-rose-700" },
  "Tech Talk":  { badge: "bg-indigo-600 text-white",  btn: "bg-indigo-600 hover:bg-indigo-700" },
};
const DEFAULT_STYLE = { badge: "bg-gray-600 text-white", btn: "bg-gray-700 hover:bg-gray-800" };

const EventItem = ({ image, title, description, category, id, author, profile }) => {
  const style = TYPE_STYLES[category] || DEFAULT_STYLE;

  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
      {/* Thumbnail */}
      <Link href={`/events/${id}`}>
        <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
          <Image
            src={image}
            alt="Event thumbnail"
            fill
            sizes="(max-width: 640px) 100vw, 384px"
            className="object-cover hover:scale-110 transition-transform duration-300"
          />
          {/* Event type overlay badge */}
          <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${style.badge}`}>
            {category}
          </span>
        </div>
      </Link>

      {/* Body */}
      <div className="p-5">
        {/* Title */}
        <h3
          className="mb-4 text-base font-bold text-gray-900 line-clamp-2 leading-snug"
          dangerouslySetInnerHTML={{ __html: title }}
        />

        {/* Organiser row */}
        <div className="mb-5 flex items-center gap-3">
          <Image
            alt="Organiser logo"
            src={profile}
            width={36}
            height={36}
            className="rounded-full object-cover border border-gray-200"
            style={{ width: 36, height: 36 }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-700 truncate">{author}</p>
            <Image
              alt="Rating"
              src={assets.review}
              width={70}
              height={14}
              className="h-3 w-auto mt-0.5"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/events/${id}`}
          className={`flex items-center justify-center gap-2 w-full py-2.5 px-4 font-semibold text-white rounded-lg transition-colors duration-300 ${style.btn}`}
        >
          Book Ticket
          <Image
            width={14}
            height={14}
            src={assets.arrow}
            alt=""
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
      </div>
    </div>
  );
};

export default EventItem;


