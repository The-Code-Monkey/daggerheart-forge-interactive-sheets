
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const CharacterBuilder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [characterId, setCharacterId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    ancestry: "",
    class: "",
    community: "",
    level: 1,
    background: "",
    stats: {
      agility: 8,
      strength: 8,
      finesse: 8,
      instinct: 8,
      presence: 8,
      knowledge: 8
    },
    hope: 2,
    fear: 0
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateStats = (stat: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [stat]: value
      }
    }));
  };

  const saveCharacterData = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const characterData = {
        user_id: user.id,
        name: formData.name || "Unnamed Character",
        ancestry: formData.ancestry,
        class: formData.class,
        community: formData.community,
        level: formData.level,
        background: formData.background,
        stats: formData.stats,
        hope: formData.hope,
        fear: formData.fear
      };

      if (characterId) {
        // Update existing character
        const { error } = await supabase
          .from('characters')
          .update(characterData)
          .eq('id', characterId);

        if (error) throw error;
      } else {
        // Create new character
        const { data, error } = await supabase
          .from('characters')
          .insert([characterData])
          .select()
          .single();

        if (error) throw error;
        if (data) setCharacterId(data.id);
      }

      toast({
        title: "Character saved",
        description: "Your character progress has been saved.",
      });
    } catch (error) {
      console.error('Error saving character:', error);
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
      navigate('/dashboard');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Basic Information</h3>
            <div>
              <Label htmlFor="name" className="text-white">Character Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
                placeholder="Enter character name"
              />
            </div>
            <div>
              <Label htmlFor="level" className="text-white">Level</Label>
              <Select value={formData.level.toString()} onValueChange={(value) => updateFormData('level', parseInt(value))}>
                <SelectTrigger className="bg-slate-800/50 border-purple-500/50 text-white mt-1">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6,7,8,9,10].map(level => (
                    <SelectItem key={level} value={level.toString()}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="background" className="text-white">Background</Label>
              <Textarea
                id="background"
                value={formData.background}
                onChange={(e) => updateFormData('background', e.target.value)}
                className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
                placeholder="Describe your character's background..."
                rows={4}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Character Origin</h3>
            <div>
              <Label htmlFor="ancestry" className="text-white">Ancestry</Label>
              <Select value={formData.ancestry} onValueChange={(value) => updateFormData('ancestry', value)}>
                <SelectTrigger className="bg-slate-800/50 border-purple-500/50 text-white mt-1">
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
              <Select value={formData.class} onValueChange={(value) => updateFormData('class', value)}>
                <SelectTrigger className="bg-slate-800/50 border-purple-500/50 text-white mt-1">
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
              <Select value={formData.community} onValueChange={(value) => updateFormData('community', value)}>
                <SelectTrigger className="bg-slate-800/50 border-purple-500/50 text-white mt-1">
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
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Attributes</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(formData.stats).map(([stat, value]) => (
                <div key={stat}>
                  <Label className="text-white capitalize">{stat}</Label>
                  <Input
                    type="number"
                    min="3"
                    max="18"
                    value={value}
                    onChange={(e) => updateStats(stat, parseInt(e.target.value) || 8)}
                    className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Hope</Label>
                <Input
                  type="number"
                  min="0"
                  max="10"
                  value={formData.hope}
                  onChange={(e) => updateFormData('hope', parseInt(e.target.value) || 2)}
                  className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
                />
              </div>
              <div>
                <Label className="text-white">Fear</Label>
                <Input
                  type="number"
                  min="0"
                  max="10"
                  value={formData.fear}
                  onChange={(e) => updateFormData('fear', parseInt(e.target.value) || 0)}
                  className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Review Your Character</h3>
            <div className="bg-slate-800/30 p-4 rounded-lg space-y-2">
              <h4 className="text-lg font-medium text-white">{formData.name || "Unnamed Character"}</h4>
              <p className="text-purple-200">Level {formData.level} {formData.ancestry} {formData.class}</p>
              <p className="text-purple-200">Community: {formData.community}</p>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {Object.entries(formData.stats).map(([stat, value]) => (
                  <div key={stat} className="text-center">
                    <div className="text-sm text-purple-300 capitalize">{stat}</div>
                    <div className="text-white font-semibold">{value}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-4">
                <div className="text-center">
                  <div className="text-sm text-green-300">Hope</div>
                  <div className="text-white font-semibold">{formData.hope}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-red-300">Fear</div>
                  <div className="text-white font-semibold">{formData.fear}</div>
                </div>
              </div>
              {formData.background && (
                <div className="mt-4">
                  <div className="text-sm text-purple-300">Background</div>
                  <p className="text-white text-sm">{formData.background}</p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Character Builder</h1>
          <p className="text-xl text-purple-200">Create your Daggerheart character</p>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full ${
                    step <= currentStep ? 'bg-yellow-400' : 'bg-gray-600'
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
                className="border-purple-400 text-purple-100 hover:bg-purple-700/30"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <Button
                onClick={handleNext}
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
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-6 text-center">
          <Link to="/dashboard">
            <Button variant="outline" className="border-purple-400 text-purple-100 hover:bg-purple-700/30">
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CharacterBuilder;
