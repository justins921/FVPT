import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import general from '../content/general.json';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/contact', label: 'Contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-teal-800 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-10">
          <span className="hidden sm:inline">
            {general.address.street}, {general.address.city},{' '}
            {general.address.state} {general.address.zip}
          </span>
          <a
            href={`tel:${general.phone.replace(/[^\d]/g, '')}`}
            className="flex items-center gap-1.5 text-white hover:text-teal-200 transition-colors ml-auto sm:ml-0"
          >
            <Phone size={14} />
            {general.phone}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex-shrink-0">
            <span className="text-xl md:text-2xl font-bold text-teal-800 leading-tight">
              Fox Valley
              <span className="block text-sm md:text-base font-medium text-teal-600">
                Physical Therapy & Wellness
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-teal-700 border-b-2 border-teal-600 pb-1'
                    : 'text-gray-600 hover:text-teal-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-teal-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-teal-800 transition-colors"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-teal-700"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block py-3 px-2 text-base font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-teal-700 bg-teal-50'
                    : 'text-gray-600 hover:text-teal-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="block mt-2 mx-2 text-center bg-teal-700 text-white px-5 py-3 rounded-lg font-semibold hover:bg-teal-800 transition-colors"
            >
              Book Appointment
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
