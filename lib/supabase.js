import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

let client;

export function getSupabase() {
  if (!client) {
    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        'Missing SUPABASE_URL or SUPABASE_SERVICE_KEY environment variables'
      );
    }
    client = createClient(supabaseUrl, supabaseKey);
  }
  return client;
}

const VALID_SECTIONS = ['general', 'home', 'about', 'services', 'contact'];

export function isValidSection(section) {
  return VALID_SECTIONS.includes(section);
}

export async function getContent(section) {
  const db = getSupabase();
  const { data, error } = await db
    .from('content')
    .select('data')
    .eq('section', section)
    .single();

  if (error) throw error;
  return data.data;
}

export async function putContent(section, content) {
  const db = getSupabase();
  const { error } = await db
    .from('content')
    .upsert({ section, data: content, updated_at: new Date().toISOString() });

  if (error) throw error;
}
