import { JSX, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Plus, Settings, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { CampaignWithCount } from "@/lib/types";
import { getMyCampaigns } from "@/integrations/supabase/helpers/campaigns";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

const Campaigns = (): JSX.Element => {
  const [campaigns, setCampaigns] = useState<CampaignWithCount[]>([]);
  const [loading, setLoading] = useState(true);
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

    void fetchCampaigns();
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
          <Link to="/campaigns/create">
            <Button className="bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold">
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </Link>
        </div>

        {/* Campaign Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading &&
            Array(3)
              .fill(null)
              .map((_, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-brand-500/30 backdrop-blur-xs hover:border-brand-400/50 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="mb-2">
                          <Skeleton className="h-6 w-40 bg-brand-700/40" />
                        </CardTitle>
                        <Skeleton className="h-5 w-24 rounded-md bg-brand-600/40" />
                      </div>
                      <Skeleton className="h-8 w-8 rounded-md bg-brand-700/40" />
                    </div>
                    <CardDescription className="mt-4">
                      <Skeleton className="h-4 w-full bg-brand-700/30" />
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <Skeleton className="h-4 w-24 bg-brand-700/30" />
                      <Skeleton className="h-4 w-24 bg-brand-700/30" />
                    </div>

                    <Skeleton className="h-4 w-40 bg-brand-700/30" />

                    <div className="flex gap-2">
                      <Skeleton className="h-9 w-full flex-1 rounded-md bg-brand-700/30" />
                      <Skeleton className="h-9 w-9 rounded-md bg-brand-700/30" />
                    </div>
                  </CardContent>
                </Card>
              ))}
          {campaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className="bg-linear-to-br from-slate-800/80 to-slate-900/80 border-brand-500/30 backdrop-blur-xs hover:border-brand-400/50 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white text-xl mb-2">
                      {campaign.name}
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className={
                        campaign.status === "active"
                          ? "bg-green-600/50 text-white"
                          : "bg-gray-600/50 text-white"
                      }
                    >
                      {campaign.status}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-brand-300 hover:text-white"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
                <CardDescription className="text-brand-200">
                  {campaign.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-brand-200">
                    <Users className="w-4 h-4" />
                    {campaign.players[0].count} / {campaign.max_player_count}{" "}
                    Players
                  </div>
                  <div className="flex items-center gap-2 text-brand-200">
                    <Calendar className="w-4 h-4" />
                    {campaign.sessions[0].count} Sessions Played
                  </div>
                </div>

                <div className="text-sm text-brand-300">
                  Last played:{" "}
                  {campaign.last_played
                    ? new Date(
                        String(campaign.last_played)
                      ).toLocaleDateString()
                    : "Never"}
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/campaigns/${String(campaign.id)}`}
                    className="flex-1 "
                  >
                    <Button
                      variant="outline"
                      className="border-brand-400 text-brand-100"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </Link>
                  {campaign.players[0].count <
                    (campaign.max_player_count ?? 0) && (
                    <Button
                      variant="outline"
                      className="border-brand-400 text-brand-100"
                      onClick={() => {
                        // copy invite link to clipboard
                        void navigator.clipboard.writeText(
                          `${window.location.origin}/campaigns/${String(campaign.id)}/invite`
                        );
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Invite
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-linear-to-br from-green-800/40 to-emerald-800/40 border-green-500/30 backdrop-blur-xs">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-2 text-green-950">2</div>
              <div className="text-green-950">Active Campaigns</div>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-blue-800/40 to-cyan-800/40 border-blue-500/30 backdrop-blur-xs">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-900 mb-2">12</div>
              <div className="text-blue-900">Total Players</div>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-brand-800/40 to-pink-800/40 border-brand-500/30 backdrop-blur-xs">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-brand-900 mb-2">44</div>
              <div className="text-brand-900">Sessions Played</div>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-orange-800/40 to-red-800/40 border-orange-500/30 backdrop-blur-xs">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-900 mb-2">156</div>
              <div className="text-orange-900">Hours Played</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
