import { useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useEvents } from '../hooks/useApi'
import EventCard from '../components/events/EventCard'
import EventFiltersPanel from '../components/events/EventFiltersPanel'
import { Spinner } from '../components/ui'
import { EventFilters } from '../types'

export default function EventsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const [filters, setFilters] = useState<EventFilters>({
    search: searchParams.get('search') ?? undefined,
    categoryId: searchParams.get('categoryId') ?? undefined,
    featured: searchParams.get('featured') ?? undefined,
    page: 1,
    limit: 12,
    sortBy: 'startDate',
    sortOrder: 'ASC',
  })

  const { data, isLoading, isFetching } = useEvents(filters)
  const events = data?.data ?? []
  const meta = data?.meta

  const updateFilters = useCallback((partial: Partial<EventFilters>) => {
    setFilters((prev) => ({ ...prev, ...partial, page: 1 }))
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters({ search: search || undefined })
  }

  const resetFilters = () => {
    setSearch('')
    setFilters({ page: 1, limit: 12, sortBy: 'startDate', sortOrder: 'ASC' })
    setSearchParams({})
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Find Learning Events</h1>
        <p className="text-gray-400">
          {meta ? `${meta.total} event${meta.total !== 1 ? 's' : ''} available` : 'Searching...'}
        </p>
      </div>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-3">
          <div className="flex-1 flex items-center gap-3 glass rounded-xl px-4 py-2.5">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events..."
              className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-violet hover:bg-violet-dark text-white rounded-xl text-sm font-medium transition-colors"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="md:hidden px-4 py-2.5 glass rounded-xl text-sm text-gray-300 hover:text-white transition-colors"
          >
            Filters
          </button>
        </div>
      </form>

      <div className="flex gap-8">
        {/* Filters sidebar — desktop */}
        <aside className="hidden md:block w-56 shrink-0">
          <EventFiltersPanel filters={filters} onChange={updateFilters} onReset={resetFilters} />
        </aside>

        {/* Mobile filters drawer */}
        {filtersOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/60" onClick={() => setFiltersOpen(false)} />
            <div className="relative ml-auto w-72 bg-navy-800 h-full overflow-y-auto p-4">
              <button className="mb-4 text-gray-400 hover:text-white" onClick={() => setFiltersOpen(false)}>✕ Close</button>
              <EventFiltersPanel filters={filters} onChange={(f) => { updateFilters(f); setFiltersOpen(false) }} onReset={resetFilters} />
            </div>
          </div>
        )}

        {/* Event grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="flex justify-center py-20"><Spinner size="lg" /></div>
          ) : events.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filters.</p>
              <button onClick={resetFilters} className="px-5 py-2 bg-violet hover:bg-violet-dark text-white rounded-lg text-sm transition-colors">
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 transition-opacity ${isFetching ? 'opacity-60' : 'opacity-100'}`}>
                {events.map((event) => <EventCard key={event.id} event={event} />)}
              </div>

              {/* Pagination */}
              {meta && meta.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() => updateFilters({ page: (filters.page ?? 1) - 1 })}
                    disabled={(filters.page ?? 1) <= 1}
                    className="px-4 py-2 glass rounded-lg text-sm text-gray-300 hover:text-white disabled:opacity-30 transition-colors"
                  >
                    ← Prev
                  </button>
                  <span className="text-sm text-gray-400">
                    Page {meta.page} of {meta.totalPages}
                  </span>
                  <button
                    onClick={() => updateFilters({ page: (filters.page ?? 1) + 1 })}
                    disabled={(filters.page ?? 1) >= meta.totalPages}
                    className="px-4 py-2 glass rounded-lg text-sm text-gray-300 hover:text-white disabled:opacity-30 transition-colors"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
