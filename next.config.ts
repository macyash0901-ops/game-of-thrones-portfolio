import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    // These are public Supabase values used by the browser contact form. Keeping
    // this bridge means existing Lovable-provided env names continue to work.
    NEXT_PUBLIC_SUPABASE_URL: process.env.SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.SUPABASE_PUBLISHABLE_KEY,
  },
};

export default nextConfig;
