import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { Event } from '../../types'

interface Props {
  event: Event
}

const EVENT_TYPE_LABELS: Record<string, string> = {
  in_person: 'In Person',
  online: 'Online',
  hybrid: 'Hybrid',
}

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&q=80',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80',
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80',
]

function getPlaceholder(id: string) {
  const idx = id.charCodeAt(0) % PLACEHOLDER_IMAGES.length
  return PLACEHOLDER_IMAGES[idx]
}

export default function EventCard({ event }: Props) {
  const isFree = event.price === 0
  const isSoldOut = event.maxAttendees != null && event.currentAttendees >= event.maxAttendees
  const coverImage = event.coverImage || getPlaceholder(event.id)

  return (
    <Link to={`/events/${event.id}`} className="group block">
      <div className="glass rounded-2xl overflow-hidden card-hover">
        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={coverImage}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {event.isFeatured && (
              <span className="px-2 py-0.5 text-xs bg-amber text-navy-900 rounded-full font-semibold">
                ⭐ Featured
              </span>
            )}
            <span className="px-2 py-0.5 text-xs glass text-white rounded-full">
              {EVENT_TYPE_LABELS[event.eventType]}
            </span>
          </div>

          {/* Price */}
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${isFree ? 'bg-green-500 text-white' : 'bg-violet text-white'}`}>
              {isFree ? 'FREE' : `${event.currency} ${event.price}`}
            </span>
          </div>

          {/* Category */}
          <div className="absolute bottom-3 left-3">
            <span
              className="px-2 py-0.5 text-xs rounded-full font-medium"
              style={{ backgroundColor: event.category?.color + '33', color: event.category?.color || '#C4B5FD', border: `1px solid ${event.category?.color}55` }}
            >
              {event.category?.icon} {event.category?.name}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-white text-sm leading-snug mb-1 line-clamp-2 group-hover:text-violet-light transition-colors">
            {event.title}
          </h3>

          <p className="text-xs text-gray-400 mb-3 line-clamp-2">{event.shortDescription || event.description}</p>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <svg className="w-3.5 h-3.5 text-violet-light shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{format(new Date(event.startDate), 'MMM d, yyyy · h:mm a')}</span>
            </div>

            {event.city && (
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <svg className="w-3.5 h-3.5 text-violet-light shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate">{event.venue ? `${event.venue}, ` : ''}{event.city}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <svg className="w-3.5 h-3.5 text-violet-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  {event.currentAttendees}
                  {event.maxAttendees ? ` / ${event.maxAttendees}` : ''} attending
                </span>
              </div>
              {isSoldOut && (
                <span className="text-xs text-red-400 font-medium">Sold Out</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
