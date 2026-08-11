import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let adminClient: SupabaseClient | null = null;

function getServerCredentials() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey =
    process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !secretKey) {
    throw new Error(
      "Supabase não configurado. Conecte o banco ao projeto na Vercel e sincronize SUPABASE_URL e SUPABASE_SECRET_KEY.",
    );
  }

  return { url, secretKey };
}

export function getSupabaseAdmin(): SupabaseClient {
  if (adminClient) return adminClient;

  const { url, secretKey } = getServerCredentials();
  adminClient = createClient(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });

  return adminClient;
}
