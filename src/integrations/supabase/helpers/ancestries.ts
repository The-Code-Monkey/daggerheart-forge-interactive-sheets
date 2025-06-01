
import { Ancestry } from "@/lib/types";
import { supabase } from "../client";

export const getAllAncestries = async (
  limit = 99
): Promise<Ancestry[] | null> => {
  const { data, error } = await supabase
    .from("ancestries")
    .select("*")
    .limit(limit);

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
