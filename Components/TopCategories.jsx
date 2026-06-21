'use client'

import { assets } from '@/Assets/assets'
import axios from 'axios'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

// Map a category to a fallback image (can be extended)
const categoryImageMap = {
  Education: assets.event_pic_2,
  Technology: assets.event_pic_3,
  'AI / Data Science': assets.event_pic_4,
  EdTech: assets.event_pic_5,
  Cybersecurity: assets.event_pic_6,
  'Startup & Innovation': assets.event_pic_7,
}

export default function TopCategories() {
  const scrollRef = useRef(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const res = await axios.get('/api/event')
        const events = res.data.events || []

        // Extract unique categories and keep order of first appearance
        const seen = new Set()
        const unique = []
        for (const e of events) {
          if (e && e.category && !seen.has(e.category)) {
            seen.add(e.category)
            unique.push(e.category)
          }
        }

        const mapped = unique.map((name) => ({
          name,
          image: categoryImageMap[name] || assets.event_pic_2,
        }))

        if (mounted) setCategories(mapped)
      } catch (err) {
        console.error('TopCategories fetch error:', err)
        if (mounted) {
          // fallback to defaults
          setCategories(Object.keys(categoryImageMap).map((k) => ({ name: k, image: categoryImageMap[k] })))
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchCategories()
    return () => {
      mounted = false
    }
  }, [])

  const scroll = (offset) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
  }

  return (
    <section className="relative py-12 bg-white my-12">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-gray-900">Top Categories</h2>

        <div className="relative">
          <button
            aria-label="scroll left"
            onClick={() => scroll(-320)}
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-md hover:scale-105 transition-transform"
          >
            <ChevronLeft size={18} />
          </button>

          <div ref={scrollRef} className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth">
            {loading ? (
              <div className="flex items-center justify-center w-full h-48">
                <p className="text-gray-500">Loading categories...</p>
              </div>
            ) : categories.length === 0 ? (
              <div className="flex items-center justify-center w-full h-48">
                <p className="text-gray-500">No categories available</p>
              </div>
            ) : (
              categories.map((c, i) => (
                <Link
                  key={c.name + i}
                  href={`/category/${encodeURIComponent(c.name)}`}
                  className="min-w-[260px] sm:min-w-[300px] md:min-w-[320px] h-48 rounded-xl overflow-hidden shadow-sm hover:shadow-xl bg-gray-50 relative flex-shrink-0 transition-all duration-300 hover:scale-105"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 320px"
                      className="object-cover"
                      priority={i < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-bold text-white truncate">{c.name}</h3>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          <button
            aria-label="scroll right"
            onClick={() => scroll(320)}
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-md hover:scale-105 transition-transform"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
