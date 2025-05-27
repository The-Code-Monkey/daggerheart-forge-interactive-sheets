import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, Zap, Shield, Sword, Book, Dice6 } from "lucide-react";
import DiceRoller from "@/components/DiceRoller";
import StatBlock from "@/components/StatBlock";

const CharacterBuilder = () => {
  // For now, we'll show the login requirement
  // Later this can be replaced with actual authentication state
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900 flex items-center justify-center px-4">
        <Card className="w-full max-w-md bg-gradient-to-br from-purple-800/40 to-slate-800/40 border-purple-500/30 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-black" />
            </div>
            <CardTitle className="text-white text-2xl">Login Required</CardTitle>
            <CardDescription className="text-purple-200">
              You need to be logged in to access the character builder and manage your characters.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link to="/login" className="block">
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                Sign In
              </Button>
            </Link>
            <Link to="/game-rules" className="block">
              <Button variant="outline" className="w-full border-purple-400 text-purple-100 hover:bg-purple-700/30">
                View Game Rules Instead
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ... keep existing code (the actual character builder interface that was here before)
  const [character, setCharacter] = useState({
    name: "",
    ancestry: "",
    class: "",
    community: "",
    level: 1,
    hope: 2,
    fear: 0,
    stats: {
      agility: 0,
      strength: 0,
      finesse: 0,
      instinct: 0,
      presence: 0,
      knowledge: 0
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Character Builder</h1>
          <p className="text-xl text-purple-200">Create your Daggerheart character</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Character Sheet */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-purple-800/40 to-slate-800/40 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="w-6 h-6" />
                  Character Sheet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basics" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-purple-800/50">
                    <TabsTrigger value="basics" className="text-white data-[state=active]:bg-purple-600">Basics</TabsTrigger>
                    <TabsTrigger value="stats" className="text-white data-[state=active]:bg-purple-600">Stats</TabsTrigger>
                    <TabsTrigger value="abilities" className="text-white data-[state=active]:bg-purple-600">Abilities</TabsTrigger>
                    <TabsTrigger value="equipment" className="text-white data-[state=active]:bg-purple-600">Equipment</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basics" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-white">Character Name</Label>
                        <Input
                          id="name"
                          value={character.name}
                          onChange={(e) => setCharacter(prev => ({ ...prev, name: e.target.value }))}
                          className="bg-slate-800/50 border-purple-500/50 text-white"
                          placeholder="Enter character name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="level" className="text-white">Level</Label>
                        <Select>
                          <SelectTrigger className="bg-slate-800/50 border-purple-500/50 text-white">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1,2,3,4,5,6,7,8,9,10].map(level => (
                              <SelectItem key={level} value={level.toString()}>{level}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="ancestry" className="text-white">Ancestry</Label>
                        <Select>
                          <SelectTrigger className="bg-slate-800/50 border-purple-500/50 text-white">
                            <SelectValue placeholder="Select ancestry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="human">Human</SelectItem>
                            <SelectItem value="drakona">Drakona</SelectItem>
                            <SelectItem value="faerie">Faerie</SelectItem>
                            <SelectItem value="dwarf">Dwarf</SelectItem>
                            <SelectItem value="elf">Elf</SelectItem>
                            <SelectItem value="giant">Giant</SelectItem>
                            <SelectItem value="halfling">Halfling</SelectItem>
                            <SelectItem value="orc">Orc</SelectItem>
                            <SelectItem value="ribbet">Ribbet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="class" className="text-white">Class</Label>
                        <Select>
                          <SelectTrigger className="bg-slate-800/50 border-purple-500/50 text-white">
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="guardian">Guardian</SelectItem>
                            <SelectItem value="warrior">Warrior</SelectItem>
                            <SelectItem value="ranger">Ranger</SelectItem>
                            <SelectItem value="rogue">Rogue</SelectItem>
                            <SelectItem value="seraph">Seraph</SelectItem>
                            <SelectItem value="sorcerer">Sorcerer</SelectItem>
                            <SelectItem value="wizard">Wizard</SelectItem>
                            <SelectItem value="druid">Druid</SelectItem>
                            <SelectItem value="bard">Bard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="community" className="text-white">Community</Label>
                        <Select>
                          <SelectTrigger className="bg-slate-800/50 border-purple-500/50 text-white">
                            <SelectValue placeholder="Select community" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="highspire">Highspire</SelectItem>
                            <SelectItem value="order">Order of the Sealed Tome</SelectItem>
                            <SelectItem value="wanderer">Wanderer</SelectItem>
                            <SelectItem value="consortium">Grimwald Consortium</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="background" className="text-white">Background</Label>
                      <Textarea
                        id="background"
                        className="bg-slate-800/50 border-purple-500/50 text-white"
                        placeholder="Describe your character's background and personality..."
                        rows={4}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="stats" className="space-y-6 mt-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <StatBlock 
                        name="Agility" 
                        value={character.stats.agility} 
                        modifier={Math.floor((character.stats.agility - 10) / 2)}
                        icon={<Zap className="w-4 h-4" />}
                      />
                      <StatBlock 
                        name="Strength" 
                        value={character.stats.strength} 
                        modifier={Math.floor((character.stats.strength - 10) / 2)}
                        icon={<Sword className="w-4 h-4" />}
                      />
                      <StatBlock 
                        name="Finesse" 
                        value={character.stats.finesse} 
                        modifier={Math.floor((character.stats.finesse - 10) / 2)}
                        icon={<Shield className="w-4 h-4" />}
                      />
                      <StatBlock 
                        name="Instinct" 
                        value={character.stats.instinct} 
                        modifier={Math.floor((character.stats.instinct - 10) / 2)}
                        icon={<Heart className="w-4 h-4" />}
                      />
                      <StatBlock 
                        name="Presence" 
                        value={character.stats.presence} 
                        modifier={Math.floor((character.stats.presence - 10) / 2)}
                        icon={<User className="w-4 h-4" />}
                      />
                      <StatBlock 
                        name="Knowledge" 
                        value={character.stats.knowledge} 
                        modifier={Math.floor((character.stats.knowledge - 10) / 2)}
                        icon={<Book className="w-4 h-4" />}
                      />
                    </div>

                    <Separator className="bg-purple-500/30" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-white">Hope</Label>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-green-600/50 text-white">
                            {character.hope}
                          </Badge>
                          <span className="text-purple-200 text-sm">Current Hope</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white">Fear</Label>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-red-600/50 text-white">
                            {character.fear}
                          </Badge>
                          <span className="text-purple-200 text-sm">Current Fear</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="abilities" className="space-y-6 mt-6">
                    <div className="text-center text-purple-200">
                      <p>Abilities and spells will be populated based on your class selection.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="equipment" className="space-y-6 mt-6">
                    <div className="text-center text-purple-200">
                      <p>Equipment management interface coming soon.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Tools Sidebar */}
          <div className="space-y-6">
            <DiceRoller />
            
            <Card className="bg-gradient-to-br from-purple-800/40 to-slate-800/40 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Save Character
                </Button>
                <Button variant="outline" className="w-full border-purple-400 text-purple-100 hover:bg-purple-700/30">
                  Export PDF
                </Button>
                <Button variant="outline" className="w-full border-purple-400 text-purple-100 hover:bg-purple-700/30">
                  Share Character
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterBuilder;
