import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CharacterWithRelations } from "@/lib/types";
import { Sword } from "lucide-react";
import { JSX } from "react";

interface AttributesCardProps {
  character: CharacterWithRelations;
}

const AttributesCard = ({ character }: AttributesCardProps): JSX.Element => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Sword className="w-5 h-5 text-yellow-400" />
          Attributes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(character.stats).map(([stat, value]) => (
            <div key={stat} className="text-center">
              <div className="text-sm text-purple-300 capitalize">{stat}</div>
              <div className="text-2xl font-bold text-white">
                {String(value)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AttributesCard;
