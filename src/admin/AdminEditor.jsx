import { useState, useEffect, useCallback } from 'react';
import {
  Save,
  LogOut,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  GripVertical,
} from 'lucide-react';
import { API } from '../hooks/useContent';

const SECTIONS = [
  { key: 'general', label: 'General / Clinic Info' },
  { key: 'home', label: 'Home Page' },
  { key: 'about', label: 'About Page' },
  { key: 'services', label: 'Services Page' },
  { key: 'contact', label: 'Contact Page' },
];

export default function AdminEditor({ token, onLogout }) {
  const [activeSection, setActiveSection] = useState('general');
  const [content, setContent] = useState({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [loadingSection, setLoadingSection] = useState(true);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadSection = useCallback(
    async (section) => {
      setLoadingSection(true);
      try {
        const res = await fetch(`${API}/api/content/${section}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setContent((prev) => ({ ...prev, [section]: data }));
      } catch {
        showToast('Failed to load content', 'error');
      }
      setLoadingSection(false);
    },
    [token]
  );

  useEffect(() => {
    loadSection(activeSection);
  }, [activeSection, loadSection]);

  const saveSection = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/content/${activeSection}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(content[activeSection]),
      });
      if (!res.ok) throw new Error();
      showToast('Saved successfully!');
    } catch {
      showToast('Failed to save', 'error');
    }
    setSaving(false);
  };

  const updateField = (path, value) => {
    setContent((prev) => {
      const section = JSON.parse(JSON.stringify(prev[activeSection]));
      let obj = section;
      const keys = path.split('.');
      for (let i = 0; i < keys.length - 1; i++) {
        const key = isNaN(keys[i]) ? keys[i] : parseInt(keys[i]);
        obj = obj[key];
      }
      const lastKey = isNaN(keys[keys.length - 1])
        ? keys[keys.length - 1]
        : parseInt(keys[keys.length - 1]);
      obj[lastKey] = value;
      return { ...prev, [activeSection]: section };
    });
  };

  const addArrayItem = (path, template) => {
    setContent((prev) => {
      const section = JSON.parse(JSON.stringify(prev[activeSection]));
      let obj = section;
      const keys = path.split('.');
      for (const key of keys) {
        obj = obj[isNaN(key) ? key : parseInt(key)];
      }
      obj.push(template);
      return { ...prev, [activeSection]: section };
    });
  };

  const removeArrayItem = (path, index) => {
    setContent((prev) => {
      const section = JSON.parse(JSON.stringify(prev[activeSection]));
      let obj = section;
      const keys = path.split('.');
      for (const key of keys) {
        obj = obj[isNaN(key) ? key : parseInt(key)];
      }
      obj.splice(index, 1);
      return { ...prev, [activeSection]: section };
    });
  };

  const data = content[activeSection];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 text-sm font-medium ${
            toast.type === 'success'
              ? 'bg-green-600 text-white'
              : 'bg-red-600 text-white'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle size={16} />
          ) : (
            <AlertCircle size={16} />
          )}
          {toast.message}
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div>
            <h1 className="font-bold text-gray-900">
              FVPT <span className="text-teal-700">Content Manager</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={saveSection}
              disabled={saving || loadingSection}
              className="bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-800 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <Save size={16} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={onLogout}
              className="text-gray-500 hover:text-gray-700 p-2"
              title="Sign out"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-56 shrink-0">
            <nav className="bg-white rounded-xl shadow-sm overflow-hidden">
              {SECTIONS.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setActiveSection(s.key)}
                  className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                    activeSection === s.key
                      ? 'bg-teal-700 text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </nav>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-center text-sm text-teal-700 hover:text-teal-800 font-medium"
            >
              View Live Site &rarr;
            </a>
          </aside>

          {/* Editor */}
          <div className="flex-1 min-w-0">
            {loadingSection || !data ? (
              <div className="bg-white rounded-xl p-12 text-center text-gray-400">
                Loading...
              </div>
            ) : (
              <div className="space-y-6">
                <SectionEditor
                  sectionKey={activeSection}
                  data={data}
                  updateField={updateField}
                  addArrayItem={addArrayItem}
                  removeArrayItem={removeArrayItem}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Section-specific editors --- */

function SectionEditor({
  sectionKey,
  data,
  updateField,
  addArrayItem,
  removeArrayItem,
}) {
  switch (sectionKey) {
    case 'general':
      return (
        <GeneralEditor
          data={data}
          update={updateField}
          addItem={addArrayItem}
          removeItem={removeArrayItem}
        />
      );
    case 'home':
      return (
        <HomeEditor
          data={data}
          update={updateField}
          addItem={addArrayItem}
          removeItem={removeArrayItem}
        />
      );
    case 'about':
      return (
        <AboutEditor
          data={data}
          update={updateField}
          addItem={addArrayItem}
          removeItem={removeArrayItem}
        />
      );
    case 'services':
      return (
        <ServicesEditor
          data={data}
          update={updateField}
          addItem={addArrayItem}
          removeItem={removeArrayItem}
        />
      );
    case 'contact':
      return (
        <ContactEditor
          data={data}
          update={updateField}
          addItem={addArrayItem}
          removeItem={removeArrayItem}
        />
      );
    default:
      return null;
  }
}

/* --- Field Components --- */

function Field({ label, value, onChange, multiline, type = 'text' }) {
  if (multiline) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none resize-y"
        />
      </div>
    );
  }
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
      />
    </div>
  );
}

function Card({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
      >
        {title}
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      {open && <div className="px-6 pb-6 space-y-4">{children}</div>}
    </div>
  );
}

/* --- General Editor --- */

function GeneralEditor({ data, update, addItem, removeItem }) {
  return (
    <>
      <Card title="Clinic Information">
        <Field
          label="Clinic Name"
          value={data.clinicName}
          onChange={(v) => update('clinicName', v)}
        />
        <Field
          label="Tagline"
          value={data.tagline}
          onChange={(v) => update('tagline', v)}
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            label="Phone"
            value={data.phone}
            onChange={(v) => update('phone', v)}
          />
          <Field
            label="Fax"
            value={data.fax}
            onChange={(v) => update('fax', v)}
          />
        </div>
        <Field
          label="Email"
          value={data.email}
          onChange={(v) => update('email', v)}
        />
      </Card>

      <Card title="Address">
        <Field
          label="Street"
          value={data.address?.street}
          onChange={(v) => update('address.street', v)}
        />
        <div className="grid sm:grid-cols-3 gap-4">
          <Field
            label="City"
            value={data.address?.city}
            onChange={(v) => update('address.city', v)}
          />
          <Field
            label="State"
            value={data.address?.state}
            onChange={(v) => update('address.state', v)}
          />
          <Field
            label="Zip"
            value={data.address?.zip}
            onChange={(v) => update('address.zip', v)}
          />
        </div>
      </Card>

      <Card title="Hours">
        <Field
          label="Weekdays"
          value={data.hours?.weekdays}
          onChange={(v) => update('hours.weekdays', v)}
        />
        <Field
          label="Saturday"
          value={data.hours?.saturday}
          onChange={(v) => update('hours.saturday', v)}
        />
        <Field
          label="Sunday"
          value={data.hours?.sunday}
          onChange={(v) => update('hours.sunday', v)}
        />
      </Card>

      <Card title="Stats">
        {data.stats?.map((stat, i) => (
          <div key={i} className="flex items-end gap-3">
            <div className="flex-1 grid sm:grid-cols-2 gap-3">
              <Field
                label={`Stat ${i + 1} — Number`}
                value={stat.number}
                onChange={(v) => update(`stats.${i}.number`, v)}
              />
              <Field
                label="Label"
                value={stat.label}
                onChange={(v) => update(`stats.${i}.label`, v)}
              />
            </div>
            <button
              onClick={() => removeItem('stats', i)}
              className="p-2 text-red-400 hover:text-red-600 mb-0.5"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            addItem('stats', { number: '', label: '' })
          }
          className="text-sm text-teal-700 font-medium flex items-center gap-1 hover:text-teal-800"
        >
          <Plus size={14} /> Add Stat
        </button>
      </Card>

      <Card title="Insurance Note">
        <Field
          label="Insurance Note"
          value={data.insuranceNote}
          onChange={(v) => update('insuranceNote', v)}
          multiline
        />
      </Card>
    </>
  );
}

/* --- Home Editor --- */

function HomeEditor({ data, update, addItem, removeItem }) {
  return (
    <>
      <Card title="Hero Section">
        <Field
          label="Headline"
          value={data.hero?.headline}
          onChange={(v) => update('hero.headline', v)}
        />
        <Field
          label="Subheadline"
          value={data.hero?.subheadline}
          onChange={(v) => update('hero.subheadline', v)}
          multiline
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            label="Primary Button Text"
            value={data.hero?.ctaText}
            onChange={(v) => update('hero.ctaText', v)}
          />
          <Field
            label="Secondary Button Text"
            value={data.hero?.secondaryCtaText}
            onChange={(v) => update('hero.secondaryCtaText', v)}
          />
        </div>
      </Card>

      <Card title="Why Us Section">
        <Field
          label="Heading"
          value={data.intro?.heading}
          onChange={(v) => update('intro.heading', v)}
        />
        <Field
          label="Text"
          value={data.intro?.text}
          onChange={(v) => update('intro.text', v)}
          multiline
        />
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Highlights</p>
          {data.intro?.highlights?.map((h, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                value={h}
                onChange={(e) =>
                  update(`intro.highlights.${i}`, e.target.value)
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
              <button
                onClick={() => removeItem('intro.highlights', i)}
                className="p-1 text-red-400 hover:text-red-600"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <button
            onClick={() => addItem('intro.highlights', '')}
            className="text-sm text-teal-700 font-medium flex items-center gap-1"
          >
            <Plus size={14} /> Add Highlight
          </button>
        </div>
      </Card>

      <Card title="Service Previews">
        {data.servicePreview?.services?.map((svc, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-500">
                Service {i + 1}
              </span>
              <button
                onClick={() => removeItem('servicePreview.services', i)}
                className="p-1 text-red-400 hover:text-red-600"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <Field
              label="Title"
              value={svc.title}
              onChange={(v) =>
                update(`servicePreview.services.${i}.title`, v)
              }
            />
            <Field
              label="Description"
              value={svc.description}
              onChange={(v) =>
                update(`servicePreview.services.${i}.description`, v)
              }
              multiline
            />
          </div>
        ))}
        <button
          onClick={() =>
            addItem('servicePreview.services', {
              title: '',
              description: '',
              icon: 'Activity',
            })
          }
          className="text-sm text-teal-700 font-medium flex items-center gap-1"
        >
          <Plus size={14} /> Add Service Preview
        </button>
      </Card>

      <Card title="Testimonials">
        {data.testimonials?.items?.map((t, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-500">
                Testimonial {i + 1}
              </span>
              <button
                onClick={() => removeItem('testimonials.items', i)}
                className="p-1 text-red-400 hover:text-red-600"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <Field
              label="Quote"
              value={t.quote}
              onChange={(v) =>
                update(`testimonials.items.${i}.quote`, v)
              }
              multiline
            />
            <div className="grid sm:grid-cols-2 gap-3">
              <Field
                label="Author"
                value={t.author}
                onChange={(v) =>
                  update(`testimonials.items.${i}.author`, v)
                }
              />
              <Field
                label="Detail"
                value={t.detail}
                onChange={(v) =>
                  update(`testimonials.items.${i}.detail`, v)
                }
              />
            </div>
          </div>
        ))}
        <button
          onClick={() =>
            addItem('testimonials.items', {
              quote: '',
              author: '',
              detail: '',
            })
          }
          className="text-sm text-teal-700 font-medium flex items-center gap-1"
        >
          <Plus size={14} /> Add Testimonial
        </button>
      </Card>

      <Card title="Bottom CTA">
        <Field
          label="Heading"
          value={data.ctaSection?.heading}
          onChange={(v) => update('ctaSection.heading', v)}
        />
        <Field
          label="Text"
          value={data.ctaSection?.text}
          onChange={(v) => update('ctaSection.text', v)}
          multiline
        />
        <Field
          label="Button Text"
          value={data.ctaSection?.ctaText}
          onChange={(v) => update('ctaSection.ctaText', v)}
        />
      </Card>
    </>
  );
}

/* --- About Editor --- */

function AboutEditor({ data, update, addItem, removeItem }) {
  return (
    <>
      <Card title="Hero">
        <Field
          label="Heading"
          value={data.hero?.heading}
          onChange={(v) => update('hero.heading', v)}
        />
        <Field
          label="Subheading"
          value={data.hero?.subheading}
          onChange={(v) => update('hero.subheading', v)}
          multiline
        />
      </Card>

      <Card title="Our Story">
        <Field
          label="Heading"
          value={data.story?.heading}
          onChange={(v) => update('story.heading', v)}
        />
        {data.story?.paragraphs?.map((p, i) => (
          <div key={i} className="flex items-start gap-2">
            <Field
              label={`Paragraph ${i + 1}`}
              value={p}
              onChange={(v) => update(`story.paragraphs.${i}`, v)}
              multiline
            />
            <button
              onClick={() => removeItem('story.paragraphs', i)}
              className="p-1 text-red-400 hover:text-red-600 mt-7"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <button
          onClick={() => addItem('story.paragraphs', '')}
          className="text-sm text-teal-700 font-medium flex items-center gap-1"
        >
          <Plus size={14} /> Add Paragraph
        </button>
      </Card>

      <Card title="Values">
        {data.values?.items?.map((v, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-500">
                Value {i + 1}
              </span>
              <button
                onClick={() => removeItem('values.items', i)}
                className="p-1 text-red-400 hover:text-red-600"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <Field
              label="Title"
              value={v.title}
              onChange={(val) => update(`values.items.${i}.title`, val)}
            />
            <Field
              label="Description"
              value={v.description}
              onChange={(val) =>
                update(`values.items.${i}.description`, val)
              }
              multiline
            />
          </div>
        ))}
        <button
          onClick={() =>
            addItem('values.items', { title: '', description: '' })
          }
          className="text-sm text-teal-700 font-medium flex items-center gap-1"
        >
          <Plus size={14} /> Add Value
        </button>
      </Card>

      <Card title="Team Members" defaultOpen={false}>
        {data.team?.members?.map((m, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-500">
                {m.name || `Member ${i + 1}`}
              </span>
              <button
                onClick={() => removeItem('team.members', i)}
                className="p-1 text-red-400 hover:text-red-600"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field
                label="Name"
                value={m.name}
                onChange={(v) => update(`team.members.${i}.name`, v)}
              />
              <Field
                label="Credentials"
                value={m.credentials}
                onChange={(v) =>
                  update(`team.members.${i}.credentials`, v)
                }
              />
            </div>
            <Field
              label="Role"
              value={m.role}
              onChange={(v) => update(`team.members.${i}.role`, v)}
            />
            <Field
              label="Bio"
              value={m.bio}
              onChange={(v) => update(`team.members.${i}.bio`, v)}
              multiline
            />
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Specialties</p>
              {m.specialties?.map((s, j) => (
                <div key={j} className="flex items-center gap-2">
                  <input
                    value={s}
                    onChange={(e) =>
                      update(
                        `team.members.${i}.specialties.${j}`,
                        e.target.value
                      )
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  />
                  <button
                    onClick={() =>
                      removeItem(`team.members.${i}.specialties`, j)
                    }
                    className="p-1 text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  addItem(`team.members.${i}.specialties`, '')
                }
                className="text-sm text-teal-700 font-medium flex items-center gap-1"
              >
                <Plus size={14} /> Add Specialty
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={() =>
            addItem('team.members', {
              name: '',
              credentials: '',
              role: '',
              bio: '',
              specialties: [],
            })
          }
          className="text-sm text-teal-700 font-medium flex items-center gap-1"
        >
          <Plus size={14} /> Add Team Member
        </button>
      </Card>
    </>
  );
}

/* --- Services Editor --- */

function ServicesEditor({ data, update, addItem, removeItem }) {
  return (
    <>
      <Card title="Hero">
        <Field
          label="Heading"
          value={data.hero?.heading}
          onChange={(v) => update('hero.heading', v)}
        />
        <Field
          label="Subheading"
          value={data.hero?.subheading}
          onChange={(v) => update('hero.subheading', v)}
          multiline
        />
      </Card>

      <Card title="Intro Text">
        <Field
          label="Intro Paragraph"
          value={data.intro?.text}
          onChange={(v) => update('intro.text', v)}
          multiline
        />
      </Card>

      <Card title="Service Categories" defaultOpen={false}>
        {data.categories?.map((cat, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-500">
                {cat.title || `Category ${i + 1}`}
              </span>
              <button
                onClick={() => removeItem('categories', i)}
                className="p-1 text-red-400 hover:text-red-600"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <Field
              label="Title"
              value={cat.title}
              onChange={(v) => update(`categories.${i}.title`, v)}
            />
            <Field
              label="Description"
              value={cat.description}
              onChange={(v) => update(`categories.${i}.description`, v)}
              multiline
            />
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Treatments</p>
              {cat.treatments?.map((t, j) => (
                <div key={j} className="flex items-center gap-2">
                  <input
                    value={t}
                    onChange={(e) =>
                      update(
                        `categories.${i}.treatments.${j}`,
                        e.target.value
                      )
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  />
                  <button
                    onClick={() =>
                      removeItem(`categories.${i}.treatments`, j)
                    }
                    className="p-1 text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  addItem(`categories.${i}.treatments`, '')
                }
                className="text-sm text-teal-700 font-medium flex items-center gap-1"
              >
                <Plus size={14} /> Add Treatment
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={() =>
            addItem('categories', {
              title: '',
              icon: 'Activity',
              description: '',
              treatments: [],
            })
          }
          className="text-sm text-teal-700 font-medium flex items-center gap-1"
        >
          <Plus size={14} /> Add Category
        </button>
      </Card>

      <Card title="Conditions We Treat">
        <div className="space-y-2">
          {data.conditions?.items?.map((c, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                value={c}
                onChange={(e) =>
                  update(`conditions.items.${i}`, e.target.value)
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
              <button
                onClick={() => removeItem('conditions.items', i)}
                className="p-1 text-red-400 hover:text-red-600"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <button
            onClick={() => addItem('conditions.items', '')}
            className="text-sm text-teal-700 font-medium flex items-center gap-1"
          >
            <Plus size={14} /> Add Condition
          </button>
        </div>
      </Card>

      <Card title="Bottom CTA">
        <Field
          label="Heading"
          value={data.ctaSection?.heading}
          onChange={(v) => update('ctaSection.heading', v)}
        />
        <Field
          label="Text"
          value={data.ctaSection?.text}
          onChange={(v) => update('ctaSection.text', v)}
          multiline
        />
        <Field
          label="Button Text"
          value={data.ctaSection?.ctaText}
          onChange={(v) => update('ctaSection.ctaText', v)}
        />
      </Card>
    </>
  );
}

/* --- Contact Editor --- */

function ContactEditor({ data, update, addItem, removeItem }) {
  return (
    <>
      <Card title="Hero">
        <Field
          label="Heading"
          value={data.hero?.heading}
          onChange={(v) => update('hero.heading', v)}
        />
        <Field
          label="Subheading"
          value={data.hero?.subheading}
          onChange={(v) => update('hero.subheading', v)}
          multiline
        />
      </Card>

      <Card title="Contact Info Text">
        <Field
          label="Heading"
          value={data.info?.heading}
          onChange={(v) => update('info.heading', v)}
        />
        <Field
          label="Description"
          value={data.info?.description}
          onChange={(v) => update('info.description', v)}
          multiline
        />
        <Field
          label="Direct Access Note"
          value={data.info?.directAccess}
          onChange={(v) => update('info.directAccess', v)}
          multiline
        />
      </Card>

      <Card title="Contact Form Settings">
        <Field
          label="Form Heading"
          value={data.form?.heading}
          onChange={(v) => update('form.heading', v)}
        />
        <Field
          label="Submit Button Text"
          value={data.form?.submitText}
          onChange={(v) => update('form.submitText', v)}
        />
        <Field
          label="Disclaimer"
          value={data.form?.disclaimer}
          onChange={(v) => update('form.disclaimer', v)}
          multiline
        />
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">
            Reason for Visit Options
          </p>
          {data.form?.reasonOptions?.map((opt, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                value={opt}
                onChange={(e) =>
                  update(`form.reasonOptions.${i}`, e.target.value)
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
              <button
                onClick={() => removeItem('form.reasonOptions', i)}
                className="p-1 text-red-400 hover:text-red-600"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <button
            onClick={() => addItem('form.reasonOptions', '')}
            className="text-sm text-teal-700 font-medium flex items-center gap-1"
          >
            <Plus size={14} /> Add Option
          </button>
        </div>
      </Card>

      <Card title="Map Embed">
        <Field
          label="Google Maps Embed URL"
          value={data.mapEmbedUrl}
          onChange={(v) => update('mapEmbedUrl', v)}
        />
      </Card>
    </>
  );
}
