import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Zap,
  Heart,
  Book,
  Sparkles,
  Dice6,
  ArrowRight,
  BowArrow,
  Guitar,
  Sword,
} from "lucide-react";
import { Link } from "react-router-dom";
import { JSX, useEffect, useState } from "react";
import { Ancestry, Class } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getAllAncestries,
  getAllClassesWithDomains,
} from "@/integrations/supabase/helpers";

const GameRules = (): JSX.Element => {
  const [classesData, setClassesData] = useState<Partial<Class>[] | null>(null);
  const [ancestriesData, setAncestriesData] = useState<
    Partial<Ancestry>[] | null
  >(null);

  const fetchClasses = async () => {
    const data = await getAllClassesWithDomains();
    if (data) {
      setClassesData(data);
    }
  };

  const fetchAncestries = async () => {
    const data = await getAllAncestries();
    if (data) {
      setAncestriesData(data);
    }
  };

  useEffect(() => {
    void fetchClasses();
    void fetchAncestries();
  }, []);

  const icons = {
    bard: <Guitar className="w-6 h-6" />,
    druid: <Heart className="w-6 h-6" />,
    guardian: <Shield className="w-6 h-6" />,
    ranger: <BowArrow className="w-6 h-6" />,
    rogue: <Dice6 className="w-6 h-6" />,
    wizard: <Book className="w-6 h-6" />,
    warrior: <Sword className="w-6 h-6" />,
    seraph: <Sparkles className="w-6 h-6" />,
    sorcerer: <Zap className="w-6 h-6" />,
  };

  const domains = [
    {
      name: "Arcana",
      description: `Arcana is the domain of innate and instinctual magic. Those
      who choose this path tap into the raw, enigmatic forces of the
      realms to manipulate both their own energy and the elements.
      Arcana offers wielders a volatile power, but it is incredibly
      potent when correctly channeled. The Arcana domain can be
      accessed by the Druid and Sorcerer classes`,
      slug: "arcana",
    },
    {
      name: "Blade",
      description: `Blade is the domain of weapon mastery. Whether by steel,
      bow, or perhaps a more specialized arm, those who follow this
      path have the skill to cut short the lives of others. Wielders of
      Blade dedicate themselves to achieving inexorable power over
      death. The Blade domain can be accessed by the Guardian
      and Warrior classes.`,
      slug: "blade",
    },
    {
      name: "Bone",
      description: `Bone is the domain of tactics and the body. Practitioners
      of this domain have an uncanny control over their own
      physical abilities and an eye for predicting the behaviors of
      others in combat. Adherents to Bone gain an unparalleled
      understanding of bodies and their movements. The Bone
      domain can be accessed by the Ranger & Warrior classes.`,
      slug: "bone",
    },
    {
      name: "Codex",
      description: `Codex is the domain of intensive magical study. Those who
      seek magical knowledge turn to the equations of power
      recorded in books, written on scrolls, etched into walls, or
      tattooed on bodies. Codex offers a commanding and versatile
      understanding of magic to devotees who pursue knowledge
      beyond the boundaries of common wisdom. The Codex
      domain can be accessed by the Bard and Wizard classes.`,
      slug: "codex",
    },
    {
      name: "Grace",
      description: `Grace is the domain of charisma. Through rapturous
      storytelling, charming spells, or a shroud of lies, those who
      channel this power define the realities of their adversaries,
      bending perception to their will. Grace offers its wielders raw
      magnetism and mastery over language. The Grace domain can
      be accessed by the Bard and Rogue classes`,
      slug: "grace",
    },
    {
      name: "Midnight",
      description: `Midnight is the domain of shadows and secrecy. Whether
      by clever tricks, deft magic, or the cloak of night, those who
      channel these forces practice the art of obscurity and can
      uncover sequestered treasures. Midnight offers practitioners
      the power to control and create enigmas. The Midnight
      domain can be access by the Rogue and Sorcerer classes.`,
      slug: "midnight",
    },
    {
      name: "Sage",
      description: `Sage is the domain of the natural world. Those who walk
      this path tap into the unfettered power of the earth and its
      creatures to unleash raw magic. Sage grants its adherents
      the vitality of a blooming flower and the ferocity of a ravenous
      predator. The Sage domain can be accessed by the Druid and
      Ranger classes.`,
      slug: "sage",
    },
    {
      name: "Splendor",
      description: `Splendor is the domain of life. Through this magic, followers
            gain the ability to heal and, to an extent, control death.
            Splendor offers its disciples the magnificent ability to both
            give and end life. The Splendor domain can be accessed by the
            Seraph and Wizard classes.`,
      slug: "splendor",
    },
    {
      name: "Valor",
      description: `Valor is the domain of protection. Whether through attack or
            defense, those who choose this discipline channel formidable
            strength to protect their allies in battle. Valor offers great
            power to those who raise their shields in defense of others.
            The Valor domain can be accessed by the Guardian and
            Seraph classes.`,
      slug: "valor",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-900 via-purple-800 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Daggerheart Game Rules
          </h1>
          <p className="text-xl text-purple-200">
            Everything you need to know about playing Daggerheart
          </p>
        </div>

        <Tabs defaultValue="classes" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-purple-800/50 mb-8">
            <TabsTrigger
              value="classes"
              className="text-white data-[state=active]:bg-purple-600"
            >
              Classes
            </TabsTrigger>
            <TabsTrigger
              value="ancestries"
              className="text-white data-[state=active]:bg-purple-600"
            >
              Ancestries
            </TabsTrigger>
            <TabsTrigger
              value="mechanics"
              className="text-white data-[state=active]:bg-purple-600"
            >
              Core Mechanics
            </TabsTrigger>
            <TabsTrigger
              value="domains"
              className="text-white data-[state=active]:bg-purple-600"
            >
              Domains
            </TabsTrigger>
          </TabsList>

          <TabsContent value="classes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classesData
                ? classesData.map((cls) => (
                    <Card
                      key={cls.id}
                      className="bg-linear-to-br aspect-square from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-xs justify-between flex flex-col hover:scale-105 transition-transform duration-300 ease-in-out"
                    >
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-linear-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                            {icons[String(cls.slug)]}
                          </div>
                          <CardTitle className="text-white">
                            {cls.name}
                          </CardTitle>
                        </div>
                        <CardDescription className="text-purple-200 truncate-5-lines">
                          {cls.description}
                        </CardDescription>
                        <div>
                          <span className="text-sm font-medium text-purple-300">
                            Domains:
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {cls.domains?.map((domain) => (
                              <Badge
                                key={domain.id}
                                variant="outline"
                                className="border-yellow-500/50 text-yellow-300 text-xs"
                              >
                                {domain.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="mt-auto">
                        <div className="space-y-3">
                          <div className="pt-2 mt-auto">
                            <Link to={`/rules/classes/${String(cls.slug)}`}>
                              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                                Learn More
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                : Array(12)
                    .fill(null)
                    .map((_, index) => (
                      <Card
                        key={index}
                        className="bg-linear-to-br from-slate-800/80 aspect-square to-slate-900/80 border-purple-500/30 backdrop-blur-xs justify-between flex flex-col"
                      >
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <Skeleton className="w-10 h-10 rounded-lg" />
                            <Skeleton className="h-6 w-32" />
                          </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <div className="text-purple-200 flex-1 h-full">
                            <Skeleton className="h-full w-full" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
            </div>
          </TabsContent>

          <TabsContent value="ancestries" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ancestriesData?.map((ancestry, index) => (
                <Card
                  key={index}
                  className="bg-linear-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-xs justify-between flex flex-col hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  <CardHeader>
                    <CardTitle className="text-white">
                      {ancestry.name}
                    </CardTitle>
                    <CardDescription className="text-purple-200 truncate-5-lines">
                      {ancestry.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to={`/rules/ancestries/${String(ancestry.slug)}`}>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mechanics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"></div>
          </TabsContent>

          <TabsContent value="domains" className="space-y-6">
            <Card className="bg-linear-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-xs text-center">
              <CardHeader>
                <CardTitle className="text-white pb-2">Class Domains</CardTitle>
                <CardContent className="text-purple-200">
                  Each class grants access to two domains:
                  <ul className="list-inside list-disc py-2">
                    <li>Bard: Codex & Grace</li>
                    <li>Druid: Arcana & Sage</li>
                    <li>Guardian: Blade & Valor</li>
                    <li>Ranger: Bone & Sage</li>
                    <li>Rogue: Grace & Midnight</li>
                    <li>Seraph: Splendor & Valor</li>
                    <li>Sorcerer: Arcana & Midnight</li>
                    <li>Warrior: Blade & Bone</li>
                    <li>Wizard: Codex & Splendor</li>
                  </ul>
                  PCs acquire two 1st-level domain cards at character creation
                  and an additional domain card at or below their level each
                  time they level up.
                </CardContent>
              </CardHeader>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {domains.map((domain, index) => (
                <Card
                  key={index}
                  className="bg-linear-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-xs"
                >
                  <CardHeader>
                    <CardTitle className="text-white">{domain.name}</CardTitle>
                    <CardDescription className="text-purple-200">
                      {domain.description}
                    </CardDescription>
                  </CardHeader>
                  {/* <CardContent>
                    <Link to={`/rules/domains/${domain.slug}`}>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent> */}
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GameRules;
