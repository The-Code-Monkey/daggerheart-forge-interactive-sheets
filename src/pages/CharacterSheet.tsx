import { useState, useEffect, JSX } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
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

const CharacterSheet = (): JSX.Element => {
  const { characterId } = useParams();
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
      void fetchCharacterById(characterId);
    }
  }, [characterId]);

  const updateCharacterData = async (updates: Partial<Character>) => {
    if (!characterId) {
      toast({
        title: "Error",
        description: "No character ID found.",
        variant: "destructive",
      });
      return;
    }

    const updatedCharacter = await updateCharacter(characterId, updates);
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
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900 p-4">
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
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900 p-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-purple-200 py-8">
            Character not found.
          </p>
          <div className="text-center">
            <Link to="/dashboard">
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
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
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
            <BackgroundCard character={character} />
          </div>

          <div className="col-span-5 space-y-6">
            <Tabs defaultValue="inventory">
              <TabsList className="grid w-full grid-cols-4 bg-purple-800/50 mb-8">
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="effects-features">
                  Effects &amp; Features
                </TabsTrigger>
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
