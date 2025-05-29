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
import { Class } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllClassesWithDomains } from "@/integrations/supabase/helpers";

const GameRules = (): JSX.Element => {
  const [classesData, setClassesData] = useState<Partial<Class>[] | null>(null);

  const fetchClasses = async () => {
    const data = await getAllClassesWithDomains();
    if (data) {
      setClassesData(data);
    }
  };

  useEffect(() => {
    void fetchClasses();
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

  const ancestries = [
    {
      name: "Clank",
      description:
        "Clanks are sentient mechanical beings crafted from diverse materials with specialized bodies that can include claws, wheels, or built-in weapons. Their forms can be endlessly modified, granting them effective immortality as long as they maintain their parts, though their minds can deteriorate over time as their magic fades.",
      slug: "clank",
    },
    {
      name: "Drakona",
      description:
        "Drakona are wingless, dragon-like humanoids with thick scales that act as natural armor and possess powerful elemental breath unique to their lineage. They have long lifespans, continuously growing new teeth, and typically inherit their elemental abilities from their family, though exceptions exist.",
      slug: "drakona",
    },
    {
      name: "Dwarf",
      description:
        "Dwarves are short, stocky humanoids known for their dense muscles, thick hair, and naturally resilient keratin-rich skin that allows for gemstone adornment and tattoos. They often style elaborate facial hair and live up to 250 years while retaining their strength well into old age.",
      slug: "dwarves",
    },
    {
      name: "Elf",
      description:
        "Elves are tall, pointed-eared humanoids with keen senses and the unique ability to enter a celestial trance for quick rest. Some develop a mystic form—marked by nature-inspired traits like celestial freckles or vine-like hair—that can change over their long 350-year lifespans.",
      slug: "elf",
    },
    {
      name: "Faerie",
      description:
        "Faeries are winged humanoids with diverse insect-like features such as extra arms, compound eyes, and chitinous exoskeletons, often blending with plants due to their natural affinity. They undergo unique metamorphoses that define their permanent form for their roughly 50-year lifespan, ranging in height from 2 to 7 feet.",
      slug: "faerie",
    },
    {
      name: "Faun",
      description:
        "Fauns are humanoid goats with curving horns, cloven hooves, and variable goat- or humanlike faces, known for their long limbs and powerful hoof strikes. They stand 4 to 6½ feet tall, with height shifting by stance, and live about 225 years, growing more goatlike with age.",
      slug: "faun",
    },
    {
      name: "Firbolg",
      description:
        "Firbolgs are tall, muscular bovine humanoids with broad noses, drooping ears, and varying horn styles, known for their strength and powerful charging attacks. Covered in earth-toned or pastel fur, they typically live around 150 years.",
      slug: "firbolg",
    },
    {
      name: "Fungil",
      description:
        "Fungril are humanoid mushrooms with diverse appearances and vibrant colors, ranging from 2 to 7 feet tall with no single common form. They live around 300 years, communicate nonverbally, and use a mycelial network to share information over long distances.",
      slug: "fungil",
    },
    {
      name: "Galapa",
      description:
        "Galapa are anthropomorphic turtles with large, patterned shells into which they can retract for protection, standing 4 to 6 feet tall and typically adorned in earth tones. They move slowly and can live about 150 years, sometimes enhancing their shells with armor or carvings despite the pain involved.",
      slug: "galapa",
    },
    {
      name: "Giant",
      description:
        "Giants are towering humanoids standing 6½ to 8½ feet tall with broad frames, long arms, and up to three eyes that develop after their first year of life. Known for their muscular build and distinctive features, they live around 75 years on average.",
      slug: "giant",
    },
    {
      name: "Goblin",
      description:
        "Goblins are small humanoids with large eyes and oversized membranous ears that give them exceptional hearing and vision, aiding their movement in difficult environments. They vary widely in skin and eye color, stand 3 to 4 feet tall, communicate nonverbally through ear movements, and live about 100 years.",
      slug: "goblin",
    },
    {
      name: "Halfling",
      description:
        "Halflings are small humanoids with large, hairy feet and proportionally large ears and noses, standing 3 to 4 feet tall and often maintaining a youthful appearance throughout their 150-year lifespan. They have a natural internal compass and keen senses of hearing and smell, allowing them to recognize familiar individuals by their movements.",
      slug: "halfling",
    },
    {
      name: "Human",
      description:
        "Humans are adaptable beings with dexterous hands, rounded ears, and bodies built for endurance, ranging from just under 5 feet to 6½ feet tall with varied builds. They adjust well to different climates and typically live around 100 years, undergoing significant physical changes throughout their lives.",
      slug: "human",
    },
    {
      name: "Infernis",
      description:
        "Infernis are humanoids descended from demons, characterized by sharp canine teeth, pointed ears, horns in various shapes and numbers, and often long, pointed tails, with skin and features in a wide range of colors. They possess a “dread visage” that can alter their appearance to intimidate, and typically live up to 350 years, reflecting their demonic heritage.",
      slug: "infernis",
    },
    {
      name: "Katari",
      description:
        "Katari are feline humanoids with retractable claws, slit pupils, and highly mobile triangular ears, featuring varied fur patterns and sometimes tails, blending catlike and humanoid traits. They range from 3 to 6½ feet tall, have keen senses aided by whiskers and swiveling ears, and live up to around 150 years.",
      slug: "katari",
    },
    {
      name: "Orc",
      description:
        "Orcs are humanoids known for their square features, prominent boar-like tusks often adorned with decorations, and pointed ears. They typically have green, blue, pink, or gray skin tones, muscular builds, stand between 5 and 6½ feet tall, and live around 125 years.",
      slug: "orc",
    },
    {
      name: "Ribbit",
      description:
        "Ribbets are frog-like humanoids with webbed hands and feet, smooth or warty skin, and eyes set wide on their heads. They range from 3 to 4½ feet tall, move mostly by hopping, and live about 100 years.",
      slug: "ribbit",
    },
    {
      name: "Simiah",
      description:
        "Simiah are monkey-like humanoids with long limbs, prehensile feet, and sometimes tails, ranging from 2 to 6 feet tall. Their agility and climbing skills make them versatile movers, and they live around 100 years.",
      slug: "simiah",
    },
  ];

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
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900 py-8 px-4">
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
                      className="bg-gradient-to-br aspect-square from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-sm justify-between flex flex-col hover:scale-105 transition-transform duration-300 ease-in-out"
                    >
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
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
                        className="bg-gradient-to-br from-slate-800/80 aspect-square to-slate-900/80 border-purple-500/30 backdrop-blur-sm justify-between flex flex-col"
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
              {ancestries.map((ancestry, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-sm"
                >
                  <CardHeader>
                    <CardTitle className="text-white">
                      {ancestry.name}
                    </CardTitle>
                    <CardDescription className="text-purple-200">
                      {ancestry.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to={`/rules/ancestries/${ancestry.slug}`}>
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
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-sm text-center">
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
                  className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-sm"
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
