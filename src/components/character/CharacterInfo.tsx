import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JSX, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  getAllCommunities,
  updateCharacter,
} from "@/integrations/supabase/helpers";
import { Community } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface CharacterInfoProps {
  character: any;
  refetch: () => void;
}

const CharacterInfo = ({
  character,
  refetch,
}: CharacterInfoProps): JSX.Element => {
  const [editing, setEditing] = useState(false);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<number | null>(
    null
  );

  const handleChangeCommunity = (value: string) => {
    setSelectedCommunity(Number(value));
  };

  useEffect(() => {
    const fetchCommunities = async () => {
      const data = await getAllCommunities();
      if (data) {
        setCommunities(data);
      }
    };
    void fetchCommunities();
  }, []);

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  useEffect(() => {
    setSelectedCommunity(Number(character.community.id));
  }, [character]);

  const handleSave = async () => {
    const level = String(
      (document.getElementById("level-input") as HTMLInputElement).value
    );
    const pronouns = (
      document.getElementById("pronouns-input") as HTMLInputElement
    ).value;
    const community = selectedCommunity;
    const updatedCharacter = {
      level: parseInt(level),
      pronouns,
      community,
    };

    const data = await updateCharacter(String(character.id), updatedCharacter);

    if (data) {
      refetch();
      setEditing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-white flex justify-between items-center">
          Character Info{" "}
          <div className="flex gap-2 items-center justify-center">
            <Button onClick={toggleEditing}>
              {editing ? "Cancel" : "Edit"}
            </Button>
            {editing && <Button onClick={() => void handleSave()}>Save</Button>}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex flex-row gap-2 items-center">
          <span className="text-purple-300">Community:</span>
          {!editing && (
            <span className="text-white ml-2">
              {character.community?.name ?? "Unknown"}
            </span>
          )}
          {editing && (
            <Select
              defaultValue={String(selectedCommunity)}
              onValueChange={handleChangeCommunity}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a community" />
              </SelectTrigger>
              <SelectContent>
                {communities.map((community) => (
                  <SelectItem key={community.id} value={String(community.id)}>
                    {community.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="flex flex-row gap-2 items-center">
          <span className="text-purple-300">Level:</span>
          {!editing && (
            <span className="text-white ml-2">{character.level}</span>
          )}
          {editing && (
            <Input
              id="level-input"
              type="number"
              min={1}
              max={10}
              defaultValue={character.level}
            />
          )}
        </div>
        <div className="flex flex-row gap-2 items-center">
          <span className="text-purple-300">Pronouns:</span>
          {!editing && (
            <span className="text-white ml-2">
              {character.pronouns ?? "Unknown"}
            </span>
          )}
          {editing && (
            <Input
              id="pronouns-input"
              type="text"
              defaultValue={character.pronouns}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterInfo;
