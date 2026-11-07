import { createClient } from '@supabase/supabase-js';

import type { Database } from './types';

const url = process.env['NEXT_PUBLIC_SUPABASE_URL'];
const publishableKey = process.env['NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'];

/** Browser client limited to the public, insert-only contact form policy. */
export const supabase =
  url && publishableKey
    ? createClient<Database>(url, publishableKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;
