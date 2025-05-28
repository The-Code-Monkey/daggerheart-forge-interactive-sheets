import { Database, Json as SupabaseJson } from "@/integrations/supabase/types";

export type Character = Database["public"]["Tables"]["characters"]["Row"];

export type Json = { [key: string]: SupabaseJson | undefined }
