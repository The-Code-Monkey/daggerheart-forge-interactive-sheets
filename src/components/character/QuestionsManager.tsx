import { JSX } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Character, CharacterWithRelations } from "@/lib/types";
import { Input } from "../ui/input";
import { debounce, set } from "lodash";

interface QuestionsManagerProps {
  character: CharacterWithRelations;
  onUpdate: (character: Partial<Character>) => void;
}

const QuestionsManager = ({
  character,
  onUpdate,
}: QuestionsManagerProps): JSX.Element => {
  // debounced generic handle update function using lodash debounce
  const debouncedUpdate = debounce(onUpdate, 500);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const { name, value } = event.target;

    const updatedInfo = set(
      character.additional ?? {},
      `questions.${type}.${name}`,
      value
    );

    debouncedUpdate({
      additional: updatedInfo,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-white">Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8 divide-y">
          <div className="space-y-4 pb-8">
            <h3 className="text-white mb-4">Background Questions</h3>
            {character.class?.additional?.questions?.background?.map(
              (backgroundQuestion, index) => (
                <div
                  className="text-white"
                  key={`backgroundQuestion-${String(index)}`}
                >
                  <Input
                    name={backgroundQuestion}
                    defaultValue={
                      character.additional?.questions?.background?.[
                        backgroundQuestion
                      ] ?? ""
                    }
                    onChange={(e) => {
                      handleInputChange(e, "background");
                    }}
                    type="text"
                    label={backgroundQuestion}
                  />
                </div>
              )
            )}
          </div>
          <div className="space-y-4">
            <h3 className="text-white mb-4">Connection Questions</h3>
            {character.class?.additional?.questions?.connections?.map(
              (connectionQuestion, index) => (
                <div
                  className="text-white"
                  key={`connectionQuestion-${String(index)}`}
                >
                  <Input
                    name={connectionQuestion}
                    defaultValue={
                      character.additional?.questions?.connections?.[
                        connectionQuestion
                      ] ?? ""
                    }
                    onChange={(e) => {
                      handleInputChange(e, "connections");
                    }}
                    type="text"
                    label={connectionQuestion}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionsManager;
