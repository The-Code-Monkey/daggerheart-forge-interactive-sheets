import { Database, Json as SupabaseJson } from "@/integrations/supabase/types";

export enum Traits {
  AGILITY = "Agility",
  STRENGTH = "Strength",
  FINESSE = "Finesse",
  INSTINCT = "Instinct",
  PRESENCE = "Presence",
  KNOWLEDGE = "Knowledge",
  EVASION = "Evasion",
}

export interface Feature {
  name: string;
  description: string;
  list?: string[];
  modifiers?: Record<Traits, number>;
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

export type CharacterWithRelations = Omit<Character, "ancestry"> & {
  class: { name: string; base_hp: number; base_evasion: number } | null;
  ancestry?: { name?: string } | null;
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

export type Item = Omit<
  Database["public"]["Tables"]["items"]["Row"],
  "features"
> & {
  features?: Partial<Feature>[];
};

export type Json = Record<string, SupabaseJson | undefined>;
