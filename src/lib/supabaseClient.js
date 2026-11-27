import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabaseConfigurado = Boolean(
  supabaseUrl &&
  /^https:\/\/[^/\s]+\.supabase\.co\/?$/.test(supabaseUrl) &&
  supabaseKey &&
  supabaseKey.startsWith('sb_publishable_') &&
  !supabaseKey.includes('CHAVE')
);

export const supabase = supabaseConfigurado
  ? createClient(supabaseUrl, supabaseKey)
  : null;
