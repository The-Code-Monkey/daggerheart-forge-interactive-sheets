import { Database, Json as SupabaseJson } from "@/integrations/supabase/types";

interface Feature {
  name: string;
  description: string;
}

export type Domain = Database["public"]["Tables"]["domains"]["Row"];

export type Character = Database["public"]["Tables"]["characters"]["Row"];

export type Class = Database["public"]["Tables"]["classes"]["Row"] & {
  features: Feature[];
  domains?: Domain[];
}

export type Json = Record<string, SupabaseJson | undefined>;
