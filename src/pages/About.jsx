import { Link } from 'react-router-dom';
import { Users, Award, Building, HeartHandshake } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import Loading from '../components/Loading';

const valueIcons = [HeartHandshake, Users, Building, Award];

export default function About() {
  const { data: about, loading } = useContent('about');

  if (loading || !about) return <Loading />;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-800 to-teal-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {about.hero.heading}
          </h1>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            {about.hero.subheading}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            {about.story.heading}
          </h2>
          <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
            {about.story.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            {about.values.heading}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.values.items.map((value, i) => {
              const Icon = valueIcons[i] || Award;
              return (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100"
                >
                  <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={28} className="text-teal-700" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {about.team.heading}
            </h2>
            <p className="text-lg text-gray-600">{about.team.subheading}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {about.team.members.map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="bg-gradient-to-br from-teal-600 to-teal-700 p-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-3">
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <h3 className="text-white font-bold text-lg">
                    {member.name}
                    {member.credentials && (
                      <span className="font-normal text-teal-200">
                        , {member.credentials}
                      </span>
                    )}
                  </h3>
                  <p className="text-teal-200 text-sm">{member.role}</p>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, j) => (
                      <span
                        key={j}
                        className="text-xs bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-teal-700 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Meet Our Team?
          </h2>
          <p className="text-teal-100 mb-8 text-lg">
            Schedule your first appointment and experience the Fox Valley
            difference.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-teal-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-teal-50 transition-colors shadow-lg"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </>
  );
}
