import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { JSX, useEffect, useState } from "react";
import { Subclass } from "@/lib/types";
import { getSingleSubclassById } from "@/integrations/supabase/helpers/classes";

const SubclassDetail = (): JSX.Element => {
  const { subclassId } = useParams();
  const [subclassData, setSubclassData] = useState<Subclass | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchClass = async () => {
    const data = await getSingleSubclassById(Number(subclassId));

    setSubclassData(data);
    setLoading(false);
  };

  useEffect(() => {
    void fetchClass();
  }, [subclassId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-purple-900 via-purple-800 to-slate-900 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Loading Class...
          </h1>
        </div>
      </div>
    );
  }

  if (!subclassData) {
    return (
      <div className="min-h-screen bg-linear-to-b from-purple-900 via-purple-800 to-slate-900 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Subclass Not Found
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
    <div className="min-h-screen bg-nebula py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              void navigate(-1);
            }}
          >
            <Button className="text-purple-200 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white">
                {subclassData.name}
              </h1>
              <p className="text-xl text-purple-200">
                {subclassData.description}
              </p>
            </div>
          </div>
        </div>

        {/* Class Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* <Card className="bg-linear-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-xs">
            <CardHeader>
              <CardTitle className="text-white">Available Domains</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {classData.domains.map((domain) => (
                  <Badge
                    key={domain.id}
                    variant="outline"
                    className="border-yellow-500/50 text-yellow-300 text-xs"
                  >
                    {domain.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card> */}

          {/* <Card className="bg-linear-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-xs">
            <CardHeader>
              <CardTitle className="text-white">Class Items</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-200">{classData.class_items}</p>
            </CardContent>
          </Card> */}
        </div>

        {/* Class Features */}
        <Card className="bg-linear-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-xs col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Class Features</CardTitle>
            <CardDescription className="text-purple-200">
              {/* Special abilities that define the {classData.name} class */}
            </CardDescription>
          </CardHeader>
          {/* <CardContent>
            <div className="space-y-4">
              {classData.features.map((feature, index) => (
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
          </CardContent> */}
        </Card>
      </div>
    </div>
  );
};

export default SubclassDetail;
