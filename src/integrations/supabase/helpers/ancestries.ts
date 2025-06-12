import { Ancestry } from "@/lib/types";
import { supabase } from "../client";
import { Option } from "@/components/molecules/GenericMultiSelect";

export const getAllAncestries = async (
  {
    limit,
    homebrew,
    user_id,
  }: { limit?: number; homebrew?: boolean; user_id?: string } = {
    homebrew: false,
  }
): Promise<Ancestry[] | null> => {
  const query = supabase.from("ancestries").select("*");

  if (homebrew !== undefined) {
    query.eq("isHomebrew", homebrew);
  }
  if (user_id) {
    query.eq("user_id", user_id);
  }

  const { data, error } = await query.limit(limit ?? 99);

  if (error) {
    console.log(error);
    return null;
  }

  return data as Ancestry[];
};

export const getSingleAncestryBySlug = async (
  slug: string
): Promise<Ancestry | null> => {
  const { data, error } = await supabase
    .from("ancestries")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.log(error);
    return null;
  }
  return data as Ancestry;
};

export const ancestrySearchHelper = async (
  query: string
): Promise<Option[] | null> => {
  const { data, error } = await supabase
    .from("ancestries")
    .select("id, name")
    .ilike("name", `%${query}%`)
    .limit(20);

  if (error) {
    console.log(error);
    return null;
  }

  return data.map((ancestry) => ({
    value: ancestry.id,
    label: String(ancestry.name),
  }));
};

export const getAllBaseAncestries = async (): Promise<Option[] | null> => {
  const data = await getAllAncestries({ homebrew: false, limit: 20 });

  if (!data) return null;

  return data.map((ancestry) => ({
    value: ancestry.id,
    label: String(ancestry.name),
  }));
};
