import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
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

export default function Contact() {
  const { data: contact, loading: l1 } = useContent('contact');
  const { data: general, loading: l2 } = useContent('general');

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', reason: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  if (l1 || l2 || !contact || !general) return <Loading />;

  return (
    <>
      {/* Hero */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <SectionLabel text="Contact" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {contact.hero.heading}
            </h1>
            <p className="text-gray-500 text-lg">{contact.hero.subheading}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              <p className="text-gray-500 leading-relaxed">{contact.info.description}</p>

              <div className="bg-brand-light/50 rounded-xl p-4 text-sm text-brand-dark font-medium border border-brand/10">
                {contact.info.directAccess}
              </div>

              <div className="space-y-5 pt-2">
                {[
                  { icon: MapPin, label: 'Address', value: <>{general.address.street}<br />{general.address.city}, {general.address.state} {general.address.zip}</> },
                  { icon: Phone, label: 'Phone', value: <a href={`tel:${general.phone.replace(/[^\d]/g, '')}`} className="text-brand hover:text-brand-dark">{general.phone}</a> },
                  { icon: Mail, label: 'Email', value: <a href={`mailto:${general.email}`} className="text-brand hover:text-brand-dark">{general.email}</a> },
                  { icon: Clock, label: 'Hours', value: <div className="space-y-0.5"><p>{general.hours.weekdays}</p><p>{general.hours.saturday}</p><p>{general.hours.sunday}</p></div> },
                ].map(({ icon: Icon, label, value }, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-brand" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{label}</p>
                      <div className="text-gray-500 text-sm">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">{contact.form.heading}</h2>

                {submitted ? (
                  <div className="text-center py-16">
                    <CheckCircle size={48} className="text-brand mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-500">Thank you for reaching out. We&apos;ll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{contact.form.fields.name} *</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none bg-gray-50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{contact.form.fields.email} *</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none bg-gray-50" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{contact.form.fields.phone}</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none bg-gray-50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{contact.form.fields.reason}</label>
                        <select name="reason" value={formData.reason} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none bg-gray-50">
                          <option value="">Select a reason...</option>
                          {contact.form.reasonOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{contact.form.fields.message} *</label>
                      <textarea name="message" required rows={5} value={formData.message} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none resize-y bg-gray-50" />
                    </div>
                    <button type="submit"
                      className="bg-brand text-white px-8 py-3.5 rounded-full font-semibold hover:bg-brand-dark transition-colors flex items-center gap-2">
                      <Send size={16} /> {contact.form.submitText}
                    </button>
                    <p className="text-xs text-gray-400">{contact.form.disclaimer}</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section>
        <iframe
          title="Fox Valley Physical Therapy Location"
          src={contact.mapEmbedUrl}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
