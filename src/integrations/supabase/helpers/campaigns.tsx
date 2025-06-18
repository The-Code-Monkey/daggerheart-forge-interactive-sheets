import { CampaignFormData } from "@/lib/interfaces/campaigns";

interface CampaignTemp {
  id: string;
}

export const createNewCampaign = async (
  newCampaign: CampaignFormData & { user_id: string }
): Promise<CampaignTemp | null> => {
  // TODO: Create Campaign database types. For now, just wait one second.
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("new campaign", JSON.stringify(newCampaign));
  return { id: "campaign-id-here" };
};
