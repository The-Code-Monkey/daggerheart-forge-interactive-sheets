
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CharacterInfoProps {
  character: any;
}

const CharacterInfo = ({ character }: CharacterInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-white">Character Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <span className="text-purple-300">Community:</span>
          <span className="text-white ml-2">
            {character.community?.name ?? "Unknown"}
          </span>
        </div>
        <div>
          <span className="text-purple-300">Level:</span>
          <span className="text-white ml-2">{character.level}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterInfo;
