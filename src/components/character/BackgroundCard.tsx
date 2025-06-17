import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CharacterWithRelations } from "@/lib/types";
import { JSX, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { updateCharacter } from "@/integrations/supabase/helpers";
import { useToast } from "@/hooks/use-toast";

interface BackgroundCardProps {
  character: CharacterWithRelations;
}

const BackgroundCard = ({
  character,
}: BackgroundCardProps): JSX.Element | null => {
  const [background, setBackground] = useState(
    String(character.background ?? "")
  );
  const [editing, setEditing] = useState(false);
  const { characterId } = useParams<{ characterId: string }>();
  const { toast } = useToast();

  const switchComponent = () => {
    setEditing((prev) => !prev);
  };

  const handleSave = async () => {
    const textArea = document.getElementById(
      "background-textarea"
    ) as HTMLTextAreaElement;
    const newText = textArea.value;

    const data = await updateCharacter(characterId!, {
      background: newText,
    });

    if (data) {
      setEditing(false);
      setBackground(newText);
      toast({
        title: "Background updated",
        description: "Your background has been successfully updated.",
        variant: "default",
      });
    } else {
      toast({
        title: "Error updating background",
        description: "There was an error updating your background.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle
          className="text-white justify-center  flex items-center hover:cursor-pointer"
          onClick={switchComponent}
        >
          Background (click to edit)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!editing && (
          <p
            className="text-purple-200 hover:cursor-pointer"
            onClick={switchComponent}
          >
            {background}
          </p>
        )}
        {editing && (
          <>
            <Textarea defaultValue={background} id="background-textarea" />
            <div className="ml-auto flex flex-row gap-2 mt-2">
              <Button onClick={switchComponent}>Cancel</Button>
              <Button onClick={() => void handleSave()}>Save</Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default BackgroundCard;
