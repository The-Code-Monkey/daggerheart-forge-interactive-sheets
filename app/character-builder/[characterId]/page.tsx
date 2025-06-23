"use client";

import { useState, useEffect, JSX } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Save, Eye } from "lucide-react";
import Link from "next/link";
import { CharacterWithRelations } from "@/lib/types";
import { getCharacterById } from "@/integrations/supabase/helpers";

const CharacterBuilderEditPage = (): JSX.Element | null => {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [character, setCharacter] = useState<CharacterWithRelations | null>(
    null
  );
  const characterId = params?.characterId as string;

  useEffect(() => {
    if (!user) {
      router.push("/auth");
      return;
    }

    const fetchCharacter = async () => {
      try {
        const data = await getCharacterById(characterId);

        if (data) {
          setCharacter(data);
        }
      } catch (error) {
        console.error("Error fetching character:", error);
        toast({
          title: "Error",
          description: "Failed to load character. Please try again.",
          variant: "destructive",
        });
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    void fetchCharacter();
  }, [user, characterId, router, toast]);

  const handleSaveCharacter = async () => {
    if (!character) return;

    setLoading(true);

    try {
      const { error } = await supabase
        .from("characters")
        .update({
          // Add fields to update here
          updated_at: new Date().toISOString(),
        })
        .eq("id", characterId);

      if (error) {
        throw error;
      }

      toast({
        title: "Character Saved",
        description: `${character.name} has been saved successfully.`,
      });
    } catch (error) {
      console.error("Error saving character:", error);
      toast({
        title: "Error",
        description: "Failed to save character. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async () => {
    if (!character) return;

    setLoading(true);

    try {
      const { error } = await supabase
        .from("characters")
        .update({
          complete: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", characterId);

      if (error) {
        throw error;
      }

      toast({
        title: "Character Completed",
        description: `${character.name} is now ready for play!`,
      });

      router.push(`/character-sheet/${characterId}`);
    } catch (error) {
      console.error("Error completing character:", error);
      toast({
        title: "Error",
        description: "Failed to complete character. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-nebula flex items-center justify-center">
        <div className="text-white text-xl">Loading character...</div>
      </div>
    );
  }

  if (!user || !character) {
    return null;
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
                size="sm"
                className="border-brand-400 text-brand-100"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-white">
                {character.name}
              </h1>
              <p className="text-brand-200">Character Builder</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                void handleSaveCharacter();
              }}
              disabled={loading}
              variant="outline"
              className="border-brand-400 text-brand-100"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Progress
            </Button>
            <Button
              onClick={() => {
                void handleMarkComplete();
              }}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Eye className="w-4 h-4 mr-2" />
              Complete Character
            </Button>
          </div>
        </div>

        {/* Character Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-linear-to-br from-brand-800/40 to-slate-800/40 border-brand-500/30 backdrop-blur-xs">
            <CardHeader>
              <CardTitle className="text-white">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-brand-200 text-sm">Name:</span>
                <p className="text-white font-medium">{character.name}</p>
              </div>
              <div>
                <span className="text-brand-200 text-sm">Level:</span>
                <p className="text-white font-medium">{character.level}</p>
              </div>
              <div>
                <span className="text-brand-200 text-sm">Ancestry:</span>
                <p className="text-white font-medium">
                  {character.ancestry?.name ?? "Not selected"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-brand-800/40 to-slate-800/40 border-brand-500/30 backdrop-blur-xs">
            <CardHeader>
              <CardTitle className="text-white">Class & Subclass</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-brand-200 text-sm">Class:</span>
                <p className="text-white font-medium">
                  {character.class?.name ?? "Not selected"}
                </p>
              </div>
              <div>
                <span className="text-brand-200 text-sm">Subclass:</span>
                <p className="text-white font-medium">
                  {character.subclass?.name ?? "Not selected"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-brand-800/40 to-slate-800/40 border-brand-500/30 backdrop-blur-xs">
            <CardHeader>
              <CardTitle className="text-white">Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-brand-200 text-sm">Status:</span>
                <p className="text-white font-medium">
                  {character.complete ? "Complete" : "In Progress"}
                </p>
              </div>
              <div>
                <span className="text-brand-200 text-sm">Created:</span>
                <p className="text-white font-medium">
                  {new Date(String(character.created_at)).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Character Builder Steps */}
        <div className="space-y-6">
          <Card className="bg-linear-to-br from-slate-800/40 to-gray-800/40 border-gray-500/30">
            <CardHeader>
              <CardTitle className="text-white">
                Character Builder Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-brand-800/30 rounded-lg border border-brand-500/20">
                  <h3 className="text-white font-semibold mb-2">
                    1. Basic Info
                  </h3>
                  <p className="text-brand-200 text-sm">
                    Name, ancestry, background
                  </p>
                </div>
                <div className="p-4 bg-brand-800/30 rounded-lg border border-brand-500/20">
                  <h3 className="text-white font-semibold mb-2">
                    2. Class Selection
                  </h3>
                  <p className="text-brand-200 text-sm">
                    Choose class and subclass
                  </p>
                </div>
                <div className="p-4 bg-brand-800/30 rounded-lg border border-brand-500/20">
                  <h3 className="text-white font-semibold mb-2">
                    3. Ability Scores
                  </h3>
                  <p className="text-brand-200 text-sm">
                    Assign ability scores
                  </p>
                </div>
                <div className="p-4 bg-brand-800/30 rounded-lg border border-brand-500/20">
                  <h3 className="text-white font-semibold mb-2">
                    4. Equipment
                  </h3>
                  <p className="text-brand-200 text-sm">Starting gear</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Placeholder for character builder form */}
          <Card className="bg-linear-to-br from-brand-800/40 to-slate-800/40 border-brand-500/30 backdrop-blur-xs">
            <CardHeader>
              <CardTitle className="text-white">Character Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-brand-200">
                Full character builder interface coming soon. For now, you can
                save your progress and mark the character as complete when
                ready.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CharacterBuilderEditPage;
