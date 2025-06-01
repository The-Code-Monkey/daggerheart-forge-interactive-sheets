
import { supabase } from "../client";

export const searchItems = async (query: string, limit = 10) => {
  if (!query.trim()) {
    return [];
  }

  const { data, error } = await supabase
    .from("items")
    .select("*")
    .textSearch("name", query, { type: "websearch" })
    .limit(limit);

  if (error) {
    console.log(error);
    return [];
  }

  return data;
};

export const getItemById = async (id: number) => {
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

export const getItemsByIds = async (ids: number[]) => {
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
