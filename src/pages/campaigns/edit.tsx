import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/contexts/AuthContext";
import { getSingleCampaignById } from "@/integrations/supabase/helpers/campaigns";
import { CampaignWithRelations } from "@/lib/types";
import { JSX, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CampaignEditPage = (): JSX.Element => {
  const { id } = useParams();
  const { user } = useAuth();

  const [campaign, setCampaign] = useState<
    CampaignWithRelations | null | string
  >(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const data = await getSingleCampaignById(
          parseInt(String(id), 10),
          user?.id
        );

        setCampaign(data);
      } catch (error) {
        console.error(error);
        setCampaign(
          "Error fetching campaign (This might not be your campaign)"
        );
      }
    };
    if (id) {
      void fetchCampaign();
    }
  }, [id]);

  if (!campaign) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>Edit Campaign</h1>
      {/* Add your edit form here */}
    </div>
  );
};

export default CampaignEditPage;
