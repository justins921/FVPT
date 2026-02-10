import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import general from '../content/general.json';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/services', label: 'Services' },
  { path: '/contact', label: 'Contact Us' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex-shrink-0">
            <img src={general.logo} alt={general.clinicName} className="h-14" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-brand'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-5">
            <a
              href={`tel:${general.phone.replace(/[^\d]/g, '')}`}
              className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1.5"
            >
              <Phone size={14} />
              {general.phone}
            </a>
            <Link
              to="/contact"
              className="border-2 border-gray-900 text-gray-900 px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-900 hover:text-white transition-colors"
            >
              Contact us
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block py-3 px-3 rounded-lg text-base font-medium ${
                  location.pathname === link.path ? 'text-brand bg-brand-light/50' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="block mx-3 mt-2 text-center border-2 border-gray-900 text-gray-900 px-5 py-3 rounded-full font-semibold"
            >
              Contact us
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
