
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AncestryDetail = () => {
  const { ancestryName } = useParams();

  const ancestries = {
    human: {
      name: "Human",
      description: "Versatile and adaptable beings who can excel in any path they choose",
      traits: [
        {
          name: "Adaptable",
          description: "Humans gain an additional skill proficiency of their choice."
        },
        {
          name: "Ambitious",
          description: "Once per long rest, you can gain advantage on any ability check."
        }
      ],
      size: "Medium",
      speed: "30 feet",
      languages: ["Common", "One additional language of choice"],
      lifespan: "80-100 years",
      culture: "Humans form diverse societies and adapt to any environment. They value achievement, progress, and leaving their mark on the world."
    },
    drakona: {
      name: "Drakona",
      description: "Dragon-descended folk with elemental heritage flowing through their veins",
      traits: [
        {
          name: "Draconic Heritage",
          description: "Choose an elemental type. You have resistance to that damage type."
        },
        {
          name: "Breath Weapon",
          description: "You can exhale destructive energy in a 15-foot cone as an action."
        }
      ],
      size: "Medium",
      speed: "30 feet",
      languages: ["Common", "Draconic"],
      lifespan: "150-200 years",
      culture: "Drakona organize themselves into clans based on their elemental heritage. They value honor, strength, and the preservation of ancient draconic traditions."
    },
    faerie: {
      name: "Faerie",
      description: "Magical beings from the realm of dreams with an otherworldly presence",
      traits: [
        {
          name: "Fey Magic",
          description: "You know one cantrip from the Wyrd domain spell list."
        },
        {
          name: "Fade Away",
          description: "As a reaction when you take damage, you can become invisible until the start of your next turn."
        }
      ],
      size: "Small",
      speed: "25 feet, fly 30 feet",
      languages: ["Common", "Sylvan"],
      lifespan: "300-500 years",
      culture: "Faeries live in harmony with nature and magic. They value beauty, creativity, and the preservation of wonder in the world."
    },
    dwarf: {
      name: "Dwarf",
      description: "Hardy mountain folk skilled in craftsmanship and resilient against hardship",
      traits: [
        {
          name: "Dwarven Resilience",
          description: "You have advantage on saving throws against poison and resistance to poison damage."
        },
        {
          name: "Stonecunning",
          description: "You have advantage on Investigation checks related to stonework."
        }
      ],
      size: "Medium",
      speed: "25 feet",
      languages: ["Common", "Dwarvish"],
      lifespan: "200-300 years",
      culture: "Dwarves live in mountain strongholds and underground cities. They value craftsmanship, loyalty to clan, and the preservation of tradition."
    },
    elf: {
      name: "Elf",
      description: "Graceful beings with deep magical connections to the natural world",
      traits: [
        {
          name: "Keen Senses",
          description: "You have advantage on Perception checks that rely on sight or hearing."
        },
        {
          name: "Trance",
          description: "You don't need to sleep and can't be forced to sleep. You meditate for 4 hours instead of sleeping."
        }
      ],
      size: "Medium",
      speed: "30 feet",
      languages: ["Common", "Elvish"],
      lifespan: "400-700 years",
      culture: "Elves live in harmony with nature and magic. They value art, knowledge, and the preservation of ancient wisdom."
    },
    giant: {
      name: "Giant",
      description: "Towering people with incredible strength and a connection to the elements",
      traits: [
        {
          name: "Powerful Build",
          description: "You count as one size larger when determining your carrying capacity and the weight you can push or lift."
        },
        {
          name: "Giant's Might",
          description: "Once per long rest, you can increase your size by one category for 1 minute."
        }
      ],
      size: "Large",
      speed: "35 feet",
      languages: ["Common", "Giant"],
      lifespan: "200-400 years",
      culture: "Giants live in small communities in mountainous regions. They value strength, honor, and protection of the natural world."
    },
    halfling: {
      name: "Halfling",
      description: "Small folk known for their courage, luck, and love of comfort",
      traits: [
        {
          name: "Lucky",
          description: "When you roll a 1 on an attack roll, ability check, or saving throw, you can reroll the die."
        },
        {
          name: "Brave",
          description: "You have advantage on saving throws against being frightened."
        }
      ],
      size: "Small",
      speed: "25 feet",
      languages: ["Common", "Halfling"],
      lifespan: "120-150 years",
      culture: "Halflings value comfort, community, and simple pleasures. They live in peaceful communities and are known for their hospitality."
    },
    orc: {
      name: "Orc",
      description: "Proud warriors with strong tribal bonds and fierce loyalty",
      traits: [
        {
          name: "Relentless Endurance",
          description: "When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead."
        },
        {
          name: "Savage Attacks",
          description: "When you score a critical hit with a melee weapon attack, you can roll one additional damage die."
        }
      ],
      size: "Medium",
      speed: "30 feet",
      languages: ["Common", "Orcish"],
      lifespan: "60-80 years",
      culture: "Orcs live in tribal societies that value strength, honor, and loyalty to the tribe. They are fierce warriors but also capable of great compassion."
    },
    ribbet: {
      name: "Ribbet",
      description: "Amphibious people who value community and have a deep connection to water",
      traits: [
        {
          name: "Amphibious",
          description: "You can breathe air and water and have a swimming speed equal to your walking speed."
        },
        {
          name: "Standing Leap",
          description: "Your long jump is up to 25 feet and your high jump is up to 15 feet, with or without a running start."
        }
      ],
      size: "Medium",
      speed: "30 feet, swim 30 feet",
      languages: ["Common", "Ribbet"],
      lifespan: "40-60 years",
      culture: "Ribbets live in wetland communities and value cooperation, environmental stewardship, and the sharing of knowledge."
    }
  };

  const ancestryData = ancestries[ancestryName?.toLowerCase() as keyof typeof ancestries];

  if (!ancestryData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Ancestry Not Found</h1>
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
          
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-white mb-2">{ancestryData.name}</h1>
            <p className="text-xl text-purple-200">{ancestryData.description}</p>
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
                  <Badge key={index} variant="secondary" className="bg-purple-600/50 text-white">
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
                  <h3 className="text-lg font-semibold text-white mb-2">{trait.name}</h3>
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
