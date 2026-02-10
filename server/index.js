import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { getContent, putContent, isValidSection } from '../lib/supabase.js';
import { signToken, verifyToken } from '../lib/auth.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_HASH = process.env.ADMIN_HASH || '';

app.use(cors());
app.use(express.json({ limit: '1mb' }));

// --- Auth middleware ---

function authMiddleware(req, res, next) {
  const user = verifyToken(req.headers.authorization);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  req.user = user;
  next();
}

// --- Auth routes ---

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
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
  res.json({ token });
});

app.get('/api/auth/verify', authMiddleware, (_req, res) => {
  res.json({ valid: true });
});

// --- Content API (Supabase-backed) ---

app.get('/api/content/:section', async (req, res) => {
  const { section } = req.params;
  if (!isValidSection(section)) {
    return res.status(404).json({ error: 'Unknown section' });
  }
  try {
    const data = await getContent(section);
    res.json(data);
  } catch (err) {
    console.error(`Failed to read ${section}:`, err);
    res.status(500).json({ error: 'Failed to read content' });
  }
});

app.put('/api/content/:section', authMiddleware, async (req, res) => {
  const { section } = req.params;
  if (!isValidSection(section)) {
    return res.status(404).json({ error: 'Unknown section' });
  }
  try {
    await putContent(section, req.body);
    res.json({ success: true });
  } catch (err) {
    console.error(`Failed to save ${section}:`, err);
    res.status(500).json({ error: 'Failed to save content' });
  }
});

// --- Serve React app in production ---

const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
