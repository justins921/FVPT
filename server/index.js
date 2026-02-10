import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

const CONTENT_DIR = path.join(__dirname, '..', 'src', 'content');
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret-in-production';
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_HASH = process.env.ADMIN_HASH || '';

app.use(cors());
app.use(express.json({ limit: '1mb' }));

// --- Auth ---

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  try {
    const decoded = jwt.verify(header.split(' ')[1], JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  if (username !== ADMIN_USER) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // If no hash is configured yet, reject all logins with a helpful message
  if (!ADMIN_HASH) {
    return res.status(500).json({
      error: 'Admin account not configured. Run: npm run create-password',
    });
  }

  const valid = await bcrypt.compare(password, ADMIN_HASH);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ user: ADMIN_USER }, JWT_SECRET, {
    expiresIn: '8h',
  });
  res.json({ token });
});

app.get('/api/auth/verify', authMiddleware, (_req, res) => {
  res.json({ valid: true });
});

// --- Content API ---

const VALID_SECTIONS = ['general', 'home', 'about', 'services', 'contact'];

app.get('/api/content/:section', (req, res) => {
  const { section } = req.params;
  if (!VALID_SECTIONS.includes(section)) {
    return res.status(404).json({ error: 'Unknown section' });
  }
  try {
    const filePath = path.join(CONTENT_DIR, `${section}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read content' });
  }
});

app.put('/api/content/:section', authMiddleware, (req, res) => {
  const { section } = req.params;
  if (!VALID_SECTIONS.includes(section)) {
    return res.status(404).json({ error: 'Unknown section' });
  }
  try {
    const filePath = path.join(CONTENT_DIR, `${section}.json`);
    fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2) + '\n');
    res.json({ success: true });
  } catch (err) {
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
