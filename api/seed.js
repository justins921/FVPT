import { createRequire } from 'module';
import { getSupabase } from '../lib/supabase.js';

const require = createRequire(import.meta.url);

const content = {
  general: require('../src/content/general.json'),
  home: require('../src/content/home.json'),
  about: require('../src/content/about.json'),
  services: require('../src/content/services.json'),
  contact: require('../src/content/contact.json'),
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).send(`
      <html>
        <body style="font-family:system-ui;max-width:480px;margin:60px auto;text-align:center">
          <h2>Seed Database</h2>
          <p>This will populate your Supabase database with the site content.</p>
          <form method="POST">
            <button type="submit" style="background:#0d9488;color:white;border:none;padding:12px 32px;border-radius:999px;font-size:16px;cursor:pointer">
              Seed Now
            </button>
          </form>
        </body>
      </html>
    `);
  }

  try {
    const db = getSupabase();
    const results = [];

    for (const [section, data] of Object.entries(content)) {
      const { error } = await db.from('content').upsert({
        section,
        data,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        results.push({ section, status: 'error', message: error.message });
      } else {
        results.push({ section, status: 'ok' });
      }
    }

    const allOk = results.every((r) => r.status === 'ok');

    return res.status(200).send(`
      <html>
        <body style="font-family:system-ui;max-width:480px;margin:60px auto;text-align:center">
          <h2>${allOk ? 'Database Seeded!' : 'Seed completed with errors'}</h2>
          <ul style="list-style:none;padding:0">
            ${results.map((r) => `<li style="padding:4px 0">${r.status === 'ok' ? '&#9989;' : '&#10060;'} ${r.section} ${r.message ? '— ' + r.message : ''}</li>`).join('')}
          </ul>
          ${allOk ? '<p><a href="/">Go to site &rarr;</a></p>' : '<p>Check your Supabase table and env vars.</p>'}
        </body>
      </html>
    `);
  } catch (err) {
    return res.status(500).send(`
      <html>
        <body style="font-family:system-ui;max-width:480px;margin:60px auto;text-align:center">
          <h2>Seed Failed</h2>
          <p style="color:red">${err.message}</p>
          <p>Make sure your Vercel environment variables are set correctly:</p>
          <ul style="text-align:left">
            <li><code>SUPABASE_URL</code></li>
            <li><code>SUPABASE_SERVICE_KEY</code></li>
          </ul>
        </body>
      </html>
    `);
  }
}
