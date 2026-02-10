import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import Loading from '../components/Loading';

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-brand text-lg">+</span>
      <span className="w-8 h-px bg-brand" />
      <span className="text-brand text-sm font-semibold">{text}</span>
    </div>
  );
}

export default function About() {
  const { data: about, loading: l1 } = useContent('about');
  const { data: general, loading: l2 } = useContent('general');

  if (l1 || l2 || !about || !general) return <Loading />;

  return (
    <>
      {/* Hero */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-2xl overflow-hidden">
              <img
                src={general.images?.teamPhoto}
                alt="Our team"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <SectionLabel text="About Us" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Your Partner in Health and Wellness.
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed">
                {about.hero.subheading}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-gray-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <SectionLabel text="Our Story" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">{about.story.heading}</h2>
              <div className="space-y-5 text-gray-500 leading-relaxed">
                {about.story.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src={general.images?.facility1} alt="Facility" className="rounded-2xl h-52 w-full object-cover" />
              <img src={general.images?.aquatic1} alt="Aquatic therapy" className="rounded-2xl h-52 w-full object-cover mt-8" />
              <img src={general.images?.exterior} alt="Exterior" className="rounded-2xl h-52 w-full object-cover col-span-2" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionLabel text="Why Us" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{about.values.heading}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.values.items.map((v, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={22} className="text-brand" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionLabel text="Our Team" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{about.team.heading}</h2>
            <p className="text-gray-500">{about.team.subheading}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {about.team.members.map((member, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="h-56 bg-gray-100 overflow-hidden">
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-300">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900">
                    {member.name}
                    {member.credentials && <span className="font-normal text-gray-400">, {member.credentials}</span>}
                  </h3>
                  <p className="text-brand text-sm mb-3">{member.role}</p>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{member.bio}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {member.specialties.map((s, j) => (
                      <span key={j} className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Meet Our Team?</h2>
          <p className="text-gray-500 mb-8 text-lg">Schedule your first appointment and experience the Fox Valley difference.</p>
          <Link to="/contact" className="inline-block bg-brand text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-brand-dark transition-colors">
            Contact Us Today
          </Link>
        </div>
      </section>
    </>
  );
}
