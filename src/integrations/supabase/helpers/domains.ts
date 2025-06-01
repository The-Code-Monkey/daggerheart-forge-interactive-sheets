import { Domain } from "@/lib/types";
import { supabase } from "../client";

export const getSingleDomainBySlug = async (
  slug: string
): Promise<Domain | null> => {
  const { data, error } = await supabase
    .from("domains")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.log(error);
    return null;
  }
  return data as Domain;
};

export const getSingleDomain = async (id: number): Promise<Domain | null> => {
  const { data, error } = await supabase
    .from("domains")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    return null;
  }
  return data as Domain;
};

export const getAllDomains = async (limit = 99): Promise<Domain[] | null> => {
  const { data, error } = await supabase
    .from("domains")
    .select("*")
    .limit(limit);

  if (error) {
    console.log(error);
    return null;
  }
  return data as Domain[];
};
