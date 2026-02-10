import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import general from '../content/general.json';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img src={general.logo} alt={general.clinicName} className="h-12 mb-4 brightness-0 invert" />
            <p className="text-sm leading-relaxed">
              Serving the Oshkosh and Fox Valley community with personalized rehabilitation care since 1990.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-3 text-sm">
              {[['/', 'Home'], ['/about', 'About Us'], ['/services', 'Services'], ['/contact', 'Contact']].map(([path, label]) => (
                <li key={path}><Link to={path} className="hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-brand mt-0.5 shrink-0" />
                <span>{general.address.street}<br />{general.address.city}, {general.address.state} {general.address.zip}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-brand shrink-0" />
                <a href={`tel:${general.phone.replace(/[^\d]/g, '')}`} className="hover:text-white transition-colors">{general.phone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-brand shrink-0" />
                <a href={`mailto:${general.email}`} className="hover:text-white transition-colors">{general.email}</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Hours</h4>
            <div className="text-sm space-y-1.5">
              <p>{general.hours.weekdays}</p>
              <p>{general.hours.saturday}</p>
              <p>{general.hours.sunday}</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-600">
          &copy; {currentYear} {general.clinicName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
