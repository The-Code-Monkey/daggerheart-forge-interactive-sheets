import { Campaign, CampaignWithRelations } from "@/lib/types";
import { supabase } from "../client";

export const getSingleCampaignById = async (
  id: number
): Promise<CampaignWithRelations | null> => {
  const { data, error } = await supabase
    .from("campaigns")
    .select("*, npcs(*), sessions(*), players: campaigns_players(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    return null;
  }

  return data as unknown as CampaignWithRelations;
};

export const getMyCampaigns = async (
  user_id: string
): Promise<Campaign[] | null> => {
  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.log(error);
    return null;
  }

  return data;
};

export const getCampaignsWhereUserIsPlayer = async (
  user_id: string
): Promise<Campaign[] | null> => {
  const { data, error } = await supabase
    .from("campaigns")
    .select("*, campaigns_players!inner(user_id)")
    .eq("campaign_players.user_id", user_id);

  if (error) {
    console.log(error);
    return null;
  }

  return data;
};

export const getFeaturedCampaigns = async (): Promise<Campaign[] | null> => {
  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("featured", true);

  if (error) {
    console.log(error);
    return null;
  }

  return data;
};
