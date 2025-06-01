import { Character, CharacterWithRelations } from "@/lib/types";
import { supabase } from "../client";

export const getCharacters = async (): Promise<
  CharacterWithRelations[] | null
> => {
  const { data, error } = await supabase
    .from("characters")
    .select("*, class(name), ancestry(name), subclass(name), community(name)")
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
    .select(
      "*, class(name, base_evasion, base_hp), ancestry(name), subclass(name), community(name)"
    )
    .eq("id", cId)
    .single();

  if (error) {
    console.log(error);
    return null;
  }
  return data as CharacterWithRelations;
};

export const updateCharacter = async (
  characterId: string,
  updates: Partial<Character>
): Promise<CharacterWithRelations | null> => {
  const { data, error } = await supabase
    .from("characters")
    .update(updates)
    .eq("id", characterId)
    .select("*, class(name), ancestry(name), subclass(name), community(name)")
    .single();

  if (error) {
    console.log(error);
    return null;
  }
  return data as CharacterWithRelations;
};
