import { Link } from 'react-router-dom'
import { Mail, Smartphone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-base shadow-lg">
                ET
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white">EduTechEvent</span>
                <span className="text-xs text-violet-400 font-medium">Learning Through Events</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mt-4">
              Discover, create, and connect at educational technology events. Build your network and stay ahead in tech.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/events" className="text-slate-400 hover:text-violet-400 transition-colors text-sm font-medium">
                  All Events
                </Link>
              </li>
              <li>
                <Link to="/events?featured=true" className="text-slate-400 hover:text-violet-400 transition-colors text-sm font-medium">
                  Featured Events
                </Link>
              </li>
              <li>
                <Link to="/events/create" className="text-slate-400 hover:text-violet-400 transition-colors text-sm font-medium">
                  Create Event
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-slate-400 hover:text-violet-400 transition-colors text-sm font-medium">
                  My Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Account</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/login" className="text-slate-400 hover:text-violet-400 transition-colors text-sm font-medium">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-slate-400 hover:text-violet-400 transition-colors text-sm font-medium">
                  Sign Up
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-violet-400 transition-colors text-sm font-medium">
                  Profile Settings
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-violet-400 transition-colors text-sm font-medium">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Connect</h3>
            <div className="space-y-3">
              <a href="mailto:support@edutechevent.com" className="flex items-center gap-3 text-slate-400 hover:text-violet-400 transition-colors group">
                <Mail size={16} className="group-hover:translate-x-1 transition-transform" />
                <span className="text-sm font-medium">contact@edutechevent.com</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-3 text-slate-400 hover:text-violet-400 transition-colors group">
                <Smartphone size={16} className="group-hover:translate-x-1 transition-transform" />
                <span className="text-sm font-medium">+1 (234) 567-890</span>
              </a>
              <div className="flex items-center gap-3 text-slate-400">
                <MapPin size={16} />
                <span className="text-sm font-medium">Global Community</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800"></div>

        {/* Bottom Section */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} <span className="font-semibold text-white">EduTechEvent</span>. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-violet-400 text-sm font-medium transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-500 hover:text-violet-400 text-sm font-medium transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-slate-500 hover:text-violet-400 text-sm font-medium transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
