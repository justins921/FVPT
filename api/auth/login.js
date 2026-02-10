import bcrypt from 'bcryptjs';
import { signToken } from '../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body || {};
  const ADMIN_USER = process.env.ADMIN_USER || 'admin';
  const ADMIN_HASH = process.env.ADMIN_HASH || '';

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  if (username !== ADMIN_USER) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  if (!ADMIN_HASH) {
    return res.status(500).json({
      error: 'Admin account not configured. Run: npm run create-password',
    });
  }

  const valid = await bcrypt.compare(password, ADMIN_HASH);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = signToken(ADMIN_USER);
  return res.json({ token });
}
