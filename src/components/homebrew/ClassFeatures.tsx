
import { JSX, useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { UseFormReturn } from "react-hook-form";
import { Trash2, Plus } from "lucide-react";

interface ClassFeaturesProps {
  form: UseFormReturn<any>;
}

const ClassFeatures = ({ form }: ClassFeaturesProps): JSX.Element => {
  const [features, setFeatures] = useState([{ name: "", description: "" }]);

  const addFeature = () => {
    const newFeatures = [...features, { name: "", description: "" }];
    setFeatures(newFeatures);
    form.setValue("features", newFeatures);
  };

  const removeFeature = (index: number) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
    form.setValue("features", newFeatures);
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFeatures(newFeatures);
    form.setValue("features", newFeatures);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-white">Class Features</h3>
        <Button
          type="button"
          onClick={addFeature}
          variant="outline"
          size="sm"
          className="text-brand-400 border-brand-400 hover:bg-brand-400 hover:text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Feature
        </Button>
      </div>

      {features.map((feature, index) => (
        <div key={index} className="bg-slate-800/30 p-4 rounded-lg border border-brand-500/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-white">Feature {index + 1}</h4>
            {features.length > 1 && (
              <Button
                type="button"
                onClick={() => removeFeature(index)}
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
              <FormLabel className="text-white">Feature Name</FormLabel>
              <Input
                placeholder="Enter feature name"
                className="bg-slate-800/50 border-brand-500/30 text-white"
                value={feature.name}
                onChange={(e) => updateFeature(index, "name", e.target.value)}
              />
            </div>

            <div>
              <FormLabel className="text-white">Feature Description</FormLabel>
              <Textarea
                placeholder="Describe what this feature does"
                className="bg-slate-800/50 border-brand-500/30 text-white min-h-[100px]"
                value={feature.description}
                onChange={(e) => updateFeature(index, "description", e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClassFeatures;
