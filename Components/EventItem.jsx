import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";


const EventItem = ({image, title, description, category, id, author, profile}) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Image Container - Fixed Height */}
      <Link href={`/events/${id}`}>
        <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
          <Image 
            src={image} 
            alt="Event thumbnail" 
            fill
            sizes="(max-width: 640px) 100vw, 384px"
            className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Content Container */}
      <div className="p-5">
        {/* Category Badge */}
        <div className="mb-3 flex items-center justify-between">
          <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-4 text-base font-bold text-gray-900 line-clamp-2" dangerouslySetInnerHTML={{__html:title}}>
        </h3>

        {/* Author Info */}
        <div className="mb-4 flex items-center gap-3">
          <Image 
            alt="Author profile" 
            src={profile} 
            width={36}
            height={36}
            className="rounded-full object-cover"
            style={{ width: 'auto', height: 'auto' }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-700 truncate">{author}</p>
            <Image 
              alt="Review rating" 
              src={assets.review} 
              width={70}
              height={14}
              className="h-3 w-auto mt-0.5"
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
        </div>

        {/* CTA Button */}
        <Link href={`/events/${id}`} className="flex items-center justify-center gap-2 w-full py-2.5 px-4 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-300">
          Book Ticket
          <Image 
            width={14} 
            height={14} 
            src={assets.arrow} 
            alt="Arrow icon"
            style={{ width: 'auto', height: 'auto' }}
          />
        </Link>
      </div>
    </div>
  )
};

export default EventItem;


