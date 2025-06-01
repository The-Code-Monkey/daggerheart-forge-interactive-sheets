
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BackgroundCardProps {
  character: any;
}

const BackgroundCard = ({ character }: BackgroundCardProps) => {
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
