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
import { ArrowLeft } from "lucide-react";
import { JSX } from "react";

const AncestryDetail = (): JSX.Element => {
  const { ancestryName } = useParams();

  const ancestries = {};

  const ancestryData =
    ancestries[ancestryName?.toLowerCase() as keyof typeof ancestries];

  if (!ancestryData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Ancestry Not Found
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

          <div className="mb-4">
            <h1 className="text-4xl font-bold text-white mb-2">
              {ancestryData.name}
            </h1>
            <p className="text-xl text-purple-200">
              {ancestryData.description}
            </p>
          </div>
        </div>

        {/* Ancestry Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Physical Traits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-purple-200">Size:</span>
                <span className="text-white">{ancestryData.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Speed:</span>
                <span className="text-white">{ancestryData.speed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Lifespan:</span>
                <span className="text-white">{ancestryData.lifespan}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {ancestryData.languages.map((language, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-purple-600/50 text-white"
                  >
                    {language}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ancestry Traits */}
        <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white">Ancestry Traits</CardTitle>
            <CardDescription className="text-purple-200">
              Special abilities that all {ancestryData.name} possess
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ancestryData.traits.map((trait, index) => (
                <div key={index} className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {trait.name}
                  </h3>
                  <p className="text-purple-200">{trait.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Culture */}
        <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Culture & Society</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-purple-200">{ancestryData.culture}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AncestryDetail;
