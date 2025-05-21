'use client'

import { assets } from '@/Assets/assets'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const categories = [
  { name: 'Education', image: assets.blog_pic_2 },
  { name: 'Technology', image: assets.blog_pic_3 },
  { name: 'AI / Data Science', image: assets.blog_pic_4 },
  { name: 'EdTech', image: assets.blog_pic_5 },
  { name: 'Cybersecurity', image: assets.blog_pic_6 },
  { name: 'Startup & Innovation', image: assets.blog_pic_7 },
]

export default function TopCategories() {
  const scrollRef = useRef(null)

  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  return (
    <section className="relative py-10 bg-gray-50 my-20">
      <h2 className="text-2xl font-semibold text-center mb-6 text-black">
        Top Categories
      </h2>

      <div className="relative mt-10">
        <button
          onClick={() => scroll(-300)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
        >
          <ChevronLeft />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 px-8 scroll-smooth scrollbar-hide"
        >
          {categories.map((categories, index) => (
            <div
              key={index}
              className="min-w-[300px] rounded-xl shadow-md overflow-hidden relative"
            >
              <Image src={categories.image}
                alt={categories.name}
                className="w-full h-full object-cover" width={700} height={30}/>

              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent text-white p-4 text-lg font-bold">
                {categories.name}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll(300)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  )
}
