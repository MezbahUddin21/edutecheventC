'use client'; 
import { assets } from "@/Assets/assets";
import { useEffect, useState } from 'react';
import Image from "next/image";

const images = [
  assets.slide1,
  assets.slide2,
  assets.slide3,
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[60vh] overflow-hidden sm:my-5 md:my-10 lg:my-10">
      {images.map((src, index) => (
        <Image src={src} alt='' key={index} className={` rounded  absolute top-0 left-0 w-full md:h-[60vh] lg:h-[60vh] sm:h-[40vh] object-cover transition-opacity duration-1000 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`} />
      ))}



      {/* Optional: Dots */}
      <div className="bg-gray-300 opacity-50 p-3 rounded absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 mx-3">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 opacity-100 rounded-full ${
              index === current ? 'bg-black' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
