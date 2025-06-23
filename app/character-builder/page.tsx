"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

const CharacterBuilderPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [characterName, setCharacterName] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  const handleCreateCharacter = async () => {
    if (!user) return;

    const trimmedName = characterName.trim();
    if (!trimmedName) {
      toast({
        title: "Error",
        description: "Please enter a character name.",
        variant: "destructive",
      });
      return;
    }

    if (trimmedName.length < 2 || trimmedName.length > 50) {
      toast({
        title: "Error",
        description: "Character name must be between 2 and 50 characters.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("characters")
        .insert({
          name: characterName.trim(),
          user_id: user.id,
          level: 1,
          complete: false,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "Character Created",
        description: `${characterName} has been created successfully.`,
      });

      router.push(`/character-builder/${data.id}`);
    } catch (error) {
      console.error("Error creating character:", error);
      toast({
        title: "Error",
        description: "Failed to create character. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-nebula p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button
              variant="outline"
              size="sm"
              className="border-brand-400 text-brand-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-white">Character Builder</h1>
            <p className="text-brand-200">Create your Daggerheart character</p>
          </div>
        </div>

        {/* Character Creation Form */}
        <Card className="bg-linear-to-br from-brand-800/40 to-slate-800/40 border-brand-500/30 backdrop-blur-xs">
          <CardHeader>
            <CardTitle className="text-white text-2xl">
              Create New Character
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="characterName" className="text-white">
                Character Name
              </Label>
              <Input
                id="characterName"
                value={characterName}
                onChange={(e) => {
                  setCharacterName(e.target.value);
                }}
                placeholder="Enter your character's name"
                className="bg-slate-800/50 border-brand-500/30 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => {
                  void handleCreateCharacter();
                }}
                disabled={loading}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Creating..." : "Create Character"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Character Builder Steps Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <Card className="bg-linear-to-br from-slate-800/40 to-gray-800/40 border-gray-500/30 opacity-60">
            <CardHeader>
              <CardTitle className="text-white">Step 1: Basic Info</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">Name, ancestry, and background</p>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-slate-800/40 to-gray-800/40 border-gray-500/30 opacity-60">
            <CardHeader>
              <CardTitle className="text-white">
                Step 2: Class & Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Choose class and assign ability scores
              </p>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-slate-800/40 to-gray-800/40 border-gray-500/30 opacity-60">
            <CardHeader>
              <CardTitle className="text-white">Step 3: Equipment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">Starting gear and equipment</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CharacterBuilderPage;
