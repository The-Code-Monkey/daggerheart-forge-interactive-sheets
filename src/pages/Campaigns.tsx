
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, MapPin, Plus, Settings, Eye } from "lucide-react";

const Campaigns = () => {
  const [campaigns] = useState([
    {
      id: 1,
      name: "The Shattered Crown",
      description: "A quest to restore the ancient crown and unite the fractured kingdoms",
      players: 4,
      sessions: 12,
      lastPlayed: "2024-01-15",
      status: "active"
    },
    {
      id: 2,
      name: "Shadows of the Deep",
      description: "Maritime adventures in the mysterious Cerulean Archipelago",
      players: 3,
      sessions: 8,
      lastPlayed: "2024-01-10",
      status: "active"
    },
    {
      id: 3,
      name: "The Dragon's Bargain",
      description: "A completed campaign where heroes made a pact with an ancient dragon",
      players: 5,
      sessions: 24,
      lastPlayed: "2023-12-20",
      status: "completed"
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">Campaign Manager</h1>
            <p className="text-xl text-purple-200">Organize and track your Daggerheart campaigns</p>
          </div>
          <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold">
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>

        {/* Campaign Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-sm hover:border-purple-400/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white text-xl mb-2">{campaign.name}</CardTitle>
                    <Badge
                      variant="secondary"
                      className={campaign.status === 'active' ? 'bg-green-600/50 text-white' : 'bg-gray-600/50 text-white'}
                    >
                      {campaign.status}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="text-purple-300 hover:text-white">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
                <CardDescription className="text-purple-200">
                  {campaign.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-purple-200">
                    <Users className="w-4 h-4" />
                    {campaign.players} Players
                  </div>
                  <div className="flex items-center gap-2 text-purple-200">
                    <Calendar className="w-4 h-4" />
                    {campaign.sessions} Sessions
                  </div>
                </div>

                <div className="text-sm text-purple-300">
                  Last played: {new Date(campaign.lastPlayed).toLocaleDateString()}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 border-purple-400 text-purple-100 ">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" className="border-purple-400 text-purple-100 ">
                    <MapPin className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-800/40 to-emerald-800/40 border-green-500/30 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-2 text-green-950">2</div>
              <div className="text-green-950">Active Campaigns</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-800/40 to-cyan-800/40 border-blue-500/30 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-900 mb-2">12</div>
              <div className="text-blue-900">Total Players</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-800/40 to-pink-800/40 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-900 mb-2">44</div>
              <div className="text-purple-900">Sessions Played</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-800/40 to-red-800/40 border-orange-500/30 backdrop-blur-sm">
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
