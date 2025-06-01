
import { Community } from "@/lib/types";
import { supabase } from "../client";

export const getAllCommunities = async (
  limit = 99
): Promise<Community[] | null> => {
  const { data, error } = await supabase
    .from("communities")
    .select("*")
    .limit(limit);

  if (error) {
    console.log(error);
    return null;
  }
  return data as Community[];
};
