import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useFeaturedEvents, useUpcomingEvents, useCategories, useEventStats } from '../hooks/useApi'
import EventCard from '../components/events/EventCard'
import { Spinner } from '../components/ui'

export default function HomePage() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const { data: featured = [], isLoading: loadingFeatured } = useFeaturedEvents()
  const { data: upcoming = [], isLoading: loadingUpcoming } = useUpcomingEvents(8)
  const { data: categories = [] } = useCategories()
  const { data: stats } = useEventStats()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) navigate(`/events?search=${encodeURIComponent(search)}`)
  }

  return (
    <div className="space-y-20 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet/20 via-transparent to-navy-900" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-sm text-violet-light mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            {stats?.upcoming ?? 0} events happening soon
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Discover Tech & Edu <br />
            <span className="gradient-text">Events You Need</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Find webinars, conferences, workshops, and networking events — curated for educators and tech professionals.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-3 glass rounded-2xl p-2">
              <div className="flex-1 flex items-center gap-3 px-3">
                <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search webinars, courses, or tech topics..."
                  className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-violet hover:bg-violet-dark text-white rounded-xl font-medium text-sm transition-colors glow"
              >
                Search
              </button>
            </div>
          </form>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-12">
            {[
              { label: 'Total Events', value: stats?.total ?? '—' },
              { label: 'Upcoming', value: stats?.upcoming ?? '—' },
              { label: 'Categories', value: categories.length },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold gradient-text">{s.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-white mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/events?categoryId=${cat.id}`}
              className="glass rounded-xl p-4 text-center card-hover group"
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
                {cat.name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Events */}
      {(featured.length > 0 || loadingFeatured) && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">⭐ Featured Events</h2>
            <Link to="/events?featured=true" className="text-sm text-violet-light hover:text-white transition-colors">
              View all →
            </Link>
          </div>
          {loadingFeatured ? (
            <div className="flex justify-center py-12"><Spinner /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((event) => <EventCard key={event.id} event={event} />)}
            </div>
          )}
        </section>
      )}

      {/* Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">🗓 Upcoming Events</h2>
          <Link to="/events" className="text-sm text-violet-light hover:text-white transition-colors">
            View all →
          </Link>
        </div>
        {loadingUpcoming ? (
          <div className="flex justify-center py-12"><Spinner /></div>
        ) : upcoming.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No upcoming events yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {upcoming.map((event) => <EventCard key={event.id} event={event} />)}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet/10 to-transparent pointer-events-none" />
          <h2 className="text-3xl font-bold text-white mb-3">Host Your Own Event</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Reach thousands of people. Create and manage your event with our powerful platform.
          </p>
          <Link
            to="/events/create"
            className="inline-flex items-center gap-2 px-8 py-3 bg-violet hover:bg-violet-dark text-white rounded-xl font-medium transition-colors glow"
          >
            Create Event
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
