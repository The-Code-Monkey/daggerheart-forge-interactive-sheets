
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sword, Shield, Zap, Heart, User, Book, Sparkles } from "lucide-react";

const ClassDetail = () => {
  const { className } = useParams();

  const classes = {
    guardian: {
      name: "Guardian",
      description: "Stalwart defenders who protect their allies with unwavering resolve",
      primaryStats: ["Strength", "Presence"],
      icon: <Shield className="w-8 h-8" />,
      domains: ["Armor Domain", "Bone Domain", "Blade Domain"],
      hitPoints: "d10 + Strength modifier",
      thresholds: { Minor: 3, Major: 8 },
      classFeatures: [
        {
          name: "Protection",
          description: "You can use your reaction to impose disadvantage on an attack roll made against a creature within 5 feet of you."
        },
        {
          name: "Guardian's Resolve",
          description: "Once per long rest, when you drop to 0 hit points, you can choose to drop to 1 hit point instead."
        }
      ]
    },
    warrior: {
      name: "Warrior",
      description: "Fierce combatants who excel in battle through strength and skill",
      primaryStats: ["Strength", "Agility"],
      icon: <Sword className="w-8 h-8" />,
      domains: ["Fury Domain", "Prowess Domain", "Bone Domain"],
      hitPoints: "d10 + Strength modifier",
      thresholds: { Minor: 3, Major: 8 },
      classFeatures: [
        {
          name: "Combat Prowess",
          description: "You gain advantage on attack rolls when you have advantage on the attack."
        },
        {
          name: "Second Wind",
          description: "Once per short rest, you can recover hit points equal to your level + Strength modifier."
        }
      ]
    },
    ranger: {
      name: "Ranger",
      description: "Masters of nature and ranged combat who track their prey",
      primaryStats: ["Agility", "Instinct"],
      icon: <Zap className="w-8 h-8" />,
      domains: ["Flora Domain", "Fauna Domain", "Swift Domain"],
      hitPoints: "d8 + Agility modifier",
      thresholds: { Minor: 2, Major: 7 },
      classFeatures: [
        {
          name: "Hunter's Mark",
          description: "You can mark a target and deal additional damage to them."
        },
        {
          name: "Natural Explorer",
          description: "You have advantage on tracking and survival checks in natural environments."
        }
      ]
    },
    rogue: {
      name: "Rogue",
      description: "Stealthy operatives skilled in deception and precision strikes",
      primaryStats: ["Agility", "Finesse"],
      icon: <User className="w-8 h-8" />,
      domains: ["Shadow Domain", "Swift Domain", "Midnight Domain"],
      hitPoints: "d6 + Agility modifier",
      thresholds: { Minor: 2, Major: 6 },
      classFeatures: [
        {
          name: "Sneak Attack",
          description: "Deal extra damage when you have advantage on your attack roll."
        },
        {
          name: "Thieves' Cant",
          description: "You know the secret language of rogues and can communicate covertly."
        }
      ]
    },
    seraph: {
      name: "Seraph",
      description: "Divine warriors channeling celestial power to smite evil",
      primaryStats: ["Presence", "Instinct"],
      icon: <Sparkles className="w-8 h-8" />,
      domains: ["Divine Domain", "Splendor Domain", "Valor Domain"],
      hitPoints: "d8 + Presence modifier",
      thresholds: { Minor: 2, Major: 7 },
      classFeatures: [
        {
          name: "Divine Strike",
          description: "Your attacks are infused with divine energy, dealing radiant damage."
        },
        {
          name: "Healing Light",
          description: "You can heal yourself and allies with divine magic."
        }
      ]
    },
    sorcerer: {
      name: "Sorcerer",
      description: "Innate spellcasters wielding raw magical power from within",
      primaryStats: ["Instinct", "Presence"],
      icon: <Zap className="w-8 h-8" />,
      domains: ["Arcane Domain", "Elemental Domain", "Wyrd Domain"],
      hitPoints: "d6 + Instinct modifier",
      thresholds: { Minor: 1, Major: 5 },
      classFeatures: [
        {
          name: "Metamagic",
          description: "You can modify your spells in various ways to enhance their effects."
        },
        {
          name: "Sorcerous Origin",
          description: "Your magic comes from a specific source that shapes your abilities."
        }
      ]
    },
    wizard: {
      name: "Wizard",
      description: "Scholarly mages who study the arcane arts through careful research",
      primaryStats: ["Knowledge", "Instinct"],
      icon: <Book className="w-8 h-8" />,
      domains: ["Arcane Domain", "Sage Domain", "Bone Domain"],
      hitPoints: "d6 + Knowledge modifier",
      thresholds: { Minor: 1, Major: 5 },
      classFeatures: [
        {
          name: "Spellbook",
          description: "You maintain a spellbook containing your known spells and can learn new ones."
        },
        {
          name: "Arcane Recovery",
          description: "You can recover some of your magical energy during a short rest."
        }
      ]
    },
    druid: {
      name: "Druid",
      description: "Nature's guardians who shapeshift and commune with the natural world",
      primaryStats: ["Instinct", "Knowledge"],
      icon: <Heart className="w-8 h-8" />,
      domains: ["Flora Domain", "Fauna Domain", "Elemental Domain"],
      hitPoints: "d8 + Instinct modifier",
      thresholds: { Minor: 2, Major: 7 },
      classFeatures: [
        {
          name: "Wild Shape",
          description: "You can transform into animals and back again."
        },
        {
          name: "Nature's Ward",
          description: "You have resistance to damage from natural sources."
        }
      ]
    },
    bard: {
      name: "Bard",
      description: "Inspiring performers who weave magic through art and music",
      primaryStats: ["Presence", "Knowledge"],
      icon: <Sparkles className="w-8 h-8" />,
      domains: ["Midnight Domain", "Splendor Domain", "Wyrd Domain"],
      hitPoints: "d8 + Presence modifier",
      thresholds: { Minor: 2, Major: 7 },
      classFeatures: [
        {
          name: "Bardic Inspiration",
          description: "You can inspire allies, giving them bonuses to their rolls."
        },
        {
          name: "Jack of All Trades",
          description: "You add half your proficiency bonus to ability checks you're not proficient in."
        }
      ]
    }
  };

  const classData = classes[className?.toLowerCase() as keyof typeof classes];

  if (!classData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Class Not Found</h1>
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
            <Button variant="ghost" className="text-purple-200 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Game Rules
            </Button>
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              {classData.icon}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">{classData.name}</h1>
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
                  <Badge key={stat} variant="secondary" className="bg-purple-600/50 text-white">
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
                  <span className="text-white">{classData.thresholds.Minor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Major:</span>
                  <span className="text-white">{classData.thresholds.Major}</span>
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
                  <Badge key={domain} variant="outline" className="border-yellow-500/50 text-yellow-300 text-xs">
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
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.name}</h3>
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
