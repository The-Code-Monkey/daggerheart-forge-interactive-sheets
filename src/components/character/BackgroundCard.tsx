import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CharacterWithRelations } from "@/lib/types";
import { JSX } from "react";

interface BackgroundCardProps {
  character: CharacterWithRelations;
}

const BackgroundCard = ({
  character,
}: BackgroundCardProps): JSX.Element | null => {
  if (!character.background) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-white">Background</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-purple-200">{character.background}</p>
      </CardContent>
    </Card>
  );
};

export default BackgroundCard;
