import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NewSubclassFormData } from "@/integrations/supabase/helpers/classes";
import { Feature } from "@/lib/types";
import { Plus, Trash2 } from "lucide-react";
import { JSX, useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface FoundationFeaturesProps {
  form: UseFormReturn<NewSubclassFormData>;
}

const FoundationFeatures = ({ form }: FoundationFeaturesProps): JSX.Element => {
  const [features, setFeatures] = useState<Partial<Feature>[]>([
    { list: [""] },
  ]);

  const addFeature = () => {
    const newFeatures = [...features, { list: [""] }];
    setFeatures(newFeatures);
    form.setValue("features.foundation", newFeatures);
  };

  const removeFeature = (index: number) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
    form.setValue("features.foundation", newFeatures);
  };

  const updateFeature = (index: number, value: Partial<Feature>) => {
    const newFeatures = [...features];
    newFeatures[index] = {
      ...newFeatures[index],
      ...value,
    };
    setFeatures(newFeatures);
    form.setValue("features.foundation", newFeatures);
  };

  // New handlers for list inside each feature
  const addListItem = (featureIndex: number) => {
    const feature = features[featureIndex];
    const newList = feature.list ? [...feature.list, ""] : [""];
    updateFeature(featureIndex, { list: newList });
  };

  const removeListItem = (featureIndex: number, listIndex: number) => {
    const feature = features[featureIndex];
    if (!feature.list) return;
    const newList = feature.list.filter((_, i) => i !== listIndex);
    updateFeature(featureIndex, { list: newList });
  };

  const updateListItem = (
    featureIndex: number,
    listIndex: number,
    value: string
  ) => {
    const feature = features[featureIndex];
    if (!feature.list) return;
    const newList = [...feature.list];
    newList[listIndex] = value;
    updateFeature(featureIndex, { list: newList });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          type="button"
          onClick={addFeature}
          variant="outline"
          size="sm"
          className="text-brand-400 border-brand-400 hover:bg-brand-400 hover:text-white ml-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Feature
        </Button>
      </div>

      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-slate-800/30 p-4 rounded-lg border border-brand-500/20"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-white">
              Feature {index + 1}
            </h4>
            {features.length > 1 && (
              <Button
                type="button"
                onClick={() => {
                  removeFeature(index);
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
                label="Name"
                value={feature.name ?? ""}
                onChange={(e) => {
                  updateFeature(index, { name: e.target.value });
                }}
              />
            </div>
            <div>
              <Textarea
                className="bg-slate-800/50 border-brand-500/30 text-white"
                label="Description"
                value={feature.description ?? ""}
                onChange={(e) => {
                  updateFeature(index, { description: e.target.value });
                }}
              />
            </div>

            {/* New list input section */}
            <div>
              <label className="block mb-2 text-white font-medium">
                Options
              </label>

              {(feature.list ?? []).map((item, listIndex) => (
                <div
                  key={listIndex}
                  className="flex items-center mb-2 space-x-2"
                >
                  <Input
                    className="bg-slate-800/50 border-brand-500/30 text-white flex-grow"
                    value={item}
                    onChange={(e) => {
                      updateListItem(index, listIndex, e.target.value);
                    }}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    onClick={() => {
                      removeListItem(index, listIndex);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-brand-400 border-brand-400 hover:bg-brand-400 hover:text-white"
                onClick={() => {
                  addListItem(index);
                }}
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Option Item
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoundationFeatures;
