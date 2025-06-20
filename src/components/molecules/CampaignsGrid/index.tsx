import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Campaign, CampaignWithCount } from "@/lib/types";
import { Calendar, Eye, Plus, Settings, Users } from "lucide-react";
import { JSX } from "react";
import { Link } from "react-router-dom";

interface CampaignsGridProps {
  campaigns: Campaign[] | CampaignWithCount[];
  loading: boolean;
  isDm?: boolean;
}

const CampaignsGrid = ({
  campaigns,
  loading,
  isDm,
}: CampaignsGridProps): JSX.Element => {
  return (
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
                <div className="mt-4 text-sm text-muted-foreground">
                  <Skeleton className="h-4 w-full bg-brand-700/30" />
                </div>
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
      {campaigns.map((campaign: Campaign | CampaignWithCount) => (
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
              {isDm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-brand-300 hover:text-brand"
                  asChild
                >
                  <Link to={`/campaigns/${String(campaign.id)}/edit`}>
                    <Settings className="w-4 h-4" />
                  </Link>
                </Button>
              )}
            </div>
            <CardDescription className="text-brand-200">
              {campaign.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {campaign.players &&
              campaign.sessions &&
              campaign.players[0].hasOwnProperty("count") &&
              campaign.sessions[0].hasOwnProperty("count") && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-brand-200">
                    <Users className="w-4 h-4" />
                    {campaign.players[0].count} / {campaign.max_player_count}{" "}
                    Players
                  </div>
                  <div className="flex items-center gap-2 text-brand-200">
                    <Calendar className="w-4 h-4" />
                    {campaign.sessions[0]?.count} Sessions Played
                  </div>
                </div>
              )}

            <div className="text-sm text-brand-300">
              Last played:{" "}
              {campaign.last_played
                ? new Date(String(campaign.last_played)).toLocaleDateString()
                : "Never"}
            </div>

            <div className="flex gap-2">
              <Button
                asChild
                variant="outline"
                className="border-brand-400 text-brand-100 hover:text-brand-200"
              >
                <Link
                  to={`/campaigns/${String(campaign.id)}`}
                  className="flex-1 "
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Link>
              </Button>

              {isDm &&
                campaign.players[0].count <
                  (campaign.max_player_count ?? 0) && (
                  <Button
                    variant="outline"
                    className="border-brand-400 text-brand-100 hover:text-brand-200"
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
  );
};

export default CampaignsGrid;
