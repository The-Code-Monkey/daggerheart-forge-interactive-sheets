import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { JSX, useEffect, useState } from "react";
import { Subclass } from "@/lib/types";
import { getSingleSubclassById } from "@/integrations/supabase/helpers/classes";

const SubclassDetail = (): JSX.Element => {
  const params = useParams();
  const subclassId = params?.subclassId;
  const [subclassData, setSubclassData] = useState<Subclass | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Replace the malformed fetch functions with a single, properly scoped one
  const fetchSubclass = async () => {
    if (!subclassId || isNaN(Number(subclassId))) {
      setSubclassData(null);
      setLoading(false);
      return;
    }

    const data = await getSingleSubclassById(Number(subclassId));
    setSubclassData(data);
    setLoading(false);
  };

  useEffect(() => {
    void fetchSubclass();
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
          <Link href="/game-rules">
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
            href="/"
            onClick={(e) => {
              e.preventDefault();
              router.back();
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
                {subclassData.name}{" "}
                {subclassData.isHomebrew ? "(Homebrew)" : ""}
              </h1>
              <p className="text-xl text-purple-200">
                {subclassData.description}
              </p>
            </div>
          </div>
        </div>

        {/* Class Stats */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          <Card className="bg-linear-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-xs">
            <CardHeader>
              <CardTitle className="text-white">Foundation Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap text-white divide-y">
                {subclassData.features?.foundation?.map((feature, index) => {
                  return (
                    <div key={index} className="py-4 w-full">
                      <span className="font-bold">{feature.name}</span>
                      <p className="mt-4">{feature.description}</p>
                      {feature.list && (
                        <ul className="list-disc ml-4 mt-4">
                          {feature.list.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-xs">
            <CardHeader>
              <CardTitle className="text-white">
                Specialization Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap text-white divide-y">
                {subclassData.features?.specialization?.map(
                  (feature, index) => {
                    return (
                      <div key={index} className="py-4 w-full">
                        <span className="font-bold">{feature.name}</span>
                        <p className="mt-4">{feature.description}</p>
                        {feature.list && (
                          <ul className="list-disc ml-4 mt-4">
                            {feature.list.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-xs">
            <CardHeader>
              <CardTitle className="text-white">Mastery Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap text-white divide-y">
                {subclassData.features?.mastery?.map((feature, index) => {
                  return (
                    <div key={index} className="py-4 w-full">
                      <span className="font-bold">{feature.name}</span>
                      <p className="mt-4">{feature.description}</p>
                      {feature.list && (
                        <ul className="list-disc ml-4 mt-4">
                          {feature.list.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* <Card className="bg-linear-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-xs">
            <CardHeader>
              <CardTitle className="text-white">Class Items</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-200">{classData.class_items}</p>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
};

export default SubclassDetail;
