import GenericMultiSelect from "@/components/molecules/GenericMultiSelect";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  classSearchHelper,
  getAllBaseClasses,
  NewSubclassFormData,
} from "@/integrations/supabase/helpers/classes";
import { JSX } from "react";
import { UseFormReturn } from "react-hook-form";

interface BasicInfoProps {
  form: UseFormReturn<NewSubclassFormData>;
}

const BasicInfo = ({ form }: BasicInfoProps): JSX.Element => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter subclass name"
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
                placeholder="Enter subclass description"
                className="bg-slate-800/50 border-brand-500/30 text-white"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <GenericMultiSelect
        name="classes"
        label="Choose a Class"
        isMulti
        searchFn={classSearchHelper}
        defaultFn={getAllBaseClasses}
      />
    </div>
  );
};

export default BasicInfo;
