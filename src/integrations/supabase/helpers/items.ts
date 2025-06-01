import { Item } from "@/lib/types";
import { supabase } from "../client";

export const searchItems = async (
  query: string,
  limit = 10
): Promise<Item[]> => {
  if (!query.trim()) {
    return [];
  }

  const { data, error } = await supabase
    .from("items")
    .select("*")
    .ilike("name", `%${query.toLowerCase()}%`)
    .limit(limit);

  if (error) {
    console.log(error);
    return [];
  }

  return data;
};

export const getItemById = async (id: number): Promise<Item | null> => {
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    return null;
  }

  return data;
};

export const getItemsByIds = async (ids: number[]): Promise<Item[]> => {
  if (ids.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from("items")
    .select("*")
    .in("id", ids);

  if (error) {
    console.log(error);
    return [];
  }

  return data;
};
