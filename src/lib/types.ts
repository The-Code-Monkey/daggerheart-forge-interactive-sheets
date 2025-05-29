import { Database, Json as SupabaseJson } from "@/integrations/supabase/types";

export type Domain = Database["public"]["Tables"]["domains"]["Row"];

export type Character = Database["public"]["Tables"]["characters"]["Row"];

export type Class = Database["public"]["Tables"]["classes"]["Row"] & {
  domains: Partial<Domain>[];
};

export type Json = Record<string, SupabaseJson | undefined>;
