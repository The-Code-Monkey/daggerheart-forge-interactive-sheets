import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getSingleCampaignByIdBasic } from "@/integrations/supabase/helpers/campaigns";
import { Campaign } from "@/lib/types";
import { JSX, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isFuture, format } from "date-fns";

const CampaignViewPage = (): JSX.Element => {
  const params = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);

  const campaignId = params.id;

  useEffect(() => {
    const fetchCampaign = async () => {
      if (campaignId) {
        const response = await getSingleCampaignByIdBasic(Number(campaignId));

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
    <div className="min-h-screen bg-nebula py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              {campaign.name}
            </h1>
            <p className="text-white mb-2">GM: {campaign.gm?.username}</p>
            <p className="text-sm text-white mb-6">
              Created on {new Date(campaign.created_at).toLocaleDateString()} •{" "}
              {campaign.sessions?.length} Sessions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Character Stats */}
          <div className="col-span-5 space-y-6 ">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl text-white font-semibold mb-2">
                  Campaign Description
                </h2>
                <p className="text-white">{campaign.description}</p>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-5 space-y-6">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  Players
                </h2>
                <ul className="space-y-2">
                  {campaign.players?.map((player, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center text-white"
                    >
                      <span>{player.character.name}</span>
                      <Badge className="text-white text-sm">
                        {player.character.class?.name}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-5 space-y-6">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  Sessions
                </h2>
                <ul className="space-y-2 divide-y-2 divide-border">
                  {campaign.sessions?.map((session, index) => (
                    <li key={session.id} className="text-white pb-2 ">
                      <div className="flex justify-between">
                        <h3>
                          Session {index}: {session.name}
                        </h3>
                        <span>
                          {isFuture(String(session.play_date))
                            ? "Upcoming:"
                            : "Played:"}{" "}
                          {format(String(session.play_date), "PPp")}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          {/*<div className="col-span-5 space-y-6">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-white">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {campaign.tags.map((tag, index) => (
                    <Badge key={index}>{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>*/}
        </div>
      </div>
    </div>
  );
};

export default CampaignViewPage;
