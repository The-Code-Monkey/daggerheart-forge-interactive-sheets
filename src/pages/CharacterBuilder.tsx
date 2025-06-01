import { useState, useEffect, JSX } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Ancestry, Class, Subclass, Community } from "@/lib/types";
import {
  getAllClasses,
  getSubclassesByClassId,
  getAllAncestries,
  getAllCommunities,
} from "@/integrations/supabase/helpers";

const allowedMods = {
  "+2": 1,
  "+1": 2,
  "+0": 2,
  "-1": 1,
};
const statKeys = [
  "agility",
  "strength",
  "finesse",
  "instinct",
  "presence",
  "knowledge",
] as const;

type StatKey = (typeof statKeys)[number];

interface FormData {
  name: string | undefined;
  level: number;
  age: number | undefined;
  pronouns: string | undefined;
  gender: string | undefined;
  background: string | undefined;
  ancestry: string | undefined;
  class: string | undefined;
  community: string | undefined;
  subclass: string | undefined;
  stats: {
    agility: string | undefined;
    strength: string | undefined;
    finesse: string | undefined;
    instinct: string | undefined;
    presence: string | undefined;
    knowledge: string | undefined;
  };
  stressSlots: number | undefined;
  stress: number | undefined;
  hope: number | undefined;
}

const CharacterBuilder = (): JSX.Element => {
  const { characterId: urlCharacterId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [characterId, setCharacterId] = useState<string | null>(
    urlCharacterId ?? null
  );
  const [isLoading, setIsLoading] = useState(false);

  const [classes, setClasses] = useState<Class[]>([]);
  const [subclasses, setSubclasses] = useState<Subclass[]>([]);
  const [ancestries, setAncestries] = useState<Ancestry[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);

  // Form data
  const [formData, setFormData] = useState<FormData>({
    name: "",
    level: 1,
    age: undefined,
    pronouns: undefined,
    gender: undefined,
    background: undefined,
    ancestry: undefined,
    class: undefined,
    community: undefined,
    subclass: undefined,
    stats: {
      agility: undefined,
      strength: undefined,
      finesse: undefined,
      instinct: undefined,
      presence: undefined,
      knowledge: undefined,
    },
    stressSlots: 6,
    stress: 0,
    hope: 2,
  });

  useEffect(() => {
    const fetchCommunities = async () => {
      const data = await getAllCommunities();
      if (data) {
        setCommunities(data);
      }
    };

    const fetchAncestries = async () => {
      const data = await getAllAncestries();
      if (data) {
        setAncestries(data);
      }
    };

    const fetchClasses = async () => {
      const data = await getAllClasses();
      if (data) {
        setClasses(data);
      }
    };

    void fetchClasses();
    void fetchAncestries();
    void fetchCommunities();
  }, []);

  useEffect(() => {
    const fetchSubclasses = async () => {
      // Validate class ID before fetching
      const classIdNum = parseInt(formData.class ?? "0", 10);
      if (!formData.class || isNaN(classIdNum) || classIdNum === 0) {
        setSubclasses([]);
        return;
      }

      const data = await getSubclassesByClassId(classIdNum);

      if (data) {
        setSubclasses(data);
      } else {
        setSubclasses([]);
        toast({
          title: "Error",
          description: "Failed to load subclasses for selected class.",
          variant: "destructive",
        });
      }
    };

    void fetchSubclasses();
  }, [formData.class]);

  const fetchCharacter = async () => {
    if (!characterId) return;

    const { data } = await supabase
      .from("characters")
      .select("*")
      .eq("id", characterId)
      .single();

    if (data) {
      setFormData({
        name: data.name,
        level: data.level ?? 1,
        age: data.age ?? undefined,
        pronouns: data.pronouns ?? undefined,
        gender: data.gender ?? undefined,
        background: data.background ?? undefined,
        ancestry: data.ancestry ? String(data.ancestry) : undefined,
        class: data.class ? String(data.class) : undefined,
        community: data.community ? String(data.community) : undefined,
        subclass: data.subclass ? String(data.subclass) : undefined,
        stats: data.stats as unknown as FormData["stats"],
        stressSlots: data.stressSlots ?? 6,
        stress: data.stress ?? 0,
        hope: data.hope ?? 2,
      } satisfies FormData);
    }
  };

  useEffect(() => {
    if (urlCharacterId) {
      void fetchCharacter();
    }
  }, [urlCharacterId]);

  const updateFormData = (field: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveCharacterData = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const characterData = {
        user_id: user.id,
        name: formData.name ?? "Unnamed Character",
        ancestry: formData.ancestry ? parseInt(formData.ancestry, 10) : null,
        class: formData.class ? parseInt(formData.class, 10) : null,
        subclass: formData.subclass ? parseInt(formData.subclass, 10) : null,
        community: formData.community ? parseInt(formData.community, 10) : null,
        level: formData.level,
        background: formData.background ?? null,
        stats: formData.stats,
        stressSlots: formData.stressSlots ?? 6,
        stress: formData.stress ?? 0,
        hope: formData.hope ?? 2,
        complete: currentStep === 4,
        age: formData.age ?? null,
        pronouns: formData.pronouns ?? null,
        gender: formData.gender ?? null,
      };

      if (characterId) {
        // Update existing character
        const { error } = await supabase
          .from("characters")
          .update(characterData)
          .eq("id", characterId);

        if (error) throw error;
      } else {
        // Create new character
        const { data, error } = await supabase
          .from("characters")
          .insert([characterData])
          .select()
          .single();

        if (error) throw error;
        setCharacterId(data.id);
      }

      toast({
        title: "Character saved",
        description: "Your character progress has been saved.",
      });
    } catch (error) {
      console.error("Error saving character:", error);
      toast({
        title: "Error",
        description: "Failed to save character. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    await saveCharacterData();
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Character complete, redirect to dashboard
      void navigate("/dashboard");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const selectedCounts = Object.values(formData.stats).reduce<
    Record<string, number>
  >((acc, mod) => {
    if (mod) acc[mod] = (acc[mod] ?? 0) + 1;
    return acc;
  }, {});

  const handleChangeStats = (key: StatKey, value: string) => {
    setFormData((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [key]: value,
      },
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Basic Information
            </h3>
            <div>
              <Label htmlFor="name" className="text-white">
                Character Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => {
                  updateFormData("name", e.target.value);
                }}
                className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
                placeholder="Enter character name"
              />
            </div>
            <div>
              <Label htmlFor="level" className="text-white">
                Level
              </Label>
              <Select
                value={formData.level.toString()}
                onValueChange={(value) => {
                  updateFormData("level", parseInt(value));
                }}
              >
                <SelectTrigger className="bg-slate-800/50 border-purple-500/50 text-white mt-1">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                    <SelectItem key={level} value={level.toString()}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="age" className="text-white">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => {
                  updateFormData("age", parseInt(e.target.value));
                }}
                className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
                placeholder="Enter character age"
              />
            </div>
            <div>
              <Label htmlFor="pronouns" className="text-white">
                Pronouns
              </Label>
              <Input
                id="pronouns"
                type="text"
                value={formData.pronouns}
                onChange={(e) => {
                  updateFormData("pronouns", e.target.value);
                }}
                className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
                placeholder="Enter character pronouns"
              />
            </div>
            <div>
              <Label htmlFor="gender" className="text-white">
                Gender
              </Label>
              <Input
                id="gender"
                type="text"
                value={formData.gender}
                onChange={(e) => {
                  updateFormData("gender", e.target.value);
                }}
                className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
                placeholder="Enter character gender"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Character Origin
            </h3>
            <div>
              <Label htmlFor="ancestry" className="text-white">
                Ancestry
              </Label>
              <Select
                value={formData.ancestry}
                onValueChange={(value) => {
                  updateFormData("ancestry", value);
                }}
              >
                <SelectTrigger className="bg-slate-800/50 border-purple-500/50 text-white mt-1">
                  <SelectValue placeholder="Select ancestry" />
                </SelectTrigger>
                <SelectContent>
                  {ancestries.map((ancestry) => (
                    <SelectItem
                      key={String(ancestry.id)}
                      value={String(ancestry.id)}
                    >
                      {String(ancestry.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="class" className="text-white">
                Class
              </Label>
              <Select
                value={formData.class}
                onValueChange={(value) => {
                  updateFormData("class", value);
                }}
              >
                <SelectTrigger className="bg-slate-800/50 border-purple-500/50 text-white mt-1">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={String(cls.id)}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {formData.class && (
              <div>
                <Label htmlFor="subclass" className="text-white">
                  Subclass
                </Label>
                <Select
                  value={formData.subclass}
                  onValueChange={(value) => {
                    updateFormData("subclass", value);
                  }}
                >
                  <SelectTrigger className="bg-slate-800/50 border-purple-500/50 text-white mt-1">
                    <SelectValue placeholder="Select subclass" />
                  </SelectTrigger>
                  <SelectContent>
                    {subclasses.map((subclass) => (
                      <SelectItem key={subclass.id} value={String(subclass.id)}>
                        {subclass.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div>
              <Label htmlFor="community" className="text-white">
                Community
              </Label>
              <Select
                value={formData.community}
                onValueChange={(value) => {
                  updateFormData("community", value);
                }}
              >
                <SelectTrigger className="bg-slate-800/50 border-purple-500/50 text-white mt-1">
                  <SelectValue placeholder="Select community" />
                </SelectTrigger>
                <SelectContent>
                  {communities.map((community) => (
                    <SelectItem
                      key={String(community.id)}
                      value={String(community.id)}
                    >
                      {String(community.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="background" className="text-white">
                Background
              </Label>
              <Textarea
                id="background"
                value={formData.background}
                onChange={(e) => {
                  updateFormData("background", e.target.value);
                }}
                className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
                placeholder="Describe your character's background..."
                rows={4}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Attributes
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {statKeys.map((key) => {
                return (
                  <div key={key}>
                    <Label htmlFor={key} className="text-white capitalize">
                      {key}
                    </Label>
                    <Select
                      value={formData.stats[key]}
                      onValueChange={(value) => {
                        handleChangeStats(key, value);
                      }}
                    >
                      <SelectTrigger className="bg-slate-800/50 border-purple-500/50 text-white mt-1">
                        <SelectValue placeholder="Select modifier" />
                      </SelectTrigger>
                      {/* Unique key here to force re-render based on availability */}
                      <SelectContent>
                        <SelectItem value="none">Select modifier</SelectItem>
                        {Object.entries(allowedMods).map(([mod, max]) => {
                          const currentSelection = formData.stats[key];
                          const count = selectedCounts[mod] ?? 0;
                          const isSelected = currentSelection === mod;
                          const isDisabled = !isSelected && count >= max;

                          return (
                            <SelectItem
                              key={`${mod}-${key}`}
                              value={mod}
                              disabled={isDisabled}
                            >
                              {mod}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 4:
        const cls = classes.find((cls) => String(cls.id) === formData.class);
        const subclass = subclasses.find(
          (subclass) => String(subclass.id) === formData.subclass
        );
        const ancestry = ancestries.find(
          (ancestry) => String(ancestry.id) === formData.ancestry
        );
        const community = communities.find(
          (community) => String(community.id) === formData.community
        );
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Review Your Character
            </h3>
            <Card className="p-4 rounded-lg space-y-2">
              <h4 className="text-lg font-medium text-white">
                {formData.name ?? "Unnamed Character"}
              </h4>
              <p className="text-purple-200">
                Level {formData.level} | {cls?.name} ({subclass?.name})
              </p>
              <p className="text-purple-200">
                Background: {formData.background}
              </p>
              <p className="text-purple-200">Ancestry: {ancestry?.name}</p>
              <p className="text-purple-200">Community: {community?.name}</p>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {Object.entries(formData.stats).map(([stat, value]) => (
                  <div key={stat} className="text-center">
                    <div className="text-sm text-purple-300 capitalize">
                      {stat}
                    </div>
                    <div className="text-white font-semibold">{value}</div>
                  </div>
                ))}
              </div>
              {formData.background && (
                <div className="mt-4">
                  <div className="text-sm text-purple-300">Background</div>
                  <p className="text-white text-sm">{formData.background}</p>
                </div>
              )}
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const nextIsDisabled = () => {
    switch (currentStep) {
      case 1:
        return (
          !formData.name ||
          !formData.age ||
          !formData.gender ||
          !formData.pronouns
        );
      case 2:
        return (
          !formData.ancestry ||
          !formData.class ||
          !formData.community ||
          !formData.subclass ||
          !formData.background
        );
      case 3:
        return !Object.keys(formData.stats).every(
          (key) =>
            formData.stats[key] !== undefined && formData.stats[key] !== "none"
        );
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Character Builder
          </h1>
          <p className="text-xl text-purple-200">
            Create your Daggerheart character
          </p>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full ${
                    step <= currentStep ? "bg-yellow-400" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Character Form */}
        <Card className="bg-gradient-to-br from-purple-800/40 to-slate-800/40 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="w-6 h-6" />
              Step {currentStep} of 4
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderStep()}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                variant="outline"
                className="border-purple-400 text-purple-100 "
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <Button
                onClick={() => {
                  void handleNext();
                }}
                disabled={isLoading || nextIsDisabled()}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              >
                {isLoading ? (
                  "Saving..."
                ) : currentStep === 4 ? (
                  "Complete Character"
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-6 text-center">
          <Link to="/dashboard">
            <Button
              variant="outline"
              className="border-purple-400 text-purple-100 "
            >
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CharacterBuilder;
