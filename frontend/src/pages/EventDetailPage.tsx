import { useParams, Link } from 'react-router-dom'
import { format } from 'date-fns'
import { useEvent, useRegisterEvent, useUnregisterEvent } from '../hooks/useApi'
import { useAuthStore } from '../store/authStore'
import { Spinner, Badge } from '../components/ui'
import { useState } from 'react'

const PLACEHOLDER = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80'

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: event, isLoading } = useEvent(id!)
  const user = useAuthStore((s) => s.user)
  const register = useRegisterEvent()
  const unregister = useUnregisterEvent()
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const handleRegister = async () => {
    if (!user) { window.location.href = '/login'; return }
    try {
      await register.mutateAsync(id!)
      showToast('🎉 Successfully registered!')
    } catch (e: any) {
      showToast(e.response?.data?.message ?? 'Failed to register')
    }
  }

  const handleUnregister = async () => {
    try {
      await unregister.mutateAsync(id!)
      showToast('Unregistered from event')
    } catch (e: any) {
      showToast(e.response?.data?.message ?? 'Failed to unregister')
    }
  }

  if (isLoading) {
    return <div className="flex justify-center py-32"><Spinner size="lg" /></div>
  }

  if (!event) {
    return (
      <div className="text-center py-32">
        <h2 className="text-2xl font-bold text-white mb-3">Event not found</h2>
        <Link to="/events" className="text-violet-light hover:text-white">← Back to events</Link>
      </div>
    )
  }

  const isFull = event.maxAttendees != null && event.currentAttendees >= event.maxAttendees
  const tags: string[] = event.tags ? JSON.parse(event.tags) : []

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 glass px-6 py-3 rounded-xl text-white text-sm shadow-xl">
          {toast}
        </div>
      )}

      <Link to="/events" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-6 transition-colors">
        ← Back to events
      </Link>

      {/* Cover Image */}
      <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden mb-8">
        <img
          src={event.coverImage || PLACEHOLDER}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent" />

        {event.isFeatured && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-amber text-navy-900 rounded-full text-sm font-bold">⭐ Featured</span>
          </div>
        )}

        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge color={event.category?.color}>{event.category?.icon} {event.category?.name}</Badge>
            <Badge color="#6b7280">
              {event.eventType === 'in_person' ? '📍 In Person' : event.eventType === 'online' ? '💻 Online' : '🔀 Hybrid'}
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">{event.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">About this Event</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">{event.description}</p>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-white/5 text-gray-400 rounded-full text-xs">#{tag}</span>
                ))}
              </div>
            )}
          </div>

          {/* Organizer */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Organized by</h2>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-violet/30 flex items-center justify-center text-violet-light font-bold text-lg">
                {event.organizer?.name?.[0]?.toUpperCase() ?? '?'}
              </div>
              <div>
                <div className="font-medium text-white">{event.organizer?.name}</div>
                <div className="text-sm text-gray-400">Event Organizer</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Registration Card */}
          <div className="glass rounded-2xl p-6 space-y-4">
            <div>
              <div className="text-3xl font-bold text-white">
                {event.price === 0 ? 'FREE' : `${event.currency} ${event.price}`}
              </div>
              {event.maxAttendees && (
                <div className="mt-1">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>{event.currentAttendees} attending</span>
                    <span>{event.maxAttendees - event.currentAttendees} spots left</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-violet rounded-full transition-all"
                      style={{ width: `${Math.min(100, (event.currentAttendees / event.maxAttendees) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {event.isRegistered ? (
              <div className="space-y-2">
                <div className="w-full py-2.5 text-center bg-green-500/20 text-green-400 border border-green-500/30 rounded-xl text-sm font-medium">
                  ✓ You're registered!
                </div>
                <button
                  onClick={handleUnregister}
                  disabled={unregister.isPending}
                  className="w-full py-2 text-center text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Cancel registration
                </button>
              </div>
            ) : (
              <button
                onClick={handleRegister}
                disabled={isFull || register.isPending}
                className="w-full py-3 bg-violet hover:bg-violet-dark disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors glow"
              >
                {register.isPending ? 'Registering...' : isFull ? 'Sold Out' : user ? 'Register Now' : 'Login to Register'}
              </button>
            )}
          </div>

          {/* Event Details */}
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-white">Event Details</h3>

            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-violet-light shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <div className="text-white">{format(new Date(event.startDate), 'EEEE, MMMM d, yyyy')}</div>
                  <div className="text-gray-400">
                    {format(new Date(event.startDate), 'h:mm a')} – {format(new Date(event.endDate), 'h:mm a')}
                  </div>
                </div>
              </div>

              {(event.venue || event.city) && (
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-violet-light shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    {event.venue && <div className="text-white">{event.venue}</div>}
                    {event.address && <div className="text-gray-400">{event.address}</div>}
                    {event.city && <div className="text-gray-400">{event.city}{event.country ? `, ${event.country}` : ''}</div>}
                  </div>
                </div>
              )}

              {event.onlineUrl && (
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-violet-light shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <a href={event.onlineUrl} target="_blank" rel="noopener noreferrer" className="text-violet-light hover:text-white underline truncate">
                    Join Online
                  </a>
                </div>
              )}

              <div className="flex gap-3">
                <svg className="w-5 h-5 text-violet-light shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-300">{event.currentAttendees} attending</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
