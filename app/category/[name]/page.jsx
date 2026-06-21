'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import { ArrowLeft } from 'lucide-react'
import EventItem from '@/Components/EventItem'
import Header from '@/Components/Header'
import Footer from '@/Components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function CategoryPage() {
  const params = useParams()
  const category = decodeURIComponent(params.name)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategoryEvents = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await axios.get('/api/event')
        const allEvents = response.data.events || []
        
        // Filter events by category
        const filtered = allEvents.filter(event => event.category === category)
        setEvents(filtered)
      } catch (err) {
        console.error('Failed to fetch category events:', err)
        setError('Failed to load events. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    if (category) {
      fetchCategoryEvents()
    }
  }, [category])

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer theme="dark" />
      
      <div className="px-6 sm:px-10 md:px-16 lg:px-20 py-6 sm:py-8">
        <Header />
      </div>

      <div className="px-6 sm:px-10 md:px-16 lg:px-20 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <Link href="/" className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition">
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Title and description */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            {category}
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Discover all events in the {category} category
          </p>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-500 text-lg">Loading events...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-500 text-lg mb-4">No events found in this category</p>
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
              Browse other categories
            </Link>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-8">
              Showing <span className="font-semibold text-gray-900">{events.length}</span> event{events.length !== 1 ? 's' : ''}
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 gap-y-10">
              {events.map((event) => (
                <EventItem
                  key={event._id}
                  id={event._id}
                  image={event.image}
                  title={event.title}
                  description={event.description}
                  category={event.category}
                  author={event.author}
                  profile={event.author_img}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
