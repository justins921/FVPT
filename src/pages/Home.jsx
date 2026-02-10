import { Link } from 'react-router-dom';
import {
  Activity,
  Waves,
  Trophy,
  Target,
  Hand,
  Heart,
  ChevronRight,
  Star,
  ArrowRight,
  Phone,
} from 'lucide-react';
import home from '../content/home.json';
import general from '../content/general.json';

const iconMap = { Activity, Waves, Trophy, Target, Hand, Heart };

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-400 rounded-full translate-y-1/3 -translate-x-1/4" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {home.hero.headline}
            </h1>
            <p className="text-lg md:text-xl text-teal-100 mb-10 leading-relaxed max-w-2xl">
              {home.hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={home.hero.ctaLink}
                className="inline-flex items-center justify-center bg-white text-teal-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-teal-50 transition-colors shadow-lg"
              >
                {home.hero.ctaText}
                <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link
                to={home.hero.secondaryCtaLink}
                className="inline-flex items-center justify-center border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                {home.hero.secondaryCtaText}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white -mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl -mt-12 relative z-10 grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
            {general.stats.map((stat, i) => (
              <div key={i} className="p-6 md:p-8 text-center">
                <div className="text-3xl md:text-4xl font-bold text-teal-700">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {home.intro.heading}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {home.intro.text}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {home.intro.highlights.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-teal-50 rounded-xl p-4"
              >
                <ChevronRight
                  size={20}
                  className="text-teal-600 mt-0.5 shrink-0"
                />
                <span className="text-gray-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {home.servicePreview.heading}
            </h2>
            <p className="text-lg text-gray-600">
              {home.servicePreview.subheading}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {home.servicePreview.services.map((service, i) => {
              const Icon = iconMap[service.icon] || Activity;
              return (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={24} className="text-teal-700" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center text-teal-700 font-semibold hover:text-teal-800 transition-colors"
            >
              View All Services
              <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            {home.testimonials.heading}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {home.testimonials.items.map((testimonial, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-100"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={18}
                      className="text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <blockquote className="text-gray-700 leading-relaxed mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-teal-700 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {home.ctaSection.heading}
          </h2>
          <p className="text-lg text-teal-100 mb-8 max-w-2xl mx-auto">
            {home.ctaSection.text}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={home.ctaSection.ctaLink}
              className="bg-white text-teal-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-teal-50 transition-colors shadow-lg"
            >
              {home.ctaSection.ctaText}
            </Link>
            <span className="text-teal-200">
              {home.ctaSection.phoneText}{' '}
              <a
                href={`tel:${general.phone.replace(/[^\d]/g, '')}`}
                className="text-white font-bold hover:text-teal-200 transition-colors"
              >
                {general.phone}
              </a>
            </span>
          </div>
        </div>
      </section>

      {/* Insurance Note */}
      <section className="bg-teal-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-700 text-sm md:text-base">
            {general.insuranceNote}
          </p>
        </div>
      </section>
    </>
  );
}
