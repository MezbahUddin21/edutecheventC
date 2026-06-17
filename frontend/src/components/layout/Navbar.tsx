import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (path: string) =>
    location.pathname === path ? 'text-violet-light' : 'text-gray-300 hover:text-white'

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet flex items-center justify-center text-white font-bold text-sm">
              ETE
            </div>
            <span className="font-bold text-lg gradient-text">EduTechEvent</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/')}`}>Home</Link>
            <Link to="/events" className={`text-sm font-medium transition-colors ${isActive('/events')}`}>Events</Link>
            {user && (
              <Link to="/dashboard" className={`text-sm font-medium transition-colors ${isActive('/dashboard')}`}>Dashboard</Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/events/create"
                  className="px-4 py-2 text-sm bg-violet hover:bg-violet-dark text-white rounded-lg font-medium transition-colors"
                >
                  + Create Event
                </Link>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-violet/30 flex items-center justify-center text-violet-light font-medium text-sm">
                    {user.name[0].toUpperCase()}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-gray-300 hover:text-white transition-colors font-medium">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm bg-violet hover:bg-violet-dark text-white rounded-lg font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block px-3 py-2 text-sm text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/events" className="block px-3 py-2 text-sm text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>Events</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2 text-sm text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                <Link to="/events/create" className="block px-3 py-2 text-sm text-violet-light" onClick={() => setMenuOpen(false)}>+ Create Event</Link>
                <button onClick={handleLogout} className="block px-3 py-2 text-sm text-gray-400 hover:text-white">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-sm text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="block px-3 py-2 text-sm text-violet-light" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
