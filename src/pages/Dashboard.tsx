import { JSX, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Users,
  Sword,
  BookOpen,
  Plus,
  LogOut,
  Eye,
  Pencil,
  Beer,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { getCharacters } from "@/integrations/supabase/helpers";
import { CharacterWithRelations } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = (): JSX.Element => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const [characters, setCharacters] = useState<CharacterWithRelations[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const data = await getCharacters(String(user?.id));

      if (data) {
        setCharacters(data);
      }
    };

    void fetchCharacters();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  const handleDeleteCharacter = async (
    characterId: string,
    characterName: string,
  ) => {
    try {
      const { error } = await supabase
        .from("characters")
        .delete()
        .eq("id", characterId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete character. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Remove the character from the local state
      setCharacters((prev) => prev.filter((char) => char.id !== characterId));

      toast({
        title: "Character deleted",
        description: `${characterName} has been successfully deleted.`,
      });
    } catch (error) {
      console.error("Error deleting character:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const characterCount = characters.length;
  const maxCharacters = 5;
  const canCreateMore = characterCount < maxCharacters;

  return (
    <div className="min-h-screen bg-nebula p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {user?.user_metadata.username ?? "Adventurer"}!
            </h1>
            <p className="text-brand-200">
              Manage your characters and campaigns
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <Button asChild>
              <Link to="/homebrew">
                <Beer className="w-4 h-4 mr-2" />
                Homebrew
              </Link>
            </Button>
            <Button
              onClick={() => {
                void handleSignOut();
              }}
              variant="outline"
              className="border-brand-400 text-brand-100"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Character Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Characters
              </CardTitle>
              <Users className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {characterCount}/{maxCharacters}
              </div>
              <p className="text-xs text-brand-200">
                {canCreateMore
                  ? `${String(maxCharacters - characterCount)} slots remaining`
                  : "Maximum reached"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Campaigns
              </CardTitle>
              <Sword className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Coming Soon</div>
              <p className="text-xs text-brand-200">Campaign management</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Rule Books
              </CardTitle>
              <BookOpen className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Coming Soon</div>
              <p className="text-xs text-brand-200">Digital rule access</p>
            </CardContent>
          </Card>
        </div>

        {/* Characters Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white text-xl">
                Your Characters
              </CardTitle>
              <CardDescription className="text-brand-200">
                Manage your Daggerheart characters
              </CardDescription>
            </div>
            {canCreateMore && (
              <Link to="/character-builder">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Character
                </Button>
              </Link>
            )}
          </CardHeader>
          <CardContent>
            {characters.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {characters.map((character) => {
                  const link = character.complete
                    ? `/character-sheet/${character.id}`
                    : `/character-builder/${character.id}`;

                  return (
                    <Card
                      key={character.id}
                      className="bg-slate-800/30 border-brand-500/20"
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-white text-lg">
                          {character.name}
                        </CardTitle>
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="text-xs">
                            Level {character.level}
                          </Badge>
                          {character.ancestry && (
                            <Badge
                              variant="outline"
                              className="text-xs border-brand-400 text-brand-200"
                            >
                              {character.ancestry.name ?? "Unknown"}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-brand-200 text-sm mb-3">
                          {character.class?.name ?? "No class selected"}
                          {character.subclass
                            ? ` - (${String(character.subclass.name)})`
                            : ""}
                        </p>
                        <div className="flex gap-2">
                          <Link to={link} className="flex-1">
                            <Button
                              size="sm"
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              {character.complete ? (
                                <>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Sheet
                                </>
                              ) : (
                                <>
                                  <Pencil className="w-4 h-4 mr-2" />
                                  Edit Sheet
                                </>
                              )}
                            </Button>
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="px-3"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Character
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "
                                  {character.name}"? This action cannot be
                                  undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    void handleDeleteCharacter(
                                      character.id,
                                      character.name,
                                    )
                                  }
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-brand-200 mb-4">
                  You haven't created any characters yet.
                </p>
                {canCreateMore && (
                  <Link to="/character-builder">
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Character
                    </Button>
                  </Link>
                )}
              </div>
            )}

            {!canCreateMore && (
              <div className="mt-4 p-4 bg-orange-900/30 border border-orange-500/30 rounded-lg">
                <p className="text-orange-200 text-sm">
                  You've reached the maximum of {maxCharacters} characters.
                  Delete a character to create a new one.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Coming Soon Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="bg-linear-to-br from-slate-800/40 to-gray-800/40 border-gray-500/30 opacity-60">
            <CardHeader>
              <CardTitle className="text-white">Campaign Management</CardTitle>
              <CardDescription className="text-gray-300">
                Create and manage your Daggerheart campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="bg-gray-600">
                Coming Soon
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-slate-800/40 to-gray-800/40 border-gray-500/30 opacity-60">
            <CardHeader>
              <CardTitle className="text-white">Digital Dice & Tools</CardTitle>
              <CardDescription className="text-gray-300">
                Dice rolling, initiative tracking, and more
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="bg-gray-600">
                Coming Soon
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
