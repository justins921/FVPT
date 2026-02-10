import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle2, Droplets, Dumbbell, Zap, Hand, Heart, Trophy } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import Loading from '../components/Loading';

const iconMap = { Activity: Dumbbell, Waves: Droplets, Trophy, Target: Zap, Hand, Heart };

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-brand text-lg">+</span>
      <span className="w-8 h-px bg-brand" />
      <span className="text-brand text-sm font-semibold">{text}</span>
    </div>
  );
}

export default function Home() {
  const { data: home, loading: l1 } = useContent('home');
  const { data: general, loading: l2 } = useContent('general');

  if (l1 || l2 || !home || !general) return <Loading />;

  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-6">
                Premium Care for{' '}
                <span className="text-brand">Physical Therapy</span>{' '}
                Your Best Health.
              </h1>
              <p className="text-gray-500 text-lg mb-8 max-w-lg leading-relaxed">
                {home.hero.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to={home.hero.ctaLink}
                  className="inline-flex items-center justify-center bg-brand text-white px-7 py-3.5 rounded-full font-semibold hover:bg-brand-dark transition-colors"
                >
                  {home.hero.ctaText}
                </Link>
                <Link
                  to={home.hero.secondaryCtaLink}
                  className="inline-flex items-center justify-center text-gray-700 font-semibold hover:text-brand transition-colors gap-1"
                >
                  {home.hero.secondaryCtaText}
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-8">
                {general.stats.slice(0, 3).map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={general.images?.treatment1}
                  alt="Physical therapy session"
                  className="w-full h-[480px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[general.images?.treatment2, general.images?.treatment3, general.images?.treatment4].map((src, i) => (
                    <img key={i} src={src} alt="" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                  ))}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{general.stats[1]?.number}</div>
                  <div className="text-xs text-gray-500">Patients Treated</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-gray-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="grid grid-cols-2 gap-4">
              <img src={general.images?.facility1} alt="Clinic facility" className="rounded-2xl h-64 w-full object-cover" />
              <img src={general.images?.teamPhoto} alt="Our team" className="rounded-2xl h-64 w-full object-cover mt-8" />
            </div>
            <div>
              <SectionLabel text="About Us" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {home.intro.heading}
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                {home.intro.text}
              </p>
              <div className="space-y-3">
                {home.intro.highlights.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-brand mt-0.5 shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/about"
                className="inline-flex items-center mt-8 bg-brand text-white px-7 py-3 rounded-full font-semibold hover:bg-brand-dark transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionLabel text="Our Services" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {home.servicePreview.heading}
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">{home.servicePreview.subheading}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {home.servicePreview.services.map((service, i) => {
              const Icon = iconMap[service.icon] || Dumbbell;
              return (
                <div key={i} className="group bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-lg hover:border-brand/20 transition-all">
                  <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center mb-5">
                    <Icon size={22} className="text-brand" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link to="/services" className="inline-flex items-center text-brand font-semibold hover:text-brand-dark gap-1">
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel text="Testimonials" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            {home.testimonials.heading}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {home.testimonials.items.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="text-gray-600 leading-relaxed mb-5">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-semibold text-gray-900 text-sm">{t.author}</p>
                  <p className="text-xs text-gray-400">{t.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {home.ctaSection.heading}
          </h2>
          <p className="text-gray-500 mb-8 max-w-2xl mx-auto text-lg">
            {home.ctaSection.text}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={home.ctaSection.ctaLink}
              className="bg-brand text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-brand-dark transition-colors"
            >
              {home.ctaSection.ctaText}
            </Link>
            <span className="text-gray-400">
              {home.ctaSection.phoneText}{' '}
              <a href={`tel:${general.phone.replace(/[^\d]/g, '')}`} className="text-gray-900 font-bold hover:text-brand">
                {general.phone}
              </a>
            </span>
          </div>
        </div>
      </section>

      {/* Insurance */}
      <section className="border-t border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm">{general.insuranceNote}</p>
        </div>
      </section>
    </>
  );
}
