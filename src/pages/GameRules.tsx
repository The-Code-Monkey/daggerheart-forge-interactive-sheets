import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sword, Shield, Zap, Heart, User, Book, Sparkles, Dice6, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const GameRules = () => {
  const classes = [
    {
      name: "Guardian",
      description: "Stalwart defenders who protect their allies",
      primaryStats: ["Strength", "Presence"],
      icon: <Shield className="w-6 h-6" />,
      features: ["Armor Domain", "Bone Domain", "Blade Domain"],
      slug: "guardian"
    },
    {
      name: "Warrior",
      description: "Fierce combatants who excel in battle",
      primaryStats: ["Strength", "Agility"],
      icon: <Sword className="w-6 h-6" />,
      features: ["Fury Domain", "Prowess Domain", "Bone Domain"],
      slug: "warrior"
    },
    {
      name: "Ranger",
      description: "Masters of nature and ranged combat",
      primaryStats: ["Agility", "Instinct"],
      icon: <Zap className="w-6 h-6" />,
      features: ["Flora Domain", "Fauna Domain", "Swift Domain"],
      slug: "ranger"
    },
    {
      name: "Rogue",
      description: "Stealthy operatives skilled in deception",
      primaryStats: ["Agility", "Finesse"],
      icon: <User className="w-6 h-6" />,
      features: ["Shadow Domain", "Swift Domain", "Midnight Domain"],
      slug: "rogue"
    },
    {
      name: "Seraph",
      description: "Divine warriors channeling celestial power",
      primaryStats: ["Presence", "Instinct"],
      icon: <Sparkles className="w-6 h-6" />,
      features: ["Divine Domain", "Splendor Domain", "Valor Domain"],
      slug: "seraph"
    },
    {
      name: "Sorcerer",
      description: "Innate spellcasters wielding raw magic",
      primaryStats: ["Instinct", "Presence"],
      icon: <Zap className="w-6 h-6" />,
      features: ["Arcane Domain", "Elemental Domain", "Wyrd Domain"],
      slug: "sorcerer"
    },
    {
      name: "Wizard",
      description: "Scholarly mages who study the arcane arts",
      primaryStats: ["Knowledge", "Instinct"],
      icon: <Book className="w-6 h-6" />,
      features: ["Arcane Domain", "Sage Domain", "Bone Domain"],
      slug: "wizard"
    },
    {
      name: "Druid",
      description: "Nature's guardians who shapeshift and heal",
      primaryStats: ["Instinct", "Knowledge"],
      icon: <Heart className="w-6 h-6" />,
      features: ["Flora Domain", "Fauna Domain", "Elemental Domain"],
      slug: "druid"
    },
    {
      name: "Bard",
      description: "Inspiring performers who weave magic through art",
      primaryStats: ["Presence", "Knowledge"],
      icon: <Sparkles className="w-6 h-6" />,
      features: ["Midnight Domain", "Splendor Domain", "Wyrd Domain"],
      slug: "bard"
    }
  ];

  const ancestries = [
    { name: "Human", description: "Versatile and adaptable beings", slug: "human" },
    { name: "Drakona", description: "Dragon-descended folk with elemental heritage", slug: "drakona" },
    { name: "Faerie", description: "Magical beings from the realm of dreams", slug: "faerie" },
    { name: "Dwarf", description: "Hardy mountain folk skilled in craftsmanship", slug: "dwarf" },
    { name: "Elf", description: "Graceful beings with deep magical connections", slug: "elf" },
    { name: "Giant", description: "Towering people with incredible strength", slug: "giant" },
    { name: "Halfling", description: "Small folk known for their courage and luck", slug: "halfling" },
    { name: "Orc", description: "Proud warriors with strong tribal bonds", slug: "orc" },
    { name: "Ribbet", description: "Amphibious people who value community", slug: "ribbet" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Daggerheart Game Rules</h1>
          <p className="text-xl text-purple-200">Everything you need to know about playing Daggerheart</p>
        </div>

        <Tabs defaultValue="classes" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-purple-800/50 mb-8">
            <TabsTrigger value="classes" className="text-white data-[state=active]:bg-purple-600">Classes</TabsTrigger>
            <TabsTrigger value="ancestries" className="text-white data-[state=active]:bg-purple-600">Ancestries</TabsTrigger>
            <TabsTrigger value="mechanics" className="text-white data-[state=active]:bg-purple-600">Core Mechanics</TabsTrigger>
            <TabsTrigger value="domains" className="text-white data-[state=active]:bg-purple-600">Domains</TabsTrigger>
          </TabsList>

          <TabsContent value="classes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((cls, index) => (
                <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                        {cls.icon}
                      </div>
                      <CardTitle className="text-white">{cls.name}</CardTitle>
                    </div>
                    <CardDescription className="text-purple-200">{cls.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-purple-300">Primary Stats:</span>
                        <div className="flex gap-2 mt-1">
                          {cls.primaryStats.map((stat) => (
                            <Badge key={stat} variant="secondary" className="bg-purple-600/50 text-white">
                              {stat}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-purple-300">Domains:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {cls.features.map((feature) => (
                            <Badge key={feature} variant="outline" className="border-yellow-500/50 text-yellow-300 text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="pt-2">
                        <Link to={`/rules/classes/${cls.slug}`}>
                          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                            Learn More
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ancestries" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ancestries.map((ancestry, index) => (
                <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">{ancestry.name}</CardTitle>
                    <CardDescription className="text-purple-200">{ancestry.description}</CardDescription>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-purple-800/40 to-slate-800/40 border-purple-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Dice6 className="w-6 h-6" />
                    Duality Dice System
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-purple-200 space-y-3">
                  <p>Daggerheart uses a unique duality dice system with Hope and Fear dice:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong className="text-green-400">Hope Dice (d12):</strong> Rolled when you have advantage or positive circumstances</li>
                    <li><strong className="text-red-400">Fear Dice (d12):</strong> Rolled when you have disadvantage or negative circumstances</li>
                    <li><strong className="text-blue-400">Duality Dice (2d12):</strong> Standard roll using both Hope and Fear dice</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-800/40 to-slate-800/40 border-purple-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Stats & Modifiers</CardTitle>
                </CardHeader>
                <CardContent className="text-purple-200 space-y-3">
                  <p>Six core stats define your character:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Agility:</strong> Speed, reflexes, and dexterity</li>
                    <li><strong>Strength:</strong> Physical power and endurance</li>
                    <li><strong>Finesse:</strong> Precision and careful manipulation</li>
                    <li><strong>Instinct:</strong> Intuition and natural awareness</li>
                    <li><strong>Presence:</strong> Charisma and force of personality</li>
                    <li><strong>Knowledge:</strong> Learning and reasoning ability</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="domains" className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-800/40 to-slate-800/40 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Magic Domains</CardTitle>
                <CardDescription className="text-purple-200">
                  Domains represent different schools of magic and abilities that classes can access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    "Arcane", "Divine", "Elemental", "Flora", "Fauna", "Splendor",
                    "Midnight", "Wyrd", "Sage", "Shadow", "Swift", "Valor",
                    "Fury", "Prowess", "Armor", "Blade", "Bone"
                  ].map((domain) => (
                    <Badge key={domain} variant="outline" className="border-purple-400/50 text-purple-200 p-2 text-center">
                      {domain} Domain
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GameRules;
