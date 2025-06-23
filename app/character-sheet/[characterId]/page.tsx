"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Edit, Dice6, Heart, Shield, Sword } from "lucide-react";
import Link from "next/link";
import { CharacterWithRelations } from "@/lib/types";

export default function CharacterSheetPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [character, setCharacter] = useState<CharacterWithRelations | null>(
    null
  );
  const characterId = params.characterId as string;

  useEffect(() => {
    if (!user) {
      router.push("/auth");
      return;
    }

    const fetchCharacter = async () => {
      try {
        const { data, error } = await supabase
          .from("characters")
          .select(
            `
            *,
            ancestry:ancestries(*),
            class:classes(*),
            subclass:subclasses(*)
          `
          )
          .eq("id", characterId)
          .eq("user_id", user.id)
          .single();

        if (error) {
          if (error.code === "PGRST116") {
            // Character not found or not owned by user
            router.push("/dashboard");
            return;
          }
          throw error;
        }

        setCharacter(data);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-nebula flex items-center justify-center">
        <div className="text-white text-xl">Loading character sheet...</div>
      </div>
    );
  }

  if (!user || !character) {
    return null;
  }

  return (
    <div className="min-h-screen bg-nebula p-4">
      <div className="max-w-7xl mx-auto">
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
              <div className="flex items-center gap-2 text-brand-200">
                <span>Level {character.level}</span>
                {character.ancestry && (
                  <>
                    <span>•</span>
                    <span>{character.ancestry.name}</span>
                  </>
                )}
                {character.class && (
                  <>
                    <span>•</span>
                    <span>{character.class.name}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href={`/character-builder/${characterId}`}>
              <Button
                variant="outline"
                className="border-brand-400 text-brand-100"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Character
              </Button>
            </Link>
          </div>
        </div>

        {/* Character Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-linear-to-br from-brand-800/40 to-slate-800/40 border-brand-500/30 backdrop-blur-xs">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400" />
                Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                {character.max_hit_points || 25} /{" "}
                {character.max_hit_points || 25}
              </div>
              <p className="text-brand-200 text-sm">Hit Points</p>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-brand-800/40 to-slate-800/40 border-brand-500/30 backdrop-blur-xs">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                Armor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                {character.armor_class || 12}
              </div>
              <p className="text-brand-200 text-sm">Armor Class</p>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-brand-800/40 to-slate-800/40 border-brand-500/30 backdrop-blur-xs">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Sword className="w-5 h-5 text-yellow-400" />
                Attack
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                +{character.attack_bonus || 3}
              </div>
              <p className="text-brand-200 text-sm">Attack Bonus</p>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-brand-800/40 to-slate-800/40 border-brand-500/30 backdrop-blur-xs">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Dice6 className="w-5 h-5 text-purple-400" />
                Initiative
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                +{character.initiative_modifier || 2}
              </div>
              <p className="text-brand-200 text-sm">Initiative Modifier</p>
            </CardContent>
          </Card>
        </div>

        {/* Character Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Basic Info */}
          <Card className="bg-linear-to-br from-brand-800/40 to-slate-800/40 border-brand-500/30 backdrop-blur-xs">
            <CardHeader>
              <CardTitle className="text-white">Character Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-brand-200 text-sm font-medium">
                  Ancestry:
                </span>
                <p className="text-white">
                  {character.ancestry?.name || "Unknown"}
                </p>
              </div>
              <div>
                <span className="text-brand-200 text-sm font-medium">
                  Class:
                </span>
                <p className="text-white">
                  {character.class?.name || "Unknown"}
                </p>
                {character.subclass && (
                  <p className="text-brand-200 text-sm">
                    ({character.subclass.name})
                  </p>
                )}
              </div>
              <div>
                <span className="text-brand-200 text-sm font-medium">
                  Level:
                </span>
                <p className="text-white">{character.level}</p>
              </div>
              <div>
                <span className="text-brand-200 text-sm font-medium">
                  Experience:
                </span>
                <p className="text-white">
                  {character.experience_points || 0} XP
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Ability Scores */}
          <Card className="bg-linear-to-br from-brand-800/40 to-slate-800/40 border-brand-500/30 backdrop-blur-xs">
            <CardHeader>
              <CardTitle className="text-white">Ability Scores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-brand-200 text-sm">Agility</p>
                  <p className="text-white text-2xl font-bold">
                    {character.agility || 0}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-brand-200 text-sm">Strength</p>
                  <p className="text-white text-2xl font-bold">
                    {character.strength || 0}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-brand-200 text-sm">Finesse</p>
                  <p className="text-white text-2xl font-bold">
                    {character.finesse || 0}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-brand-200 text-sm">Instinct</p>
                  <p className="text-white text-2xl font-bold">
                    {character.instinct || 0}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-brand-200 text-sm">Presence</p>
                  <p className="text-white text-2xl font-bold">
                    {character.presence || 0}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-brand-200 text-sm">Knowledge</p>
                  <p className="text-white text-2xl font-bold">
                    {character.knowledge || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status & Resources */}
          <Card className="bg-linear-to-br from-brand-800/40 to-slate-800/40 border-brand-500/30 backdrop-blur-xs">
            <CardHeader>
              <CardTitle className="text-white">Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-brand-200 text-sm">Hope</span>
                  <Badge variant="secondary" className="bg-yellow-600">
                    {character.hope || 0}
                  </Badge>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-brand-200 text-sm">Fear</span>
                  <Badge variant="destructive">{character.fear || 0}</Badge>
                </div>
              </div>
              <div>
                <span className="text-brand-200 text-sm font-medium">
                  Stress:
                </span>
                <div className="flex gap-1 mt-1">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 border border-brand-400 rounded ${
                        i < (character.stress || 0)
                          ? "bg-red-500"
                          : "bg-transparent"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Equipment & Abilities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-linear-to-br from-brand-800/40 to-slate-800/40 border-brand-500/30 backdrop-blur-xs">
            <CardHeader>
              <CardTitle className="text-white">Equipment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-brand-200">
                Equipment management coming soon...
              </p>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-brand-800/40 to-slate-800/40 border-brand-500/30 backdrop-blur-xs">
            <CardHeader>
              <CardTitle className="text-white">Abilities & Spells</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-brand-200">
                Abilities and spell management coming soon...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
