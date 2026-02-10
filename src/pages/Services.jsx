import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Dumbbell, Droplets, Trophy, Zap, Hand, Heart, HardHat } from 'lucide-react';
import services from '../content/services.json';
import general from '../content/general.json';

const iconMap = { Activity: Dumbbell, Waves: Droplets, Trophy, Target: Zap, Hand, Heart, HardHat };

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-brand text-lg">+</span>
      <span className="w-8 h-px bg-brand" />
      <span className="text-brand text-sm font-semibold">{text}</span>
    </div>
  );
}

const serviceImages = [
  general.images.treatment1,
  general.images.aquatic1,
  general.images.treatment2,
  general.images.treatment3,
  general.images.facility1,
  general.images.treatment4,
  general.images.facility2,
];

export default function Services() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel text="Our Services" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Experienced in Different Types of{' '}
              <span className="text-brand">Therapy</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              {services.intro.text}
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-gray-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {services.categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Dumbbell;
            const isReversed = i % 2 !== 0;
            const img = serviceImages[i % serviceImages.length];

            return (
              <div
                key={i}
                id={cat.title.toLowerCase().replace(/\s+/g, '-')}
                className={`grid lg:grid-cols-2 gap-12 items-center ${isReversed ? 'lg:direction-rtl' : ''}`}
              >
                <div className={`${isReversed ? 'lg:order-2' : ''}`}>
                  {img && (
                    <img src={img} alt={cat.title} className="rounded-2xl w-full h-80 object-cover" />
                  )}
                </div>
                <div className={`${isReversed ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-11 h-11 bg-brand-light rounded-xl flex items-center justify-center">
                      <Icon size={20} className="text-brand" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{cat.title}</h2>
                  </div>
                  <p className="text-gray-500 leading-relaxed mb-6">{cat.description}</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {cat.treatments.map((t, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-brand mt-1 shrink-0" />
                        <span className="text-sm text-gray-600">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Conditions */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel text="Conditions" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{services.conditions.heading}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {services.conditions.items.map((c, i) => (
              <div key={i} className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-700 font-medium text-center border border-gray-100">
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{services.ctaSection.heading}</h2>
          <p className="text-gray-500 mb-8 text-lg">{services.ctaSection.text}</p>
          <Link
            to={services.ctaSection.ctaLink}
            className="inline-flex items-center bg-brand text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-brand-dark transition-colors gap-2"
          >
            {services.ctaSection.ctaText} <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
