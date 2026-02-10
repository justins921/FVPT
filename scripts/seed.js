/**
 * Seed Supabase with content from the local JSON files.
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_KEY=... node scripts/seed.js
 *
 * Or with a .env file:
 *   npm run seed
 */

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, '..', 'src', 'content');
const SECTIONS = ['general', 'home', 'about', 'services', 'contact'];

async function seed() {
  const { SUPABASE_URL, SUPABASE_SERVICE_KEY } = process.env;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in .env');
    process.exit(1);
  }

  const db = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  for (const section of SECTIONS) {
    const filePath = path.join(CONTENT_DIR, `${section}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const { error } = await db.from('content').upsert({
      section,
      data,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error(`Failed to seed "${section}":`, error.message);
    } else {
      console.log(`Seeded "${section}" successfully`);
    }
  }

  console.log('\nDone! Your Supabase database is ready.');
}

seed();
