import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useContent } from '../hooks/useContent';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { data: general } = useContent('general');

  if (!general) return null;

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-white text-lg font-bold mb-2">Fox Valley</h3>
            <p className="text-teal-400 text-sm font-medium mb-4">
              Physical Therapy & Wellness
            </p>
            <p className="text-sm leading-relaxed">
              {general.tagline}. Serving the Oshkosh and Fox Valley community
              since 1990.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-teal-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-teal-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-teal-400 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-teal-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-teal-400 mt-0.5 shrink-0" />
                <span>
                  {general.address.street}
                  <br />
                  {general.address.city}, {general.address.state}{' '}
                  {general.address.zip}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-teal-400 shrink-0" />
                <a
                  href={`tel:${general.phone.replace(/[^\d]/g, '')}`}
                  className="hover:text-teal-400 transition-colors"
                >
                  {general.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-teal-400 shrink-0" />
                <a
                  href={`mailto:${general.email}`}
                  className="hover:text-teal-400 transition-colors"
                >
                  {general.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-semibold mb-4">Hours</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Clock size={16} className="text-teal-400 mt-0.5 shrink-0" />
                <div>
                  <p>{general.hours.weekdays}</p>
                  <p>{general.hours.saturday}</p>
                  <p>{general.hours.sunday}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 text-center text-sm text-gray-500">
          <p>
            &copy; {currentYear} {general.clinicName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
