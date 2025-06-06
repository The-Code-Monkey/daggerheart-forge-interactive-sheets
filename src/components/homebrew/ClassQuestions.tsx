import { JSX, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UseFormReturn } from "react-hook-form";
import { Trash2, Plus } from "lucide-react";

interface ClassQuestionsProps {
  form: UseFormReturn<any>;
}

const ClassQuestions = ({ form }: ClassQuestionsProps): JSX.Element => {
  const [backgroundQuestions, setBackgroundQuestions] = useState<string[]>([
    "",
  ]);
  const [connectionQuestions, setConnectionQuestions] = useState<string[]>([
    "",
  ]);

  const addquestion = () => {
    const newquestions = [...backgroundQuestions, ""];
    setBackgroundQuestions(newquestions);
    form.setValue("additional.questions.background", newquestions);
  };

  const removequestion = (index: number) => {
    const newquestions = backgroundQuestions.filter((_, i) => i !== index);
    setBackgroundQuestions(newquestions);
    form.setValue("additional.questions.background", newquestions);
  };

  const updatequestion = (index: number, value: string) => {
    const newquestions = [...backgroundQuestions];
    newquestions[index] = value;
    setBackgroundQuestions(newquestions);
    form.setValue("additional.questions.background", newquestions);
  };

  const addconnectionquestion = () => {
    const newquestions = [...connectionQuestions, ""];
    setConnectionQuestions(newquestions);
    form.setValue("additional.questions.connection", newquestions);
  };

  const removeconnectionquestion = (index: number) => {
    const newquestions = connectionQuestions.filter((_, i) => i !== index);
    setConnectionQuestions(newquestions);
    form.setValue("additional.questions.connection", newquestions);
  };

  const updateconnectionquestion = (index: number, value: string) => {
    const newquestions = [...connectionQuestions];
    newquestions[index] = value;
    setConnectionQuestions(newquestions);
    form.setValue("additional.questions.connection", newquestions);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-white">
          Background Questions
        </h3>
        <Button
          type="button"
          onClick={addquestion}
          variant="outline"
          size="sm"
          className="text-brand-400 border-brand-400 hover:bg-brand-400 hover:text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Background Question
        </Button>
      </div>

      {backgroundQuestions.map((backgroundQuestion, index) => (
        <div
          key={index}
          className="bg-slate-800/30 p-4 rounded-lg border border-brand-500/20"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-white">
              Background Question {index + 1}
            </h4>
            {backgroundQuestions.length > 1 && (
              <Button
                type="button"
                onClick={() => {
                  removequestion(index);
                }}
                variant="ghost"
                size="sm"
                className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <Input
                className="bg-slate-800/50 border-brand-500/30 text-white"
                value={backgroundQuestion}
                onChange={(e) => {
                  updatequestion(index, e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-white">
          Connection Questions
        </h3>
        <Button
          type="button"
          onClick={addconnectionquestion}
          variant="outline"
          size="sm"
          className="text-brand-400 border-brand-400 hover:bg-brand-400 hover:text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Connection Question
        </Button>
      </div>

      {connectionQuestions.map((connectionQuestion, index) => (
        <div
          key={index}
          className="bg-slate-800/30 p-4 rounded-lg border border-brand-500/20"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-white">
              Connection Question {index + 1}
            </h4>
            {connectionQuestions.length > 1 && (
              <Button
                type="button"
                onClick={() => {
                  removeconnectionquestion(index);
                }}
                variant="ghost"
                size="sm"
                className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <Input
                className="bg-slate-800/50 border-brand-500/30 text-white"
                value={connectionQuestion}
                onChange={(e) => {
                  updateconnectionquestion(index, e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClassQuestions;
