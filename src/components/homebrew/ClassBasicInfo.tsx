
import { JSX } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface ClassBasicInfoProps {
  form: UseFormReturn<any>;
}

const ClassBasicInfo = ({ form }: ClassBasicInfoProps): JSX.Element => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-white mb-4">Basic Information</h3>
      
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Class Name</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter class name" 
                className="bg-slate-800/50 border-brand-500/30 text-white"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe your class"
                className="bg-slate-800/50 border-brand-500/30 text-white min-h-[100px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ClassBasicInfo;
