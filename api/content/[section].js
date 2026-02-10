import { getContent, putContent, isValidSection } from '../../lib/supabase.js';
import { verifyToken } from '../../lib/auth.js';

export default async function handler(req, res) {
  const { section } = req.query;

  if (!isValidSection(section)) {
    return res.status(404).json({ error: 'Unknown section' });
  }

  try {
    if (req.method === 'GET') {
      const data = await getContent(section);
      return res.json(data);
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
