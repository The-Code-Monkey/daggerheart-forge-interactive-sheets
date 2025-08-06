import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getSingleCampaignByIdBasic } from "@/integrations/supabase/helpers/campaigns";
import { Campaign } from "@/lib/types";
import { JSX, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CampaignViewPage = (): JSX.Element => {
  const params = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);

  const campaignId = params.id;

  useEffect(() => {
    const fetchCampaign = async () => {
      if (campaignId) {
        const response = await getSingleCampaignByIdBasic(campaignId);

        setCampaign(response);
      }
    };

    void fetchCampaign();
  }, [campaignId]);

  console.log(campaign);

  if (!campaign) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-4">{campaign.name}</h1>
      <p className="text-muted-foreground mb-2">GM: {campaign.gm?.username}</p>
      <p className="text-sm text-muted-foreground mb-6">
        Created on {new Date(campaign.created_at).toLocaleDateString()} •{" "}
        {/*{campaign.sessionCount} Sessions*/}
      </p>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-2">Campaign Description</h2>
          <p>{campaign.description}</p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Players</h2>
          <ul className="space-y-2">
            {campaign.players?.map((player, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{player.character.name}</span>
                <span className="text-muted-foreground text-sm">
                  {player.character.class?.name}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {/*{campaign.tags.map((tag, index) => (
              <Badge key={index}>{tag}</Badge>
            ))}*/}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignViewPage;
