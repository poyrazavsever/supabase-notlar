import { createClient } from "@supabase/supabase-js";

// Bulut Supabase'le aynı istemci, sadece adres bizim sunucumuz
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type Note = {
  id: number;
  content: string;
  created_at: string;
};
