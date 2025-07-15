import { Domain, Card } from "@/lib/types";
import { supabase } from "../client";
import { fetchProfilesByIds } from "./profiles";

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

export const getAllDomains = async (
  {
    limit,
    homebrew,
    user_id,
  }: { limit?: number; homebrew: boolean; user_id?: string } = {
    homebrew: false,
  }
): Promise<Domain[] | null> => {
  const query = supabase.from("domains").select("*");

  if (homebrew) {
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

  const userIds = [
    ...new Set(
      data.filter((d) => d.user_id !== null).map((d) => String(d.user_id))
    ),
  ]; // Remove duplicates

  const profiles = (await fetchProfilesByIds(userIds)) ?? [];

  const profileMap = new Map(profiles.map((p) => [p.id, p.username]));

  const enrichedDomains = data.map((domain) => ({
    ...domain,
    username: profileMap.get(String(domain.user_id)) ?? null,
  }));

  return enrichedDomains as Domain[];
};

export const getDomainEffectsById = async (
  cardIds: number[]
): Promise<Card[]> => {
  const { data, error } = await supabase
    .from("cards")
    .select("*")
    .in("id", cardIds);

  if (error) {
    console.log(error);
    return [];
  }
  return data as Card[];
};

export const getDomainEffects = async (
  domainIds: number[],
  level = 1
): Promise<Card[]> => {
  const { data, error } = await supabase
    .from("cards")
    .select("*")
    .lte("level", level)
    .in("domain_id", domainIds);

  if (error) {
    console.log(error);
    return [];
  }
  return data as Card[];
};

export interface DomainFormData {
  name: string;
  description: string;
  user_id: string;
}

export const createNewHomebrewDomain = async (
  newDomainFormData: DomainFormData
): Promise<Domain | null> => {
  const { data, error } = await supabase
    .from("domains")
    .insert({
      name: newDomainFormData.name,
      description: newDomainFormData.description,
      user_id: newDomainFormData.user_id,
      isHomebrew: true,
      isPublished: false,
    })
    .select()
    .single();

  if (error) {
    console.log(error);
    return null;
  }
  return data as Domain;
};

export const publishDomain = async (
  domainId: number
): Promise<Domain | null> => {
  const { data, error } = await supabase
    .from("domains")
    .update({ isPublished: true })
    .eq("id", domainId)
    .single();

  if (error) {
    console.log(error);
    return null;
  }
  return data as Domain;
};
