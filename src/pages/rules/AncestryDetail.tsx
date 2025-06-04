import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { JSX, useEffect, useState } from "react";
import { Ancestry } from "@/lib/types";
import { getSingleAncestryBySlug } from "@/integrations/supabase/helpers";

const AncestryDetail = (): JSX.Element => {
  const { ancestryName } = useParams();
  const [ancestryData, setAncestryData] = useState<Ancestry | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAncestry = async () => {
    const data = await getSingleAncestryBySlug(String(ancestryName));
    setAncestryData(data);
    setLoading(false);
  };

  useEffect(() => {
    void fetchAncestry();
  }, [ancestryName]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-purple-900 via-purple-800 to-slate-900 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Loading Ancestry...
          </h1>
        </div>
      </div>
    );
  }

  if (!ancestryData) {
    return (
      <div className="min-h-screen bg-linear-to-b from-purple-900 via-purple-800 to-slate-900 py-8 px-4">
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
    <div className="min-h-screen bg-linear-to-b from-purple-900 via-purple-800 to-slate-900 py-8 px-4">
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
            <div className="w-16 h-16 bg-linear-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              {/* {classData.icon} */}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">
                {ancestryData.name}
              </h1>
              <p className="text-xl text-purple-200">
                {ancestryData.description}
              </p>
            </div>
          </div>
        </div>

        <Card className="bg-linear-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-xs col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Ancestry Features</CardTitle>
            <CardDescription className="text-purple-200">
              Special abilities that define the {ancestryData.name} ancestry
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ancestryData.features.map((feature, index) => (
                <div key={`feature-${String(index)}`}>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-purple-200">{feature.description}</p>
                  {feature.list && (
                    <ul className="list-disc list-inside">
                      {feature.list.map((item, itemIndex) => (
                        <li
                          key={`feature-list-${String(itemIndex)}`}
                          className="text-purple-200"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"></div>
      </div>
    </div>
  );
};

export default AncestryDetail;
