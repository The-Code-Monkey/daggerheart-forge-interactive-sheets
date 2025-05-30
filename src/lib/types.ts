import { Database, Json as SupabaseJson } from "@/integrations/supabase/types";

export interface Feature {
  name: string;
  description: string;
  list: string[];
}

export interface ClassSubclass {
  name: string;
  features: Record<string, Partial<Feature>[]>;
  spellcast_trait?: string;
}

export interface ClassAdditional {
  subclasses: Record<string, Partial<ClassSubclass>>;
}

export interface CharacterStats {
  agility: number;
  strength: number;
  finesse: number;
  instinct: number;
  presence: number;
  knowledge: number;
}

export type Domain = Database["public"]["Tables"]["domains"]["Row"];

export type Character = Database["public"]["Tables"]["characters"]["Row"] & {
  stats: CharacterStats;
};

export type CharacterWithRelations = Character & {
  class: { name: string } | null;
  ancestry: { name: string } | null;
  subclass: { name: string } | null;
  community: { name: string } | null;
};

export type Community = Database["public"]["Tables"]["communities"]["Row"];

export type Class = Database["public"]["Tables"]["classes"]["Row"] & {
  domains: Partial<Domain>[];
  features: Partial<Feature>[];
  additional: Partial<ClassAdditional>;
};

export type Ancestry = Omit<
  Database["public"]["Tables"]["ancestries"]["Row"],
  "features"
> & {
  features: Partial<Feature>[];
};

export type Subclass = Database["public"]["Tables"]["subclasses"]["Row"];

export type Json = Record<string, SupabaseJson | undefined>;
