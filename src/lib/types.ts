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

export enum ItemType {
  ARMOR = "Armor",
  WEAPON = "Weapon",
  PHYSICAL = "Physical",
  MAGICAL = "Magical",
  CONSUMABLE = "Consumable",
  PRIMARY = "Primary",
  SECONDARY = "Secondary",
}

export interface Feature {
  name: string;
  description: string;
  list?: string[];
  modifiers?: Record<Traits, number>;
}

export interface Threshold {
  major: number;
  severe: number;
}

export interface ClassAdditional {
  hasCompanion?: boolean;
  questions?: {
    background?: string[];
    connections?: string[];
  };
}

export interface CharacterStats {
  agility: number;
  strength: number;
  finesse: number;
  instinct: number;
  presence: number;
  knowledge: number;
}

export interface CharacterAdditional {
  hope?: number;
  stress?: number;
  armor?: number;
  subclass?: Record<
    string,
    {
      specialization?: boolean;
      mastery?: boolean;
    }
  >;
  domain_features?: number[];
  questions?: {
    background?: Record<string, string>;
    connections?: Record<string, string>;
    experiences?: [string, string];
  };
}

export type Domain = Database["public"]["Tables"]["domains"]["Row"] & {
  username: string | null;
};

export type Character = Database["public"]["Tables"]["characters"]["Row"] & {
  stats: CharacterStats;
};

export type CharacterWithRelations = Omit<
  Character,
  "ancestry" | "additional"
> & {
  class: Partial<Class> | null;
  ancestry?: { name?: string } | null;
  subclass: Partial<Subclass> | null;
  community: { name: string } | null;
  domains: Domain[];
  additional?: Partial<CharacterAdditional>;
};

export type Community = Database["public"]["Tables"]["communities"]["Row"];

export type Class = Database["public"]["Tables"]["classes"]["Row"] & {
  subclass: Partial<Subclass>[];
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

export type Subclass = Omit<
  Database["public"]["Tables"]["subclasses"]["Row"],
  "features"
> & {
  class: Partial<Class>;
  features?: {
    foundation?: Partial<Feature>[];
    specialization?: Partial<Feature>[];
    mastery?: Partial<Feature>[];
  };
};

export type ItemArmor = Omit<
  Database["public"]["Tables"]["items"]["Row"],
  "features"
> & {
  equipped?: boolean;
  type: ItemType.ARMOR;
  features?: {
    base: number;
    features?: Partial<Feature>[];
    thresholds: Partial<Threshold>;
  };
};

export type ItemOther = Omit<
  Database["public"]["Tables"]["items"]["Row"],
  "features"
> & {
  equipped?: boolean;
  features?: Partial<Feature>[];
  type: ItemType.MAGICAL | ItemType.PHYSICAL | ItemType.CONSUMABLE;
};

export type ItemCustom = Omit<
  Database["public"]["Tables"]["items"]["Row"],
  "features"
> & {
  features: [];
  type: ItemType;
};

export type Item = ItemOther | ItemArmor | ItemCustom;

export interface CardAdditional {
  if?: {
    armor?: [boolean, Record<string, number>];
    domainCardCount?: [number, Record<string, number>];
  };
  tiers?: Record<
    string,
    {
      thresholds?: {
        major?: number;
        severe?: number;
      };
    }
  >;
}

export type Card = Omit<
  Database["public"]["Tables"]["cards"]["Row"],
  "additional"
> & {
  additional?: Partial<CardAdditional>;
};

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export type NPCS = Omit<
  Database["public"]["Tables"]["npcs"]["Row"],
  "stats"
> & {
  stats: CharacterStats;
};

export type Session = Omit<
  Database["public"]["Tables"]["sessions"]["Row"],
  "additional"
> & {
  additional: Record<string, never>;
};

export type Campaign = Database["public"]["Tables"]["campaigns"]["Row"] & {
  players?: Partial<Character>[];
  sessions?: Partial<Session>[];
};

export type CampaignWithCount =
  Database["public"]["Tables"]["campaigns"]["Row"] & {
    players: [
      {
        count: number;
      },
    ];
    sessions: [
      {
        count: number;
      },
    ];
  };

export type CampaignWithRelations = Omit<
  Database["public"]["Tables"]["campaigns"]["Row"],
  "additional"
> & {
  npcs: NPCS[];
  players: Character[];
  sessions: Session[];
  additional: Record<string, never>;
};

export type Json = Record<string, SupabaseJson | undefined>;
