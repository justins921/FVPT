import { createRequire } from 'module';
import { getContent, putContent, isValidSection } from '../../lib/supabase.js';
import { verifyToken } from '../../lib/auth.js';

// Fallback: serve from bundled JSON files if Supabase is unavailable
const require = createRequire(import.meta.url);
const fallback = {
  general: require('../../src/content/general.json'),
  home: require('../../src/content/home.json'),
  about: require('../../src/content/about.json'),
  services: require('../../src/content/services.json'),
  contact: require('../../src/content/contact.json'),
};

export default async function handler(req, res) {
  const { section } = req.query;

  if (!isValidSection(section)) {
    return res.status(404).json({ error: 'Unknown section' });
  }

  try {
    if (req.method === 'GET') {
      try {
        const data = await getContent(section);
        return res.json(data);
      } catch {
        // Supabase unavailable or empty — serve from local JSON
        if (fallback[section]) {
          return res.json(fallback[section]);
        }
        return res.status(500).json({ error: 'Content not found' });
      }
    }

    if (req.method === 'PUT') {
      const user = verifyToken(req.headers.authorization);
      if (!user) {
        return res.status(401).json({ error: 'Not authenticated' });
      }
      await putContent(section, req.body);
      return res.json({ success: true });
    }

    res.setHeader('Allow', 'GET, PUT');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(`Content API error (${section}):`, err);
    return res.status(500).json({ error: 'Server error' });
  }
}
