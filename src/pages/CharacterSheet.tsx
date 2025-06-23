import { useState, useEffect, JSX } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Character, CharacterWithRelations } from "@/lib/types";
import {
  getCharacterById,
  updateCharacter,
} from "@/integrations/supabase/helpers";
import HPManager from "@/components/character/HPManager";
import AttributesCard from "@/components/character/AttributesCard";
import BackgroundCard from "@/components/character/BackgroundCard";
import InventoryManager from "@/components/character/InventoryManager";
// import CharacterInfo from "@/components/character/CharacterInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EffectsFeaturesManager from "@/components/character/EffectsFeaturesManager";
import QuestionsManager from "@/components/character/QuestionsManager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Text from "@/components/atoms/Text";

const CharacterSheet = (): JSX.Element => {
  const params = useParams();
  const characterId = params?.characterId;
  const { toast } = useToast();

  const [character, setCharacter] = useState<CharacterWithRelations | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const fetchCharacterById = async (id: string) => {
    setIsLoading(true);
    const data = await getCharacterById(id);
    if (data) {
      setCharacter(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (characterId) {
      void fetchCharacterById(String(characterId));
    }
  }, [characterId]);

  const updateLevel = (lvl: number) => {
    if (lvl >= 1 && lvl <= 10) {
      void updateCharacterData({
        level: lvl,
      });
    }
  };

  const updateCharacterData = async (updates: Partial<Character>) => {
    if (!characterId) {
      toast({
        title: "Error",
        description: "No character ID found.",
        variant: "destructive",
      });
      return;
    }

    const updatedCharacter = await updateCharacter(
      String(characterId),
      updates
    );
    if (updatedCharacter) {
      setCharacter(updatedCharacter);
      toast({
        title: "Character updated",
        description: "Your character has been saved.",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to update character.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-purple-900 via-purple-800 to-slate-900 p-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-purple-200 py-8">
            Loading character...
          </p>
        </div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-linear-to-b from-purple-900 via-purple-800 to-slate-900 p-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-purple-200 py-8">
            Character not found.
          </p>
          <div className="text-center">
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="border-purple-400 text-purple-100 "
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nebula p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="border-purple-400 text-purple-100 "
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-white">
                {character.name}
              </h1>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">Level {character.level}</Badge>
                <Badge
                  variant="outline"
                  className="border-purple-400 text-purple-200"
                >
                  {character.ancestry?.name ?? "Unknown"}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-purple-400 text-purple-200"
                >
                  {character.class?.name ?? "Unknown"}
                  {character.subclass
                    ? ` - (${String(character.subclass.name)})`
                    : ""}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Character Stats */}
          <div className="col-span-5 space-y-6">
            <HPManager
              character={character}
              onUpdate={(updates) => void updateCharacterData(updates)}
            />
            <AttributesCard character={character} />
            <Card>
              <CardHeader>
                <CardTitle className="text-white hover:cursor-pointer text-center">
                  Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold ml-0 text-white flex flex-row gap-2 items-center justify-center">
                  <Button
                    onClick={() => {
                      updateLevel(Number(character.level) - 1);
                    }}
                  >
                    <Minus className="w-5 h-5" />
                  </Button>
                  <Text variant="h3" className="w-1/3 text-center">
                    {character.level}
                  </Text>
                  <Button
                    onClick={() => {
                      updateLevel(Number(character.level) + 1);
                    }}
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            <BackgroundCard character={character} />
          </div>

          <div className="col-span-5 space-y-6">
            <Tabs defaultValue="inventory">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="effects-features">
                  Effects &amp; Features
                </TabsTrigger>
                <TabsTrigger value="questions">Questions</TabsTrigger>
              </TabsList>

              <TabsContent value="inventory">
                <InventoryManager
                  character={character}
                  onUpdate={(updates) => {
                    void updateCharacterData(updates);
                  }}
                />
              </TabsContent>
              <TabsContent value="effects-features">
                <EffectsFeaturesManager
                  character={character}
                  onUpdate={(updates) => {
                    void updateCharacterData(updates);
                  }}
                />
              </TabsContent>
              <TabsContent value="questions">
                <QuestionsManager
                  character={character}
                  onUpdate={(updates) => {
                    void updateCharacterData(updates);
                  }}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Inventory and Info */}
          {/* <div className="space-y-6 lg:col-span-2">
            <InventoryManager
              character={character}
              onUpdate={(updates) => {
                void updateCharacterData(updates);
              }}
            />
            <CharacterInfo character={character} refetch={refetch} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CharacterSheet;
