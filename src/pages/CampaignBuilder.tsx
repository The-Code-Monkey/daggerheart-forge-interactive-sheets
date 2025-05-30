import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useCampaign from "@/hooks/useCampaign";
import { JSX } from "react";
import { useParams } from "react-router-dom";

const CampaignBuilder = (): JSX.Element => {
  const { campaignId } = useParams<{ campaignId?: string }>();

  const { campaign, updateCampaign } = useCampaign(campaignId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Campaign Builder
          </h1>
          <p className="text-xl text-purple-200">
            Create your Daggerheart campaign
          </p>
        </div>
        <Card className="bg-gradient-to-br from-purple-800/40 to-slate-800/40 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              Test
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-white">
                  Campaign Name
                </Label>
                <Input
                  id="name"
                  value={campaign.name}
                  onChange={(e) => {
                    updateCampaign("name", e.target.value);
                  }}
                  className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
                  placeholder="Enter Campaign name"
                />
              </div>
              <div>
                <Label htmlFor="name" className="text-white">
                  Designed For
                </Label>
                <Input
                  id="max_player_count"
                  type="number"
                  value={campaign.max_player_count}
                  min={1}
                  defaultValue={4}
                  onChange={(e) => {
                    updateCampaign("max_player_count", e.target.value);
                  }}
                  className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
                  placeholder="Max Player Count"
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-white">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={campaign.description}
                  onChange={(e) => {
                    updateCampaign("description", e.target.value);
                  }}
                  className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
                  placeholder="Describe your campaign setting"
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignBuilder;
