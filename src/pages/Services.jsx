import { Link } from 'react-router-dom';
import {
  Activity,
  Waves,
  Trophy,
  Target,
  Hand,
  Heart,
  HardHat,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import services from '../content/services.json';

const iconMap = { Activity, Waves, Trophy, Target, Hand, Heart, HardHat };

export default function Services() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-800 to-teal-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {services.hero.heading}
          </h1>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            {services.hero.subheading}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-600 text-center leading-relaxed">
            {services.intro.text}
          </p>
        </div>
      </section>

      {/* Service Categories */}
      <section className="pb-16 md:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {services.categories.map((category, i) => {
            const Icon = iconMap[category.icon] || Activity;
            const isEven = i % 2 === 0;
            return (
              <div
                key={i}
                id={category.title.toLowerCase().replace(/\s+/g, '-')}
                className={`rounded-2xl overflow-hidden border border-gray-100 shadow-sm ${
                  isEven ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-teal-700 to-teal-800 p-8 flex flex-col justify-center">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                      <Icon size={28} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {category.title}
                    </h2>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {category.description}
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {category.treatments.map((treatment, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <CheckCircle2
                            size={16}
                            className="text-teal-600 mt-1 shrink-0"
                          />
                          <span className="text-sm text-gray-700">
                            {treatment}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Conditions */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">
            {services.conditions.heading}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {services.conditions.items.map((condition, i) => (
              <div
                key={i}
                className="bg-white rounded-lg px-4 py-3 text-sm text-gray-700 font-medium border border-gray-100 text-center"
              >
                {condition}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-teal-700 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {services.ctaSection.heading}
          </h2>
          <p className="text-lg text-teal-100 mb-8 max-w-2xl mx-auto">
            {services.ctaSection.text}
          </p>
          <Link
            to={services.ctaSection.ctaLink}
            className="inline-flex items-center bg-white text-teal-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-teal-50 transition-colors shadow-lg"
          >
            {services.ctaSection.ctaText}
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>
    </>
  );
}
