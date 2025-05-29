import { Database, Json as SupabaseJson } from "@/integrations/supabase/types";

export interface ClassFeature {
  name: string;
  description: string;
  list: string[];
}

export interface SubclassFeature {
  name: string;
  description: string;
  list?: string[];
}

export interface Subclass {
  name: string;
  features: Record<string, Partial<SubclassFeature>[]>;
  spellcast_trait?: string;
}

export interface ClassAdditional {
  subclasses: Record<string, Partial<Subclass>>;
}

export type Domain = Database["public"]["Tables"]["domains"]["Row"];

export type Character = Database["public"]["Tables"]["characters"]["Row"];

export type Class = Database["public"]["Tables"]["classes"]["Row"] & {
  domains: Partial<Domain>[];
  features: Partial<ClassFeature>[];
  additional: Partial<ClassAdditional>;
};

export type Json = Record<string, SupabaseJson | undefined>;
