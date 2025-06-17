import { Campaign, CampaignWithRelations } from "@/lib/types";
import { supabase } from "../client";
import { CampaignFormValues } from "@/pages/campaigns/create";

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
    .eq("user_id", user_id)
    .limit(3);

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
    .eq("campaigns_players.user_id", user_id);

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

export const createCampaign = async (
  record: CampaignFormValues & { user_id: string }
): Promise<{ data: Campaign | null; error: Error | null }> => {
  const { data, error } = await supabase
    .from("campaigns")
    .insert({
      user_id: record.user_id,
      name: record.name,
      description: record.setting,
      max_player_count: record.maxPlayers,
      isPublic: false,
      featured: false,
      additional: {
        startingLevel: record.startingLevel,
        tone: record.tone,
        themes: record.themes,
        linesAndVeils: record.linesAndVeils,
        safetyTools: record.safetyTools,
        minPlayers: record.minPlayers,
        timeZone: record.timeZone,
        timeslot: record.timeslot,
        frequency: record.frequency,
      },
    })
    .select()
    .single();

  if (error) {
    console.log(error);
    return {
      data: null,
      error,
    };
  }

  return {
    data,
    error: null,
  };
};
