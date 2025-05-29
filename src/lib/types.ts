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

export interface ClassSubclass {
  name: string;
  features: Record<string, Partial<SubclassFeature>[]>;
  spellcast_trait?: string;
}

export interface ClassAdditional {
  subclasses: Record<string, Partial<ClassSubclass>>;
}

export type Domain = Database["public"]["Tables"]["domains"]["Row"];

export type Character = Database["public"]["Tables"]["characters"]["Row"];

export type Ancestry = Database["public"]["Tables"]["ancestries"]["Row"];

export type Community = Database["public"]["Tables"]["communities"]["Row"];

export type Class = Database["public"]["Tables"]["classes"]["Row"] & {
  domains: Partial<Domain>[];
  features: Partial<ClassFeature>[];
  additional: Partial<ClassAdditional>;
};

export type Subclass = Database["public"]["Tables"]["subclasses"]["Row"];

export type Json = Record<string, SupabaseJson | undefined>;
