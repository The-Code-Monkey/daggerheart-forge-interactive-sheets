import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
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
import { JSX, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSingleClassBySlugWithDomains } from "@/integrations/supabase/helpers";
import { Class } from "@/lib/types";

const ClassDetail = (): JSX.Element => {
  const params = useParams();
  const className = params?.className;
  const [classData, setClassData] = useState<Class | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchClass = async () => {
    const data = await getSingleClassBySlugWithDomains(String(className));

    setClassData(data);
    setLoading(false);
  };

  useEffect(() => {
    void fetchClass();
  }, [className]);

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

  if (!classData) {
    return (
      <div className="min-h-screen bg-linear-to-b from-purple-900 via-purple-800 to-slate-900 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Class Not Found
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

  const subclasses = classData.subclass;

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
            <div className="w-16 h-16 bg-linear-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              {/* {classData.icon} */}
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
          <Card className="bg-linear-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-xs">
            <CardHeader>
              <CardTitle className="text-white">Hit Points</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-200">{classData.base_hp}</p>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-xs">
            <CardHeader>
              <CardTitle className="text-white">Evasion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-200">{classData.base_evasion}</p>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-xs">
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
          </Card>

          <Card className="bg-linear-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-xs">
            <CardHeader>
              <CardTitle className="text-white">Class Items</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-200">{classData.class_items}</p>
            </CardContent>
          </Card>
        </div>

        {/* Class Features */}
        <Card className="bg-linear-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-xs col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Class Features</CardTitle>
            <CardDescription className="text-purple-200">
              Special abilities that define the {classData.name} class
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        {subclasses.length > 0 && (
          <>
            <Tabs
              defaultValue={String(subclasses[0].name)}
              className="w-full mt-6"
            >
              <TabsList className="w-full justify-evenly mb-8">
                {subclasses.map((subclass) => {
                  return (
                    <TabsTrigger
                      key={subclass.name}
                      value={String(subclass.name)}
                      className="text-white data-[state=active]:bg-purple-600 flex-1 capitalize"
                    >
                      {subclass.name} {subclass.isHomebrew ? "(Homebrew)" : ""}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {subclasses.map((subclass) => {
                return (
                  <TabsContent
                    value={String(subclass.name)}
                    key={subclass.name}
                    className="space-y-6"
                  >
                    <Card className="bg-linear-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-xs flex flex-col">
                      <CardHeader>
                        <CardTitle className="text-white">
                          {subclass.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-2 capitalize">
                              Foundation Features
                            </h3>
                            {subclass.features?.foundation?.map(
                              (feature, featureIndex) => (
                                <div key={featureIndex} className="text-white">
                                  <p className="inline-block">
                                    <span className="font-bold">
                                      {feature.name}:
                                    </span>{" "}
                                    {feature.description}
                                  </p>
                                  {feature.list && (
                                    <ul className="list-disc pl-4 my-2">
                                      {feature.list.map(
                                        (listItem, listItemIndex) => (
                                          <li
                                            key={listItemIndex}
                                            className="text-white"
                                          >
                                            {listItem}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                          <hr />
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-2 capitalize">
                              Specialization Features
                            </h3>
                            {subclass.features?.specialization?.map(
                              (feature, featureIndex) => (
                                <div key={featureIndex} className="text-white">
                                  <p className="inline-block">
                                    <span className="font-bold">
                                      {feature.name}:
                                    </span>{" "}
                                    {feature.description}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                          <hr />
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-2 capitalize">
                              Mastery Features
                            </h3>
                            {subclass.features?.mastery?.map(
                              (feature, featureIndex) => (
                                <div key={featureIndex} className="text-white">
                                  <p className="inline-block">
                                    <span className="font-bold">
                                      {feature.name}:
                                    </span>{" "}
                                    {feature.description}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                );
              })}
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
};

export default ClassDetail;
