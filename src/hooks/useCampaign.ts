import { Campaign } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";
import { set } from "lodash";

interface useCampaignReturn {
  campaign: Partial<Campaign>;
  updateCampaign: (target: string, value: string) => void;
}

const useCampaign = (campaignId?: string): useCampaignReturn => {
  const [campaign, setCampaign] = useState<Partial<Campaign>>({
    name: undefined,
  });

  const updateCampaign = useCallback(
    (target: string, value: string) => {
      setCampaign((prev) => set(prev, target, value));
    },
    [setCampaign]
  );

  useEffect(() => {
    if (campaignId) {
      // Fetch campaign data and update state
    }
  }, [campaignId]);

  return { campaign, updateCampaign };
};

export default useCampaign;
