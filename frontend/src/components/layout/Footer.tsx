import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-violet flex items-center justify-center text-white font-bold text-sm">EF</div>
              <span className="font-bold text-lg gradient-text">EventFinder</span>
            </div>
            <p className="text-sm text-gray-400">Discover and attend amazing events happening near you.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/events" className="hover:text-white transition-colors">All Events</Link></li>
              <li><Link to="/events?featured=true" className="hover:text-white transition-colors">Featured</Link></li>
              <li><Link to="/events/create" className="hover:text-white transition-colors">Create Event</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Account</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Register</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} EventFinder. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
