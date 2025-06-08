import { Profile } from "@/lib/types";
import { supabase } from "../client";

export const fetchProfilesByIds = async (
  ids: string[]
): Promise<Profile[] | null> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username")
    .in("id", ids);

  if (error) {
    console.error(error);
    return null;
  }

  return data as Profile[];
};
