import { verifyToken } from '../../lib/auth.js';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const user = verifyToken(req.headers.authorization);
  if (!user) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  return res.json({ valid: true });
}
