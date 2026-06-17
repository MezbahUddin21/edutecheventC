import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { useAuthStore } from '../store/authStore'
import { useMyRegistrations } from '../hooks/useApi'
import { Spinner, Badge } from '../components/ui'
import { EventRegistration } from '../types'

const STATUS_COLORS: Record<string, string> = {
  confirmed: '#22c55e',
  pending: '#f59e0b',
  cancelled: '#ef4444',
  waitlisted: '#6366f1',
}

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80',
]

function getPlaceholder(id: string) {
  return PLACEHOLDER_IMAGES[id.charCodeAt(0) % PLACEHOLDER_IMAGES.length]
}

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user)
  const { data: registrations = [], isLoading } = useMyRegistrations()

  const upcoming = (registrations as EventRegistration[]).filter(
    (r) => new Date(r.event.startDate) > new Date() && r.status !== 'cancelled'
  )
  const past = (registrations as EventRegistration[]).filter(
    (r) => new Date(r.event.startDate) <= new Date()
  )

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back, {user?.name} 👋</p>
        </div>
        <Link
          to="/events/create"
          className="px-5 py-2.5 bg-violet hover:bg-violet-dark text-white rounded-xl text-sm font-medium transition-colors"
        >
          + Create Event
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Registrations', value: registrations.length, icon: '🎟️' },
          { label: 'Upcoming Events', value: upcoming.length, icon: '🗓️' },
          { label: 'Past Events', value: past.length, icon: '✅' },
        ].map((s) => (
          <div key={s.label} className="glass rounded-2xl p-6 flex items-center gap-4">
            <div className="text-3xl">{s.icon}</div>
            <div>
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Profile card */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Profile</h2>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-violet/30 flex items-center justify-center text-violet-light text-2xl font-bold">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <div className="text-white font-medium text-lg">{user?.name}</div>
            <div className="text-gray-400 text-sm">{user?.email}</div>
            <div className="mt-1">
              <Badge color="#7C3AED">{user?.role}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* My Events */}
      <div>
        <h2 className="text-xl font-bold text-white mb-5">My Registered Events</h2>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Spinner size="lg" />
          </div>
        ) : registrations.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <div className="text-5xl mb-4">🎫</div>
            <h3 className="text-lg font-semibold text-white mb-2">No events yet</h3>
            <p className="text-gray-400 text-sm mb-6">Browse events and register for ones you love.</p>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet hover:bg-violet-dark text-white rounded-xl text-sm font-medium transition-colors"
            >
              Explore Events →
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {upcoming.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                  Upcoming ({upcoming.length})
                </h3>
                <div className="space-y-3">
                  {upcoming.map((reg) => (
                    <RegistrationRow key={reg.id} reg={reg} />
                  ))}
                </div>
              </div>
            )}

            {past.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                  Past ({past.length})
                </h3>
                <div className="space-y-3 opacity-70">
                  {past.map((reg) => (
                    <RegistrationRow key={reg.id} reg={reg} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function RegistrationRow({ reg }: { reg: EventRegistration }) {
  const cover = reg.event.coverImage || getPlaceholder(reg.event.id)

  return (
    <Link to={`/events/${reg.event.id}`} className="block">
      <div className="glass rounded-xl p-4 hover:bg-white/5 transition-colors flex items-center gap-4">
        {/* Thumbnail */}
        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
          <img src={cover} alt={reg.event.title} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-white text-sm truncate">{reg.event.title}</div>
          <div className="text-xs text-gray-400 mt-0.5">
            {format(new Date(reg.event.startDate), 'MMM d, yyyy · h:mm a')}
          </div>
          {reg.event.city && (
            <div className="text-xs text-gray-500 mt-0.5">📍 {reg.event.city}</div>
          )}
        </div>

        {/* Category + Status */}
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          {reg.event.category && (
            <span
              className="px-2 py-0.5 rounded-full text-xs font-medium"
              style={{
                backgroundColor: reg.event.category.color + '22',
                color: reg.event.category.color,
              }}
            >
              {reg.event.category.icon} {reg.event.category.name}
            </span>
          )}
          <span
            className="px-2 py-0.5 rounded-full text-xs font-medium capitalize"
            style={{
              backgroundColor: (STATUS_COLORS[reg.status] ?? '#6b7280') + '22',
              color: STATUS_COLORS[reg.status] ?? '#9ca3af',
            }}
          >
            {reg.status}
          </span>
        </div>
      </div>
    </Link>
  )
}
