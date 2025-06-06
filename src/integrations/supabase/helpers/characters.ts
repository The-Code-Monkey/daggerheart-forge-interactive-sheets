import { Character, CharacterWithRelations, Domain } from "@/lib/types";
import { supabase } from "../client";

export const getCharacterTier = (level: number): 1 | 2 | 3 | 4 => {
  if (level === 1) return 1;
  if (level <= 4) return 2;
  if (level <= 7) return 3;
  return 4;
};

const characterString = `*, class(name, base_evasion, base_hp, features, additional, classes_domains(
    domains(
      id,
      name
    )
  )), ancestry(id, name), subclass(id, name, features), community(id, name)`;

export const getCharacters = async (): Promise<
  CharacterWithRelations[] | null
> => {
  const { data, error } = await supabase
    .from("characters")
    .select(characterString)
    .limit(5);

  if (error) {
    console.log(error);
    return null;
  }
  return data as CharacterWithRelations[];
};

export const getCharacterById = async (
  cId: string
): Promise<CharacterWithRelations | null> => {
  const { data, error } = await supabase
    .from("characters")
    .select(characterString)
    .eq("id", cId)
    .single();

  if (error) {
    console.log(error);
    return null;
  }

  const classes_domains = (data.class?.classes_domains ?? []) as {
    domains: Domain;
  }[];

  const formattedData = {
    ...data,
    domains: classes_domains.map(
      (domain: { domains: Domain }) => domain.domains
    ),
  };

  return formattedData as CharacterWithRelations;
};

export const updateCharacter = async (
  characterId: string,
  updates: Partial<Character>
): Promise<CharacterWithRelations | null> => {
  const { data, error } = await supabase
    .from("characters")
    .update(updates)
    .eq("id", characterId)
    .select(characterString)
    .single();

  if (error) {
    console.log(error);
    return null;
  }

  const classes_domains = (data.class?.classes_domains ?? []) as {
    domains: Domain;
  }[];

  const formattedData = {
    ...data,
    domains: classes_domains.map(
      (domain: { domains: Domain }) => domain.domains
    ),
  };

  return formattedData as CharacterWithRelations;
};
