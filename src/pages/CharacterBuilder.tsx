import { useState, useEffect, JSX } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
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
import GenericMultiSelect from "@/components/molecules/GenericMultiSelect";
import {
  classSearchHelper,
  getAllBaseClasses,
} from "@/integrations/supabase/helpers/classes";

import { useForm } from "react-hook-form"; // No longer directly importing Controller
import {
  Form, // Import Form, FormControl, FormField, FormItem, FormLabel, FormMessage
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Adjust this import path as per your shadcn/ui setup

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

// Define FormData type directly, without Zod infer
interface FormData {
  name: string;
  level: number;
  age?: number | null;
  pronouns?: string | null;
  gender?: string | null;
  background?: string | null;
  ancestry?: string | null;
  class?: {
    label?: string;
    value: number;
  };
  community?: string | null;
  subclass?: string | null;
  stats: Record<StatKey, string>;
  stress?: number | null;
  hope?: number | null;
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

  // Initialize useForm
  const form = useForm<FormData>({
    // Renamed to 'form' for consistency with shadcn/ui
    defaultValues: {
      name: "",
      level: 1,
      age: null,
      pronouns: null,
      gender: null,
      background: null,
      ancestry: null,
      class: undefined,
      community: null,
      subclass: null,
      stats: {},
      stress: 6,
      hope: 2,
    },
  });

  const formData = form.watch(); // Watch all form data to react to changes
  // Destructure from form object as well
  const { setValue, trigger } = form;

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
      console.log(formData.class);
      const classIdNum = formData.class?.value;
      if (!classIdNum || isNaN(classIdNum) || classIdNum === 0) {
        setSubclasses([]);
        // Also clear the subclass field if the class is removed or invalid
        setValue("subclass", null);
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
  }, [formData.class, setValue, toast]); // Add setValue and toast to dependencies

  useEffect(() => {
    const fetchCharacter = async () => {
      if (!characterId) return;

      const { data } = await supabase
        .from("characters")
        .select("*")
        .eq("id", characterId)
        .single();

      if (data) {
        const classData = data.class
          ? classes.find((cls) => cls.id === data.class)
          : undefined;
        // Set form data using setValue from react-hook-form
        setValue("name", data.name);
        setValue("level", data.level ?? 1);
        setValue("age", data.age ?? null);
        setValue("pronouns", data.pronouns ?? null);
        setValue("gender", data.gender ?? null);
        setValue("background", data.background ?? null);
        setValue("ancestry", data.ancestry ? String(data.ancestry) : null);
        setValue(
          "class",
          classData
            ? { value: classData.id, label: String(classData.name) }
            : undefined
        );
        setValue("community", data.community ? String(data.community) : null);
        setValue("subclass", data.subclass ? String(data.subclass) : null);
        setValue("stats", data.stats as FormData["stats"]); // Type assertion
        setValue("stress", data.stress ?? 6);
        setValue("hope", data.hope ?? 2);
      }
    };

    if (urlCharacterId) {
      void fetchCharacter();
    }
  }, [urlCharacterId, characterId, setValue, classes]);

  const saveCharacterData = async (data: FormData) => {
    if (!user) return;

    setIsLoading(true);
    try {
      const characterData = {
        user_id: user.id,
        name: data.name,
        ancestry: data.ancestry ? parseInt(data.ancestry, 10) : null,
        class: data.class ? data.class.value : null,
        subclass: data.subclass ? parseInt(data.subclass, 10) : null,
        community: data.community ? parseInt(data.community, 10) : null,
        level: data.level,
        background: data.background ?? null,
        stats: data.stats,
        stress: data.stress ?? 6,
        hope: data.hope ?? 2,
        complete: currentStep === 4,
        age: data.age ?? null,
        pronouns: data.pronouns ?? null,
        gender: data.gender ?? null,
      };

      if (characterId) {
        const { error } = await supabase
          .from("characters")
          .update(characterData)
          .eq("id", characterId);

        if (error) throw error;
      } else {
        const { data: newCharacter, error } = await supabase
          .from("characters")
          .insert([characterData])
          .select()
          .single();

        if (error) throw error;
        setCharacterId(newCharacter.id);
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

  const handleNextStep = async (data: FormData) => {
    // Manually trigger validation for fields in the current step
    let isValid = false;
    switch (currentStep) {
      case 1:
        isValid = await trigger(["name", "level", "age", "pronouns", "gender"]); // Include optional fields in trigger for visual feedback if needed, but not necessarily 'required'
        break;
      case 2:
        isValid = await trigger([
          "ancestry",
          "class",
          "subclass",
          "community",
          "background",
        ]);
        break;
      case 3: {
        // Validate all stat fields
        isValid = await trigger([
          "stats.agility",
          "stats.strength",
          "stats.finesse",
          "stats.instinct",
          "stats.presence",
          "stats.knowledge",
        ]);
        // Additionally, ensure all stats have a value other than "none"
        const allStatsSelected = statKeys.every((key) => formData.stats[key]);
        isValid = isValid && allStatsSelected;
        break;
      }
      case 4:
        isValid = true; // Review step, no additional validation needed
        break;
      default:
        isValid = true;
    }

    if (!isValid) {
      // If validation fails, don't proceed to next step or save
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields for this step.",
        variant: "destructive",
      });
      return;
    }

    await saveCharacterData(data); // Save data after validation
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
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

  console.log(formData);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6" key="step1">
            <h3 className="text-xl font-semibold text-white mb-4">
              Basic Information
            </h3>
            <FormField
              control={form.control} // Use form.control
              name="name"
              rules={{ required: "Character name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Character Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter character name"
                      className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="level"
              rules={{
                required: "Level is required",
                min: { value: 1, message: "Level must be at least 1" },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Level <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(parseInt(value, 10));
                    }}
                    value={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-slate-800/50 border-purple-500/50 text-white mt-1">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                        <SelectItem key={level} value={level.toString()}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter character age"
                      className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        field.onChange(
                          e.target.value ? parseInt(e.target.value, 10) : null
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pronouns"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Pronouns</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter character pronouns"
                      className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Gender</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter character gender"
                      className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6" key="step2">
            <h3 className="text-xl font-semibold text-white mb-4">
              Character Origin
            </h3>
            <FormField
              control={form.control}
              name="ancestry"
              rules={{ required: "Ancestry is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Ancestry <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-slate-800/50 border-purple-500/50 text-white mt-1">
                        <SelectValue placeholder="Select ancestry" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <GenericMultiSelect
              name="class"
              label="Choose a Class"
              searchFn={classSearchHelper}
              defaultFn={getAllBaseClasses}
            />

            {formData.class && (
              <FormField
                control={form.control}
                name="subclass"
                rules={{ required: "Subclass is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Subclass <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} {...field}>
                      <FormControl>
                        <SelectTrigger className="bg-slate-800/50 border-purple-500/50 text-white mt-1">
                          <SelectValue placeholder="Select subclass" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subclasses.map((subclass) => (
                          <SelectItem
                            key={subclass.id}
                            value={String(subclass.id)}
                          >
                            {subclass.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="community"
              rules={{ required: "Community is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Community <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} {...field}>
                    <FormControl>
                      <SelectTrigger className="bg-slate-800/50 border-purple-500/50 text-white mt-1">
                        <SelectValue placeholder="Select community" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="background"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Background</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your character's background..."
                      className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6" key="step3">
            <h3 className="text-xl font-semibold text-white mb-4">
              Attributes
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {statKeys.map((key) => {
                return (
                  <FormField
                    key={key} // Key needs to be on the FormField
                    control={form.control}
                    name={`stats.${key}`}
                    rules={{
                      required: `${key} modifier is required`,
                      validate: (value) =>
                        value !== "none" || `${key} modifier is required`,
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white capitalize">
                          {key} <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-slate-800/50 border-purple-500/50 text-white mt-1">
                              <SelectValue placeholder="Select modifier" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {/* <SelectItem value="none" disabled>
                              Select modifier
                            </SelectItem> */}
                            {Object.entries(allowedMods).map(([mod, max]) => {
                              const currentSelection = field.value;
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              })}
            </div>
          </div>
        );

      case 4:
        console.log(formData.class);
        const cls = classes.find((cls) => cls.id === formData.class?.value);
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
          <div className="space-y-6" key="step4">
            <h3 className="text-xl font-semibold text-white mb-4">
              Review Your Character
            </h3>
            <Card className="p-4 rounded-lg space-y-2">
              <h4 className="text-lg font-medium text-white">
                {formData.name}
              </h4>
              <p className="text-purple-200">
                Level {formData.level} | {cls?.name} ({subclass?.name})
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

  return (
    <div className="min-h-screen bg-nebula py-8 px-4">
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
        <Card className="bg-linear-to-br from-purple-800/40 to-slate-800/40 border-purple-500/30 backdrop-blur-xs">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="w-6 h-6" />
              Step {currentStep} of 4
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Wrap the form content with shadcn/ui's Form component */}
            <Form {...form}>
              <form
                onSubmit={(...args) => {
                  void form.handleSubmit(handleNextStep)(...args);
                }}
              >
                {renderStep()}

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <Button
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    variant="outline"
                    className="border-purple-400 text-purple-100 "
                    type="button" // Important: Prevent this button from submitting the form
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  <Button
                    type="submit" // This button will now trigger form submission and handleNextStep
                    disabled={isLoading}
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
              </form>
            </Form>
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
