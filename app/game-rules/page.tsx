"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Ancestry, Class, Subclass } from "@/lib/types";
import {
  getAllAncestries,
  getAllClassesWithDomains,
} from "@/integrations/supabase/helpers";
import ClassCards from "@/components/class/ClassCard";
import SubclassCards from "@/components/class/SubclassCard";
import { getAllSubclasses } from "@/integrations/supabase/helpers/classes";

export default function GameRulesPage() {
  const [classesData, setClassesData] = useState<Partial<Class>[] | null>(null);
  const [subclassesData, setSubclassesData] = useState<
    Partial<Subclass>[] | null
  >(null);
  const [ancestriesData, setAncestriesData] = useState<
    Partial<Ancestry>[] | null
  >(null);

  const fetchClasses = async () => {
    const data = await getAllClassesWithDomains();
    if (data) {
      setClassesData(data);
    }
  };

  const fetchSubclasses = async () => {
    const data = await getAllSubclasses();
    if (data) {
      setSubclassesData(data);
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
    void fetchSubclasses();
    void fetchAncestries();
  }, []);

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
    <div className="min-h-screen bg-nebula py-8 px-4">
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
              value="subclasses"
              className="text-white data-[state=active]:bg-purple-600"
            >
              Subclasses
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
              <ClassCards classesData={classesData ?? []} />
            </div>
          </TabsContent>

          <TabsContent value="subclasses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SubclassCards classesData={subclassesData ?? []} />
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
                    <Link href={`/rules/ancestries/${String(ancestry.slug)}`}>
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
                    <Link href={`/rules/domains/${domain.slug}`}>
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
}
