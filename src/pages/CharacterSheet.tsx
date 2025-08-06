import { useState, useEffect, JSX } from "react";
import { useParams, Link } from "react-router-dom";
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
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { debounce } from "lodash";

const CharacterSheet = (): JSX.Element => {
  const { characterId } = useParams();
  const { toast } = useToast();

  const [character, setCharacter] = useState<CharacterWithRelations | null>(
    null
  );
  const [level, setLevel] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCharacterById = async (id: string) => {
    setIsLoading(true);
    const data = await getCharacterById(id);
    if (data) {
      setCharacter(data);
      setLevel(data.level ?? 1);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (characterId) {
      void fetchCharacterById(characterId);
    }
  }, [characterId]);

  const debouncedUpdateCharacterData = debounce(
    (record: Record<string, unknown>) => {
      void updateCharacterData(record);
    },
    500
  );

  const getTierUp = (lvl: number) => {
    if (lvl === 2 || lvl === 5 || lvl === 8) return true;
    return false;
  };

  const getTier = (lvl: number) => {
    switch (lvl) {
      case 2: {
        return 2;
      }
      case 5: {
        return 3;
      }
      case 8: {
        return 4;
      }
      default: {
        return 1;
      }
    }
  };

  const updateLevel = (lvl: number) => {
    const levelWentUp = lvl > (character?.level ?? 1);

    if (lvl >= 1 && lvl <= 10) {
      setLevel(lvl);
      debouncedUpdateCharacterData({
        level: lvl,
        tier: getTier(lvl),
        additional: {
          ...(character?.additional ?? {}),
          tierUp: levelWentUp ? getTierUp(lvl) : undefined,
        },
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

  const handleUpdateFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updates = Object.fromEntries(formData.entries());
    await updateCharacterData(updates);
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
    <div className="min-h-screen bg-nebula p-4">
      <Dialog defaultOpen={false} open={false} modal>
        <DialogContent>
          <form
            onSubmit={(event) => {
              void handleUpdateFormSubmit(event);
            }}
          >
            <div className="flex flex-col gap-2 w-full">
              {Array(character.tier ?? 1)
                .fill(null)
                .map((_, index) => {
                  return <div>{index + 1}</div>;
                })}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                // className="border-purple-400 text-purple-100"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
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
                <Badge variant="secondary">Level {level}</Badge>
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
                      updateLevel(Number(level) - 1);
                    }}
                  >
                    <Minus className="w-5 h-5" />
                  </Button>
                  <Text variant="h3" className="w-1/3 text-center">
                    {level}
                  </Text>
                  <Button
                    onClick={() => {
                      updateLevel(Number(level) + 1);
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
