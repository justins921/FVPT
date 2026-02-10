import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import contact from '../content/contact.json';
import general from '../content/general.json';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, connect this to a form service (Formspree, Netlify Forms, etc.)
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-800 to-teal-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {contact.hero.heading}
          </h1>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            {contact.hero.subheading}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {contact.info.heading}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {contact.info.description}
              </p>
              <div className="bg-teal-50 rounded-xl p-4 mb-8 text-sm text-teal-800 font-medium">
                {contact.info.directAccess}
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-teal-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-gray-600 text-sm">
                      {general.address.street}
                      <br />
                      {general.address.city}, {general.address.state}{' '}
                      {general.address.zip}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-teal-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <a
                      href={`tel:${general.phone.replace(/[^\d]/g, '')}`}
                      className="text-teal-700 hover:text-teal-800 text-sm"
                    >
                      {general.phone}
                    </a>
                    <p className="text-gray-500 text-xs mt-0.5">
                      Fax: {general.fax}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-teal-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <a
                      href={`mailto:${general.email}`}
                      className="text-teal-700 hover:text-teal-800 text-sm"
                    >
                      {general.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-teal-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Hours</p>
                    <div className="text-gray-600 text-sm space-y-0.5">
                      <p>{general.hours.weekdays}</p>
                      <p>{general.hours.saturday}</p>
                      <p>{general.hours.sunday}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {contact.form.heading}
                </h2>

                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle
                      size={48}
                      className="text-teal-600 mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-600">
                      Thank you for reaching out. We'll get back to you as soon
                      as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {contact.form.fields.name} *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {contact.form.fields.email} *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {contact.form.fields.phone}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {contact.form.fields.reason}
                        </label>
                        <select
                          name="reason"
                          value={formData.reason}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors bg-white"
                        >
                          <option value="">Select a reason...</option>
                          {contact.form.reasonOptions.map((option, i) => (
                            <option key={i} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {contact.form.fields.message} *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors resize-y bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-teal-700 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-teal-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <Send size={18} />
                      {contact.form.submitText}
                    </button>

                    <p className="text-xs text-gray-500">
                      {contact.form.disclaimer}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-gray-100">
        <iframe
          title="Fox Valley Physical Therapy Location"
          src={contact.mapEmbedUrl}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale hover:grayscale-0 transition-all duration-500"
        />
      </section>
    </>
  );
}
