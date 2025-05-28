import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Sword,
  Shield,
  Zap,
  Heart,
  User,
  Book,
  Sparkles,
} from "lucide-react";

const ClassDetail = () => {
  const { className } = useParams();

  const classes = {};

  const classData = classes[className?.toLowerCase() as keyof typeof classes];

  if (!classData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Class Not Found
          </h1>
          <Link to="/game-rules">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Game Rules
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/game-rules">
            <Button
              variant="ghost"
              className="text-purple-200 hover:text-white mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Game Rules
            </Button>
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              {classData.icon}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">
                {classData.name}
              </h1>
              <p className="text-xl text-purple-200">{classData.description}</p>
            </div>
          </div>
        </div>

        {/* Class Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Primary Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {classData.primaryStats.map((stat) => (
                  <Badge
                    key={stat}
                    variant="secondary"
                    className="bg-purple-600/50 text-white"
                  >
                    {stat}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Hit Points</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-200">{classData.hitPoints}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Damage Thresholds</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-purple-200">Minor:</span>
                  <span className="text-white">
                    {classData.thresholds.Minor}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Major:</span>
                  <span className="text-white">
                    {classData.thresholds.Major}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Available Domains</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {classData.domains.map((domain) => (
                  <Badge
                    key={domain}
                    variant="outline"
                    className="border-yellow-500/50 text-yellow-300 text-xs"
                  >
                    {domain}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Class Features */}
        <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Class Features</CardTitle>
            <CardDescription className="text-purple-200">
              Special abilities that define the {classData.name} class
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classData.classFeatures.map((feature, index) => (
                <div key={index} className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-purple-200">{feature.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClassDetail;
