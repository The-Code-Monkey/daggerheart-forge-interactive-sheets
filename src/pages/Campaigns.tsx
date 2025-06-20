import { JSX, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { CampaignWithCount, Campaign } from "@/lib/types";
import {
  getCampaignsWhereUserIsPlayer,
  getMyCampaigns,
} from "@/integrations/supabase/helpers/campaigns";
import { useAuth } from "@/contexts/AuthContext";
import Text from "@/components/atoms/Text";
import CampaignsGrid from "@/components/molecules/CampaignsGrid";

const Campaigns = (): JSX.Element => {
  const [campaigns, setCampaigns] = useState<CampaignWithCount[]>([]);
  const [otherCampaigns, setOtherCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingOther, setLoadingOther] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!user) return;
      const data = await getMyCampaigns(String(user.id));
      if (data) {
        setCampaigns(data);
        setLoading(false);
      }
    };

    const fetchOtherCampaigns = async () => {
      if (!user) return;
      const data = await getCampaignsWhereUserIsPlayer(String(user.id));
      if (data) {
        setOtherCampaigns(data);
        setLoadingOther(false);
      }
    };

    void fetchCampaigns();
    void fetchOtherCampaigns();
  }, [user]);

  return (
    <div className="min-h-screen bg-nebula py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Campaign Manager
            </h1>
            <p className="text-xl text-brand-200">
              Organize and track your Daggerheart campaigns
            </p>
          </div>

          <Button
            asChild
            className="bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold"
          >
            <Link to="/campaigns/create">
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Link>
          </Button>
        </div>

        <Text variant="h2" className="mb-3">
          My Campaigns
        </Text>
        {/* Campaign Grid */}
        <CampaignsGrid loading={loading} campaigns={campaigns} isDm />

        <Text variant="h2" className="mb-3">
          Characters Campaigns
        </Text>

        <CampaignsGrid loading={loadingOther} campaigns={otherCampaigns} />

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-linear-to-br from-green-800/40 to-emerald-800/40 border-green-500/30 backdrop-blur-xs">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-2 text-green-200">2</div>
              <div className="text-green-200">Active Campaigns</div>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-blue-800/40 to-cyan-800/40 border-blue-500/30 backdrop-blur-xs">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-200 mb-2">12</div>
              <div className="text-blue-200">Total Players</div>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-brand-800/40 to-pink-800/40 border-brand-500/30 backdrop-blur-xs">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-brand-50 mb-2">44</div>
              <div className="text-brand-50">Sessions Played</div>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-orange-800/40 to-red-800/40 border-orange-500/30 backdrop-blur-xs">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-200 mb-2">156</div>
              <div className="text-orange-200">Hours Played</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
